
let prisoner1score = 0, prisoner2score = 0;
document.getElementById('cooperate').onclick = () => playRound('COOPERATE');
document.getElementById('defect').onclick = () => playRound('DEFECT');
document.getElementById('reset').onclick = () => reset();
function playRound(prisoner1choice) {
  const prisoner2choice = Math.random() > 0.5 ? 'COOPERATE' : 'DEFECT';
  let result = '';
  
  if (prisoner1choice === 'COOPERATE' && prisoner2choice === 'COOPERATE') {
    result = 'BOTH COOPERATED. ';
    point='EACH GET 3 POINTS.';
    prisoner1score += 3; prisoner2score += 3;
  } else if (prisoner1choice === 'COOPERATE' && prisoner2choice === 'DEFECT') {
    result = 'PRISONER1 COOPERATED, PRISONER2 DEFECTED.';
    point='PRISONER2 GETS 5 PONT';
    prisoner2score += 5;
  } else if (prisoner1choice === 'DEFECT' && prisoner2choice === 'COOPERATE') {
    result = 'PRISONER1 DEFECTED, PRISONER2 COOPERATED.';
    point='PRISONER1 GET 5 POINTS.';
    prisoner1score += 5;
  } else {
    result = 'BOTH DEFECTED. ';
    point='NO ONE GET POINTS.';
  }
  document.getElementById('prisoner1-choice').innerText=prisoner1choice;
  document.getElementById('prisoner2-choice').innerText=prisoner2choice;
  document.getElementById('result').innerText = result;
  document.getElementById('point').innerText=point;
  document.getElementById('score1').innerText=` SCORE - PRISONER 1: ${prisoner1score}`;
  document.getElementById('score2').innerText=` SCORE - PRISONER 2: ${prisoner2score}`;


}
function reset(){
  prisoner1score=0;
  prisoner2score=0;
document.getElementById('score1').innerText=` SCORE - PRISONER 1: ${prisoner1score}`;
document.getElementById('score2').innerText=` SCORE - PRISONER 2: ${prisoner2score}`;
}