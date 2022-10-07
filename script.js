//Board data initialzation
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

//Darkmode source: https://darkmodejs.learn.uno/
const options = {
  bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff', // default: '#fff'
  buttonColorDark: '#100f2c', // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: false, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: true // default: true
}
const darkmode = new Darkmode(options)
darkmode.showWidget()

//Global Variables
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

//Initial piece properties for tracking
let playPiece = {
  pieceID: 0,
  boardSpace: 0,
  moveOne: false,
  moveNegativeOne: false,
  moveTwo: false,
  moveNegativeTwo: false,
  jumpOne: false,
  jumpNegativeOne: false,
  jumpTwo: false,
  jumpNegativeTwo: false,
  isKing: false
}

let resetPiece = () => {
  playPiece.pieceID = 0
  playPiece.boardSpace = 0
  playPiece.moveOne = false
  playPiece.moveNegativeOne = false
  playPiece.moveTwo = false
  playPiece.moveNegativeTwo = false
  playPiece.jumpOne = false
  playPiece.jumpNegativeOne = false
  playPiece.jumpTwo = false
  playPiece.jumpNegativeTwo = false
  playPiece.isKing = false
}

//Switches players
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

//Standalone event listener initialization for play pieces
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

//Sets pieces to be used
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

//Removes click listening on board spaces to reinitialize a clean click for movement
const removeBoardClicks = () => {
  for (let i = 0; i < spaces.length; i++) {
    spaces[i].removeAttribute('onclick')
  }
}

//Removes click listening on game pieces to ensure players turn can only move their own pieces
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

//Method recognizes which piece is being clicked in order to carryout movement
const getPiece = () => {
  playPiece.pieceID = parseInt(event.target.id)
  playPiece.boardSpace = board.indexOf(playPiece.pieceID)

  openSpaces()
}

//Checks open spaces for movement as to not move onto an occupied tile
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
  //Checks available spaces to jump to when a jump is available
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

//Sets the space on board to be moved to and excecutes the move method
const clickSpace = () => {
  if (playPiece.moveNegativeOne) {
    spaces[playPiece.boardSpace - 5].setAttribute('onclick', 'movePiece(-5)')
  }
  if (playPiece.moveNegativeTwo) {
    spaces[playPiece.boardSpace - 7].setAttribute('onclick', 'movePiece(-7)')
  }
  if (playPiece.jumpNegativeOne) {
    spaces[playPiece.boardSpace - 10].setAttribute('onclick', 'movePiece(-10)')
  }
  if (playPiece.jumpNegativeTwo) {
    spaces[playPiece.boardSpace - 14].setAttribute('onclick', 'movePiece(-14)')
  }
  if (playPiece.moveOne) {
    spaces[playPiece.boardSpace + 5].setAttribute('onclick', 'movePiece(5)')
  }
  if (playPiece.moveTwo) {
    spaces[playPiece.boardSpace + 7].setAttribute('onclick', 'movePiece(7)')
  }
  if (playPiece.jumpOne) {
    spaces[playPiece.boardSpace + 10].setAttribute('onclick', 'movePiece(10)')
  }
  if (playPiece.jumpTwo) {
    spaces[playPiece.boardSpace + 14].setAttribute('onclick', 'movePiece(14)')
  }
}

//Moves the pieces on the board by completely removing the piece then recreating it on the space that was clicked. This was done instead of appending the piece to a space as it was more easily executed while writing.
const movePiece = (spacesToMove) => {
  document.getElementById(playPiece.pieceID).remove()
  spaces[playPiece.boardSpace].innerHTML = ''
  if (currentPlayer === 'red') {
    spaces[
      playPiece.boardSpace + spacesToMove
    ].innerHTML = `<div class='redPiece' id="${playPiece.pieceID}"></div>`
    redPieces = document.querySelectorAll('.redPiece')
    //Executes jump
    if (spacesToMove >= 10 || spacesToMove <= -10) {
      board[playPiece.boardSpace + spacesToMove / 2] = null
      spaces[playPiece.boardSpace + spacesToMove / 2].innerHTML = ''
      scoreRed++
    }
  } else {
    spaces[
      playPiece.boardSpace + spacesToMove
    ].innerHTML = `<div class='blackPiece' id="${playPiece.pieceID}"></div>`
    blackPieces = document.querySelectorAll('.blackPiece')
    //Executes jump
    if (spacesToMove >= 10 || spacesToMove <= -10) {
      board[playPiece.boardSpace + spacesToMove / 2] = null
      spaces[playPiece.boardSpace + spacesToMove / 2].innerHTML = ''
      scoreBlack++
    }
  }
  //Updates the board array data for computation
  board[playPiece.boardSpace] = null
  board[playPiece.boardSpace + spacesToMove] = parseInt(playPiece.pieceID)
  resetPiece()
  removeBoardClicks()
  removePieceClicks()
  isWin()
}

//Checks if a player has won
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
