var sentence = 'Hello world';
sentence = sentence.toUpperCase();

var length = sentence.length;
var mistakes = 0;

var yes = new Audio('yes.wav');
var no = new Audio('no.wav');

var guess_sentence = '';

for (var i = 0; i < length; i++)
{
    if (sentence.charAt(i) == ' ')
    {
        guess_sentence = guess_sentence + ' ';
    }
    else
    {
        guess_sentence = guess_sentence + '-';
    }
}

function write_sentence()
{
    document.getElementById('board').innerHTML = guess_sentence;
}

document.addEventListener('DOMContentLoaded', start);

var letters = new Array(26);

for (var i = 0; i < letters.length; i++)
{
    letters[i] = String.fromCharCode(65 + i);
}

function start()
{
    var div_contents = '';
    for (var i = 0; i < 26; i++)
    {

        var element = 'letter' + i;

        div_contents = div_contents + '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + letters[i] + '</div>';
    }
    document.getElementById('alfabet').innerHTML = div_contents;
    write_sentence();
}

String.prototype.ustawZnak = function(miejsce, znak)
{
    if (miejsce > this.length - 1)
    {
        return this.toString();
    }
    else
    {
        return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
    }
};

function check(num)
{

    var trafiona = false;

    for (i = 0; i < length; i++)
    {
        if (sentence.charAt(i) == letters[num])
        {
            guess_sentence = guess_sentence.ustawZnak(i, letters[num]);
            trafiona = true;
        }
    }
    if (trafiona === true)
    {
        yes.play();
        var element = 'letter' + num;
        document.getElementById(element).style.background = '#003300';
        document.getElementById(element).style.color = '#00C000';
        document.getElementById(element).style.border = '3px solid #00C000';
        document.getElementById(element).style.cursor = 'default';
        write_sentence();
    }
    else
    {
        no.play();
        var element = 'letter' + num;
        document.getElementById(element).style.background = '#330000';
        document.getElementById(element).style.color = '#C00000';
        document.getElementById(element).style.border = '3px solid #C00000';
        document.getElementById(element).style.cursor = 'default';

        document.getElementById(element).setAttribute('onclick', ';');

        //mistake
        mistakes++;
        var image = 'img/s' + mistakes + '.jpg';
        document.getElementById('gallows').innerHTML = '<img src="' + image + '" alt="">';
    }

    //win
    if (sentence == guess_sentence)
    {
        document.getElementById('alfabet').innerHTML = 'That\'s right! Correct sentence: ' + sentence + '<br><br><span class="reset" onclick="location.reload()">AGAIN?</span>';
    }

    //lose
    if (mistakes >= 9)
    {
        document.getElementById('alfabet').innerHTML = 'You lose! Correct sentence: ' + sentence + '<br><br><span class="reset" onclick="location.reload()">AGAIN?</span>';
    }
}
