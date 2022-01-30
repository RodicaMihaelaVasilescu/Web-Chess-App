const lines = 8;
const columns = 8;

const whiteSquare = "whiteSquare";
const blackSquare = "blackSquare";
const availableSquare = "available_square";

var isWhiteTurn = true;
var selectedPieceId;

function load() {
  initializeBoard();
}

function initializeBoard() {
  placeSquares();
  placePieces();
}

function placeSquares() {
  var table = document.getElementById("chessBoard");
  var rowCount = table.rows.length;

  for (let i = 1; i <= lines; i++) {
    var row = table.insertRow(rowCount);
    for (let j = 1; j <= columns; j++) {
      row.insertCell(j - 1).innerHTML = `<button type="button" class="${
        (i + j) % 2 === 0 ? whiteSquare : blackSquare
      }" id="${i}${j}" onClick="onClickEvent(id)"/>`;
    }
  }
}

function placePieces() {
  for (let i = 1; i <= columns; i++) {
    setPieceById(`2${i}`, "white_pawn");
    setPieceById(`7${i}`, "black_pawn");
  }

  setPieceById("11", "white_rook");
  setPieceById("12", "white_knight");
  setPieceById("13", "white_bishop");
  setPieceById("14", "white_king");
  setPieceById("15", "white_queen");
  setPieceById("16", "white_bishop");
  setPieceById("17", "white_knight");
  setPieceById("18", "white_rook");

  setPieceById("81", "black_rook");
  setPieceById("82", "black_knight");
  setPieceById("83", "black_bishop");
  setPieceById("84", "black_king");
  setPieceById("85", "black_queen");
  setPieceById("86", "black_bishop");
  setPieceById("87", "black_knight");
  setPieceById("88", "black_rook");
}

function setPieceById(id, value) {
  document.getElementById(
    id
  ).innerHTML = `<img type="img" id="chessPiece" class="${value}" draggable="true" ondragstart="drag(${id})" src="Resources/${value}.png"/>`;
}

function setAvailableSquare(id, value) {
  availableSquares.push(document.getElementById(id));
  var isWhiteSquare = document.getElementById(id).className === whiteSquare;
  document.getElementById(
    id
  ).innerHTML = `<img type="img" id="chessPiece" onmouseover="highlightSquare(${id})" onmouseout="removeHighlightSquare(${id})" ondrop="drop(event,${id})" ondragover="allowDrop(event,${id})" class="available_square" src="Resources/available_${
    isWhiteSquare ? "white_square" : "black_square"
  }.png"/>`;
}

function movePiece(id, selectedPieceId) {
  clearAvailableSquares();
  setPieceById(
    id,
    document.getElementById(selectedPieceId).firstChild.className
  );
  document.getElementById(selectedPieceId).innerHTML = null;
  isWhiteTurn = !isWhiteTurn;
}

function highlightSquare(id) {
  if (document.getElementById(id).className === blackSquare) {
    document.getElementById(id).setAttribute("style", "Background:#686c44"); // highlight black square
  } else if (document.getElementById(id).className === "whiteSquare") {
    document.getElementById(id).setAttribute("style", "Background:#829769"); // highlight white square
  }
}

function removeHighlightSquare(id) {
  if (document.getElementById(id).className === blackSquare) {
    document.getElementById(id).setAttribute("style", "Background:#b58863"); // black square
  } else if (document.getElementById(id).className === "whiteSquare") {
    document.getElementById(id).setAttribute("style", "Background:#f0d9b5"); // white square
  }
}

function removeHighlightAvailableSquares() {
  availableSquares.forEach((element) => {
    if (element.className == whiteSquare)
      element.setAttribute("style", "Background:#f0d9b5");
    else element.setAttribute("style", "Background:#b58863");
  });
}

function clearAvailableSquares() {
  if (availableSquares === null) {
    return;
  }
  availableSquares.forEach((element) => {
    element.innerHTML = null;
  });

  availableSquares = [];

  for (var element of document.getElementsByClassName(blackSquare)) {
    element.setAttribute("style", "Background:#b58863");
  }

  for (var element of document.getElementsByClassName(whiteSquare)) {
    element.setAttribute("style", "Background:#f0d9b5");
  }
}

var availableSquares = [];

function onClickEvent(id) {
  // if selected square doesn't have a chess piece
  if (document.getElementById(id).firstChild === null) {
    clearAvailableSquares();
    return;
  }

  // if selected square is an available move
  if (document.getElementById(id).firstChild.className === availableSquare) {
    movePiece(id, selectedPieceId);
    return;
  } else {
    clearAvailableSquares();
  }

  getAvailableMoves(id);
}

var knightLin = [2, -2, 2, -2, 1, -1, 1, -1];
var knightCol = [1, 1, -1, -1, 2, 2, -2, -2];

var kinglin = [0, 0, 1, 1, 1, -1, -1, -1];
var kingCol = [1, -1, 0, 1, -1, 0, 1, -1];

