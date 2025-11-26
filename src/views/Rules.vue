<script setup></script>

<template>
<div class="rules-page">
    <div class="rules-container">
        <header class="rules-header">
            <img src="../assets/images/titre.png" alt="Carbon Race" class="title-image">
        </header>
        
        <div class="rules-content">
            <section class="rule-section">
                <h2>🎯 Goal of the Game</h2>
                <p>Travel through the four zones of the digital lifecycle and reach the end of the board with the lowest carbon score. Every choice, question and mini-game affects your carbon impact.</p>
            </section>

            <section class="rule-section">
                <h2>🎲 Setup</h2>
                <ul>
                    <li>Place the board on the table and put all pawns on the Start space.</li>
                    <li>Shuffle the Event Cards and Question Cards separately.</li>
                    <li>The mini-games are playables with QR code on the web app.</li>
                    <li>Give each team a score sheet.</li>
                </ul>
            </section>

            <section class="rule-section">
                <h2>▶️ How to Play</h2>
                <ul>
                    <li>Players / teams take turns clockwise.</li>
                    <li>Roll the die and move your pawn forward.</li>
                    <li>Apply the effect of the space you land on.</li>
                    <li>When you cross a Mini-Game space, stop immediately on it even with your die score is bigger.</li>
                </ul>
                <div class="important-note">
                    <strong>⚠️ Important :</strong>
                    <ul>
                        <li>If your movement comes from a board Event, you apply the effect of the new space.</li>
                        <li>If your movement comes from a permutation effect, you do NOT apply the effect of the space you arrive on.</li>
                    </ul>
                </div>
            </section>

            <section class="rule-section">
                <h2>🎴 Types of Spaces</h2>
                
                <div class="space-type">
                    <h3>Event Space</h3>
                    <p>Draw an Event Card and apply its carbon impact (+1 to +3 or –1 to –3). These cards represent digital actions with real ecological consequences.</p>
                </div>

                <div class="space-type">
                    <h3>Question Space</h3>
                    <p>Draw a Question Card, the other team ask you the question. (Easy • Medium • Hard).</p>
                    <p>You have 30 seconds to answer. The other team can read the answer at the bottom of the card or check it in the web app.</p>
                    <p>Correct answers reduce carbon; wrong answers add carbon :</p>
                    <ul>
                        <li>Easy: –1 / +1</li>
                        <li>Medium: –2 / +2</li>
                        <li>Hard: –3 / +3</li>
                    </ul>
                </div>

                <div class="space-type">
                    <h3>Mini-Game Space</h3>
                    <p>Marks the end of a Zone. When you reach it, perform the mini-game (Webapp or card).</p>
                    <p>Success reduces carbon; failure increases it (–3 to –5 / +3 to +5).</p>
                    <p>Then place your pawn on the Start of the next Zone.</p>
                </div>

                <div class="space-type">
                    <h3>Neutral Space</h3>
                    <p>No effect.</p>
                </div>
            </section>

            <section class="rule-section">
                <h2>🌍 The Four Zones</h2>
                <p>The board is divided into 4 Zones representing key stages of digital impact :</p>
                <div class="zones-grid">
                    <div class="zone-card">
                        <h4>Devices & Manufacturing</h4>
                        <p>production, materials, transport</p>
                    </div>
                    <div class="zone-card">
                        <h4>User Behavior</h4>
                        <p>streaming, social networks, usage habits</p>
                    </div>
                    <div class="zone-card">
                        <h4>Code & Development</h4>
                        <p>page weight, optimization, scripts</p>
                    </div>
                    <div class="zone-card">
                        <h4>Servers & Data</h4>
                        <p>storage, cloud, data centers</p>
                    </div>
                </div>
                <p class="zone-note">Each Zone ends with a Mini-Game.</p>
            </section>

            <section class="rule-section end-section">
                <h2>🏁 End of the Game</h2>
                <p>The game ends once all players reach the final space. Compare carbon scores and read your profile :</p>
                <div class="profiles">
                    <div class="profile eco">–10 or less : <strong>Eco-User</strong> – Master of Sustainable Digital Use</div>
                    <div class="profile responsible">0 to –9 : <strong>Responsible User</strong></div>
                    <div class="profile standard">1 to 10 : <strong>Standard User</strong></div>
                    <div class="profile polluter">11 to 20 : <strong>Digital Polluter</strong></div>
                    <div class="profile mega-polluter">21+ : <strong>Cyber-Mega-Polluter</strong></div>
                </div>
            </section>
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

.rules-page {
  background-color: #f7efe8;
  min-height: 100vh;
  padding: 0;
  box-sizing: border-box;
}

.rules-container {
  border: 15px solid #b4d288;
  background-color: #f7efe8;
  padding: 30px 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

.rules-header {
  text-align: center;
  margin-bottom: 30px;
}

.title-image {
  max-width: 300px;
  width: 100%;
  height: auto;
}

.rules-content {
  font-family: 'Montserrat', sans-serif;
  color: #333;
}

.rule-section {
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
}

.rule-section h2 {
  font-family: 'Moon Get', sans-serif;
  font-size: 22px;
  color: #2d5016;
  margin-bottom: 15px;
}

.rule-section p {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 10px;
}

.rule-section ul {
  margin-left: 20px;
  margin-top: 10px;
}

.rule-section li {
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 8px;
}

.important-note {
  background-color: #fff9e6;
  border-left: 4px solid #ffc107;
  padding: 15px;
  margin-top: 15px;
  border-radius: 8px;
}

.important-note strong {
  display: block;
  margin-bottom: 10px;
  color: #f57c00;
}

.important-note ul {
  margin-left: 20px;
  margin-top: 5px;
}

.space-type {
  background-color: #f8fdf4;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  border-left: 3px solid #b4d288;
}

.space-type h3 {
  font-size: 16px;
  color: #2d5016;
  margin-bottom: 8px;
  font-weight: 600;
}

.space-type p {
  font-size: 13px;
  margin-bottom: 5px;
}

.space-type ul {
  margin-left: 20px;
  margin-top: 8px;
}

.zones-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
}

.zone-card {
  background: linear-gradient(135deg, #cfe8a6 0%, #b4d288 100%);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

.zone-card h4 {
  font-size: 14px;
  font-weight: 700;
  color: #2d5016;
  margin-bottom: 8px;
}

.zone-card p {
  font-size: 11px;
  color: #4a6b2f;
  line-height: 1.4;
}

.zone-note {
  font-style: italic;
  color: #666;
  text-align: center;
  margin-top: 15px;
}

.end-section .profiles {
  margin-top: 15px;
}

.profile {
  padding: 12px 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: 13px;
  border-left: 4px solid;
}

.profile.eco {
  background-color: #e8f5e9;
  border-color: #4caf50;
  color: #2e7d32;
}

.profile.responsible {
  background-color: #f1f8e9;
  border-color: #8bc34a;
  color: #558b2f;
}

.profile.standard {
  background-color: #fff9e6;
  border-color: #ffc107;
  color: #f57c00;
}

.profile.polluter {
  background-color: #ffe6e6;
  border-color: #ff9800;
  color: #e65100;
}

.profile.mega-polluter {
  background-color: #ffebee;
  border-color: #f44336;
  color: #c62828;
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
  padding: 12px 20px;
  border: none;
  width: 100%;
  font-family: 'Moon Get', sans-serif;
  font-size: 14px;
  box-shadow: 3px -5px 0px #9dc56d;
  color: #2d5016;
  cursor: pointer;
}
</style>
