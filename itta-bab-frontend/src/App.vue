<script setup>
import '@/assets/css/resetcss.css';
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import PostDetail from "@/views/board/PostDetail.vue";
import List from "@/components/common/List.vue";
import SearchBarAndSort from "@/components/common/SearchBarAndSort.vue";
import PageNumAndWritingButton from "@/components/common/PageNumAndWritingButton.vue";
</script>

<template>
  <Header/>
  <PostDetail/>

  <Footer/>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
</style>
