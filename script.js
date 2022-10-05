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
let tds = document.querySelectorAll('td')
let spaces = Array.from(tds)

let black = document.querySelectorAll('.blackPiece')
let blackPieces = Array.from(black)
let red = document.querySelectorAll('.redPiece')
let redPieces = Array.from(red)

let currentPlayer = 'red'
let scoreRed = 0
let scoreBlack = 0
let teamPieces

//Console Tests
// console.log(spaces)
// console.log(blackPieces)
// console.log(redPieces)

//Piece properties
let playPiece = {
  pieceID: -1,
  boardSpace: -1,
  moveThird: false,
  moveFifth: false,
  moveNegThird: false,
  moveNegFifth: false,
  jumpSix: false,
  jumpNegSix: false,
  jumpTen: false,
  jumpNegTen: false
}

let resetPiece = () => {
  playPiece.pieceID = -1
  playPiece.boardSpace = -1
  playPiece.moveThird = false
  playPiece.moveFifth = false
  playPiece.moveNegThird = false
  playPiece.moveNegFifth = false
  playPiece.jumpSix = false
  playPiece.jumpNegSix = false
  playPiece.jumpTen = false
  playPiece.jumpNegTen = false
}

// Switches players
const playerSwitch = () => {
  if (currentPlayer === 'red') {
    currentPlayer = 'black'
    document.querySelector('h1').innerHTML = `Black's Turn`
    console.log('black')
  } else {
    currentPlayer = 'red'
    document.querySelector('h1').innerHTML = `Red's Turn`
    console.log('red')
  }
  startClicks()
}

//Add events listeners to pieces
const startClicks = () => {
  if (currentPlayer === 'red') {
    for (let i = 0; i < redPieces.length; i++) {
      redPieces[i].addEventListener('click', getPlayerPieces)
    }
  } else {
    for (let i = 0; i < blackPieces.length; i++) {
      blackPieces[i].addEventListener('click', getPlayerPieces)
    }
  }
}

const getPlayerPieces = () => {
  if (currentPlayer === 'red') {
    teamPieces = redPieces
  } else {
    teamPieces = blackPieces
  }
  removeBoardClicks()
  resetPiece()
  getPiece()
}

const removeBoardClicks = () => {
  for (let i = 0; i < spaces.length; i++) {
    spaces[i].removeAttribute('onclick')
  }
}

const removePieceClicks = () => {
  if (currentPlayer === 'red') {
    for (let i = 0; i < redPieces.length; i++) {
      redPieces[i].removeEventListener('click', getPlayerPieces())
    }
  } else {
    for (let i = 0; i < blackPieces.length; i++) {
      blackPieces[i].removeEventListener('click', getPlayerPieces())
    }
  }
  playerSwitch()
}

const getPiece = () => {
  playPiece.pieceID = parseInt(event.target.id)
  playPiece.boardSpace = board.indexOf(playPiece.pieceID)
  openSpaces()
}

const openSpaces = () => {
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
  if (
    board[playPiece.boardSpace - 3] === null &&
    spaces[playPiece.boardSpace - 3].classList.contains('emptySpace') !== true
  ) {
    playPiece.moveNegThird = true
  }
  if (
    board[playPiece.boardSpace - 5] === null &&
    spaces[playPiece.boardSpace - 5].classList.contains('emptySpace') !== true
  ) {
    playPiece.moveNegFifth = true
  }
  //Jump Check
  if (
    board[playPiece.boardSpace + 6] === null &&
    spaces[playPiece.boardSpace + 6].classList.contains('emptySpace') !== true
  ) {
    playPiece.jumpSix = true
  }

  clickSpace()
}

const canJump = () => {}

const clickSpace = () => {
  if (playPiece.moveThird) {
    spaces[playPiece.boardSpace + 3].setAttribute('onclick', 'movePiece(3)')
  }
  if (playPiece.moveFifth) {
    spaces[playPiece.boardSpace + 5].setAttribute('onclick', 'movePiece(5)')
  }
  if (playPiece.moveNegThird) {
    spaces[playPiece.boardSpace - 3].setAttribute('onclick', 'movePiece(-3)')
  }
  if (playPiece.moveNegFifth) {
    spaces[playPiece.boardSpace - 5].setAttribute('onclick', 'movePiece(-5)')
  }
  if (playPiece.jumpSix) {
    spaces[playPiece.boardSpace + 6].setAttribute('onclick', 'movePiece(6)')
  }
}

//Move piece method (renaming innerHTML instead of appendChild method)
const movePiece = (spaceToMove) => {
  document.getElementById(playPiece.pieceID).remove()
  // console.log(playPiece)
  spaces[playPiece.boardSpace].innerHTML = ''
  console.log(spaces)
  if (currentPlayer === 'red') {
    spaces[
      playPiece.boardSpace + spaceToMove
    ].innerHTML = `<div class='redPiece' id="${playPiece.pieceID}"></div>`
    redPieces = document.querySelectorAll('.redPiece')
  } else {
    spaces[
      playPiece.boardSpace + spaceToMove
    ].innerHTML = `<div class='blackPiece' id="${playPiece.pieceID}"></div>`
    blackPieces = document.querySelectorAll('.blackPiece')
  }
  updateBoard(playPiece.boardSpace, playPiece.boardSpace + spaceToMove)
}

//Update board array with new piece info
const updateBoard = (piecePlace, updatedSpace) => {
  board[piecePlace] = null
  board[updatedSpace] = parseInt(playPiece.pieceID)
  resetPiece()
  removeBoardClicks()
  removePieceClicks()
}

startClicks()
