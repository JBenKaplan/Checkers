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
// const playerSwitch = () => {
//   if (currentPlayer === 'red') {
//     //disable cursor on black tiles
//     //remove red piece movement -> future: except for movable
//     currentPlayer = 'black'
//     console.log('black')
//     document.getElementsByTagName('p').style.pointerEvents = 'none'
//     document.getElementsByTagName('td').style.pointerEvents = 'none'
//     document.getElementsByTagName('p').style.cursor = 'auto'
//     // movePiece(blackPieces)
//   } else {
//     //disable cursor on black tiles
//     //remove black piece movement -> future: except for movable
//     currentPlayer = 'red'
//     console.log('red')
//     document.getElementsByTagName('div').style.pointerEvents = 'none'
//     document.getElementsByTagName('td').style.pointerEvents = 'none'
//     document.getElementsByTagName('div').style.cursor = 'auto'
//     // movePiece(redPieces)
//   }
// }

//Add events listeners to pieces
const startClicks = () => {
  if (currentPlayer === 'red') {
    for (let i = 0; i < redPieces.length; i++) {
      redPieces[i].addEventListener('click', callPieces)
    }
  } else {
    for (let i = 0; i < redPieces.length; i++) {
      redPieces[i].addEventListener('click', callPieces)
    }
  }
}

const callPieces = () => {
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
      redPieces[i].removeEventListener('click', callPieces)
    }
  } else {
    for (let i = 0; i < redPieces.length; i++) {
      redPieces[i].removeEventListener('click', callPieces)
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
  clickSpace()
}

//Move piece method (renaming innerHTML instead of appendChild method)
const movePiece = (spaceToMove) => {
  document.getElementById(playPiece.pieceID).remove()
  // console.log(playPiece)
  spaces[playPiece.boardSpace].innerHTML = ''
  console.log(spaces)
  if (currentPlayer === 'red') {
    //space to move not defined
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
  let piecePlace = playPiece.boardSpace
  updateBoard(piecePlace, piecePlace + spaceToMove)
}

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
}

const updateBoard = (piecePlace, updatedSpace) => {
  board[piecePlace] = null
  board[updatedSpace] = parseInt(playPiece.pieceID)
  resetPiece()
  removeBoardClicks()
  removePieceClicks()
}

startClicks()
