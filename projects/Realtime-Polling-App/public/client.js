
const socket = io();


const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultsElement = document.getElementById('results');


socket.on('pollData', (pollData) => {
 
  questionElement.textContent = pollData.question;


  optionsElement.innerHTML = '';
  resultsElement.innerHTML = '';


  pollData.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => {
      socket.emit('vote', index); 
    });
    optionsElement.appendChild(button);
  });


  updateResults(pollData);
});


function updateResults(pollData) {
  resultsElement.innerHTML = '';

  pollData.options.forEach((option, index) => {
    const listItem = document.createElement('li');
    const percentage = ((pollData.votes[index] / pollData.votes.reduce((a, b) => a + b, 0)) * 100 || 0).toFixed(1);
    listItem.innerHTML = `
      ${option} - ${pollData.votes[index]} votes
      <div class="bar" style="width: ${percentage}%;">${percentage}%</div>
    `;
    resultsElement.appendChild(listItem);
  });
}
