var cel= document.getElementById("cel");
var fah= document.getElementById("fah");


cel.addEventListener('input', function(){
    let c=this.value;
    let f=(c*9/5)+32;
    fah.value=f;
})


fah.addEventListener('input', function(){
    let f=this.value;
    let c=(f-32)*5/9;
    cel.value=c;
})  