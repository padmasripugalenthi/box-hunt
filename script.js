console.log("from script file");
const grid = document.getElementById("grid");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const timeInput = document.getElementById("timeInput");
const table = document.getElementById("resultTable");

let interval;
let startTime;
let lastClickTime;
let clickCount = 0;
let running = false;
let currentCell = null;

function createGrid() {
  grid.innerHTML = "";
	for(let i =0; i < 49; i++) {
      let div = document.createElement('div');
      div.classList.add("cell");
      grid.appendChild(div);
 	}
}

createGrid();

const cells = document.querySelectorAll(".cell");

// let currentIndex = -1;

function placeRed() {
	cells.forEach(cell => cell.innerHTML = "");
  	let index;
  
//   	do {
      index = Math.floor(Math.random() * 49);
//     } while(index === currentIndex);
  
//   	currentIndex = index;
  
  	let red = document.createElement("div");
  	red.classList.add("red");
  
  	cells[index].appendChild(red);
  	currentCell = cells[index];
  
  	red.onclick = clickRed;
}

function clickRed() {
	let now = Date.now();
  
  	let reaction;
  	
  	if(clickCount === 0) {
    	reaction = (now - startTime) /1000;
    } else {
    	reaction = (now - lastClickTime) / 1000;
    }
  	
  	clickCount++;
  
  	let row = document.createElement("tr");
  	row.innerHTML = `<td>${clickCount}</td><td>${reaction.toFixed(2)}</td>`;
  
  	table.appendChild(row);
  	lastClickTime = now;
//   	currentCell.innerHTML = "";  
  	
  	placeRed();
	clearInterval(interval);
// 	let seconds = parseInt(timeInput.value) * 1000;

//     interval = setInterval(()=> {
//           placeRed();
//         }, seconds);
//     }
  running = false;
  startGame();
  
}

function startGame(){
	if(running) return;
    console.log('start');

  	running = true;
  	
  	let seconds = parseInt(timeInput.value) * 1000;
  
  	startTime = Date.now();
  	lastClickTime = startTime;
  
  	placeRed();
  
  	interval = setInterval(()=> {
      placeRed();
    }, seconds);
}

function pauseGame() {
  	console.log('pause clicked');
	running = false;
  	clearInterval(interval);
  	cells.forEach(cell => cell.innerHTML = "");
}

function resetGame() {
  	console.log('reset clicked');
	running = false;
  	clearInterval(interval);
  	cells.forEach(cell => cell.innerHTML = "");
  	table.innerHTML = "";
  	clickCount = 0;
  	timeInput.value = "";
}

// startBtn.addEventListener("click", startGame);
// pauseBtn.addEventListener("click", pauseGame);
// resetBtn.addEventListener("click", resetGame);

startBtn.onclick = startGame;
pauseBtn.onclick = pauseGame;
resetBtn.onclick = resetGame;



























