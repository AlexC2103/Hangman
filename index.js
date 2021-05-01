
function createGame() {
  var input = document.createElement('INPUT');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'wordInput');
  input.setAttribute('class', 'wordInput');
  input.setAttribute('placeholder', 'Word...');

  var submit = document.createElement('INPUT');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('id', 'wordSubmit');
  submit.setAttribute('onclick', 'startGame()');

  var container = document.getElementById('containerForm');
  container.appendChild(input);
  container.appendChild(submit);

  document.getElementById('playButton').disabled = true;
}

var word;
var returnWord;

function startGame() {
  var input = document.getElementById('wordInput');
  var submit = document.getElementById('wordSubmit');
  word = input.value;
  input.value = '';
  input.setAttribute('placeholder', 'Game already active');
  input.disabled = true;
  submit.disabled = true;
  for (var i = 0; i < word.length; ++i) {
    if (i === 0) {
      document.getElementById('word').innerHTML += word[i];
    } else
    if (i === word.length - 1) {
      document.getElementById('word').innerHTML += word[word.length - 1];
    } else {
      document.getElementById('word').innerHTML += '_';
    }
  }

  returnWord = word;

  for (var i = 1; i < word.length - 1; ++i) {
    returnWord = returnWord.replace(returnWord[i], '_');
  }

  console.log(returnWord);
}

var mistakes = 0;

function checkLetter(id) {
  gameCheck();
  var ok = 0;
  if (word.indexOf(id) !== -1) {
    for (var i = 1; i < word.length - 1; ++i) {
      if (id === word[i]) {
        returnWord = setCharAt(returnWord, i, id);
        ok = 1;
        if (id === word[0]) {
          returnWord = setCharAt(returnWord, 0, id);
        }
      }
    }

    document.getElementById(id).style.color = '#00ff0a';
    document.getElementById(id).disabled = 'true';
  } else {
    mistakes++;
    document.getElementById(id).style.color = '#ff0000';
    document.getElementById(id).disabled = 'true';
    document.getElementById('mistakesNumber').innerHTML = 'Number of mistakes: ' + mistakes;
  }

  if (ok) {
    document.getElementById(id).style.color = '#00ff0a';
    document.getElementById(id).disabled = 'true';
  }

  document.getElementById('word').innerHTML = returnWord;
  gameCheck();
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) {
    return str;
  }

  return str.substring(0, index) + chr + str.substring(index + 1);
}

function gameCheck() {
  if (mistakes > 5) {
    document.getElementById('word').innerHTML = 'Game lost! Better luck next time.';
    document.getElementById('word').style.color = 'red';
    document.getElementById('word').style.border.color = 'black';
  } else if (mistakes < 6 && returnWord === word) {
    document.getElementById('word').innerHTML = 'Congradulations! You won!';
    document.getElementById('word').style.color = '#32cf38';
  }

  if (mistakes > 0) {
    document.getElementById('hangmanPic').src = '/hangman/hangman' + mistakes + '.png';
  }
}