/*
@title: keyboard for sprig
@author: mrdarip
@tags: ['tool']
@addedOn: 2024-07-26
*/

const words = ("abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual void volatile while add alias ascending async await by descending dynamic equals from get global group into join let nameof notnull on orderby partial remove select set unmanaged value var when where yield").toLowerCase().split(" ")

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
    color: '0'
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
..........`
]

setMap(levels[level])

const powerOn = tune`
225,
37.5: F5-37.5,
37.5: A5-37.5,
37.5: F5-37.5,
37.5: A5-37.5,
825`
const ok = tune`
100: F5-100,
100: A5-100,
3000`
const superOk = tune`
100: F5-100,
100: G5-100,
100: B5-100,
2900`
const wrong = tune`
100: E4-100,
100: C4-100,
3000`
// Play it:
playTune(powerOn)


for (let key of keys) {
  onInput(key, () => {
    console.log(charactersOnEachButton[keys.indexOf(key)])

    if (charactersOnEachButton[keys.indexOf(key)].length < 1) {
      playTune(wrong)
    } else {

      possibleWords = possibleWords.filter(word => charactersOnEachButton[keys.indexOf(key)].includes(word.charAt(currentLetterIndex % word.length)))

      if (possibleWords.length <= 1) {
        playTune(superOk)
        currentText.push(possibleWords[0])
        possibleWords = words
        currentLetterIndex = 0
      } else {
        playTune(ok)
        currentLetterIndex++
      }

      setKeyboard()
    }
  })
}