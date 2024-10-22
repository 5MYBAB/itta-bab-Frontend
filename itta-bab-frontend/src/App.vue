<script setup>
import '@/assets/css/resetcss.css';
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <Header>
    <nav>
      <RouterLink to="/" active-class="active">Home</RouterLink>
      <RouterLink to="/login" active-class="active">Login</RouterLink>
      <RouterLink to="/signup" active-class="active">SignUp</RouterLink>
    </nav>
  </Header>
  <main>
    <RouterView/>
  </main>
  <Footer/>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
</style>
