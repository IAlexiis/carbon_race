<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const allCards = ref([
  // Zone 1
  { zone: 1, zoneName: 'Devices & Manufacturing', cardNumber: 1, question: 'You need a smartphone. Which is the most eco-friendly?', answer: 'b) Refurbished', carbon: '–2', explanation: 'Refurbished devices reuse components, reducing energy and resource use.' },
  { zone: 1, zoneName: 'Devices & Manufacturing', cardNumber: 2, question: 'Computer is slow but works. What do you do?', answer: 'b) Update software', carbon: '–2', explanation: 'Updating prolongs life, avoids unnecessary production.' },
  { zone: 1, zoneName: 'Devices & Manufacturing', cardNumber: 3, question: 'Buying a device: which reduces carbon most?', answer: 'b) Check repairability/modularity', carbon: '–2', explanation: 'Repairable devices last longer and generate less e-waste.' },
  { zone: 1, zoneName: 'Devices & Manufacturing', cardNumber: 4, question: 'Choose a work computer:', answer: 'b) Modular and durable with replaceable battery', carbon: '–3', explanation: 'Durable and modular devices reduce long-term environmental impact.' },
  { zone: 1, zoneName: 'Devices & Manufacturing', cardNumber: 5, question: 'Phone battery is low. What do you do?', answer: 'b) Replace battery', carbon: '–2', explanation: 'Replacing batteries prolongs life and avoids unnecessary production.' },
  { zone: 1, zoneName: 'Devices & Manufacturing', cardNumber: 6, question: 'To reduce purchase impact:', answer: 'a) Check Green IT label and repairability', carbon: '–1', explanation: 'Labels guide eco-friendly, energy-efficient choices.' },
  { zone: 1, zoneName: 'Devices & Manufacturing', cardNumber: 7, question: 'Remote work computer: best choice?', answer: 'c) Old but repaired', carbon: '–2', explanation: 'Repairing old devices reduces e-waste.' },
  { zone: 1, zoneName: 'Devices & Manufacturing', cardNumber: 8, question: 'Phone with non-removable battery:', answer: 'c) Repair with specialist', carbon: '–2', explanation: 'Specialist repairs reduce environmental impact by extending device life.' },
  { zone: 1, zoneName: 'Devices & Manufacturing', cardNumber: 9, question: 'Choosing a laptop:', answer: 'a) Lightweight and durable', carbon: '–1', explanation: 'Lightweight, durable laptops require less material and energy.' },
  { zone: 1, zoneName: 'Devices & Manufacturing', cardNumber: 10, question: 'Reduce energy impact:', answer: 'a) Choose low-energy device', carbon: '–2', explanation: 'Energy-efficient devices lower both operational and lifecycle carbon footprint.' },
  
  // Zone 2
  { zone: 2, zoneName: 'UX & Digital Behavior', cardNumber: 1, question: 'You need to watch a movie. Which is the most eco-friendly?', answer: 'b) Streaming SD', carbon: '–1', explanation: 'SD reduces data transfer and energy use.' },
  { zone: 2, zoneName: 'UX & Digital Behavior', cardNumber: 2, question: 'How to reduce social media impact?', answer: 'a) Delete some apps', carbon: '–1', explanation: 'Reducing app usage decreases digital traffic.' },
  { zone: 2, zoneName: 'UX & Digital Behavior', cardNumber: 3, question: 'Listening to music: lowest energy consumption?', answer: 'b) Low-quality streaming', carbon: '–1', explanation: 'Smaller files require less energy to stream.' },
  { zone: 2, zoneName: 'UX & Digital Behavior', cardNumber: 4, question: 'How to limit notifications impact?', answer: 'a) Disable them', carbon: '–1', explanation: 'Fewer notifications reduce server load.' },
  { zone: 2, zoneName: 'UX & Digital Behavior', cardNumber: 5, question: 'How to reduce daily streaming impact?', answer: 'a) SD + download important videos', carbon: '–2', explanation: 'Lower quality + selective downloads minimize data transfer.' },
  { zone: 2, zoneName: 'UX & Digital Behavior', cardNumber: 6, question: 'Daily web usage: most sustainable?', answer: 'a) Read online vs download', carbon: '–1', explanation: 'Avoiding unnecessary downloads reduces server energy.' },
  { zone: 2, zoneName: 'UX & Digital Behavior', cardNumber: 7, question: 'Watching long video series: most eco-friendly?', answer: 'a) Stream in SD', carbon: '–1', explanation: '' },
  { zone: 2, zoneName: 'UX & Digital Behavior', cardNumber: 8, question: 'Music streaming for hours: best approach?', answer: 'a) Low-quality, avoid autoplay', carbon: '–2', explanation: '' },
  { zone: 2, zoneName: 'UX & Digital Behavior', cardNumber: 9, question: 'Device setting to reduce impact?', answer: 'a) Dark mode', carbon: '–1', explanation: '' },
  { zone: 2, zoneName: 'UX & Digital Behavior', cardNumber: 10, question: 'Reducing online footprint: best option?', answer: 'a) Limit usage + SD streaming', carbon: '–2', explanation: '' },
  
  // Zone 3
  { zone: 3, zoneName: 'Code & Development', cardNumber: 1, question: 'You want to reduce website energy use. Best choice?', answer: 'a) Optimize images', carbon: '–2', explanation: 'Optimized images reduce server load and energy consumption.' },
  { zone: 3, zoneName: 'Code & Development', cardNumber: 2, question: 'How to reduce server load from unused code?', answer: 'a) Remove unused scripts', carbon: '–1', explanation: 'Removing unused scripts decreases unnecessary processing.' },
  { zone: 3, zoneName: 'Code & Development', cardNumber: 3, question: 'Page speed: what reduces carbon footprint?', answer: 'a) Minimize load time', carbon: '–2', explanation: 'Faster sites use less energy for users and servers.' },
  { zone: 3, zoneName: 'Code & Development', cardNumber: 4, question: "You're choosing frameworks for a project. Which reduces energy impact?", answer: 'a) Lightweight, efficient framework', carbon: '–3', explanation: 'Simple, efficient frameworks reduce processing and energy.' },
  { zone: 3, zoneName: 'Code & Development', cardNumber: 5, question: 'Video on your site: best eco choice?', answer: 'a) Compressed', carbon: '–1', explanation: 'Compression reduces bandwidth and server energy use.' },
  { zone: 3, zoneName: 'Code & Development', cardNumber: 6, question: 'Website caching: why do it?', answer: 'a) Reduce repeated server requests', carbon: '–2', explanation: 'Fewer server requests reduce energy usage.' },
  { zone: 3, zoneName: 'Code & Development', cardNumber: 7, question: 'CSS & JS: best eco practice?', answer: 'a) Minify and optimize', carbon: '–2', explanation: '' },
  { zone: 3, zoneName: 'Code & Development', cardNumber: 8, question: 'Website has multiple scripts not used:', answer: 'a) Remove them', carbon: '–2', explanation: '' },
  { zone: 3, zoneName: 'Code & Development', cardNumber: 9, question: 'Images on a website:', answer: 'a) Compressed formats', carbon: '–2', explanation: '' },
  { zone: 3, zoneName: 'Code & Development', cardNumber: 10, question: 'Page load time optimization: best method?', answer: 'a) Reduce heavy scripts', carbon: '–2', explanation: '' },
  
  // Zone 4
  { zone: 4, zoneName: 'Servers & Data', cardNumber: 1, question: 'How can you reduce cloud storage energy use?', answer: 'a) Delete unnecessary files', carbon: '–2', explanation: 'Deleting files reduces storage space and server energy consumption.' },
  { zone: 4, zoneName: 'Servers & Data', cardNumber: 2, question: 'What is the best hosting choice for sustainability?', answer: 'a) Green hosting provider', carbon: '–3', explanation: 'Renewable-powered servers lower overall emissions.' },
  { zone: 4, zoneName: 'Servers & Data', cardNumber: 3, question: 'Uploading large files efficiently:', answer: 'a) Compress files', carbon: '–1', explanation: 'Compression reduces bandwidth and server energy usage.' },
  { zone: 4, zoneName: 'Servers & Data', cardNumber: 4, question: 'How to handle backups sustainably?', answer: 'a) Keep only necessary backups', carbon: '–2', explanation: 'Limiting backups reduces storage energy.' },
  { zone: 4, zoneName: 'Servers & Data', cardNumber: 5, question: 'Database queries impact energy. Best practice?', answer: 'a) Optimize queries', carbon: '–2', explanation: 'Efficient queries reduce server processing and energy.' },
  { zone: 4, zoneName: 'Servers & Data', cardNumber: 6, question: 'Scheduling backups: best time to reduce energy?', answer: 'a) Off-peak hours', carbon: '–1', explanation: 'Off-peak scheduling reduces power peaks in data centers.' },
  { zone: 4, zoneName: 'Servers & Data', cardNumber: 7, question: 'Reducing redundant storage:', answer: 'a) Delete duplicates', carbon: '–2', explanation: '' },
  { zone: 4, zoneName: 'Servers & Data', cardNumber: 8, question: 'You notice repeated queries for same data:', answer: 'a) Cache results', carbon: '–2', explanation: '' },
  { zone: 4, zoneName: 'Servers & Data', cardNumber: 9, question: 'Files uploaded rarely accessed:', answer: 'a) Compress and archive', carbon: '–1', explanation: '' },
  { zone: 4, zoneName: 'Servers & Data', cardNumber: 10, question: 'Choosing web provider: which reduces impact?', answer: 'a) Green energy provider', carbon: '–3', explanation: '' }
])

