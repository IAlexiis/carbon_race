<script setup></script>

<template>
<body class="rules-page">
    <header>
        <h1>Rules</h1>
    </header>
    <section class="hero">
        <p>Here are the rules of Carbon Race.</p>
    </section>
    
    <div class="rules-card">
        <img src="" alt="Carbon Race Rules">
    </div>
    
    <div class="button-section">
        <router-link to="/">
            <button>Back to Home</button>
        </router-link>
    </div>
</body>
</template>

<style scoped>
.rules-page {
    justify-content: flex-start !important;
    height: auto !important;
    min-height: 100dvh;
    padding: 50px 0px;    
}

.rules-card {
    background-color: white;
    border-radius: 16px;
    padding: 20px;
    margin: 30px 0;
    box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.rules-card img {
    width: 100%;
    height: auto;
    border-radius: 8px;
}
</style>
