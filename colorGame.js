let numSquares = 6;
let colors = [];
let pickedColor;

let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector('#colorDisplay'); 
let messageDislay = document.querySelector("#message");
let h1Background = document.querySelector('h1');
let resetButton = document.querySelector('#reset');
let easyBtn = document.querySelector('#easyBtn');
let hardBtn = document.querySelector('#hardBtn');
let modeButtons = document.querySelectorAll('.mode');

init();

function init() {
	// setup mode buttons event listeners
	setupModeButtons();
	// setup square event listeners
	setupSquares();
	// reset errthang
	reset();
}

function setupModeButtons() {
	for (let i=0; i<modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', function() {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			this.classList.add('selected');
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}


function setupSquares() {
	for (let i=0; i<squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener("click", function() {
			let clickedColor = this.style.backgroundColor;

			if (clickedColor === pickedColor) {
				messageDislay.textContent = "Correct!";
				resetButton.textContent = "Play again?";
				changeColors(clickedColor);
				h1Background.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDislay.textContent = "Try Again!";
			}
		});
	}
}



function reset() {
	// generate all new colors
	colors = generateRandomColors(numSquares);
	// pick a new random color from arr
	pickedColor = pickColor();
	//change color display to match picked color
	colorDisplay.textContent = pickedColor;
	// change the colors of the squares on the page
	for (i=0; i<squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	// reset h1 background color to match picked color
	h1Background.style.backgroundColor = "steelblue";
	// reset Try Again/Correct text
	messageDislay.textContent = "";
	resetButton.textContent = "New Colors";
}

resetButton.addEventListener('click', function() {
	reset();
});


function changeColors(color) {
	//loop through squares
	for (let i=0; i<squares.length; i++) {
	//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	let random = Math.floor(Math.random()*colors.length); 
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	let arr = [];
	// repeat num times
	for (let i=0; i<num; i++) {
	// get random color and push it to array
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor() {
	//pick a red from 0-255
	let r = Math.floor(Math.random() * 256);
	//pick a green from 0-255
	let g = Math.floor(Math.random() * 256);
	//pick a blue from 0-255
	let b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}