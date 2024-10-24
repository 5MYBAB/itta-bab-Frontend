<script setup>
import UserDetailAndChatList from "@/components/user/UserDetailAndChatList.vue";
import UserTap from "@/components/user/UserTap.vue";
import Footer from "@/components/common/Footer.vue";
</script>

<template>
  <div class="setting">
    <UserDetailAndChatList/>
    <UserTap/>
    <Footer/>
  </div>
</template>


<style scoped>
.setting{
  background-color: var(--background-color);
}
</style>