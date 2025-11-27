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
    sentence: "Using _____ algorithms can reduce CPU usage and save energy.",
    blank: "efficient",
    options: [
      { id: 'a', text: 'efficient', correct: true },
      { id: 'b', text: 'complex', correct: false },
      { id: 'c', text: 'nested', correct: false }
    ],
    explanation: "Efficient algorithms minimize computation cycles, reducing CPU usage and energy consumption significantly."
  },
  {
    sentence: "Lazy loading images means they load only when _____.",
    blank: "visible",
    options: [
      { id: 'a', text: 'visible', correct: true },
      { id: 'b', text: 'downloaded', correct: false },
      { id: 'c', text: 'clicked', correct: false }
    ],
    explanation: "Lazy loading defers image loading until they enter the viewport, saving bandwidth and processing for unseen content."
  },
  {
    sentence: "Minifying code removes _____ to reduce file size.",
    blank: "whitespace",
    options: [
      { id: 'a', text: 'functions', correct: false },
      { id: 'b', text: 'whitespace', correct: true },
      { id: 'c', text: 'variables', correct: false }
    ],
    explanation: "Minification removes unnecessary whitespace, comments, and formatting, reducing file size and transfer energy."
  },
  {
    sentence: "Server-side _____ reduces the number of database queries.",
    blank: "caching",
    options: [
      { id: 'a', text: 'rendering', correct: false },
      { id: 'b', text: 'caching', correct: true },
      { id: 'c', text: 'encryption', correct: false }
    ],
    explanation: "Caching stores frequently accessed data in memory, avoiding repeated database queries and reducing server energy consumption."
  },
  {
    sentence: "Using _____ databases can significantly reduce energy consumption for read-heavy applications.",
    blank: "NoSQL",
    options: [
      { id: 'a', text: 'relational', correct: false },
      { id: 'b', text: 'NoSQL', correct: true },
      { id: 'c', text: 'local', correct: false }
    ],
    explanation: "NoSQL databases like Redis or MongoDB are optimized for specific use cases and can be much more energy-efficient than traditional relational databases for read-heavy workloads. This is a critical optimization point."
  },
  {
    sentence: "Code _____ helps identify and remove unused dependencies.",
    blank: "auditing",
    options: [
      { id: 'a', text: 'compilation', correct: false },
      { id: 'b', text: 'auditing', correct: true },
      { id: 'c', text: 'obfuscation', correct: false }
    ],
    explanation: "Regular code auditing detects bloat from unused libraries, reducing bundle size and energy needed for downloads."
  },
  {
    sentence: "Using CDNs reduces _____ by serving content from nearby servers.",
    blank: "latency",
    options: [
      { id: 'a', text: 'security', correct: false },
      { id: 'b', text: 'latency', correct: true },
      { id: 'c', text: 'storage', correct: false }
    ],
    explanation: "Content Delivery Networks place data closer to users, reducing transmission distance and energy consumption."
  },
  {
    sentence: "Avoiding _____ loops prevents unnecessary CPU cycles.",
    blank: "infinite",
    options: [
      { id: 'a', text: 'nested', correct: false },
      { id: 'b', text: 'infinite', correct: true },
      { id: 'c', text: 'async', correct: false }
    ],
    explanation: "Infinite loops consume CPU resources indefinitely, wasting massive amounts of energy. Proper loop design is essential."
  },
  {
    sentence: "Using _____ compression reduces image file sizes by up to 90%.",
    blank: "WebP",
    options: [
      { id: 'a', text: 'JPEG', correct: false },
      { id: 'b', text: 'WebP', correct: true },
      { id: 'c', text: 'PNG', correct: false }
    ],
    explanation: "WebP is a modern format offering superior compression compared to JPEG/PNG, significantly reducing bandwidth and storage energy."
  },
  {
    sentence: "Implementing _____ rendering can reduce server load by moving computation to the client.",
    blank: "client-side",
    options: [
      { id: 'a', text: 'server-side', correct: false },
      { id: 'b', text: 'client-side', correct: true },
      { id: 'c', text: 'hybrid', correct: false }
    ],
    explanation: "Client-side rendering offloads work from energy-intensive servers to user devices, distributing the computational load. However, this must be balanced carefully - it's a critical architectural decision that impacts overall system efficiency."
  }
])

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const isCriticalPoint = computed(() => currentQuestionIndex.value === 4 || currentQuestionIndex.value === 9)

const displaySentence = computed(() => {
  const sentence = currentQuestion.value.sentence
  const blank = currentQuestion.value.blank
  
  if (!hasAnswered.value && selectedAnswer.value !== null) {
    const selectedOption = currentQuestion.value.options.find(opt => opt.id === selectedAnswer.value)
    return sentence.replace('_____', `<span class="blank selected-blank"><strong><em>${selectedOption.text}</em></strong></span>`)
  }
  
  if (hasAnswered.value) {
    return sentence.replace('_____', `<span class="blank correct-blank"><strong><em>${blank}</em></strong></span>`)
  }
  
  return sentence.replace('_____', '<span class="blank">_____</span>')
})

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
    gameCompleted.value = true
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
      <h1>Zone 3 - Fill the Blank</h1>
      <p class="subtitle">Code & Development</p>
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

      <!-- Sentence with Blank -->
      <div class="sentence-section">
        <p class="sentence-text" v-html="displaySentence"></p>
      </div>

      <!-- Word Options -->
      <div class="options-section">
        <button 
          v-for="option in currentQuestion.options" 
          :key="option.id"
          class="option-button"
          :class="getOptionClass(option)"
          @click="selectAnswer(option.id)"
          :disabled="hasAnswered"
        >
          <span class="option-text">{{ option.text }}</span>
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
  margin: 0 0 5px 0;
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

.sentence-section {
  background-color: white;
  padding: 25px 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  border-left: 4px solid #e0c5fc;
  border-right: 4px solid #e0c5fc;
}

.sentence-text {
  font-size: 14px;
  color: #333;
  line-height: 1.8;
  margin: 0;
  font-weight: 500;
  text-align: center;
}

.blank {
  font-weight: 700;
  color: #2d5016;
  padding: 2px 12px;
  border-radius: 6px;
  background-color: #f0f0f0;
  border-bottom: 2px dashed #b4d288;
  display: inline-block;
  min-width: 100px;
  text-align: center;
}

.selected-blank {
  background-color: #e8f3dc;
  border-bottom: 2px solid #b4d288;
  color: #2d5016;
}

.correct-blank {
  background-color: #e8f5e9;
  border-bottom: 2px solid #4caf50;
  color: #2d5016;
}

.options-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.option-button {
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 15px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-button:hover:not(:disabled) {
  border-color: #b4d288;
  background-color: #f8fdf4;
  transform: translateY(-2px);
}

.option-button.selected {
  border-color: #b4d288;
  background-color: #e8f3dc;
  border-width: 3px;
}

.option-button.correct {
  border-color: #4caf50;
  background-color: #e8f5e9;
  border-width: 3px;
}

.option-button.incorrect {
  border-color: #f44336;
  background-color: #ffebee;
  border-width: 3px;
}

.option-button:disabled {
  cursor: not-allowed;
}

.option-text {
  font-size: 12px;
  color: #333;
  font-weight: 600;
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
  border-left: 4px solid #e0c5fc;
  border-right: 4px solid #e0c5fc;
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
