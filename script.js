console.log('Hi')

let spaces = document.querySelectorAll('td')
let blackPieces = document.querySelectorAll('.blackPiece')
let redPieces = document.querySelectorAll('.redPiece')
let player = redPieces

console.log(spaces)
console.log(blackPieces)
console.log(redPieces)

const movement = (player) => {
  player.forEach((piece) =>
    piece.addEventListener('click', () => {
      spaces.forEach((space) => {
        space.addEventListener('click', () => {
          space.appendChild(piece)
          piece.removeEventListener('click', movement)
          space.removeEventListener('click', movement)
        })
      })
    })
  )
}
// Other method for moving pieces?
// if ((player = 'red')) {
//   for (let i = 0; i < redPieces.length; i++) {
//     redPieces[i].addEventListener('click', () => {
//       for (let i = 0; i < spaces.length; i++) {
//         spaces.appendChild(redPieces[i])
//       }
//     })
//   }
// } else {
//   for (let i = 0; i < blackPieces.length; i++) {
//     blackPieces[i].addEventListener('click', () => {
//       spaces.appendChild(blackPieces[i])
//     })
//   }
// }

const playerSwitch = (player) => {
  if (player === 'black') {
    player = 'red'
  } else {
    player = 'black'
  }
}

movement(player)

const playGame = () => {}

//Event Listeners
// player.addEventListener('click', playGame)
