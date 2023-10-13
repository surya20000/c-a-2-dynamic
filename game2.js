const numOfRows = 3;
const numOfCols = 3;
const imgOrder = ["10", "11", "12", "13", "14", "15", "16", "17", "18"];
let moves2 = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(imgOrder);

window.onload = function initializeGame() {
  for (let r = 0; r < numOfRows; r++) {
    for (let c = 0; c < numOfCols; c++) {
      const tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      const imgNumber = imgOrder.pop();
      tile.src = "FEWD-c.a-2/" + imgNumber + ".png";
      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);
      document.getElementById("box").append(tile);
    }
  }
  startTimer();


}


function dragStart() {
  currentBlock = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave(e) {}

function dragDrop() {
  otherBlock = this;
}

function dragEnd() {
  let currentCoordinates = currentBlock.id.split("-");
  let r = parseInt(currentCoordinates[0]);
  let c = parseInt(currentCoordinates[1]);

  let otherCoordinates = otherBlock.id.split("-");
  let r2 = parseInt(otherCoordinates[0]);
  let c2 = parseInt(otherCoordinates[1]);
  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;
  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;
  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
  
  if (isAdjacent) {
    console.log("j")
    let currImg = currentBlock.src;
    let otherImg = otherBlock.src;

    currentBlock.src = otherImg;
    otherBlock.src = currImg;
    moves2 += 1;
    document.getElementById("moves2").innerText = moves2;
    localStorage.setItem("moves2", moves2); 
    checkForWin();
  }
}
function startTimer() {
  const timer = document.getElementById("timer");
  let time = 20;
  let timerId = setInterval(() => {
    time--;
    timer.innerHTML = time;
    if (time === 0) {
      location.href = "./loose.html?moves2=" + moves2;
    }
  }, 1000);
}

function checkForWin() {
  const currentTileOrder2 = [];
  for (let r = 0; r < numOfRows; r++) {
    for (let c = 0; c < numOfCols; c++) {
      const tile = document.getElementById(r + "-" + c);
      currentTileOrder2.push(tile.src);
    }
  }
  
  for(let ele of currentTileOrder2){
    console.log(ele);
  }

 

  const winTileOrder2=[
    "http://127.0.0.1:5500/FEWD-c.a-2/10.png",
    "http://127.0.0.1:5500/FEWD-c.a-2/13.png",
    "http://127.0.0.1:5500/FEWD-c.a-2/16.png",
    "http://127.0.0.1:5500/FEWD-c.a-2/11.png",
    "http://127.0.0.1:5500/FEWD-c.a-2/14.png",
    "http://127.0.0.1:5500/FEWD-c.a-2/17.png",
    "http://127.0.0.1:5500/FEWD-c.a-2/12.png",
    "http://127.0.0.1:5500/FEWD-c.a-2/15.png",
    "http://127.0.0.1:5500/FEWD-c.a-2/18.png"]
  console.log(JSON.stringify(currentTileOrder2))
  console.log(JSON.stringify(winTileOrder2))


  if (JSON.stringify(currentTileOrder2) === JSON.stringify(winTileOrder2)) {
    console.log(JSON.stringify(currentTileOrder2))
    console.log("You won the game ");
    location.href = "loose.html?moves2=" + moves2;
  } else {
    console.log("Puzzle not yet solved");
  }
}