function getAvailableMoves(id) {
  availableSquares = [];
  if (
    document.getElementById(id) != null &&
    document.getElementById(id).firstChild === null
  ) {
    return;
  }

  var chessPieceType = document.getElementById(id).firstChild.className;

  var line = parseInt(id / 10);
  var column = parseInt(id % 10);

  if (chessPieceType === "white_pawn" && isWhiteTurn) {
    highlightSquare(id);
    if (
      document.getElementById(String(parseInt(id) + 10)).firstChild === null
    ) {
      setAvailableSquare(String(parseInt(id) + 10));
    } else {
      return;
    }
    if (
      document.getElementById(String(parseInt(id) + 20)).firstChild === null &&
      parseInt(id / 10) === 2
    ) {
      setAvailableSquare(String(parseInt(id) + 20));
    }
    selectedPieceId = id;
  }
  if (chessPieceType === "black_pawn" && !isWhiteTurn) {
    highlightSquare(id);
    if (
      document.getElementById(String(parseInt(id) - 10)).firstChild === null
    ) {
      setAvailableSquare(String(parseInt(id) - 10));
    } else {
      return;
    }
    if (
      document.getElementById(String(parseInt(id) - 20)).firstChild === null &&
      parseInt(id / 10) === 7
    ) {
      setAvailableSquare(String(parseInt(id) - 20));
    }
    selectedPieceId = id;
  }
  if (
    (chessPieceType === "white_knight" && isWhiteTurn) ||
    (chessPieceType === "black_knight" && !isWhiteTurn)
  ) {
    for (let i = 0; i < knightLin.length; i++) {
      var nextLine = line + knightLin[i];
      var nextCol = column + knightCol[i];
      var nextId = String(nextLine) + String(nextCol);
      if (
        document.getElementById(nextId) !== null &&
        document.getElementById(nextId).firstChild === null
      ) {
        setAvailableSquare(nextId);
      }
    }
    selectedPieceId = id;
  }

  if (
    (chessPieceType === "white_king" && isWhiteTurn) ||
    (chessPieceType === "black_king" && !isWhiteTurn)
  ) {
    for (let i = 0; i < kinglin.length; i++) {
      var nextLine = line + kinglin[i];
      var nextCol = column + kingCol[i];
      var nextId = String(nextLine) + String(nextCol);
      if (
        nextLine > 0 &&
        nextLine <= lines &&
        nextCol > 0 &&
        nextCol <= columns
      ) {
        if (
          document.getElementById(nextId) !== null &&
          document.getElementById(nextId).firstChild === null
        ) {
          setAvailableSquare(nextId);
        }
      }
    }
    selectedPieceId = id;
  }

  if (
    (chessPieceType === "white_rook" && isWhiteTurn) ||
    (chessPieceType === "black_rook" && !isWhiteTurn)
  ) {
    diagonalAndLinearMove(0, 1, id);
    diagonalAndLinearMove(0, -1, id);
    diagonalAndLinearMove(-1, 0, id);
    diagonalAndLinearMove(1, 0, id);
    selectedPieceId = id;
  }

  if (
    (chessPieceType === "white_bishop" && isWhiteTurn) ||
    (chessPieceType === "black_bishop" && !isWhiteTurn)
  ) {
    diagonalAndLinearMove(1, 1, id);
    diagonalAndLinearMove(1, -1, id);
    diagonalAndLinearMove(-1, -1, id);
    diagonalAndLinearMove(-1, 1, id);
    selectedPieceId = id;
  }

  if (
    (chessPieceType === "white_queen" && isWhiteTurn) ||
    (chessPieceType === "black_queen" && !isWhiteTurn)
  ) {
    diagonalAndLinearMove(0, 1, id);
    diagonalAndLinearMove(0, -1, id);
    diagonalAndLinearMove(-1, 0, id);
    diagonalAndLinearMove(1, 0, id);
    diagonalAndLinearMove(1, 1, id);
    diagonalAndLinearMove(1, -1, id);
    diagonalAndLinearMove(-1, -1, id);
    diagonalAndLinearMove(-1, 1, id);
    selectedPieceId = id;
  }
}

function allowDrop(ev, id) {
  ev.preventDefault();
  removeHighlightAvailableSquares();
  highlightSquare(id);
}

function drag(id) {
  clearAvailableSquares();
  getAvailableMoves(id);
}

function drop(ev, id) {
  ev.preventDefault();
  movePiece(id, selectedPieceId);
}

function diagonalAndLinearMove(offsetX, offsetY, chessPieceId) {
  var moves = [];

  var line = parseInt(chessPieceId / 10);
  var column = parseInt(chessPieceId % 10);

  for (let k = 1; k <= 8; k++) {
    var newLine = line + offsetX * k;
    var newColumn = column - offsetY * k;
    if (
      !(
        newLine > 0 &&
        newLine <= lines &&
        newColumn > 0 &&
        newColumn <= columns
      )
    ) {
      continue;
    }
    var nextId = String(newLine) + String(newColumn);
    if (
      document.getElementById(nextId) !== null &&
      document.getElementById(nextId).firstChild !== null
    ) {
      var chessPieceType = String(
        document.getElementById(nextId).firstChild.className
      );
      if (chessPieceType.includes("black") && isWhiteTurn) {
        availableSquares.push(document.getElementById(nextId));
        highlightSquare(nextId);
        document
          .getElementById(nextId)
          .firstChild.setAttribute("class", `${availableSquare}`);
        document
          .getElementById(nextId)
          .firstChild.setAttribute(
            "style",
            `background-color:${
              (newLine + newColumn) % 2 === 0 ? "#f0d9b5" : "#b58863"
            }; border-radius:50%; border-brush:green;`
          );
      }
      return;
    }
    setAvailableSquare(nextId);
  }

  return moves;
}
