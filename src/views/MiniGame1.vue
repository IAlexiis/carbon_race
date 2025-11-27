<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentQuestionIndex = ref(0)
const selectedAnswer = ref(null)
const hasAnswered = ref(false)
const score = ref(0)
const timeLeft = ref(20)
let timer = null
const quizCompleted = ref(false)

const questions = ref([
  {
    question: "What's the average lifespan of a smartphone before replacement?",
    options: [
      { id: 'a', text: '6 months', correct: false },
      { id: 'b', text: '2-3 years', correct: true },
      { id: 'c', text: '10 years', correct: false }
    ],
    explanation: "Most smartphones are replaced every 2-3 years, contributing to massive e-waste."
  },
  {
    question: "How much CO2 does manufacturing a new laptop produce?",
    options: [
      { id: 'a', text: '50 kg', correct: false },
      { id: 'b', text: '200 kg', correct: true },
      { id: 'c', text: '10 kg', correct: false }
    ],
    explanation: "Manufacturing a laptop generates around 200kg of CO2, most of it during production."
  },
  {
    question: "What percentage of a device's carbon footprint comes from manufacturing?",
    options: [
      { id: 'a', text: '20%', correct: false },
      { id: 'b', text: '50%', correct: false },
      { id: 'c', text: '80%', correct: true }
    ],
    explanation: "About 80% of a device's environmental impact happens during manufacturing, not usage."
  },
  {
    question: "Which material in smartphones is the most energy-intensive to extract?",
    options: [
      { id: 'a', text: 'Plastic', correct: false },
      { id: 'b', text: 'Rare earth metals', correct: true },
      { id: 'c', text: 'Glass', correct: false }
    ],
    explanation: "Rare earth metals require massive amounts of energy and water to extract and process."
  },
  {
    question: "Extending device lifespan from 2 to 4 years reduces its environmental impact by approximately:",
    options: [
      { id: 'a', text: '10%', correct: false },
      { id: 'b', text: '50%', correct: true },
      { id: 'c', text: '5%', correct: false }
    ],
    explanation: "Doubling device lifespan nearly halves its environmental impact per year of use. This is one of the most critical factors in reducing tech's carbon footprint - keeping devices longer is more impactful than any recycling program."
  },
  {
    question: "What does 'planned obsolescence' mean?",
    options: [
      { id: 'a', text: 'Devices designed to fail after a certain time', correct: true },
      { id: 'b', text: 'Devices that last forever', correct: false },
      { id: 'c', text: 'Devices made from recycled materials', correct: false }
    ],
    explanation: "Planned obsolescence means products are designed to become obsolete, forcing replacement."
  },
  {
    question: "How much energy is saved by refurbishing a phone vs. making a new one?",
    options: [
      { id: 'a', text: '20%', correct: false },
      { id: 'b', text: '50%', correct: false },
      { id: 'c', text: '90%', correct: true }
    ],
    explanation: "Refurbishing saves up to 90% of the energy needed to manufacture a new device."
  },
  {
    question: "What is the 'right to repair' movement about?",
    options: [
      { id: 'a', text: 'Making devices easier to fix yourself', correct: true },
      { id: 'b', text: 'Free repairs from manufacturers', correct: false },
      { id: 'c', text: 'Banning old devices', correct: false }
    ],
    explanation: "The right to repair advocates for accessible repairs to extend device lifespans."
  },
  {
    question: "How many liters of water are used to produce one smartphone?",
    options: [
      { id: 'a', text: '100 liters', correct: false },
      { id: 'b', text: '13,000 liters', correct: true },
      { id: 'c', text: '500 liters', correct: false }
    ],
    explanation: "Producing a single smartphone requires about 13,000 liters of water!"
  },
  {
    question: "What percentage of electronic waste is actually recycled globally?",
    options: [
      { id: 'a', text: '70%', correct: false },
      { id: 'b', text: '17%', correct: true },
      { id: 'c', text: '45%', correct: false }
    ],
    explanation: "Only 17% of e-waste is properly recycled globally. The rest ends up in landfills or is illegally exported, leaking toxic materials into the environment. Improving this rate is critical - recycling one million laptops saves the energy equivalent to powering 3,500 homes for a year."
  }
])

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const isCriticalPoint = computed(() => currentQuestionIndex.value === 4 || currentQuestionIndex.value === 9)

const startTimer = () => {
  timeLeft.value = 20
  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      if (!hasAnswered.value) {
        autoSubmitWrong()
      }
    }
  }, 1000)
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const selectAnswer = (optionId) => {
  if (hasAnswered.value) return
  selectedAnswer.value = optionId
}

