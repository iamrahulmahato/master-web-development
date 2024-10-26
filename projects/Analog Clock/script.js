let hour = document.getElementById("hour");
let minute = document.getElementById("minute");
let second = document.getElementById("second");


// Function
function updateTimer(){
    let date = new Date();
    let hh = date.getHours(); // Get Hour
    let mm = date.getMinutes(); // Get Minute
    let ss = date.getSeconds(); // Get Second

    let hRotation = (30 * hh) + (mm / 2);
    let mRotation = (6 * mm);
    let sRotation = (6 * ss);

    hour.style.transform = `rotate(${hRotation}deg)`;
    minute.style.transform = `rotate(${mRotation}deg)`;
    second.style.transform = `rotate(${sRotation}deg)`;
}
setInterval(updateTimer,1000);