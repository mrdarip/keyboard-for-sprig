/*
@title: keyboard for sprig
@author: mrdarip
@tags: []
@addedOn: 2024-00-00
*/

const words = ("hello world take some words for practicing writting on sprig").toLowerCase().split(" ")

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

  updateUI()
}

function updateUI() {
  clearText()
  displayNewKeyboard()
  displayText()
}

function displayText() {
  let allText = currentText.join(" ")
  addText(allText.substring(allText.length - width() * 2), {
    x: 0, 
    y: 0,
    color: '3'
  })
}

function displayNewKeyboard() {
  let keyPositions = [
    [3, 8],
    [6, 9],
    [3, 11],
    [0, 10],
    [13, 12],
    [16, 13],
    [13, 15],
    [10, 14]
  ]

  for (let i = 0; i < charactersOnEachButton.length; i++) {
    addText(charactersOnEachButton[i].join(""), {
      x: keyPositions[i][0],
      y: keyPositions[i][1],
      color: i >= 4 ? '5' : '3'
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

for (let key of keys) {
  onInput(key, () => {
    possibleWords = possibleWords.filter(word => charactersOnEachButton[keys.indexOf(key)].includes(word.charAt(currentLetterIndex % word.length)))

    if (possibleWords.length <= 1) {
      currentText.push(possibleWords[0])
      possibleWords = words
      currentLetterIndex = 0
    } else {
      currentLetterIndex++
    }

    setKeyboard()
})
}

afterInput(() => {

})