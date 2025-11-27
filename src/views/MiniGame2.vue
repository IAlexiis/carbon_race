<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentSituationIndex = ref(0)
const selectedAnswer = ref(null)
const hasAnswered = ref(false)
const score = ref(0)
const timeLeft = ref(20)
let timer = null
const gameCompleted = ref(false)

const situations = ref([
  {
    situation: "Watching videos in 4K quality on a small smartphone screen",
    correctAnswer: false, // TRASH - Bad habit
    explanation: "Watching 4K on a small screen is wasteful - you can't see the difference but it uses 3x more data and energy than 1080p."
  },
  {
    situation: "Deleting old emails and cleaning up your inbox regularly",
    correctAnswer: true, // KEEP - Good habit
    explanation: "Stored emails require server energy to maintain. Deleting unnecessary emails reduces data center storage and energy consumption."
  },
  {
    situation: "Using dark mode on OLED screens to save battery",
    correctAnswer: true, // KEEP - Good habit
    explanation: "On OLED screens, dark pixels consume less energy. Dark mode can reduce battery usage by up to 60% on these displays."
  },
  {
    situation: "Leaving multiple browser tabs open with videos and animations running",
    correctAnswer: false, // TRASH - Bad habit
    explanation: "Each active tab consumes RAM and processing power continuously. Closing unused tabs significantly reduces your device's energy consumption."
  },
  {
    situation: "Blocking auto-play videos and disabling auto-loading of media content",
    correctAnswer: true, // KEEP - Good habit - CRITICAL POINT ±3
    explanation: "Auto-play features force content to load and play without your request, consuming massive unnecessary bandwidth, processing power, and server resources globally. Blocking them is one of the most impactful eco-friendly digital behaviors."
  },
  {
    situation: "Uploading full-resolution 10MB photos directly to social media",
    correctAnswer: false, // TRASH - Bad habit
    explanation: "Social media compresses images anyway. Compressing photos before uploading saves bandwidth and storage energy on both your device and servers."
  },
  {
    situation: "Preferring WiFi over mobile data when available",
    correctAnswer: true, // KEEP - Good habit
    explanation: "WiFi is 5-10x more energy-efficient than mobile data networks. Mobile towers and cellular infrastructure consume significantly more energy per data unit."
  },
  {
    situation: "Storing everything in the cloud 'just in case' without deleting old files",
    correctAnswer: false, // TRASH - Bad habit
    explanation: "Cloud storage isn't magic - it relies on massive data centers consuming enormous electricity for servers, cooling, and operations. Clean up unused files regularly."
  },
  {
    situation: "Binge-watching series in standard definition instead of HD when quality difference is minimal",
    correctAnswer: true, // KEEP - Good habit
    explanation: "Streaming in SD uses 50-70% less bandwidth and energy than HD. On mobile screens or background viewing, the quality difference is negligible but the environmental impact is huge."
  },
  {
    situation: "Using ad blockers to reduce unnecessary content loading",
    correctAnswer: true, // KEEP - Good habit - CRITICAL POINT ±3
    explanation: "Ads and trackers load massive amounts of additional scripts, images, videos and tracking code. Blocking them can reduce page load data by 50-60%, significantly cutting your digital carbon footprint."
  }
])

const currentSituation = computed(() => situations.value[currentSituationIndex.value])
const isCriticalPoint = computed(() => currentSituationIndex.value === 4 || currentSituationIndex.value === 9)

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
  
  const isCorrect = selectedAnswer.value === currentSituation.value.correctAnswer
  const points = isCriticalPoint.value ? 3 : 1
  
  if (isCorrect) {
    score.value -= points // Bonne réponse: -1 ou -3 carbon
  } else {
    score.value += points // Mauvaise réponse: +1 ou +3 carbon
  }
  
  setTimeout(() => {
    nextSituation()
  }, 5000)
}

const autoSubmitWrong = () => {
  hasAnswered.value = true
  const points = isCriticalPoint.value ? 3 : 1
  score.value += points // Temps écoulé = mauvaise réponse
  
  setTimeout(() => {
    nextSituation()
  }, 5000)
}

const nextSituation = () => {
  if (currentSituationIndex.value < situations.value.length - 1) {
    currentSituationIndex.value++
    selectedAnswer.value = null
    hasAnswered.value = false
    startTimer()
  } else {
    gameCompleted.value = true
    stopTimer()
  }
}

const getButtonClass = (answer) => {
  if (!hasAnswered.value) {
    return selectedAnswer.value === answer ? 'selected' : ''
  }
  
  if (answer === currentSituation.value.correctAnswer) {
    return 'correct'
  }
  
  if (selectedAnswer.value === answer && answer !== currentSituation.value.correctAnswer) {
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
      <h1>Zone 2 - Trash or Keep</h1>
      <p class="subtitle">UX & Digital Behaviors</p>
    </header>
    
    <div v-if="!gameCompleted" class="game-content">
      <!-- Progress Bar -->
      <div class="progress-section">
        <p class="progress-text">Situation {{ currentSituationIndex + 1 }} / {{ situations.length }}</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: ((currentSituationIndex + 1) / situations.length * 100) + '%' }"></div>
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

      <!-- Situation -->
      <div class="situation-section">
        <h2 class="situation-text">{{ currentSituation.situation }}</h2>
      </div>

      <!-- Trash or Keep Buttons -->
      <div class="answer-section">
        <button 
          class="answer-button trash-button"
          :class="getButtonClass(false)"
          @click="selectAnswer(false)"
          :disabled="hasAnswered"
        >
          <img src="../assets/images/bean.png" alt="" class="button-icon-img">
          <span class="button-text">TRASH</span>
        </button>
        <button 
          class="answer-button keep-button"
          :class="getButtonClass(true)"
          @click="selectAnswer(true)"
          :disabled="hasAnswered"
        >
          <img src="../assets/images/check.png" alt="" class="button-icon-img">
          <span class="button-text">KEEP</span>
        </button>
      </div>

      <!-- Explanation (shown after answer) -->
      <div v-if="hasAnswered" class="explanation-section">
        <img src="../assets/images/light.png" alt="" class="light-icon">
        <p class="explanation">{{ currentSituation.explanation }}</p>
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

.situation-section {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  border-left: 4px solid #cfe8a6;
  border-right: 4px solid #cfe8a6;
}

.situation-text {
  font-size: 13px;
  color: #333;
  line-height: 1.6;
  margin: 0;
  font-weight: 600;
  text-align: center;
}

.answer-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.answer-button {
  background-color: white;
  border: 3px solid #e0e0e0;
  border-radius: 16px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', sans-serif;
}

.answer-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.answer-button.selected {
  border-color: #b4d288;
  background-color: #e8f3dc;
}

.answer-button.correct {
  border-color: #4caf50;
  background-color: #e8f5e9;
}

.answer-button.incorrect {
  border-color: #f44336;
  background-color: #ffebee;
}

.answer-button:disabled {
  cursor: not-allowed;
}

.button-icon-img {
  width: 50px;
  height: 50px;
}

.button-text {
  font-family: 'Moon Get', sans-serif;
  font-size: 14px;
  color: #2d5016;
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
  border-left: 4px solid #cfe8a6;
  border-right: 4px solid #cfe8a6;
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
