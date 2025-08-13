let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let gameContainer = document.querySelector(".game");

let player1Input = document.getElementById("player1");
let player2Input = document.getElementById("player2");
let startBtn = document.getElementById("start-btn");


startBtn.addEventListener("click", () => {
	player1 = player1Input.value;
	player2 = player2Input.value;
	currentPlayer = player1;
	enableBoxes();
});


// Setting up sound effects
const userSelect = new Audio("sounds/select.mp3");
const gameOver = new Audio("sounds/over.mp3");


// Function to Play Sound
const playSound = (soundName) => {
	switch (soundName) {
		case "userSelect":
			userSelect.currentTime = 0; // Reset playback position
			userSelect.play(); // Plays the sound
			break;
		case "gameOver":
			gameOver.currentTime = 0;
			gameOver.play();
			break;
		default:
			break;
	}
};

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw


// Different Win Patterns in array
const winPatterns = [
	[0, 1, 2],
	[0, 3, 6],
	[0, 4, 8],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[3, 4, 5],
	[6, 7, 8],
];


const lineClasses = {
	0: "row-1", // Top horizontal
	1: "col-1", // Left vertical
	2: "diagonal-principal", // Principal diagonal
	3: "col-2", // Middle vertical
	4: "col-3", // Right vertical
	5: "diagonal-secondary", // Secondary diagonal
	6: "row-2", // Middle horizontal
	7: "row-3", // Bottom horizontal
};

// function for Reset Button 
const resetGame = () => {
	msg.innerText = "Tic Tac Toe";
	if (resetBtn.classList.contains("hide")) {
		resetBtn.classList.remove("hide");
		newGameBtn.classList.add("hide");
		let lineElement = document.querySelector(".line");
		if (lineElement !== null) {
			gameContainer.removeChild(lineElement);
		}
	}
	turnO = true;
	count = 0;
	enableBoxes();
};

// ALL Boxes for click X or O 
boxes.forEach((box) => {
	box.addEventListener("click", () => {
		if (turnO) {
			//playerO
			playSound("userSelect");
			box.innerText = "O";
			turnO = false;
		} else {
			//playerX
			playSound("userSelect");
			box.innerText = "X";
			turnO = true;
		}
		box.disabled = true;
		count++;

		let isWinner = checkWinner();

		if (count === 9 && !isWinner) {
			gameDraw();
		}
	});
});


// Disable Boxes
const disableBoxes = () => {
	for (let box of boxes) {
		box.disabled = true;
	}
};


// Enable Boxes
const enableBoxes = () => {
	for (let box of boxes) {
		box.disabled = false;
		box.innerText = "";
	}
};

// Show winner function
const showWinner = (winner) => {
	let winnerName = winner === "O" ? player1 : player2;
	msg.innerText = `Congratulations, Winner is ${winnerName}`;
	disableBoxes();
};

const gameDraw = () => {
	msg.innerText = `Game was a Draw.`;
	playSound("gameOver");
	disableBoxes();
};

// Check winner function
const checkWinner = () => {
	for (let i = 0; i < winPatterns.length; i++) {
		const pattern = winPatterns[i];
		let pos1Val = boxes[pattern[0]].innerText;
		let pos2Val = boxes[pattern[1]].innerText;
		let pos3Val = boxes[pattern[2]].innerText;

		if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
			if (pos1Val === pos2Val && pos2Val === pos3Val) {
				// Show the winner message
				showWinner(pos1Val);

				// Play sound effect
				playSound("gameOver");

				// Hide reset button and show new game button
				resetBtn.classList.add("hide");
				newGameBtn.classList.remove("hide");

				// Show the winning line dynamically
				const patternClass = lineClasses[i];
				showWinningLine(patternClass);

				return true;
			}
		}
	}
	return false;
};

// showing line function
function showWinningLine(pattern) {
	const gameElement = document.querySelector(".game");
	const line = document.createElement("div");
	line.className = `line ${pattern}`; // Add the appropriate winning pattern class
	gameElement.appendChild(line);
}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


// JavaScript to handle the welcome message
document.addEventListener("DOMContentLoaded", () => {
	const modal = document.getElementById("welcomeModal");
	const greeting = document.getElementById("greeting");

	// for the Current Time
	const hours = new Date().getHours();
	if (hours < 12) {
		greeting.innerText = "Good Morning ☀️😊";
	} else if (hours < 18) {
		greeting.innerText = "Good Afternoon 🌞✨";
	} else {
		greeting.innerText = "Good Evening 🌙🌟";
	}

	// Show the modal
	modal.classList.add("active");

	// Hide the modal after 5 seconds
	setTimeout(() => {
		modal.classList.remove("active");
	}, 5000);
});