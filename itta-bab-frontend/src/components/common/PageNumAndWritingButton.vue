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
    <div class="button-container">
      <button class="write-button" @click="$emit('writePage')">글쓰기</button>
    </div>
  </div>
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
  padding: 5px 10px;
  border: 1px solid var(--gray-font);
  background-color: var(--white);
}

.page-named .active {
  font-weight: bold;
  color: black;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 100%;
}

.write-button {
  background-color: var(--basic-yellow);
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
}

.write-button:hover {
  background-color: #EBC823;
}
</style>
