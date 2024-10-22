<script setup>
import FindIdForm from "@/components/user/FindIdForm.vue";
</script>

<template>
  <div class="back">
    <FindIdForm/>
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