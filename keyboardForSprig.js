/*
@title: keyboard for sprig
@author: mrdarip
@tags: []
@addedOn: 2024-00-00
*/

const words = ("hello world this is a sample text with some words the user can type").toLowerCase().split(" ")

const keys = ("wdsailkj").split("")

var currentText = []
var possibleWords = words
var currentLetterIndex = 0
var charactersOnEachButton = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  []
]

setKeyboard()

function setKeyboard() {
  charactersOnEachButton = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ]
  let buttonsWeight = [0, 0, 0, 0, 0, 0, 0, 0]
  
  let charsCount = {}

  for (let word of possibleWords) { //we count the sum of characters at current index
    letterAtCurrentIndex = word.charAt(currentLetterIndex % word.length)

    charsCount[letterAtCurrentIndex] = charsCount[letterAtCurrentIndex] ? charsCount[letterAtCurrentIndex] + 1 : 1
  }

  let sortedCharsCount = Object.fromEntries(
    Object.entries(charsCount).sort(([, a], [, b]) => b - a)
  );

  for (const [key, value] of Object.entries(sortedCharsCount)) {
    let minWeight = Math.min(...buttonsWeight)
    let minWeightIndex = buttonsWeight.indexOf(minWeight)

    buttonsWeight[minWeightIndex] += value
    charactersOnEachButton[minWeightIndex].push(key)
  }

  displayNewKeyboard()
}

function displayNewKeyboard() {
  let keyPositions = [
    [3,10],[6,12],[3,14],[0,12],
    [14,10],[17,12],[14,14],[11,12]
  ]

  for (let i = 0; i < charactersOnEachButton.length; i++) {
    addText(charactersOnEachButton[i].join(""), { 
      x: keyPositions[i][0],
      y: keyPositions[i][1],
      color: color`3`
    })
  }
}

const player = "p"

setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`]
)

setSolids([])

let level = 0
const levels = [
  map`
..........
..........
..........
..........
..........
..........
..........
..........`,
  map`
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
...p..........p......
.....................
p.....p....p.....p...
.....................
...p..........p......
.....................`
]


setMap(levels[level])

setPushables({
  [player]: []
})

for(let key of keys) {
  console.log(key)
  onInput(key, () => {
    console.log(key)
    currentLetterIndex++
    setKeyboard()
  })
}

afterInput(() => {

})