const filteredCards = computed(() => {
  if (!searchQuery.value.trim()) {
    return allCards.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return allCards.value.filter(card => 
    card.question.toLowerCase().includes(query) ||
    card.answer.toLowerCase().includes(query) ||
    card.explanation.toLowerCase().includes(query)
  )
})

const getZoneClass = (zone) => {
  const zoneClasses = {
    1: 'zone-devices',
    2: 'zone-user',
    3: 'zone-code',
    4: 'zone-servers'
  }
  return zoneClasses[zone] || ''
}

const groupedCards = computed(() => {
  const grouped = {}
  filteredCards.value.forEach(card => {
    if (!grouped[card.zone]) {
      grouped[card.zone] = {
        zoneName: card.zoneName,
        cards: []
      }
    }
    grouped[card.zone].cards.push(card)
  })
  return grouped
})
</script>

<template>
<div class="answers-page">
    <div class="answers-container">
        <header class="answers-header">
            <img src="../assets/images/answers.png" alt="Answers" class="title-image">
        </header>
        
        <div class="answers-content">
            <section class="intro-section">
                <p>All answers to the Choice Cards organized by zone. Use this as a reference during your game!</p>
            </section>

            <!-- Search Bar -->
            <div class="search-section">
                <input 
                    type="text" 
                    v-model="searchQuery" 
                    placeholder="🔍 Search for a question or answer..."
                    class="search-input"
                />
            </div>

            <!-- Display message if no results -->
            <div v-if="Object.keys(groupedCards).length === 0" class="no-results">
                <p>No results found for "{{ searchQuery }}"</p>
            </div>

            <!-- Grouped Cards by Zone -->
            <template v-for="(zoneData, zoneNumber) in groupedCards" :key="zoneNumber">
                <section class="zone-section" :class="getZoneClass(parseInt(zoneNumber))">
                    <h2>Zone {{ zoneNumber }}: {{ zoneData.zoneName }}</h2>
                    
                    <div class="card-group">
                        <h3>Choice Cards Answers</h3>
                        
                        <div 
                            v-for="card in zoneData.cards" 
                            :key="`${card.zone}-${card.cardNumber}`"
                            class="answer-card"
                        >
                            <p class="card-number">Card {{ card.cardNumber }}</p>
                            <p class="question">{{ card.question }}</p>
                            <p class="answer">✅ <strong>{{ card.answer }}</strong> → {{ card.carbon }} carbon</p>
                            <p v-if="card.explanation" class="explanation">{{ card.explanation }}</p>
                        </div>
                    </div>
                </section>
            </template>
        </div>

        <div class="button-section-back">
            <router-link to="/">
                <button>Back to Home</button>
            </router-link>
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

.answers-page {
  background-color: #b4d288;
  min-height: 100vh;
  padding: 0;
  box-sizing: border-box;
}

.answers-container {
  border: 15px solid #b4d288;
  border-radius: 32px;
  background-color: #f7efe8;
  padding: 30px 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

.answers-header {
  text-align: center;
  margin-bottom: 20px;
}

.title-image {
  max-width: 250px;
  width: 100%;
  height: auto;
}

.answers-content {
  font-family: 'Montserrat', sans-serif;
  color: #333;
}

.intro-section {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.intro-section p {
  font-size: 11px;
  line-height: 1.6;
  margin: 0;
}

.search-section {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #b4d288;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  box-sizing: border-box;
  background-color: white;
  color: #333;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: #9dc56d;
}

.search-input::placeholder {
  color: #999;
}

.no-results {
  background-color: #fff9e6;
  border-left: 4px solid #ffc107;
  border-right: 4px solid #ffc107;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
}

.no-results p {
  font-size: 11px;
  color: #f57c00;
  margin: 0;
  font-weight: 600;
}

.zone-section {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
}

.zone-section.zone-devices {
  background-color: #a7d4eb;
}

.zone-section.zone-user {
  background-color: #cfe8a6;
}

.zone-section.zone-code {
  background-color: #e0c5fc;
}

.zone-section.zone-servers {
  background-color: #f7a88a;
}

.zone-section h2 {
  font-family: 'Moon Get', sans-serif;
  font-size: 16px;
  color: #2d5016;
  margin-bottom: 15px;
  text-align: center;
}

.card-group {
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
}

.card-group h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  color: #2d5016;
  margin-bottom: 15px;
  text-align: center;
}

.answer-card {
  background-color: #e8f3dc;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border-left: 3px solid #b4d288;
  border-right: 3px solid #b4d288;
}

.answer-card:last-child {
  margin-bottom: 0;
}

.answer-card .card-number {
  font-size: 9px;
  font-weight: 700;
  color: #9dc56d;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.answer-card .question {
  font-size: 11px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.answer-card .answer {
  font-size: 11px;
  color: #2d5016;
  margin-bottom: 6px;
  font-weight: 600;
}

.answer-card .explanation {
  font-size: 10px;
  color: #666;
  font-style: italic;
  line-height: 1.5;
  margin: 0;
}

.button-section-back {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.button-section-back a {
  width: 70%;
  max-width: 300px;
  text-decoration: none;
}

button {
  background-color: #cfe8a6;
  border-radius: 16px;
  padding: 12px 18px;
  border: none;
  width: 100%;
  font-family: 'Moon Get', sans-serif;
  font-size: 11px;
  box-shadow: 3px -5px 0px #9dc56d;
  color: #2d5016;
  cursor: pointer;
  transition: transform 0.15s ease, filter 0.15s ease;
}

button:hover {
  transform: scale(1.02);
  filter: brightness(1.05);
}

button:active {
  transform: scale(0.98);
  filter: brightness(0.95);
}
</style>
