/*
@title: keyboard for sprig
@author: mrdarip
@tags: []
@addedOn: 2024-00-00
*/

const words = ("hello world this is a sample text with some words the user can type").split(" ")
const characters = ("abcdefghijklmnopqrstuvwxyz").split("")

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

  displayKeyboard()
}

function displayKeyboard(charsCount) {

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
.........p
..........
..........
..........
..........
..........
..........
..........`
]

setMap(levels[level])

setPushables({
  [player]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})

afterInput(() => {

})