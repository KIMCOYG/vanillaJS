const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    // console.log(year, month, day);
    
    clockTitle.innerText = `${year}/${
        month<10 ? `0${month}` : month}/${
        day<10 ? `0${day}` : day} ${
        hours<10 ? `0${hours}` : hours}:${
        minutes<10 ?  `0${minutes}` : minutes}:${
        seconds<10 ? `0${seconds}` : seconds}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();