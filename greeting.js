const nameForm = document.querySelector(".js-form"),
    input = nameForm.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    todoForm = document.querySelector(".js-toDoForm"),
    todoList = document.querySelector(".js-toDoList"),
    delBtns = document.querySelector(".js-delBtns");

const USER_LS = "currentUser",
    ToDoS_LS = "toDos"
    SHOWING_CN = "showing",
    D_NONE = "d-none",
    D_BLOCK = "d-block";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
    // nameForm.classList.add(D_NONE);
    todoForm.classList.add(D_BLOCK);
    delBtns.classList.add(D_BLOCK);
}

function changeName(){
    const liAll = todoList.querySelectorAll("li");
    
    nameForm.classList.add(D_BLOCK);
    greeting.classList.remove(D_BLOCK);
    todoForm.classList.remove(D_BLOCK);
    delBtns.classList.remove(D_BLOCK);
    input.value = "";
    
    localStorage.removeItem(USER_LS);
    localStorage.removeItem(ToDoS_LS);
    for(var i=0;i<liAll.length;i++){
        todoList.removeChild(liAll[i]);
    }
}

function askForName(){
    nameForm.classList.add(D_BLOCK);
    nameForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    const changeBtn = document.createElement("button");
    changeBtn.classList.add("btn");
    changeBtn.classList.add("btn-dark");
    changeBtn.style.marginLeft = "5px";
    changeBtn.innerText = "CHANGE";
    changeBtn.addEventListener("click", changeName);

    nameForm.classList.remove(D_BLOCK);
    greeting.classList.add(D_BLOCK);
    greeting.innerText = `Hello ${text}`;
    greeting.appendChild(changeBtn);
}

function loadName(){
    // event.preventDefault();
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }
    else{
        paintGreeting(currentUser)
    }
}

function greetingBox(){
    // event.preventDefault();
    const name = localStorage.getItem(USER_LS);
    if(name !== null){
        todoForm.classList.add(D_BLOCK);
        delBtns.classList.add(D_BLOCK);
    }
}

function init(){
    loadName();
    greetingBox();
}

init();