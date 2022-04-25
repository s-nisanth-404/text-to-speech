const textInput  = document.querySelector('.content');
const speedInput  = document.querySelector('.speed');

const playButton = document.querySelector('.play');
const pauseButton  = document.querySelector('.pause');
const stopButton  = document.querySelector('.stop');

let currentCharacter;

playButton.addEventListener('click', () => {
  playText(textInput.value)
})
pauseButton.addEventListener('click', pauseText)
stopButton.addEventListener('click', stopText)
speedInput.addEventListener('input', () => {
  stopText()
  playText(utterance.text.substring(currentCharacter))
})

const utterance = new SpeechSynthesisUtterance()
utterance.addEventListener('end', () => {
  textInput.disabled = false
})
utterance.addEventListener('boundary', e => {
  currentCharacter = e.charIndex;
})

function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume()
  }
  if (speechSynthesis.speaking) return
  utterance.text = text
  utterance.rate = speedInput.value || 1
  textInput.disabled = true
  speechSynthesis.speak(utterance)
}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause()
}

function stopText() {
  speechSynthesis.resume()
  speechSynthesis.cancel()
}