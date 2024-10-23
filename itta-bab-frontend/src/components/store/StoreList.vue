<script setup>
import { ref, computed } from 'vue';
import PageNumAndWritingButton from '@/components/common/PageNumAndWritingButton.vue';

const jsonData = [
  { id: 1, name: "서울 중앙 도서관", location: "서울시 종로구", open_time: "09:00", end_time: "18:00", week: "월, 화. 수, 목", status: "open" },
  { id: 2, name: "부산 남구 도서관", location: "부산시 남구", open_time: "10:00", end_time: "19:00", week: "월, 화. 수, 목", status: "open" },
  { id: 3, name: "대구 북구 도서관", location: "대구시 북구", open_time: "09:30", end_time: "18:30", week: "월, 화. 수, 목", status: "open" },
  { id: 4, name: "광주 서구 도서관", location: "광주시 서구", open_time: "08:00", end_time: "17:00", week: "월, 화. 수, 목", status: "open" },
  { id: 5, name: "대전 동구 도서관", location: "대전시 동구", open_time: "09:00", end_time: "18:00", week: "월, 화. 수, 목" , status: "open"},
  { id: 6, name: "대전 동구 도서관", location: "대전시 동구", open_time: "09:00", end_time: "18:00", week: "월, 화. 수, 목" ,status: "close"},
  { id: 7, name: "대전 동구 도서관", location: "대전시 동구", open_time: "09:00", end_time: "18:00", week: "월, 화. 수, 목",status: "close" },
  { id: 8, name: "대전 동구 도서관", location: "대전시 동구", open_time: "09:00", end_time: "18:00", week: "월, 화. 수, 목",status: "close" },
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

input[type="button"] {
  border: none; /* 기본 테두리 제거 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 음영 추가 */
  padding: 10px 20px; /* 여백 추가 */
  border-radius: 20px; /* 모서리 둥글게 */
  color: black;
}

.store-container {
  width: 70%; /* 가로 크기를 절반으로 줄임 */
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
  margin-right: 50px;
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
