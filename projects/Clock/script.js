function updateClock(){
    const date = new Date();
    // const day = date.getDay();
    const hour = date.getHours().toString().padStart(2,0);
    const minute = date.getMinutes().toString().padStart(2,0);
    const second = date.getSeconds().toString().padStart(2,0);
    const timeString = `${hour}:${minute}:${second}`;
    document.getElementById("clock").textContent=timeString;
}
updateClock();
setInterval(updateClock,1000);