const url ='https://randomuser.me/api/';
let name = document.getElementById('name');
let email = document.getElementById('email');
let num = document.getElementById('Phnum');
let btn = document.getElementById('btn');

btn.addEventListener("click", function(){
	fetch(url)
	.then(Errors)	
	.then(pJSON)
	.then(update)
	.catch(printError)
});

function Errors (res){
  if(!res.ok){
    throw error(res.status);
  }
  console.log(res);
  return res;
}

function pJSON (res){
  return res.json();
}

function update (profile){
  
  name.innerHTML = profile.results[0].name.first; 
  email.innerHTML = profile.results[0].email;
  num.innerHTML = profile.results[0].phone;
  return 1;
}
function printError (error){
  console.log(error);
}


