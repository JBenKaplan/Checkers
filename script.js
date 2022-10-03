console.log('Hi')

let spaces = document.querySelectorAll('td')
let blackPieces = document.querySelectorAll('.blackPiece')
let redPieces = document.querySelectorAll('.redPiece')

console.log(spaces)
console.log(blackPieces)
console.log(redPieces)

const movement = () => {
  blackPieces.forEach((piece) =>
    piece.addEventListener('click', () => {
      spaces.forEach((space) => {
        space.addEventListener('click', () => {
          space.appendChild(piece)
        })
      })
    })
  )
}

movement()
//click on piece
//then click on space to move to
//remove class of checker piece then add it to the space clicked on

const playGame = () => {}

//Event Listeners

// document.getElementById('.blackPiece').addEventListener('click', movement)
// document.getElementById('.redPiece').addEventListener('click', playGame)

// document.getElementById('.td').addEventListener('click', () => {})
