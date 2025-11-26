<script setup></script>

<template>
<body>
    <img src="../assets/images/Leaf-Icon-PNG-Photos.png" alt="Leaf" class="floating-leaf">
    <img src="../assets/images/portable-network-graphics-vector-graphics-clip-art-image-cloud-png-favpng-HHPjKeJvv8gnjVCBFyR7Zxm77-removebg-preview.png" alt="cloud" class="floating-cloud">
    <header>
        <h1>Carbon Race</h1>
    </header>
    <section class="hero">
        <p>A quick and accessible companion for your Carbon Race game.
        Find the rules, answer keys, and play mini-games directly from your mobile.</p>
    </section>
    <div class="button-section">
        <router-link to="/rules">
            <button>Rules</button>
        </router-link>
        <router-link to="/answers">
            <button>Answers</button>
        </router-link>
    </div>
</body>
</template>

<style scoped></style>
