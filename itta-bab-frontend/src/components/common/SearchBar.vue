<template>
    <input class="search-bar" type="text" placeholder="원하는 내용을 작성해서 검색하세요." />
</template>

<style scoped>

.search-bar {
  background-color: white;
  border-radius: 25px;
  padding: 10px 15px;
  width: 100%; /* 부모 요소의 너비에 맞춤 */
  border: 1px solid var(--background-color);
  font-size: 1em; /* input의 폰트 크기 설정 */
  outline: none; /* 포커스 시 아웃라인 없애기 */
}

.search-bar:focus {
  outline: none; /* 포커스 시 아웃라인 없애기 */
}
</style>