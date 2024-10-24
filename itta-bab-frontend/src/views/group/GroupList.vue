<script setup>
import axios from "axios";
import {computed, onMounted, provide, ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import BottomPageButton from "@/components/common/BottomPageButton.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";

// 카테고리 정보
const groupCategories = [
  {"group_category_id": 1, "group_category_name": "아침"},
  {"group_category_id": 2, "group_category_name": "점심"},
  {"group_category_id": 3, "group_category_name": "저녁"},
  {"group_category_id": 4, "group_category_name": "오락"},
  {"group_category_id": 5, "group_category_name": "음주"}
];

const authStore = useAuthStore();
const filteredData = ref([]); // 필터링된 데이터를 저장할 ref
const currentPage = ref(1);
const itemsPage = 10;

const fetchData = async () => {
  try {
    const groupResponse = await axios.get("http://localhost:8003/group/list", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      }
    });
    filteredData.value = groupResponse.data; // 데이터를 필터링된 데이터에 저장
    console.log(filteredData);

    // const groupCategoryResponse = await axios.get("http://localhost:8003/groupCategory")
  } catch (error) {
    console.error("어라라?", error);
  }
};


onMounted(() => {
  fetchData(); // 컴포넌트가 마운트될 때 데이터 가져오기
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPage;
  const end = start + itemsPage;
  return filteredData.value.slice(start, end); // 필터링된 데이터에서 페이지네이션
});

// 날짜 형식화 함수
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 카테고리 이름 반환 함수
function getCategoryName(categoryId) {
  const category = groupCategories.find(cat => cat.group_category_id === categoryId);
  return category ? category.group_category_name : "기타";
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function goToWRegisterPage() {
  window.location.href = '/register';
}

const filter = (searchTerm) => {
  if (searchTerm.trim() === "") { // 빈칸인지 확인
    fetchData(); // 검색어가 빈칸이면 전체 데이터를 다시 가져옴
    currentPage.value = 1; // 페이지를 1로 초기화
    return;
  }

  // 검색어가 포함된 항목만 필터링
  filteredData.value = filteredData.value.filter(item =>
      item.group_title.includes(searchTerm)
  );

  // 검색 후 현재 페이지를 1로 초기화
  currentPage.value = 1;
};

// filter를 제공
provide("filter", filter);
</script>

<template>
  <div class="background">
    <div class="title-section">
      <PageTitleTop/>
    </div>
    <div class="title">
      <h1>모임 리스트</h1>
    </div>
    <div class="search-container">
      <SearchBar @search="filter"/>
    </div>
    <div class="total-container">
      <div class="header-row">
        <div class="header-item">모임종류</div>
        <div class="header-item">제목</div>
        <div class="header-item">모집인원</div>
        <div class="header-item">마감시간</div>
      </div>

      <div class="list-style">
        <div
            v-for="item in paginatedData"
            :key="item.groupId"
            class="data-row"
        >
          <div class="data-item">{{ getCategoryName(item.groupCategoryId) }}</div>
          <div class="data-item">{{ item.groupId }}</div>
          <div class="data-item">{{ item.userCounting }}</div>
          <div class="data-item">{{ formatDate(item.endDate) }}</div>
        </div>
      </div>
    </div>

    <div class="bottom-container">
      <BottomPageButton
          :currentPage="currentPage"
          :totalPages="totalPages"
          @changePage="goToPage"
          @writePage="goToWRegisterPage"
      >등록
      </BottomPageButton>
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

.search-container {
  width: 80%;
  margin-bottom: 12px;
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

.data-row {
  display: flex;
  padding: 15px;
  margin-bottom: 14px; /* 아래 여백 추가 */
  border-bottom: 1px solid #ddd; /* 가로줄 추가 */
}

.data-item {
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

.list-style {
  background-color: white;
  border-radius: 0 0 10px 10px; /* 윗부분만 둥글게 */
}

.total-container {
  width: 80%;
}

.bottom-container {
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 세로 방향 가운데 정렬 */
  width: 80%; /* 너비를 설정하여 부모와 맞춤 */
}

.bottom-container button {
  justify-content: flex-end; /* 글쓰기 버튼을 오른쪽 끝 정렬 */
}

.title-section {
  width: 100%;
  justify-content: flex-start;
}

</style>