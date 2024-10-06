let textContainer = document.querySelector(".textContainer");
let deleteKey = document.querySelector(".delete");
let enterKey = document.querySelector(".enter");
let spaceKey = document.querySelector(".space");
let capsLock = document.querySelector(".capslock");
let allKey = document.querySelectorAll(".key");
let isCaps = false;

deleteKey.addEventListener("click",function(){
    let textContainerContent = textContainer.innerText;
    if(textContainerContent.length == 0){
        return;
    }
    console.log(textContainerContent);
    let newContent = textContainerContent.slice(0,textContainerContent.length-1);
    textContainer.innerText = newContent;
})

enterKey.addEventListener("click",function(){
    let content = textContainer.innerText;
    let newContent = content+"\n";
    textContainer.innerText = newContent;
})

spaceKey.addEventListener("click",function(){
    let content = textContainer.innerText;
    let newContent = content+ '\u00A0';
    textContainer.innerText = newContent;
})

capsLock.addEventListener("click",function(){
    if(isCaps){
        capsLock.classList.remove("active");
        for(let key of allKey){
            if(key.classList.contains("delete") || key.classList.contains("enter")||
             key.classList.contains("space") || key.classList.contains("capslock")){
                //nothing
            }else
                key.innerText = key.innerText.toLowerCase();
        }
    }else{
        capsLock.classList.add("active");
        for(let key of allKey){
                if(key.classList.contains("delete") || key.classList.contains("enter")||
                 key.classList.contains("space") || key.classList.contains("capslock")){
                    //nothing
                }else
                    key.innerText = key.innerText.toUpperCase();
            }
        }
    isCaps=!isCaps
})

for(let key of allKey){
    key.addEventListener("click",function(){
        if(key.classList.contains("delete") || key.classList.contains("enter")||
         key.classList.contains("space") || key.classList.contains("capslock")){
            return;
        }
        textContainer.innerText += key.innerText;
    })
}