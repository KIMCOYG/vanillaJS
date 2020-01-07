const nameForm = document.querySelector(".js-form"),
    input = nameForm.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    todoForm = document.querySelector(".js-toDoForm");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function changeName(){
    const li = document.querySelector(".js-toDoList");

    nameForm.classList.add(SHOWING_CN);
    greeting.classList.remove(SHOWING_CN);
    localStorage.removeItem(USER_LS);
    localStorage.removeItem("toDos");
    location.reload();
    input.value = "";
}

function askForName(){
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    const changeBtn = document.createElement("button");
    changeBtn.innerText = "CHANGE";
    changeBtn.addEventListener("click", changeName);

    todoForm.classList.add(SHOWING_CN);
    nameForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
    greeting.appendChild(changeBtn);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }
    else{
        paintGreeting(currentUser)
    }
}

function init(){
    loadName();
}

init();