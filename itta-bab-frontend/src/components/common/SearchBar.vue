<script setup>
import {inject, ref} from 'vue';

const searchTerm = ref('');
const filter = inject("filter");

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    console.log('검색어:', searchTerm.value);
    if (searchTerm.value) {
      filter(searchTerm.value); // filter 함수 호출
    }else{
      filter("");
    }
  }
};
</script>

<template>
  <input class="search-bar"
         type="text"
         placeholder="원하는 내용을 작성해서 검색하세요."
         v-on:keydown="handleKeyDown"
         v-model="searchTerm"
  />
</template>

<style scoped>
.search-bar {
  background-color: white;
  border-radius: 25px;
  padding: 10px 15px;
  width: 70%; /* 부모 요소의 너비에 맞춤 */
  border: 1px solid var(--background-color);
  font-size: 1em; /* input의 폰트 크기 설정 */
  outline: none; /* 포커스 시 아웃라인 없애기 */
}

.search-bar:focus {
  outline: none; /* 포커스 시 아웃라인 없애기 */
}
</style>
