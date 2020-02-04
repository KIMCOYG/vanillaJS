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
    const dow = date.getDay();
    var dowName = "Mon";

    if(dow===1){
        dowName = "Mon";
    } else if(dow===2){
        dowName = "Tue";
    } else if(dow===3){
        dowName = "Wed";
    } else if(dow===4){
        dowName = "Thu";
    } else if(dow===5){
        dowName = "Fri";
    } else if(dow===6){
        dowName = "Sat";
    } else if(dow===7){
        dowName = "Sun";
    }
    
    console.log(dow, dowName);

    // console.log(year, month, day);
    
    clockTitle.innerText = `${year}/${
        month<10 ? `0${month}` : month}/${
        day<10 ? `0${day}` : day} ${
        hours<10 ? `0${hours}` : hours}:${
        minutes<10 ?  `0${minutes}` : minutes}:${
        seconds<10 ? `0${seconds}` : seconds} ${dowName}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();