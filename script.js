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

let spaces = document.querySelectorAll('td')
let blackPieces = document.querySelectorAll('.blackPiece')
let redPieces = document.querySelectorAll('.redPiece')

let currentPlayer = redPieces

let scoreRed = 0
let scoreBlack = 0

console.log(spaces)
console.log(blackPieces)
console.log(redPieces)

let playPiece = {
  pieceID: -1,
  boardSpace: -1,
  moveThird: false,
  moveFifth: false,
  moveNegThird: false,
  moveNegFifth: false
}

let resetPiece = {
  pieceID: -1,
  boardSpace: -1,
  moveThird: false,
  moveFifth: false,
  moveNegThird: false,
  moveNegFifth: false
}

const playerSwitch = () => {
  if (currentPlayer === redPieces) {
    //disable cursor on black tiles
    //remove red piece movement -> future: except for movable
    currentPlayer = blackPieces
    console.log('black')
    document.getElementsByTagName('p').style.pointerEvents = 'none'
    document.getElementsByTagName('td').style.pointerEvents = 'none'
    document.getElementsByTagName('p').style.cursor = 'auto'
    // movePiece(blackPieces)
  } else {
    //disable cursor on black tiles
    //remove black piece movement -> future: except for movable
    currentPlayer = redPieces
    console.log('red')
    document.getElementsByTagName('div').style.pointerEvents = 'none'
    document.getElementsByTagName('td').style.pointerEvents = 'none'
    document.getElementsByTagName('div').style.cursor = 'auto'
    // movePiece(redPieces)
  }
}

const addClicks = () => {
  if (currentPlayer === redPieces) {
    for (let i = 0; i < redPieces.length; i++) {
      redPieces[i].addEventListener('click', findPiece)
    }
  } else {
    for (let i = 0; i < redPieces.length; i++) {
      redPieces[i].addEventListener('click', findPiece)
    }
  }
  movePiece()
}

let findPiece = () => {
  let num = parseInt(playPiece.pieceID)
  return board.indexOf(num)
}

const movePiece = () => {}

addClicks()
