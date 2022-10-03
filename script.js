console.log('Hi')

let spaces = document.querySelectorAll('td')
let blackPieces = document.querySelectorAll('.blackPiece')
let redPieces = document.querySelectorAll('.redPiece')
let player = redPieces

console.log(spaces)
console.log(blackPieces)
console.log(redPieces)

const movement = (player) => {
  let move = 0
  player.forEach((piece) =>
    piece.addEventListener('click', () => {
      spaces.forEach((space) => {
        space.addEventListener('click', () => {
          space.appendChild(piece)
          move++
          console.log(move)
        })
      })
    })
  )
}

const playerSwitch = (player) => {
  if (player === blackPieces) {
    player = redPieces
  } else {
    player = blackPieces
  }
}

movement(player)

const playGame = () => {}

//Event Listeners
