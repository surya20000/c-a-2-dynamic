const again = document.getElementById("play-again");
again.onclick = () => {
    location.href = "game.html"
};

const home = document.getElementById("home");
home.onclick = () => {
    location.href = "index.html"
};

const moves = localStorage.getItem("moves2");
if (moves) {
  const movesBoard = document.getElementById("moves-board-2");
  movesBoard.innerText = moves;
} else {
  movesBoard.innerText = "Stay Hard!!"
}

const storedMovesBoard = localStorage.getItem("moves");
if (storedMovesBoard) {
  document.getElementById("moves-board-1").innerHTML= storedMovesBoard;
  
} else {
  document.getElementById("moves-board-1").innerHTML = "Stay Hard!!";
}