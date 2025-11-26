<script setup></script>

<template>
<div class="home-page">
    <div class="home-container">
        
        <div class="content-wrapper">
            <header>
                <img src="../assets/images/titre.png" alt="Carbon Race" class="title-image">
            </header>
            
            <section class="hero">
                <div class="hero-card">
                    <p>A quick and accessible companion for your Carbon Race game.
                    Find the rules, answer keys, and play mini-games directly from your mobile.</p>
                </div>
            </section>
            
            <div class="button-section">
                <router-link to="/rules">
                    <button>📖 Rules</button>
                </router-link>
                <router-link to="/answers">
                    <button>✅ Answers</button>
                </router-link>
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

.home-page {
  background-color: #b4d288;
  height: 100dvh;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.home-container {
  border: 15px solid #b4d288;
  border-radius: 32px;
  background-color: #f7efe8;
  height: 100dvh;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
}

.content-wrapper {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  z-index: 1;
}

header {
  text-align: center;
  width: 100%;
  margin-top: -30px;
}

.title-image {
  max-width: 320px;
  width: 100%;
  height: auto;
}

.hero {
  width: 100%;
}

.hero-card {
  background: white;
  padding: 15px;
  border-radius: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #b4d288;
  border-right: 4px solid #b4d288;

}

.hero-card p {
  font-size: 13px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.7;
  margin: 0;
  color: #333;
}

.button-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}

.button-section a {
  width: 100%;
  max-width: 280px;
  text-decoration: none;
}

button {
  background: linear-gradient(135deg, #cfe8a6 0%, #b4d288 100%);
  border-radius: 16px;
  padding: 14px 20px;
  border: none;
  width: 100%;
  font-family: 'Moon Get', sans-serif;
  font-size: 16px;
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
