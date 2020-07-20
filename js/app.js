let qwerty = document.querySelector('#qwerty');
let keyboardBtn = document.querySelectorAll('#qwerty button');
let phraseContainer = document.querySelector('#phrase');
let phraseUL = document.querySelector('#phrase ul');
let startBtn = document.querySelector('.btn__reset');
let overlay = document.querySelector('#overlay');

let missed = 0;

const phrases = [
	'AS COOL AS A CUCUMBER',
	'BLESSING IN DISGUISE',
	'BREAK A LEG',
	'EASY DOES IT',
	'CALL IT A DAY',
	'GOOD TIMES',
	'UNDER THE WEATHER',
	'SO FAR SO GOOD',
	'ON THE BALL'
];

// /**********
//   Functions
// ***********/

function getRandomPhraseAsArray(array) {
	let splitArray = array[Math.floor(Math.random() * array.length)];
	return splitArray.split('');
}
let phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(array) {
	for (let i = 0; i < array.length; i++) {
		let li = document.createElement('li');
		li.textContent = array[i];
		if (array[i] !== ' ') {
			li.className = 'letter';
		}
		else {
			li.className = 'space';
		}
		phraseUL.append(li);
	}
}
addPhraseToDisplay(phraseArray);

function checkLetter(button) {
	let letter = document.querySelectorAll('.letter');
	let matchFound = null;

	for (let i = 0; i < letter.length; i++) {
		let li = letter[i];
		if (button.textContent.toUpperCase() === li.textContent.toUpperCase()) {
			li.classList.add('show');
			li.style.transition = 'all 1.6s';
			matchFound = true;
		}
	}
	return matchFound;
}

function checkWin() {
	let letter = document.querySelectorAll('.letter');
	let letterShow = document.querySelectorAll('.show');
	let h2 = document.querySelector('h2.title');

	if (letter.length === letterShow.length) {
		overlay.style.display = 'flex';
		overlay.className = 'win';
		h2.textContent = 'You win!!!';
		startBtn.textContent = 'Try Again';
	}
	else if (missed >= 5) {
		overlay.style.display = 'flex';
		overlay.className = 'lose';
		h2.textContent = 'Sorry, you lose :(';
		startBtn.textContent = 'Try Again';
	}
}

function reset() {
	// remove lose overlay
	overlay.style.display = 'none';

	// get rid of old phrase
	phraseUL.innerHTML = '';

	// random new phrase function
	let phraseArray = getRandomPhraseAsArray(phrases);

	// call display new phrase function
	addPhraseToDisplay(phraseArray);

	// reset missed to 0
	missed = 0;

	// reset keyboard keys
	for (let i = 0; i < keyboardBtn.length; i++) {
		keyboardBtn[i].classList.remove('chosen');
		keyboardBtn[i].disabled = false;
	}

	// reset hearts
	let heartsContainer = document.querySelector('ol');
	let hearts = heartsContainer.getElementsByTagName('*');
	for (let i = 0; i < hearts.length; i++) {
		hearts[i].src = 'images/liveHeart.png';
	}
}

// /**********
//   Events
// ***********/

startBtn.addEventListener('click', (event) => {
	if (startBtn.textContent === 'Start Game') {
		overlay.style.display = 'none';
	}
	else {
		reset();
	}
});

qwerty.addEventListener('click', (event) => {
	if (event.target.tagName === 'BUTTON') {
		let btn = event.target;
		btn.className = 'chosen';
		btn.disabled = 'true';

		let letterFound = checkLetter(btn);

		let heartsContainer = document.querySelector('ol');
		let liveHeart = document.querySelectorAll('.tries');
		let lostHeart = document.createElement('li');

		if (!letterFound) {
			missed++;

			//remove last heart
			heartsContainer.removeChild(liveHeart[4]);
			// insert lostHeart img into lostHeart item
			lostHeart.innerHTML = "<img src ='images/lostHeart.png' height='35px' width='30px'>";
			// add .tries class to new lostHeart item
			lostHeart.classList.add('tries');
			// insert lostHeart first, this means every removeChild liveHeart is still at index 4
			heartsContainer.insertBefore(lostHeart, liveHeart[0]);
		}
	}
	checkWin();
});
