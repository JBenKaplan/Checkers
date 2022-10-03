console.log('Hi')

let spaces = document.querySelectorAll('td')
let blackPieces = document.querySelectorAll('.blackPiece')
let redPieces = document.querySelectorAll('.redPiece')
let player = 'red'

console.log(spaces)
console.log(blackPieces)
console.log(redPieces)

const movement = (player) => {
  let move = 0
  if (player === 'red') {
    redPieces.forEach((piece) =>
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
  } else {
    blackPieces.forEach((piece) =>
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
  playerSwitch()
}

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
