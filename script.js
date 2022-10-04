const board = [
  null,
  1,
  null,
  2,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  3,
  null,
  4,
  null
]

//Gloabl Variables
let spaces = document.querySelectorAll('td')
let blackPieces = document.querySelectorAll('.blackPiece')
let redPieces = document.querySelectorAll('.redPiece')
let currentPlayer = 'red'
let scoreRed = 0
let scoreBlack = 0

//Console Tests
console.log(spaces)
console.log(blackPieces)
console.log(redPieces)

//Piece properties
let playPiece = {
  pieceID: -1,
  boardSpace: -1,
  moveThird: false,
  moveFifth: false,
  moveNegThird: false,
  moveNegFifth: false
}

let resetPiece = () => {
  playPiece.pieceID = -1
  playPiece.boardSpace = -1
  playPiece.moveThird = false
  playPiece.moveFifth = false
  playPiece.moveNegThird = false
  playPiece.moveNegFifth = false
}

//Switches players
const playerSwitch = () => {
  if (currentPlayer === 'red') {
    //disable cursor on black tiles
    //remove red piece movement -> future: except for movable
    currentPlayer = 'black'
    console.log('black')
    document.getElementsByTagName('p').style.pointerEvents = 'none'
    document.getElementsByTagName('td').style.pointerEvents = 'none'
    document.getElementsByTagName('p').style.cursor = 'auto'
    // movePiece(blackPieces)
  } else {
    //disable cursor on black tiles
    //remove black piece movement -> future: except for movable
    currentPlayer = 'red'
    console.log('red')
    document.getElementsByTagName('div').style.pointerEvents = 'none'
    document.getElementsByTagName('td').style.pointerEvents = 'none'
    document.getElementsByTagName('div').style.cursor = 'auto'
    // movePiece(redPieces)
  }
}

//Add events listeners to pieces
const addClicks = () => {
  if (currentPlayer === 'red') {
    for (let i = 0; i < redPieces.length; i++) {
      redPieces[i].addEventListener('click', findPiece)
    }
  } else {
    for (let i = 0; i < redPieces.length; i++) {
      redPieces[i].addEventListener('click', findPiece)
    }
  }
  removeBoardClicks()
  resetPiece()
  findPiece()
}

const removeBoardClicks = () => {
  for (let i = 0; i < spaces.length; i++) {
    spaces[i].removeAttribute('onclick')
  }
}

const removePieceClicks = () => {
  if (currentPlayer === 'red') {
    for (let i = 0; i < redPieces.length; i++) {
      redPieces[i].removeEventListener('click', findPiece)
    }
  } else {
    for (let i = 0; i < redPieces.length; i++) {
      redPieces[i].removeEventListener('click', findPiece)
    }
  }
}

const getPiece = () => {
  playPiece.pieceID = parseInt(event.target.id)
  playPiece.boardSpace = findPiece(playPiece.pieceID)
  getSpaces()
}

const findPiece = () => {
  let num = parseInt(playPiece.pieceID)
  return board.indexOf(num)
}

const getSpaces = () => {
  if (
    board[playPiece.boardSpace + 3] === null &&
    spaces[playPiece.boardSpace + 3].classList.contains('emptySpace') !== true
  ) {
    playPiece.moveThird = true
  }
  if (
    board[playPiece.boardSpace + 5] === null &&
    spaces[playPiece.boardSpace + 5].classList.contains('emptySpace') !== true
  ) {
    playPiece.moveFifth = true
  }
}

//Move piece method (renaming innerHTML instead of appendChild method)
const movePiece = (spaceToMove) => {
  document.getElementById(playPiece.pieceID).remove()
  spaces[playPiece.boardSpace].innerHTML = ''
  if (currentPlayer === 'red') {
    spaces[
      playPiece.boardSpace + spaceToMove
    ].innerHTML = `<div class='redPiece' id='${playPiece.pieceID}'></div>`
    redPieces = document.querySelectorAll('.redPiece')
  } else {
    spaces[
      playPiece.boardSpace + spaceToMove
    ].innerHTML = `<div class='blackPiece' id='${playPiece.pieceID}'></div>`
    blackPieces = document.querySelectorAll('.blackPiece')
  }
  resetPiece()
  removeBoardClicks()
  removePieceClicks()
}

const clickSpace = () => {
  if (playPiece.moveThird) {
    spaces[playPiece.boardSpace + 3].setAttribute('onclick', 'makeMove(3)')
  }
  if (playPiece.moveFifth) {
    spaces[playPiece.boardSpace + 5].setAttribute('onclick', 'makeMove(5)')
  }
  if (playPiece.moveNegThird) {
    spaces[playPiece.boardSpace - 3].setAttribute('onclick', 'makeMove(-3)')
  }
  if (playPiece.moveNegFifth) {
    spaces[playPiece.boardSpace - 5].setAttribute('onclick', 'makeMove(-5)')
  }
}

const playGame = () => {
  addClicks()
}

playGame()
