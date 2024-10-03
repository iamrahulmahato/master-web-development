window.addEventListener("keydown", (e) =>{
    document.getElementById("result").innerHTML = `The key pressed <span>${e.key}</span><span>Key Code: ${e.keyCode}</span>`
});