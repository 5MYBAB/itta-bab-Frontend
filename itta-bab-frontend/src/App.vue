<script setup>
import '@/assets/css/resetcss.css';
import { RouterView } from "vue-router";
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
</script>

<template>
  <Header/>
  <main>
    <RouterView/>
  </main>
  <Footer/>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
</style>
