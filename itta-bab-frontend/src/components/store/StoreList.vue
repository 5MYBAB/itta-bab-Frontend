<script setup>
import { ref, computed } from 'vue';
import PageNumAndWritingButton from '@/components/common/PageNumAndWritingButton.vue';

const jsonData = [
  { menu_id: 1, menu_name: "서울 중앙 도서관", menu_price: 8000 },
  { menu_id: 2, menu_name: "부산 남구 도서관", menu_price: 10000 },
  { menu_id: 3, menu_name: "대구 북구 도서관", menu_price: 9000 },
  { menu_id: 4, menu_name: "광주 서구 도서관", menu_price: 8500 },
  { menu_id: 5, menu_name: "대전 동구 도서관", menu_price: 9500 },
  { menu_id: 6, menu_name: "대전 동구 도서관", menu_price: 9500 },
  { menu_id: 7, menu_name: "대전 동구 도서관", menu_price: 9500 },
  { menu_id: 8, menu_name: "대전 동구 도서관", menu_price: 9500 },
];


const currentPage = ref(1);
const itemsPerPage = 5;

const totalPages = computed(() => Math.ceil(jsonData.length / itemsPerPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return jsonData.slice(start, end);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function goToWritePage() {
  window.location.href = '/write'; // '글쓰기' 페이지로 이동
}
</script>

<template>
  <div class="store-container">
    <div class="header-row">
      <div class="header-item">가게 이름</div>
    </div>
    <div v-for="(item, index) in paginatedData" :key="index" class="store-item">
      <div class="store-name">
        <span class="name">{{ item.name }}</span>
        <span class="status">
          <input type="button" :value="item.status" :class="{'open-status': item.status === 'open', 'closed-status': item.status === 'close'}" id="submit-button">
        </span>
      </div>
      <div class="store-details">
        <span class="location">{{ item.location }}</span>
      </div>
      <div class="store-open-info">
        <span class="week">{{ item.week }}&nbsp;&nbsp;</span>
        <span class="time">{{ item.open_time }} ~ {{ item.end_time }}</span>
      </div>
    </div>

    <PageNumAndWritingButton
        :currentPage="currentPage"
        :totalPages="totalPages"
        @changePage="goToPage"
        @writePage="goToWritePage"
    />
  </div>
</template>

<style scoped>
.header-row {
  display: flex;
  background-color: var(--basic-yellow); /* 노란색 배경 */
  padding: 15px;
  border-radius: 10px 10px 0 0; /* 윗부분만 둥글게 */
  font-weight: bold;
}

input[type="button"] {
  border: none; /* 기본 테두리 제거 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 음영 추가 */
  padding: 10px 20px; /* 여백 추가 */
  border-radius: 20px; /* 모서리 둥글게 */
  color: black;
}

.store-container {
  width: 100%; /* 가로 크기를 절반으로 줄임 */
  float: right; /* 우측에 배치 */
  padding: 15px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
}

.store-item {
  flex-direction: column;
  padding: 15px 0;
  border-bottom: 2px solid #eaeaea;
}

.store-name {
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-right: 20px;
  margin-left: 50px;
}

.store-details {
  display: flex;
  justify-content: space-between;
  color: #555;
  font-size: 14px;
  margin-right: 50px;
  margin-left: 50px;
  margin-bottom: 10px;
}

.store-open-info {
  display: inline-flex;
  color: #555;
  font-size: 14px;
  margin-right: 50px;
  margin-left: 50px;
}

.location {
  flex: 1;
  text-align: left;
}

.time {
  flex: 1;
  text-align: right;
}

/* 상태에 따른 버튼 색상 정의 */
.open-status {
  background-color: #89F56C; /* 초록색 */
  color: white;
}

.closed-status {
  background-color: #F44336; /* 빨간색 */
  color: white;
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
</style>
