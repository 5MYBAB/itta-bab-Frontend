<template>
  <div>
    <div class="page-named">
      <button @click="$emit('changePage', currentPage - 1)" :disabled="currentPage === 1">〈</button>
      <span
          v-for="page in totalPages"
          :key="page"
          @click="$emit('changePage', page)"
          :class="{ active: currentPage === page }"
      >
        {{ page }}
      </span>
      <button @click="$emit('changePage', currentPage + 1)" :disabled="currentPage === totalPages">〉</button>
    </div>
  </div>
  <br>
</template>

<script setup>
import { defineProps } from 'vue';

// 부모 컴포넌트로부터 받을 props 정의
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});
</script>

<style scoped>
.page-named {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
}

.page-named span {
  cursor: pointer;
  padding: 5px 13px;
}
button{
  cursor: pointer;
  padding: 5px 13px;
  border:none;
  background-color: transparent;
}
.page-named .active {
  font-weight: bold;
  color: black;
  background-color: var(--basic-yellow);
  border-radius: 20px;
}
</style>
