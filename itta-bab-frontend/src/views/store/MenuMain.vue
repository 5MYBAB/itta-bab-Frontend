<script setup>

import MenuList from "@/components/store/MenuList.vue";

</script>



<template>
  <div class="background">
    <div class="total-container">
      <div class="header-row">
        <div class="header-item">우리 할매 국밥</div>
      </div>
      <MenuList/>
    </div>
  </div>
</template>


<style scoped>


.background {
  display: flex; /* Flexbox 사용 */
  flex-direction: column; /* 세로 방향으로 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
  align-items: center; /* 수평 가운데 정렬 */
  width: 100%;
  background-color: var(--background-color); /* 전체 배경색 */
  padding: 20px;
  border-radius: 10px; /* 모서리 둥글게 */
}


.header-row {
  display: flex;
  background-color: var(--basic-yellow); /* 노란색 배경 */
  padding: 15px;
  border-radius: 10px 10px 0 0; /* 윗부분만 둥글게 */
  font-weight: bold;
}

.header-item {
  flex: 1;
  text-align: center;
}


.page-named span {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid var(--white);
  background-color: var(--white);
}

.page-named .active {
  font-weight: bold;
  color: black;
}

.total-container{
  width: 80%;
}

.bottom-container {
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 세로 방향 가운데 정렬 */
  margin-top: 20px; /* 필요한 경우 여백 추가 */
  width: 80%; /* 너비를 설정하여 부모와 맞춤 */
}

.bottom-container button{
  justify-content: flex-end; /* 글쓰기 버튼을 오른쪽 끝 정렬 */
}


</style>