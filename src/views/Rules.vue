<script setup></script>

<template>
<div class="rules-page">
    <header class="rules-header">
        <h1>Rules</h1>
    </header>
    <section class="hero-rules">
        <p>Here are the rules of Carbon Race.</p>
    </section>
    
    <div class="rules-card">
        <img src="../assets/images/carbon-race-02.webp" alt="Carbon Race Rules">
    </div>

    <div class="rules-card">
        <img src="../assets/images/carbon-race-03.webp" alt="Carbon Race Rules">
    </div>
    
    <div class="button-section-back">
        <router-link to="/">
            <button>Back to Home</button>
        </router-link>
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

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.rules-page {
  font-family: 'Moon Get', sans-serif;
  background-color: #f7efe8;
  padding: 30px 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: auto;
  margin: 0;
  box-sizing: border-box;
  min-height: 100vh;
}

.rules-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
}

h1 {
  font-size: 28px;
  text-align: center;
}

.hero-rules {
  margin-bottom: 20px;
}

.hero-rules p {
  font-size: 14px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

.rules-card {
    background-color: white;
  border-radius: 16px;
  padding: 20px;
  margin: 10px 0 30px 0px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.rules-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.button-section-back {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 30px 0;
}

.button-section-back a {
  width: 70%;
  text-decoration: none;
}

button {
  background-color: #cfe8a6;
  border-radius: 16px;
  padding: 10px 20px;
  border: none;
  width: 100%;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 3px -5px 0px #9dc56d;
  color: black;
  cursor: pointer;
}
</style>
