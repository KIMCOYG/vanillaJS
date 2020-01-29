const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    allDelete = document.querySelector(".allDelete"),
    selDelete = document.querySelector(".selectDelete");

const TODOS_LS = 'toDos',
    User_LS = 'currentUser',
    SHOWING_CN = "showing",
    Form_CN = "form";

let toDos = [];

function addLocation(event){
    event.preventDefault();
    const btn = event.target;
    const li = btn.parentNode;
    const li_input = li.querySelector(".form");
    console.log(btn, li, li_input);
    // li_input.classList.remove(Form_CN);
    // li_input.classList.add(SHOWING_CN);
    
    /* toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos(); */
}

function saveLocation(event){
    event.preventDefault();

    const form = event.target;
    const li = form.parentNode;
    const address = form.querySelector("input");
    const span = form.querySelector(".loca");
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const parsedToDos = JSON.parse(loadedToDos);
    const addressValue = address.value;
    const changeId = parseInt(li.id);
    parsedToDos[changeId-1].location = addressValue;

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
                localStorage.setItem(TODOS_LS, JSON.stringify(parsedToDos));

                address.value = "";
            }
        }
    );

    /* // console.log(parsedToDos);
    localStorage.removeItem(TODOS_LS);
    localStorage.setItem(TODOS_LS, JSON.stringify(parsedToDos));

    addressValue = ""; */
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, location){
    const li = document.createElement("li");

    
    const span = document.createElement("span");
    span.innerText = text;
    
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("class", "check");
    
    const addBtn = document.createElement("button");
    addBtn.innerText = "Add Location";
    addBtn.addEventListener("click", addLocation);
    
    /* const locationBox = document.createElement("input");
    locationBox.setAttribute("type", "checkbox");
    locationBox.setAttribute("class", "checkedLocation"); */
    
    const br = document.createElement("br");
    
    const form = document.createElement("form");
    form.addEventListener("submit", saveLocation);
    
    const locationInput = document.createElement("input");
    locationInput.setAttribute("type", "text");
    locationInput.setAttribute("placeholder", "Write the locationInput");
    locationInput.classList.add(SHOWING_CN);
    
    const locationText = document.createElement("span");
    locationText.setAttribute("class", "loca");
    locationText.innerText = location;
    
    const newId = toDos.length + 1;
    const formId = "form" + newId;
    const locationId = "location" + newId;
    const list_x = null;
    const list_y = null;
    
    form.appendChild(locationInput);
    form.appendChild(locationText);
    form.id = formId;
    locationText.id = locationId;
    
    // locationText.innerText = list_location;

    li.appendChild(span);
    li.appendChild(checkBox);
   /*  li.appendChild(locationText);
    li.appendChild(locationBox); */
    li.appendChild(addBtn);
    li.appendChild(br);
    // li.appendChild(location);
    li.appendChild(form);
    li.id = newId;

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId,
        location,
        x: list_x,
        y: list_y
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleKeyUp(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    // console.log("hi hello");
    if(currentValue.length>10){
        alert("No more than 10 characters");
        toDoInput.value = "";
    }
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const parsedToDos = JSON.parse(loadedToDos);
    let overlap = false;

    if(currentValue.length>30){
        alert("Too many words!!");
    } else{
        if(parsedToDos === null){
            // console.log('hello'); //paintToDo(currentValue);
        } else{
            parsedToDos.forEach(function(toDo){
                if(toDo.text.toLowerCase() === currentValue.toLowerCase()){
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
            paintToDo(currentValue);
        }

    }

    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text, toDo.location); 
        });
    }
}

let checkingSelected = false;
function checkingSelBox(){
    const checking = document.querySelectorAll(".check");
    checking.forEach(function(checky){
        if(checky.checked){
            checkingSelected = true;
        }
    });
}

function allDelelteActive(){
    localStorage.removeItem(TODOS_LS);
    const listAll = toDoList.querySelectorAll("li");
    // console.log(listAll);
    for(var i=0;i<listAll.length;i++){
        toDoList.removeChild(listAll[i]);
    }
    toDos = [];
}

function allDeleteClick(event){
    var con;

    event.preventDefault();
    checkingSelBox();
    console.log(checkingSelected);
    if(checkingSelected){
        con = confirm("Selected Checkbox, All delete?");
        if(con){
            allDelelteActive();
            checkingSelected = false;
        }
    } else {
        allDelelteActive();
    }
}

function selDeleteClick(event){
    event.preventDefault();
    const checking = document.querySelectorAll(".check");
    var checkingList
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