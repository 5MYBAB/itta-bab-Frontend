<script setup>
import { ref, defineEmits } from 'vue';
// emit 함수 정의
const emit = defineEmits(['search']);
const onSearch = (event) => {
  // 부모 컴포넌트로 검색어를 emit
  const searchTerm = event.target.value;
  emit('search', searchTerm);
};
</script>

<template>
  <div class="search-sort-container">
    <div class="search-bar">
      <input type="text" placeholder="가게명으로 검색하세요."
             @input="onSearch"
      />
    </div>
    <div class="sort-dropdown">
      <select @change="$emit('sort', $event.target.value)">
        <option value="open">영업중</option>
        <option value="popular">인기순</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.search-sort-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 80px;
  width: 90%;
}
.search-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 25px;
  padding: 10px 15px;
  width: 70%;
  border: 1px solid var(--background-color);
  flex: 1;
  margin: 75px 0 20px 300px;
}
.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1em;
}
.sort-dropdown {
  flex-shrink: 0;
}
.sort-dropdown select {
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--white);
  background-color: var(--white);
  margin: 75px 0 20px;
}
</style>
