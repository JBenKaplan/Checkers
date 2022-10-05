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

let currentPlayer = 'black'
let scoreRed = 0
let scoreBlack = 0
let teamPieces

document.querySelector('h1').innerHTML = `${currentPlayer} begins!`

//Console Tests
// console.log(spaces)
// console.log(blackPieces)
// console.log(redPieces)

//Piece properties
let playPiece = {
  pieceID: -1,
  boardSpace: -1,
  moveOne: false,
  moveTwo: false,
  moveNegativeOne: false,
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
  playPiece.moveTwo = false
  playPiece.moveNegativeOne = false
  playPiece.moveNegativeTwo = false
  playPiece.jumpOne = false
  playPiece.jumpNegativeOne = false
  playPiece.jumpTwo = false
  playPiece.jumpNegativeTwo = false
}

// Switches players
const playerSwitch = () => {
  if (currentPlayer === 'red') {
    currentPlayer = 'black'
    document.querySelector('h1').innerHTML = `black's turn`
    console.log('black')
  } else {
    currentPlayer = 'red'
    document.querySelector('h1').innerHTML = `red's turn`
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
    playPiece.moveOne = true
  }
  if (
    board[playPiece.boardSpace + 5] === null &&
    spaces[playPiece.boardSpace + 5].classList.contains('emptySpace') !== true
  ) {
    playPiece.moveTwo = true
  }
  if (
    board[playPiece.boardSpace - 3] === null &&
    spaces[playPiece.boardSpace - 3].classList.contains('emptySpace') !== true
  ) {
    playPiece.moveNegativeOne = true
  }
  if (
    board[playPiece.boardSpace - 5] === null &&
    spaces[playPiece.boardSpace - 5].classList.contains('emptySpace') !== true
  ) {
    playPiece.moveNegativeTwo = true
  }
  //Jump Check
  if (
    board[playPiece.boardSpace + 6] === null &&
    spaces[playPiece.boardSpace + 6].classList.contains('emptySpace') !== true
  ) {
    playPiece.jumpOne = true
  }
  if (
    board[playPiece.boardSpace - 6] === null &&
    spaces[playPiece.boardSpace - 6].classList.contains('emptySpace') !== true
  ) {
    playPiece.jumpNegativeOne = true
  }
  if (
    board[playPiece.boardSpace + 10] === null &&
    spaces[playPiece.boardSpace + 10].classList.contains('emptySpace') !== true
  ) {
    playPiece.jumpTwo = true
  }
  if (
    board[playPiece.boardSpace - 10] === null &&
    spaces[playPiece.boardSpace - 10].classList.contains('emptySpace') !== true
  ) {
    playPiece.jumpNegativeTwo = true
  }

  clickSpace()
}

const clickSpace = () => {
  if (playPiece.moveOne) {
    spaces[playPiece.boardSpace + 3].setAttribute('onclick', 'movePiece(3)')
  }
  if (playPiece.moveTwo) {
    spaces[playPiece.boardSpace + 5].setAttribute('onclick', 'movePiece(5)')
  }
  if (playPiece.moveNegativeOne) {
    spaces[playPiece.boardSpace - 3].setAttribute('onclick', 'movePiece(-3)')
  }
  if (playPiece.moveNegativeTwo) {
    spaces[playPiece.boardSpace - 5].setAttribute('onclick', 'movePiece(-5)')
  }
  if (playPiece.jumpOne) {
    spaces[playPiece.boardSpace + 6].setAttribute('onclick', 'movePiece(6)')
    // spaces[playPiece.boardSpace + 3] = null
  }
  if (playPiece.jumpNegativeOne) {
    spaces[playPiece.boardSpace - 6].setAttribute('onclick', 'movePiece(-6)')
    // spaces[playPiece.boardSpace - 3] = null
  }
  if (playPiece.jumpTwo) {
    spaces[playPiece.boardSpace + 10].setAttribute('onclick', 'movePiece(10)')
    // spaces[playPiece.boardSpace + 5] = null
  }
  if (playPiece.jumpNegativeTwo) {
    spaces[playPiece.boardSpace - 10].setAttribute('onclick', 'movePiece(-10)')
    // spaces[playPiece.boardSpace - 5] = null
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
    //remove jumped black piece
    board[playPiece.boardSpace + spaceToMove / 2] = null
    if (spaceToMove >= 6 || spaceToMove <= -6) {
      spaces[playPiece.boardSpace + spaceToMove / 2].innerHTML = ''
      scoreRed++
      if (scoreRed === 2) {
        console.log('red wins')
        document.querySelector('h1').innerHTML = 'Red wins!'
      }
    }
  } else {
    spaces[
      playPiece.boardSpace + spaceToMove
    ].innerHTML = `<div class='blackPiece' id="${playPiece.pieceID}"></div>`
    blackPieces = document.querySelectorAll('.blackPiece')
    board[playPiece.boardSpace + spaceToMove / 2] = null
    if (spaceToMove >= 6 || spaceToMove <= -6) {
      spaces[playPiece.boardSpace + spaceToMove / 2].innerHTML = ''
      scoreBlack++
      if (scoreBlack === 2) {
        console.log('black wins')
        document.querySelector('h1').innerHTML = 'Black wins!'
      }
    }
  }

  board[playPiece.boardSpace] = null
  board[playPiece.boardSpace + spaceToMove] = parseInt(playPiece.pieceID)
  resetPiece()
  removeBoardClicks()
  removePieceClicks()
}

startClicks()
