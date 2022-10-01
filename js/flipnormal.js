var val=0;
var list=[];
var s=0;

var score="Score:00";

var icons=["flipassets/whatsapp.svg","flipassets/twitter.svg","flipassets/linkedin.svg","flipassets/tesla.svg","flipassets/instagram.svg","flipassets/facebook.svg","flipassets/youtube.svg","flipassets/spotify.svg"];
var i=1;
var done=[];

var correct=[];
var i=0;

for(i=1;i<=16;i++){
	done[i]=-1;
}

i=0;

var timer=38;
var w=0;

// window.onload=load();
// load();

setTimeout(function () {
		document.getElementsByClassName("again")[1].style.display="table";
		document.getElementsByClassName("play-again")[1].style.display="table";
},500);

var t,b;



function load() {

document.getElementsByClassName("again")[1].style.display="none";
document.getElementsByClassName("play-again")[1].style.display="none";

document.getElementById("li1").style.display="block";
document.getElementById("li2").style.display="none";
document.getElementById("li3").style.display="none";

val=0;
list=[];
s=0;

score="Score:00";

document.getElementById("score").innerHTML=score;

icons=["flipassets/whatsapp.svg","flipassets/twitter.svg","flipassets/linkedin.svg","flipassets/tesla.svg","flipassets/instagram.svg","flipassets/facebook.svg","flipassets/youtube.svg","flipassets/spotify.svg"];
i=1;
done=[];

for(i=1;i<=16;i++){
	done[i]=-1;
}

i=0;

while(i<16){

	var r=Math.floor(Math.random()*16)+1;

	if(done[r]!=-1){
		continue;
	}

	done[r]=(i%8);
	var str="img"+r;
	// console.log(str);
	document.getElementById(str).src=icons[i%8];
	i+=1;
}

correct=[];
i=0;

for(i=1;i<=16;i++){
	correct[i]=0;
}

function secondpage() {

	var none="Well, it looks like you need more practice before you can ace this game. Don't worry, just hit the play button and try your best. After all, it's just a game!"
	var some="Not bad, gotta try a little harder and you'll be on your way to 16 points. So, what are you waiting for? Just smash that play button. But remember, it's just a game!"
	var many="Awesome! Those were some good skills that you showed. Nevertheless, keep playing and obtain a good streak. Click on the play button and start scoring your streak!"
	var sc="";

	if(s<10){
		sc="0"+s;
	}
	else{
		sc=s;
	}

	if(s>=0 && s<=6){
		document.getElementById("comments").innerHTML=none;
		document.getElementById("s").innerHTML="Your Score: "+sc;
	}
	else if(s>6 && s<=12){
		document.getElementById("comments").innerHTML=some;
		document.getElementById("s").innerHTML="Your Score: "+sc;
	}
	else{
		document.getElementById("comments").innerHTML=many;
		document.getElementById("s").innerHTML="Your Score: "+sc;
	}

	setTimeout(function () {
		document.getElementsByClassName("again")[0].style.display="table";
		document.getElementsByClassName("play-again")[0].style.display="table";
	},1500);
}

timer=38;
w=0;

var exit=0;

// window.onload = function () {

	t=setInterval(function () {

		var j=0;
		var tn=0;
		for(j=1;j<=16;j++){
			if(correct[j]===1){
				tn+=1;
			}
		}

		if(tn===16){
			clearInterval(t);
			clearInterval(b);
			setTimeout(function () {
			document.getElementById("li2").className="transition";
			document.getElementById("li2").style.display="block";
			document.getElementById("li1").className="transition";
			document.getElementById("li1").style.display="none";
			
			secondpage();
			// return;
			
		},1000);
		}

		// console.log(timer);
		if(timer>0){
			timer-=1;
		document.getElementById("time-num").innerHTML=timer+"s";
	}
	else{
		timer=0;
		document.getElementById("time-num").innerHTML=timer+"s";
		setTimeout(function () {
			document.getElementById("li2").className="transition";
			document.getElementById("li2").style.display="block";
			document.getElementById("li1").className="transition";
			document.getElementById("li1").style.display="none";
			
			secondpage();
			// return;
			
		},1000);
		clearInterval(t);
	}
	},1000);

	b=setInterval(function () {
		if(timer<=0){
			document.getElementById("time-bar").style.width="100%";
			clearInterval(b);
		}
		else if(w<=100){
		w+=0.027;
		document.getElementById("time-bar").style.width=w+"%";
	}
	else{
		document.getElementById("time-bar").style.width="100%";
		clearInterval(b);
	}
	},10);

}

function abc(id){

	if(timer>0){

	var a=0;
	var i=0;

	if(correct[id]===1){
		return;
	}

	for(i=0;i<list.length;i++){
		if(list[i]===id){
			a=1;
		}
	}

	if(a==0){

		if(val<2){
			if(a!=1){
				document.getElementById(id).className="button2 large medium";
				list.push(id);
				val=val+1;
			}
		}

		else{
			val=1;
			var i=0;
			document.getElementById(id).className="button2 large medium";
			for(i=0;i<list.length;i++){
				document.getElementById(list[i]).className="button1 large medium";
			}
			list=[id];
		}

		if(list.length===2){
			var x=list[0];
			var y=list[1];
			
			if(done[x]===done[y]){
				s+=2;

				if(s<10){
					score="Score:0"+s;
				}
				else{
					score="Score:"+s;
				}

				document.getElementById("score").innerHTML=score;

				document.getElementById(x).className="freeze large medium";
				document.getElementById(y).className="freeze large medium";
				setTimeout(function (){
					document.getElementById(x).className="finished large medium";
					document.getElementById(y).className="finished large medium";
					correct[x]=1;
					correct[y]=1;
					list=[];
				},500);

			}

			else{
				setTimeout(function() {
					document.getElementById(x).className="button1 large medium";
					document.getElementById(y).className="button1 large medium";
					list=[];
					val=0;
				},400);
			}

		}

	}
}

}


function play() {
	// timer=10;
	// w=0;
	// done=[];
	// correct=[];

	clearInterval(t);
	clearInterval(b);
	timer=5;
	
	setTimeout(function () {
		document.getElementById("li1").style.display="block";
		document.getElementById("li2").style.display="none";
		var i=0;
		for(i=1;i<=16;i++){
			document.getElementById(i).className="button1 large medium";
		}
		document.getElementsByClassName("again")[0].style.display="none";
		document.getElementsByClassName("play-again")[0].style.display="none";
		load();
	},500);

}