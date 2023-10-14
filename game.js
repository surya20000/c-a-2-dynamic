document.addEventListener("DOMContentLoaded", function () {
  const numOfRows = 3;
  const numOfCols = 3;
  let currentBlock;
  let otherBlock;
  let moves = 0;
  var imgOrder = ["./kalvium-spliced-img/1.jpg",
         "./kalvium-spliced-img/2.jpg",
         "./kalvium-spliced-img/3.jpg",
         "./kalvium-spliced-img/4.jpg",
         "./kalvium-spliced-img/5.jpg",
         "./kalvium-spliced-img/6.jpg",
         "./kalvium-spliced-img/7.jpg",
         "./kalvium-spliced-img/8.jpg",
         "./kalvium-spliced-img/9.jpg"]
        ;

  const nextGameButton = document.getElementById("nextgame");

  if (nextGameButton) {
      nextGameButton.addEventListener("click", function () {
          location.href = "game2.html";
      });
  }

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(imgOrder);

function initializeGame() {
  for (let r = 0; r < numOfRows; r++) {
    for (let c = 0; c < numOfCols; c++) {
      const tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      const imgNumber = imgOrder.pop();
      tile.src = "FEWD-c.a-2/" + imgNumber + ".jpg";
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
      moves += 1;
      document.getElementById("moves").innerText = moves;
      localStorage.setItem("moves", moves);
      checkForWin();
    }
  }

  function startTimer() {
    const timer = document.getElementById("timer");
    let time = 15;
    let timerId = setInterval(() => {
      time--;
      timer.innerHTML = time;
      if (time === 0) {
        clearInterval(timerId);
        window.location.href = "./game2.html?moves=" + moves;
      }
    }, 1000);
  }
  
  function checkForWin() {
    const currentTileOrder = [];
    for (let r = 0; r < numOfRows; r++) {
      for (let c = 0; c < numOfCols; c++) {
        const tile = document.getElementById(r + "-" + c);
        console.log(tile.src)
        currentTileOrder.push(tile.src);
      }
    }
    // for(let ele of currentTileOrder){
    //   console.log(ele);
    // }
  console.log(JSON.stringify(currentTileOrder))

    const winTileOrder = [
    "http://127.0.0.1:5500/FEWD-c.a-2/9.jpg",
    "http://127.0.0.1:5500/FEWD-c.a-2/3.jpg",
    "http://127.0.0.1:5500/FEWD-c.a-2/7.jpg",
    "http://127.0.0.1:5500/FEWD-c.a-2/2.jpg",
    "http://127.0.0.1:5500/FEWD-c.a-2/5.jpg",
    "http://127.0.0.1:5500/FEWD-c.a-2/8.jpg",
    "http://127.0.0.1:5500/FEWD-c.a-2/1.jpg",
    "http://127.0.0.1:5500/FEWD-c.a-2/4.jpg",
    "http://127.0.0.1:5500/FEWD-c.a-2/6.jpg"];
    if (JSON.stringify(currentTileOrder) === JSON.stringify(winTileOrder)) {
      console.log("You won the game ");
      location.href = "game2.html?moves=" + moves;
    } else {
      console.log("Puzzle not yet solved");
    }
  }
  
  initializeGame();

  const storedMoves = localStorage.getItem("moves");
  if (storedMoves) {
    document.getElementById("moves").innerText = storedMoves;
  } else {
    document.getElementById("moves").innerText = "Stay Hard!!";
  }
});
