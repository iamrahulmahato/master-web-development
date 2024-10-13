var arr = [

    {
        dp:"images/image_12.jpg", story: "images/image_12.jpg"
    },
    {
        dp:"images/image_13.jpg", story: "images/image_13.jpg"
    },
    {
        dp:"images/image_15.jpg", story: "images/image_15.jpg"
    },
    {
        dp:"images/image_33.jpg", story: "images/image_33.jpg"
    },
    {
        dp:"images/image_40.jpg", story: "images/image_40.jpg"
    },
]

var storiya = document.querySelector(".storiya")

var clutter = ""
arr.forEach(function(elem,idx){
    clutter += `<div class="story">
    <img id = "${idx}"src="${elem.dp}" alt="">
</div>`
})
storiya.innerHTML = clutter
storiya.addEventListener("click",function(dets){
    document.querySelector(".full-screen").style.display = "block"
    document.querySelector(".full-screen").style.backgroundImage = `url(${arr[dets.target.id].story})`

    setTimeout(function(){
        document.querySelector(".full-screen").style.display = "none"
    },3000)
});

