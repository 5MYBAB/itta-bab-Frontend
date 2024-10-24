<script setup>
import StoreMapApi from "@/components/common/StoreMapApi.vue";
import StoreSearchBarAndSort from "@/components/common/StoreSearchBarAndSort.vue";
import {computed, provide ,ref} from "vue";
import BottomPageButton from "@/components/common/BottomPageButton.vue";

/* 테스트 데이터 */
const jsonData = [
  { name: "서울 중앙 도서관", status: "open", location: "서울", week: "월-금", open_time: "09:00", end_time: "18:00" },
  { name: "부산 남구 도서관", status: "close", location: "부산", week: "월-금", open_time: "09:00", end_time: "17:00" },
  { name: "대구 북구 도서관", status: "open", location: "대구", week: "월-토", open_time: "10:00", end_time: "19:00" },
  { name: "광주 서구 도서관", status: "open", location: "광주", week: "화-일", open_time: "09:30", end_time: "18:30" },
  { name: "대전 동구 도서관", status: "close", location: "대전", week: "월-금", open_time: "08:30", end_time: "17:30" },
  { name: "울산 북구 도서관", status: "open", location: "울산", week: "월-토", open_time: "09:00", end_time: "18:00" },
  { name: "인천 서구 도서관", status: "open", location: "인천", week: "화-일", open_time: "09:00", end_time: "18:00" },
  { name: "제주 서귀포 도서관", status: "close", location: "제주", week: "월-금", open_time: "10:00", end_time: "17:00" },
];

const filteredData = ref(jsonData); // 필터링된 데이터를 저장할 ref
const currentPage = ref(1);
const itemsPerPage = 5;

const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return filteredData.value.slice(start, end); // 필터링된 데이터에서 페이지네이션
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function goToWritePage() {
  window.location.href = '/write'; // '글쓰기' 페이지로 이동
}

const filter = (searchTerm) => {
  if (searchTerm.trim() === "") { // 빈칸인지 확인
    filteredData.value = jsonData; // 검색어가 빈칸이면 전체 데이터를 보여줌
    return;
  }

  // 검색어가 포함된 항목만 필터링
  filteredData.value = jsonData.filter(item =>
      item.name.includes(searchTerm)
  );

};

// filter를 제공
provide("filter", filter);

</script>

<template>
  <div class="post-detail">
    <StoreSearchBarAndSort @search="filter"/>
    <div class="white-box">
      <div id="map"><StoreMapApi/></div>
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

        <BottomPageButton
            :currentPage="currentPage"
            :totalPages="totalPages"
            @changePage="goToPage"
            @writePage="goToWritePage"
        >가게 등록
        </BottomPageButton>
      </div>

    </div>
  </div>
</template>

<style scoped>
.white-box {
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.13) inset;
  border-radius: 43px;
  background-color: var(--white);
  max-width: 1000px;
  width: 100%;
  padding: 65px 100px;
  margin: 0 auto;
}

.post-detail{/*배경 화면 노란색으로 설정하는 부분*/
  background-color: var(--background-color); /* 노란색 배경 */
  min-height: 100vh; /* 화면 전체 높이 */
  width: 100%;
}

#map {
  width: 100%;
  height: 500px;
  margin-right: 20px;
}

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
