const btn = document.querySelector(".generate")
const memeimage = document.querySelector(".img")
const title = document.querySelector(".meme-title")
const author = document.querySelector(".author")

const generate_image= async()=>{
   const  URL =  "https://meme-api.com/gimme/wholesomememes" 
    const response = await fetch(URL)  //fetching memes from the api 
    const data = await response.json()
    const url = data.url ;
    // setting all the details of the meme
    memeimage.setAttribute("src" , url) 
    title.innerHTML=data.title; 
    author.innerHTML=data.author ; 
    btn.style.backgroundColor = "black" ;
    btn.style.color = "white" ;
}


btn.addEventListener("click",()=>{
generate_image();
})

