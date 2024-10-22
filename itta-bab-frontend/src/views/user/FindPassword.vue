<script setup>
import FindPasswordForm from "@/components/user/FindPasswordForm.vue";
</script>

<template>
  <div class="back">
    <FindPasswordForm/>
  </div>
</template>

<style scoped>
.back {
  padding-top: 30px;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center; /* 세로 가운데 정렬 */
  flex-direction: column;
}
</style>