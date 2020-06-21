const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What does HTML stand for?',
    answers: [
        { text: 'Happy Tuesday Mega Loser', correct: false },
        { text: 'Hyper Text Markup Language', correct: true },
        { text: 'How To Make Lasagna', correct: false },
        { text: 'Hell To My Life', correct: false }
    ]
  },
  {
    question: 'What does CSS do?',
    answers: [
        { text: 'Replaces HTML', correct: false },
        { text: 'Does the work for you', correct: false },
        { text: 'Has nothing to do with coding', correct: false },
        { text: 'Describes how HTML elements are to be displayed', correct: true }
    ]
  },
  {
    question: 'The following is true about arrays EXCEPT:',
    answers: [
      { text: 'Array elements do not always have to be the same type', correct: true },
      { text: 'The variables in the array are ordered and each have an index beginning from 0', correct: false },
      { text: 'The direct superclass of an array type is Object', correct: false },
      { text: 'An array is an indexed collection of data elements of the same type', correct: false }
    ]
  },
  {
    question: 'Commonly used data types do NOT include:',
    answers: [
        { text: 'Booleans', correct: true },
        { text: 'Strings', correct: false },
        { text: 'Numbers', correct: false },
        { text: 'They do not include any of these', correct: false }
    ]
  },
  {
    question: 'The condition in an if/else statement is enclosed within',
    answers: [
        { text: 'Quotes', correct: false },
        { text: 'Curly brackets', correct: false },
        { text: 'Square brackets', correct: false },
        { text: 'Paranthesis', correct: true }
    ]
  }
]