const submitAnswer = () => {
  if (hasAnswered.value || selectedAnswer.value === null) return
  
  hasAnswered.value = true
  stopTimer()
  
  const selectedOption = currentQuestion.value.options.find(opt => opt.id === selectedAnswer.value)
  const points = isCriticalPoint.value ? 3 : 1
  
  if (selectedOption.correct) {
    score.value -= points
  } else {
    score.value += points
  }
  
  setTimeout(() => {
    nextQuestion()
  }, 5000)
}

const autoSubmitWrong = () => {
  hasAnswered.value = true
  const points = isCriticalPoint.value ? 3 : 1
  score.value += points
  
  setTimeout(() => {
    nextQuestion()
  }, 5000)
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    selectedAnswer.value = null
    hasAnswered.value = false
    startTimer()
  } else {
    quizCompleted.value = true
    stopTimer()
  }
}

const getOptionClass = (option) => {
  if (!hasAnswered.value) {
    return selectedAnswer.value === option.id ? 'selected' : ''
  }
  
  if (option.correct) {
    return 'correct'
  }
  
  if (selectedAnswer.value === option.id && !option.correct) {
    return 'incorrect'
  }
  
  return ''
}

const finalMessage = computed(() => {
  if (score.value < 0) {
    return "Bravo !"
  } else {
    return "Shame..."
  }
})

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<template>
<div class="minigame-page">
  <div class="minigame-container">
    <header class="minigame-header">
      <h1>Zone 1 Quiz</h1>
      <p class="subtitle">Devices & Manufacturing</p>
    </header>
    
    <div v-if="!quizCompleted" class="quiz-content">
      <div class="progress-section">
        <p class="progress-text">Question {{ currentQuestionIndex + 1 }} / {{ questions.length }}</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: ((currentQuestionIndex + 1) / questions.length * 100) + '%' }"></div>
        </div>
      </div>

      <div class="timer-section">
        <div class="timer" :class="{ 'timer-warning': timeLeft <= 5 }">
          <span class="timer-icon">⏱️</span>
          <span class="timer-value">{{ timeLeft }}s</span>
        </div>
      </div>

      <div class="score-section">
        <p class="score">Carbon Score: <span :class="{ 'positive': score > 0, 'negative': score < 0, 'neutral': score === 0 }">{{ score > 0 ? '+' : '' }}{{ score }}</span></p>
        <p v-if="isCriticalPoint" class="critical-badge">⚡ Critical Point: +3 / -3</p>
      </div>

      <div class="question-section">
        <h2 class="question-text">{{ currentQuestion.question }}</h2>
      </div>

      <div class="options-section">
        <button 
          v-for="option in currentQuestion.options" 
          :key="option.id"
          class="option-button"
          :class="getOptionClass(option)"
          @click="selectAnswer(option.id)"
          :disabled="hasAnswered"
        >
          <span class="option-letter">{{ option.id.toUpperCase() }})</span>
          <span class="option-text">{{ option.text }}</span>
        </button>
      </div>

      <div v-if="hasAnswered" class="explanation-section">
        <img src="../assets/images/light.png" alt="" class="light-icon">
        <p class="explanation">{{ currentQuestion.explanation }}</p>
      </div>

      <div class="submit-section" v-if="!hasAnswered">
        <button 
          class="submit-button" 
          @click="submitAnswer"
          :disabled="selectedAnswer === null"
        >
          Validate Answer
        </button>
      </div>
    </div>

    <div v-else class="completion-section">
      <div class="completion-card">
        <h2 class="completion-title">{{ finalMessage }}</h2>
        <div class="final-score">
          <p class="final-score-label">Final Carbon Score</p>
          <p class="final-score-value" :class="{ 'positive': score > 0, 'negative': score < 0, 'neutral': score === 0 }">
            {{ score > 0 ? '+' : '' }}{{ score }}
          </p>
        </div>
        <div class="reminding">
          <p><strong>Don't forget to add this result to your score sheet !</strong></p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

@font-face {
  font-family: 'Moon Get';
  src: url('../assets/font/moon_get-Heavy.otf') format('opentype');
  font-weight: 900;
  font-style: normal;
}

.minigame-page {
  background-color: #b4d288;
  height: 100dvh;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.minigame-container {
  border: 15px solid #b4d288;
  border-radius: 32px;
  background-color: #f7efe8;
  padding: 20px;
  height: 100dvh;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}

.minigame-header {
  text-align: center;
  margin-bottom: 20px;
}

.minigame-header h1 {
  font-family: 'Moon Get', sans-serif;
  font-size: 20px;
  color: #2d5016;
  margin: 0 0 15px 0;
}

.subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  color: #666;
  margin: 0;
}

