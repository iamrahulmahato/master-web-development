document.getElementById('jokeBtn').addEventListener('click',fetchJoke);
function fetchJoke(){
  const displayJoke = document.getElementById('displayJoke');
  displayJoke.innerHTML = `Loading...`;
  fetch('https://official-joke-api.appspot.com/random_joke').then((response) => {
    if(!response.ok){
      throw new error('Network response was not ok');     
    }
    return response.json();
  }).then(data => {
    displayJoke.innerHTML = `${data.setup} - ${data.punchline}`;
  }).catch(error => {
    displayJoke.innerHTML = `Failed to load joke. Try again!`;
    console.log(error);   
  })
};