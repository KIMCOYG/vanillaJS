const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    allDelete = document.querySelector(".allDelete"),
    selDelete = document.querySelector(".selectDelete");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    console.log(btn, li);
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("class", "check");
    const newId = toDos.length + 1;
    
    delBtn.innerText = "DEL";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBox);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const parsedToDos = JSON.parse(loadedToDos);
    let overlap = false;
    if(parsedToDos === null){
        console.log('hello'); //paintToDo(currentValue);
    } else{
        parsedToDos.forEach(function(toDo){
            if(toDo.text === currentValue){
                overlap = true;
                console.log(overlap);
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
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text); 
        })
    }
}

function allDeleteClick(event){
    event.preventDefault();
    localStorage.removeItem(TODOS_LS);
    const listAll = document.querySelectorAll("li");
    for(var i=0;i<listAll.length;i++){
        toDoList.removeChild(listAll[i]);
    }
    toDos = [];
}

function selDeleteClick(event){
    event.preventDefault();
    const checking = document.querySelectorAll(".check");
    var checkedArray = [];
    var checkingList
    for(var i=0;i<checking.length;i++){
        if(checking[i].checked === true){
            checkingList = checking[i].parentNode;
            checkedArray.push(parseInt(checkingList.id));
            toDoList.removeChild(checkingList);
        }
        const cleanToDos = toDos.filter(function(toDo){
            return toDo.id !== parseInt(checkingList.id);
        })
        toDos = cleanToDos;
    }
    saveToDos();

    // for(var i=0;i<checkedArray.length;i++){
    //     for(var j=0;j<toDos.length;j++){
    //         console.log(toDos[0].id, checkedArray[0]);
    //         if(checkedArray[i] === toDos[j].id){
    //             toDos.pop
    //         }
    //     }
    // }
    
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    allDelete.addEventListener("click", allDeleteClick);
    selDelete.addEventListener("click", selDeleteClick);
}

init();