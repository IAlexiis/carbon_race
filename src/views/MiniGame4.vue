<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentQuestionIndex = ref(0)
const selectedAnswer = ref(null)
const hasAnswered = ref(false)
const score = ref(0)
const timeLeft = ref(20)
let timer = null
const gameCompleted = ref(false)

const questions = ref([
  {
    question: "Which consumes more energy?",
    optionA: "Streaming 1 hour of HD video",
    optionB: "Sending 1000 emails",
    correctAnswer: 'a', // A consumes more
    explanation: "Streaming 1 hour of HD video uses approximately 3GB of data and significant server processing, far exceeding the energy cost of sending 1000 text emails."
  },
  {
    question: "Which generates more CO2?",
    optionA: "Storing 100GB in the cloud for 1 year",
    optionB: "Making 10 Google searches",
    correctAnswer: 'a', // A generates more
    explanation: "Cloud storage requires constant server operation, cooling, and redundancy for an entire year, consuming far more energy than a few quick searches."
  },
  {
    question: "Which uses more server resources?",
    optionA: "Hosting a simple static website",
    optionB: "Running a Bitcoin mining operation for 1 hour",
    correctAnswer: 'b', // B uses more
    explanation: "Bitcoin mining requires massive computational power and energy, consuming thousands of times more resources than hosting a simple website."
  },
  {
    question: "Which has a bigger carbon footprint?",
    optionA: "Watching 4K video on Netflix",
    optionB: "Watching 480p video on Netflix",
    correctAnswer: 'a', // A has bigger footprint
    explanation: "4K video requires 4-7x more bandwidth and data than 480p, resulting in significantly higher energy consumption across networks and data centers."
  },
  {
    question: "Which data center practice saves the MOST energy?",
    optionA: "Using renewable energy sources",
    optionB: "Turning off unused servers (10% of fleet)",
    correctAnswer: 'a', // A saves most - CRITICAL POINT ±3
    explanation: "While eliminating zombie servers (inactive but powered) saves significant energy, switching an entire data center to renewable energy has a far greater total impact on carbon emissions. This is a critical infrastructure decision."
  },
  {
    question: "Which generates more data traffic?",
    optionA: "Video call for 1 hour",
    optionB: "Browsing 100 web pages",
    correctAnswer: 'a', // A generates more
    explanation: "A 1-hour video call can use 1-2GB of data, while browsing 100 pages typically uses only 100-200MB depending on content."
  },
  {
    question: "Which is more energy-efficient?",
    optionA: "Downloading a 2GB movie once",
    optionB: "Streaming the same 2GB movie 3 times",
    correctAnswer: 'a', // A is more efficient
    explanation: "Downloading once and watching offline saves energy by avoiding repeated data transmission through networks and servers."
  },
  {
    question: "Which cooling method uses less energy?",
    optionA: "Air conditioning for data centers",
    optionB: "Free air cooling (using outside air)",
    correctAnswer: 'b', // B uses less
    explanation: "Free air cooling, when climate permits, uses up to 90% less energy than traditional air conditioning systems by leveraging natural temperature differences."
  },
  {
    question: "Which email action saves the most storage energy?",
    optionA: "Deleting 1000 old emails with attachments",
    optionB: "Unsubscribing from 50 newsletters",
    correctAnswer: 'a', // A saves most
    explanation: "Deleting existing data (especially large attachments) immediately reduces storage needs. Unsubscribing prevents future accumulation but has less immediate impact."
  },
  {
    question: "Which approach reduces global data center energy the MOST?",
    optionA: "Improving server utilization from 20% to 80%",
    optionB: "Reducing cooling temperature by 2°C",
    correctAnswer: 'a', // A reduces most - CRITICAL POINT ±3
    explanation: "Server utilization is the #1 energy waste in data centers. Improving from typical 20% to optimal 80% can reduce energy consumption by 50-60% - far more than any cooling optimization. This represents a fundamental shift in data center efficiency."
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

const selectAnswer = (answer) => {
  if (hasAnswered.value) return
  selectedAnswer.value = answer
}

const submitAnswer = () => {
  if (hasAnswered.value || selectedAnswer.value === null) return
  
  hasAnswered.value = true
  stopTimer()
  
  const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer
  const points = isCriticalPoint.value ? 3 : 1
  
  if (isCorrect) {
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
    gameCompleted.value = true
    stopTimer()
  }
}

const getButtonClass = (option) => {
  if (!hasAnswered.value) {
    return selectedAnswer.value === option ? 'selected' : ''
  }
  
  if (option === currentQuestion.value.correctAnswer) {
    return 'correct'
  }
  
  if (selectedAnswer.value === option && option !== currentQuestion.value.correctAnswer) {
    return 'incorrect'
  }
  
  return ''
}

const finalMessage = computed(() => {
  if (score.value < 0) {
    return "Bravo"
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
      <h1>Zone 4 - Which is Bigger?</h1>
      <p class="subtitle">Servers & Data</p>
    </header>
    
    <div v-if="!gameCompleted" class="game-content">
      <!-- Progress Bar -->
      <div class="progress-section">
        <p class="progress-text">Question {{ currentQuestionIndex + 1 }} / {{ questions.length }}</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: ((currentQuestionIndex + 1) / questions.length * 100) + '%' }"></div>
        </div>
      </div>

      <!-- Timer -->
      <div class="timer-section">
        <div class="timer" :class="{ 'timer-warning': timeLeft <= 5 }">
          <span class="timer-icon">⏱️</span>
          <span class="timer-value">{{ timeLeft }}s</span>
        </div>
      </div>

      <!-- Score -->
      <div class="score-section">
        <p class="score">Carbon Score: <span :class="{ 'positive': score > 0, 'negative': score < 0, 'neutral': score === 0 }">{{ score > 0 ? '+' : '' }}{{ score }}</span></p>
        <p v-if="isCriticalPoint" class="critical-badge">⚡ Critical Point: +3 / -3</p>
      </div>

      <!-- Question -->
      <div class="question-section">
        <h2 class="question-title">{{ currentQuestion.question }}</h2>
      </div>

      <!-- Comparison Buttons -->
      <div class="comparison-section">
        <button 
          class="comparison-button option-a"
          :class="getButtonClass('a')"
          @click="selectAnswer('a')"
          :disabled="hasAnswered"
        >
          <span class="option-label">A</span>
          <span class="option-content">{{ currentQuestion.optionA }}</span>
        </button>

        <div class="vs-separator">
          <span class="vs-text">VS</span>
        </div>

        <button 
          class="comparison-button option-b"
          :class="getButtonClass('b')"
          @click="selectAnswer('b')"
          :disabled="hasAnswered"
        >
          <span class="option-label">B</span>
          <span class="option-content">{{ currentQuestion.optionB }}</span>
        </button>
      </div>

      <!-- Explanation (shown after answer) -->
      <div v-if="hasAnswered" class="explanation-section">
        <img src="../assets/images/light.png" alt="" class="light-icon">
        <p class="explanation">{{ currentQuestion.explanation }}</p>
      </div>

      <!-- Submit Button -->
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

    <!-- Game Completed -->
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

.game-content {
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
  margin-bottom: 5px;
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
  margin-bottom: 25px;
  border-left: 4px solid #f7a88a;
  border-right: 4px solid #f7a88a;
}

.question-title {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin: 0;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.comparison-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
}

.comparison-button {
  background-color: white;
  border: 3px solid #e0e0e0;
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.comparison-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.comparison-button.selected {
  border-color: #b4d288;
  background-color: #e8f3dc;
}

.comparison-button.correct {
  border-color: #4caf50;
  background-color: #e8f5e9;
}

.comparison-button.incorrect {
  border-color: #f44336;
  background-color: #ffebee;
}

.comparison-button:disabled {
  cursor: not-allowed;
}

.option-label {
  font-family: 'Moon Get', sans-serif;
  font-size: 18px;
  color: #2d5016;
  font-weight: 900;
}

.option-content {
  font-size: 12px;
  color: #333;
  font-weight: 600;
  text-align: center;
  line-height: 1.5;
}

.vs-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
}

.vs-text {
  font-family: 'Moon Get', sans-serif;
  font-size: 16px;
  color: #2d5016;
  background-color: white;
  padding: 8px 20px;
  border-radius: 20px;
  border: 2px solid #b4d288;
  font-weight: 900;
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
  border-left: 4px solid #f7a88a;
  border-right: 4px solid #f7a88a;
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
