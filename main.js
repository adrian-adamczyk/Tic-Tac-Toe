let player = 0;
let movements = 0;
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let soundToggle = true;

window.addEventListener("load", game, false);
let squares;
let element;
let symbol;
let restartButton;
let volumeBar;
let volumeBarImg;
let infoElement;
let winImg;
let winnerInfo;
let crossPoints = 0,
  circlePoints = 0;
let crossPointsCounter, circlePointsCounter;
let scoreBoardPlayer;

let clickSound = new Audio("./sounds/click.mp3");

function game() {
  squares = document.querySelectorAll(".square");
  restartButton = document.querySelector(".restartButton");
  volumeBar = document.querySelector(".volumeBar");
  volumeBarSound = document.querySelector("#volumeBarSound");
  volumeBarMuted = document.querySelector("#volumeBarMuted");
  crossPointsCounter = document.querySelector(".crossPoints");
  circlePointsCounter = document.querySelector(".circlePoints");
  scoreBoardPlayer = document.querySelector(".circle.player");
  crossOrCircle();
  restartButton.addEventListener("click", restartGame, false);
  volumeBar.addEventListener("click", volume, false);
  squares.forEach((square) => {
    square.addEventListener("click", () => click(square), false);
  });
}

function click(square) {
  if (!square.querySelector(".symbol")) {
    symbol = crossOrCircle();
    addToTable(square);
    square.append(symbol);
    if (soundToggle) clickSound.play();
    if (movements == 9)
      setTimeout(() => {
        clearBoard();
      }, 1000);
    if (movements > 4) {
      winner = checkWin();
      console.log(winner);
      if (winner > 0) {
        updatePoints(winner);
        winner == 1 ? (winner = "O") : (winner = "X");
        console.log("%cWins " + winner, "color: #0f0;");
        document.body.append(winInfo());
        setTimeout(() => {
          clearBoard();
        }, 2000);
      }
    }
  }
}

function crossOrCircle() {
  element = document.createElement("img");
  if (player == 1) {
    element.src = "./icons/cross.png";
    element.alt = "Cross";
    element.className = "cross symbol";
    player = 2;
    if (scoreBoardPlayer.classList.contains("playing"))
      scoreBoardPlayer.classList.remove("playing");
    scoreBoardPlayer = document.querySelector(".circle.player");
    scoreBoardPlayer.classList.add("playing");
  } else {
    element.src = "./icons/circle.png";
    element.alt = "Circle";
    element.className = "circle symbol";
    player = 1;
    if (scoreBoardPlayer.classList.contains("playing"))
      scoreBoardPlayer.classList.remove("playing");
    scoreBoardPlayer = document.querySelector(".cross.player");
    scoreBoardPlayer.classList.add("playing");
  }
  return element;
}

function addToTable(square) {
  board[square.className.charAt(square.className.length - 1)] = player;
  movements++;
  showBoard();
  console.log("");
}

function checkWin() {
  console.log("Checking!");
  for (let index = 0; index <= 6; index += 3) {
    if (
      board[index] == board[index + 1] &&
      board[index + 1] == board[index + 2] &&
      board[index] > 0
    )
      return board[index];
  }

  for (let index = 0; index <= 2; index++) {
    if (
      board[index] == board[index + 3] &&
      board[index + 3] == board[index + 6] &&
      board[index] > 0
    ) {
      console.log(index, index + 3, index + 6);
      console.log(board[index], board[index + 3], board[index + 6]);
      return board[index];
    }
  }

  if (board[0] == board[4] && board[4] == board[8] && board[0] > 0)
    return board[0];
  if (board[2] == board[4] && board[4] == board[6] && board[2] > 0)
    return board[2];
}

function winInfo() {
  infoElement = document.createElement("div");
  infoElement.className = "winInfo";

  winImg = document.createElement("img");
  winImg.src = "./icons/win.png";
  winImg.className = "medal";

  infoElement.append(element.cloneNode(true));
  infoElement.append(winImg);

  return infoElement;
}

function restartGame() {
  clearBoard();
  crossPoints = 0;
  circlePoints = 0;
  crossPointsCounter.innerHTML = 0;
  circlePointsCounter.innerHTML = 0;
  console.log("%cReset!", "color: #0ff");
}

function volume() {
  if (soundToggle) {
    soundToggle = false;
    volumeBarSound.style.display = "none";
    volumeBarMuted.style.display = "unset";
  } else {
    soundToggle = true;
    volumeBarSound.style.display = "unset";
    volumeBarMuted.style.display = "none";
  }
}

function clearBoard() {
  board.forEach((element, index, array) => {
    array[index] = 0;
  });
  squares.forEach((element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  });
  movements = 0;
  infoElement.remove();
}

function updatePoints(winner) {
  if (winner == 1) {
    circlePoints += 1;
    circlePointsCounter.innerHTML = circlePoints;
  }
  if (winner == 2) {
    crossPoints += 1;
    crossPointsCounter.innerHTML = crossPoints;
  }
}

function showBoard() {
  for (let i = 0; i < board.length; i += 3) {
    console.log(board[i], board[i + 1], board[i + 2]);
  }
}
