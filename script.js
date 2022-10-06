const board = [
  null,
  1,
  null,
  2,
  null,
  3,
  4,
  null,
  5,
  null,
  6,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  7,
  null,
  8,
  null,
  9,
  10,
  null,
  11,
  null,
  12,
  null
]

//Gloabl Variables
let modeChange = document.querySelector('button') //dark mode button

let tds = document.querySelectorAll('td')
let spaces = Array.from(tds)

let black = document.querySelectorAll('.blackPiece')
let blackPieces = Array.from(black)
let red = document.querySelectorAll('.redPiece')
let redPieces = Array.from(red)

let currentPlayer = 'black'
let scoreRed = 0
let scoreBlack = 0
let teamPieces

document.querySelector('h1').innerHTML = `${currentPlayer} begins!`

let playPiece = {
  pieceID: -1,
  boardSpace: -1,
  moveOne: false,
  moveNegativeOne: false,
  moveTwo: false,
  moveNegativeTwo: false,
  jumpOne: false,
  jumpNegativeOne: false,
  jumpTwo: false,
  jumpNegativeTwo: false
}

let resetPiece = () => {
  playPiece.pieceID = -1
  playPiece.boardSpace = -1
  playPiece.moveOne = false
  playPiece.moveNegativeOne = false
  playPiece.moveTwo = false
  playPiece.moveNegativeTwo = false
  playPiece.jumpOne = false
  playPiece.jumpNegativeOne = false
  playPiece.jumpTwo = false
  playPiece.jumpNegativeTwo = false
}

const playerSwitch = () => {
  if (currentPlayer === 'red') {
    currentPlayer = 'black'
    document.querySelector('h1').innerHTML = `black's turn`
  } else {
    currentPlayer = 'red'
    document.querySelector('h1').innerHTML = `red's turn`
  }
  startClicks()
}

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
    board[playPiece.boardSpace + 5] === null &&
    spaces[playPiece.boardSpace + 5].classList.contains('emptySpace') !== true
  ) {
    playPiece.moveOne = true
  }
  if (
    board[playPiece.boardSpace - 5] === null &&
    spaces[playPiece.boardSpace - 5].classList.contains('emptySpace') !== true
  ) {
    playPiece.moveNegativeOne = true
  }
  if (
    board[playPiece.boardSpace + 7] === null &&
    spaces[playPiece.boardSpace + 7].classList.contains('emptySpace') !== true
  ) {
    playPiece.moveTwo = true
  }
  if (
    board[playPiece.boardSpace - 7] === null &&
    spaces[playPiece.boardSpace - 7].classList.contains('emptySpace') !== true
  ) {
    playPiece.moveNegativeTwo = true
  }
  //Jump Check
  if (
    board[playPiece.boardSpace + 10] === null &&
    spaces[playPiece.boardSpace + 10].classList.contains('emptySpace') !== true
  ) {
    playPiece.jumpOne = true
  }
  if (
    board[playPiece.boardSpace - 10] === null &&
    spaces[playPiece.boardSpace - 10].classList.contains('emptySpace') !== true
  ) {
    playPiece.jumpNegativeOne = true
  }
  if (
    board[playPiece.boardSpace + 14] === null &&
    spaces[playPiece.boardSpace + 14].classList.contains('emptySpace') !== true
  ) {
    playPiece.jumpTwo = true
  }
  if (
    board[playPiece.boardSpace - 14] === null &&
    spaces[playPiece.boardSpace - 14].classList.contains('emptySpace') !== true
  ) {
    playPiece.jumpNegativeTwo = true
  }

  clickSpace()
}

const clickSpace = () => {
  if (playPiece.moveOne) {
    spaces[playPiece.boardSpace + 5].setAttribute('onclick', 'movePiece(5)')
  }
  if (playPiece.moveNegativeOne) {
    spaces[playPiece.boardSpace - 5].setAttribute('onclick', 'movePiece(-5)')
  }
  if (playPiece.moveTwo) {
    spaces[playPiece.boardSpace + 7].setAttribute('onclick', 'movePiece(7)')
  }
  if (playPiece.moveNegativeTwo) {
    spaces[playPiece.boardSpace - 7].setAttribute('onclick', 'movePiece(-7)')
  }
  if (playPiece.jumpOne) {
    spaces[playPiece.boardSpace + 10].setAttribute('onclick', 'movePiece(10)')
  }
  if (playPiece.jumpNegativeOne) {
    spaces[playPiece.boardSpace - 10].setAttribute('onclick', 'movePiece(-10)')
  }
  if (playPiece.jumpTwo) {
    spaces[playPiece.boardSpace + 14].setAttribute('onclick', 'movePiece(14)')
  }
  if (playPiece.jumpNegativeTwo) {
    spaces[playPiece.boardSpace - 14].setAttribute('onclick', 'movePiece(-14)')
  }
}

//Move piece method (renaming innerHTML instead of appendChild method)
const movePiece = (spacesToMove) => {
  document.getElementById(playPiece.pieceID).remove()
  spaces[playPiece.boardSpace].innerHTML = ''
  console.log(spaces)
  if (currentPlayer === 'red') {
    spaces[
      playPiece.boardSpace + spacesToMove
    ].innerHTML = `<div class='redPiece' id="${playPiece.pieceID}"></div>`
    redPieces = document.querySelectorAll('.redPiece')
    //remove jumped black piece
    if (spacesToMove >= 10 || spacesToMove <= -10) {
      board[playPiece.boardSpace + spacesToMove / 2] = null
      spaces[playPiece.boardSpace + spacesToMove / 2].innerHTML = ''
      scoreRed++
      console.log(scoreRed)
    }
  } else {
    spaces[
      playPiece.boardSpace + spacesToMove
    ].innerHTML = `<div class='blackPiece' id="${playPiece.pieceID}"></div>`
    blackPieces = document.querySelectorAll('.blackPiece')
    //remove jumped red pieces
    if (spacesToMove >= 10 || spacesToMove <= -10) {
      board[playPiece.boardSpace + spacesToMove / 2] = null
      spaces[playPiece.boardSpace + spacesToMove / 2].innerHTML = ''
      scoreBlack++
      console.log(scoreBlack)
    }
  }

  board[playPiece.boardSpace] = null
  board[playPiece.boardSpace + spacesToMove] = parseInt(playPiece.pieceID)
  resetPiece()
  removeBoardClicks()
  removePieceClicks()
  isWin()
}

const isWin = () => {
  if (scoreRed === 6) {
    console.log('red wins')
    document.querySelector('h1').innerHTML = 'Red wins!'
  }
  if (scoreBlack === 6) {
    console.log('black wins')
    document.querySelector('h1').innerHTML = 'Black wins!'
  }
}

startClicks()