.quiz-content {
  font-family: 'Montserrat', sans-serif;
}

.progress-section {
  margin-bottom: 15px;
}

.progress-text {
  font-size: 10px;
  color: #666;
  margin-bottom: 8px;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #cfe8a6 0%, #b4d288 100%);
  transition: width 0.3s ease;
}

.timer-section {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.timer {
  background-color: white;
  padding: 10px 20px;
  border-radius: 12px;
  border: 2px solid #b4d288;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.timer-warning {
  border-color: #ff9800;
  background-color: #fff9e6;
  animation: pulse 0.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.timer-icon {
  font-size: 16px;
}

.timer-value {
  font-family: 'Moon Get', sans-serif;
  font-size: 16px;
  color: #2d5016;
}

.score-section {
  text-align: center;
  margin-bottom: 20px;
}

.score {
  font-size: 11px;
  color: #666;
  font-weight: 600;
}

.score .positive {
  color: #f44336;
}

.score .negative {
  color: #4caf50;
}

.score .neutral {
  color: #666;
}

.critical-badge {
  font-size: 10px;
  color: #ff9800;
  font-weight: 700;
  margin: 0;
  animation: glow 1s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.question-section {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  border-left: 4px solid #a7d4eb;
  border-right: 4px solid #a7d4eb;
}

.question-text {
  font-size: 13px;
  color: #333;
  line-height: 1.6;
  margin: 0;
  font-weight: 600;
  text-align: center;
}

.options-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.option-button {
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  text-align: left;
}

.option-button:hover:not(:disabled) {
  border-color: #b4d288;
  background-color: #f8fdf4;
}

.option-button.selected {
  border-color: #b4d288;
  background-color: #e8f3dc;
}

.option-button.correct {
  border-color: #4caf50;
  background-color: #e8f5e9;
}

.option-button.incorrect {
  border-color: #f44336;
  background-color: #ffebee;
}

.option-button:disabled {
  cursor: not-allowed;
}

.option-letter {
  font-weight: 700;
  color: #2d5016;
  font-size: 12px;
  min-width: 20px;
}

.option-text {
  font-size: 11px;
  color: #333;
  line-height: 1.4;
}

.explanation-section {
  background-color: #fff9e6;
  border-left: 4px solid #ffc107;
  border-right: 4px solid #ffc107;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  animation: fadeIn 0.3s ease;
  position: relative;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.light-icon {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 35px;
  height: 35px;
  transform: rotate(20deg);
}

.explanation {
  font-size: 10px;
  color: #f57c00;
  margin: 0;
  line-height: 1.5;
  font-style: italic;
  text-align: center;
}

.submit-section {
  display: flex;
  justify-content: center;
}

.submit-button {
  background-color: #cfe8a6;
  border-radius: 16px;
  padding: 14px 30px;
  border: none;
  font-family: 'Moon Get', sans-serif;
  font-size: 11px;
  box-shadow: 3px -5px 0px #9dc56d;
  color: #2d5016;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease;
}

.submit-button:hover:not(:disabled) {
  transform: scale(1.02);
  filter: brightness(1.05);
}

.submit-button:active:not(:disabled) {
  transform: scale(0.98);
  filter: brightness(0.95);
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.completion-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.completion-card {
  background-color: white;
  padding: 30px 20px;
  border-radius: 16px;
  text-align: center;
  border-left: 4px solid #a7d4eb;
  border-right: 4px solid #a7d4eb;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.completion-title {
  font-family: 'Moon Get', sans-serif;
  font-size: 20px;
  color: #2d5016;
  margin: 0 0 20px 0;
}

.final-score {
  margin-bottom: 25px;
}

.final-score-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  color: #666;
  margin-bottom: 10px;
  font-weight: 600;
}

.final-score-value {
  font-family: 'Moon Get', sans-serif;
  font-size: 48px;
  margin: 0;
}

.final-score-value.positive {
  color: #2d5016;
}

.final-score-value.negative {
  color: #4caf50;
}

.final-score-value.neutral {
  color: #666;
}

.reminding {
  background-color: #e8f3dc;
  padding: 15px;
  border-radius: 10px;
  border-left: 3px solid #b4d288;
  border-right: 3px solid #b4d288;
}

.reminding p {
  font-size: 11px;
  font-family: 'Montserrat', sans-serif;
  color: #2d5016;
  margin: 0;
  line-height: 1.5;
}
</style>
