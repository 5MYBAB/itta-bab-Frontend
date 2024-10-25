<script setup>
import UserDetailAndChatList from "@/components/user/UserDetailAndChatList.vue";
import UserTap from "@/components/user/UserTap.vue";
</script>

<template>
  <div class="setting">
    <UserDetailAndChatList/>
    <UserTap/>
  </div>
</template>

<style scoped>
.setting {
  background-color: var(--background-color);
}
</style>