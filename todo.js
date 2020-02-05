const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    todoMap = document.querySelector(".js-map"),
    todoMapInput = todoMap.querySelector("input"),
    allDelete = document.querySelector(".allDelete"),
    selDelete = document.querySelector(".selectDelete");

const TODOS_LS = 'toDos',
    User_LS = 'currentUser',
    SHOWING_CN = "showing",
    Form_CN = "form";

var getToDoLocalStorage;
var parseToDoLocalStorage;

let toDos = [];

var cor = true;
function correctLocation(address){
    naver.maps.Service.geocode({
        query: address
    }, function(status, response){
            if(status === naver.maps.Service.Status.ERROR){
                if(!address){
                    return alert('Geocode Error, Please check address');
                }
                return alert('Geocode Error, address:' + address);
            }

            if(response.v2.meta.totalCount === 0){
                // address.value = "";
                cor = false;
                return alert('No result.');
            }
        }
    );
}

function saveLocation(event){
    event.preventDefault();

    const form = event.target;
    const li = form.parentNode;
    const address = form.querySelector("input");
    const span = form.querySelector(".loca");
    getToDoLocalStorage = localStorage.getItem(TODOS_LS);
    parseToDoLocalStorage = JSON.parse(getToDoLocalStorage);
    const addressValue = address.value;
    const changeId = parseInt(li.id);
    parseToDoLocalStorage[changeId-1].location = addressValue;

    naver.maps.Service.geocode({
        query: addressValue
    }, function(status, response){
            if(status === naver.maps.Service.Status.ERROR){
                if(!addressValue){
                    return alert('Geocode Error, Please check address');
                }
                return alert('Geocode Error, address:' + addressValue);
            }

            if(response.v2.meta.totalCount === 0){
                address.value = "";
                return alert('No result.');
            } else{
                span.innerText = addressValue;
                localStorage.removeItem(TODOS_LS);
                localStorage.setItem(TODOS_LS, JSON.stringify(parseToDoLocalStorage));

                address.value = "";
            }
        }
    );
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, location){
    const li = document.createElement("li");
    
    const span = document.createElement("span");
    span.innerText = text;
    span.classList.add("badge");
    
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("class", "check");
    // checkBox.classList.add("form-check-input");
    
    const br = document.createElement("br");
    
    const form = document.createElement("form");
    form.addEventListener("submit", saveLocation);
    form.classList.add("form-inline");
    
    const locationInput = document.createElement("input");
    locationInput.setAttribute("type", "text");
    locationInput.setAttribute("placeholder", "Write the locationInput");
    locationInput.classList.add("d-block");
    locationInput.classList.add("form-control");

    const brTag = document.createElement("br");
    
    const locationText = document.createElement("span");
    locationText.setAttribute("class", "loca");
    locationText.innerText = location;
    locationText.classList.add("badge");
    
    const newId = toDos.length + 1;
    const formId = "form" + newId;
    const locationId = "location" + newId;
    
    // form.appendChild(locationInput);
    // form.appendChild(brTag);
    form.appendChild(locationText);
    form.id = formId;
    locationText.id = locationId;

    li.appendChild(span);
    li.appendChild(checkBox);
    // li.appendChild(br);
    li.appendChild(form);
    li.id = newId;

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId,
        location
    }
    toDos.push(toDoObj);
    saveToDos();
    // todoMapInput.value = "";
}

function handleKeyUp(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    // console.log("hi hello");
    if(currentValue.length>30){
        alert("No more than 30 characters");
        toDoInput.value = "";
    }
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    const locationValue = todoMapInput.value;
    getToDoLocalStorage = localStorage.getItem(TODOS_LS);
    parseToDoLocalStorage = JSON.parse(getToDoLocalStorage);
    let overlap = false;

    if(currentValue.length>30){
        alert("Too many words!!");
    } else if(locationValue === ""){
        var con = confirm("지정 장소가 없습니다. 괜찮으십니까?");
        if(con){
            if(parseToDoLocalStorage === null){
                // console.log('hello'); //paintToDo(currentValue);
            } else{
                parseToDoLocalStorage.forEach(function(toDo){
                    if(toDo.text.toLowerCase() === (currentValue.trim()).toLowerCase()){
                        overlap = true;
                        // console.log(overlap);
                    }
                })
            }
            
            if(overlap === true){
                alert('Overlap!!!');
                overlap = false;
                toDoInput.value = "";
            } else{
                paintToDo(currentValue.trim(), locationValue);
            }
        }
    } else { //지정장소 존재
        /* correctLocation(locationValue);
        console.log(cor);
        if(cor){ */
            if(parseToDoLocalStorage === null){
                // console.log('hello'); //paintToDo(currentValue);
            } else{
                parseToDoLocalStorage.forEach(function(toDo){
                    if(toDo.text.toLowerCase() === (currentValue.trim()).toLowerCase()){
                        overlap = true;
                        // console.log(overlap);
                    }
                })
            }
            
            if(overlap === true){
                alert('Overlap!!!');
                overlap = false;
                toDoInput.value = "";
            } else{
                paintToDo(currentValue.trim(), locationValue);
            }
        // }
        // cor = true;
    } //
    toDoInput.value = "";
    todoMapInput.value = "";
}

function loadToDos(){
    getToDoLocalStorage = localStorage.getItem(TODOS_LS);
    if(getToDoLocalStorage !== null){
        parseToDoLocalStorage = JSON.parse(getToDoLocalStorage);
        parseToDoLocalStorage.forEach(function(toDo){
            paintToDo(toDo.text, toDo.location); 
        });
    }
}

let checkingSelected = false;
function checkingSelBox(){
    let selCount = 0;
    const checking = document.querySelectorAll(".check");
    checking.forEach(function(checky){
        if(checky.checked){
            checkingSelected = true;
            selCount += 1;
        }
    });

    return selCount;
}

function allDelelteActive(){
    localStorage.removeItem(TODOS_LS);
    const listAll = toDoList.querySelectorAll("li");

    for(var i=0;i<listAll.length;i++){
        toDoList.removeChild(listAll[i]);
    }
    toDos = [];
}

function allDeleteClick(event){
    event.preventDefault();
    var con;
    getToDoLocalStorage = localStorage.getItem(TODOS_LS);
    parseToDoLocalStorage = JSON.parse(getToDoLocalStorage);
    const listCount = parseToDoLocalStorage.length;
        
    con = confirm(listCount+"개의 리스트가 있습니다. 삭제하시겠습니까?");
    if(con){
        allDelelteActive();
    }
}

function selDeleteClick(event){
    event.preventDefault();
    const checking = document.querySelectorAll(".check");
    var checkingList
    const listCount = checkingSelBox();
    var con = confirm(listCount+"개가 선택되었습니다. 삭제하시겠습니까?");
    
    if(con){
        for(var i=0;i<checking.length;i++){
            if(checking[i].checked === true){
                checkingList = checking[i].parentNode;
                // checkedArray.push(parseInt(checkingList.id));
                toDoList.removeChild(checkingList);
                const cleanToDos = toDos.filter(function(toDo){
                    return toDo.id !== parseInt(checkingList.id);
                })
                toDos = cleanToDos;
            }
        }
        saveToDos();        
    }
}

function reset(){
    const name = localStorage.getItem(User_LS);
    if(name === null){
        toDos = [];
    }
}

function init(){
    loadToDos();
    reset();
    toDoForm.addEventListener("submit", handleSubmit);
    toDoForm.addEventListener("keyup", handleKeyUp);
    allDelete.addEventListener("click", allDeleteClick);
    selDelete.addEventListener("click", selDeleteClick);
}

init();