<template>
  <div class="post-detail">
    <PageTitleTop />
    <div class="title">
      <h1>게시판</h1>
    </div>
    <br />
    <div class="parent-container">
      <SearchBarAndSort @search="filter" @sort="handleSortChange" />
    </div>
    <br />
    <div class="board-container">
      <div class="header-row">
        <div class="header-item">번호</div>
        <div class="header-item">제목</div>
        <div class="header-item">좋아요 수</div>
        <div class="header-item">작성시간</div>
      </div>
      <div v-for="(item, index) in paginatedData" :key="index" class="data-row" v-on:click="goToDetailPage(item)">
        <div class="data-item">{{ index + 1 }}</div>
        <div class="data-item">{{ item.title }}</div>
        <div class="data-item">{{ item.likeCount }}</div>
        <div class="data-item">
          {{ formatDate(item.createdAt) }}
          <button class="report-button" @click="reportPost(item)">신고</button>
        </div>
      </div>
      <PageNumAndWritingButton
          :currentPage="currentPage"
          :totalPages="totalPages"
          @changePage="goToPage"
          @writePage="goToWritePage"
      />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import SearchBarAndSort from "@/components/common/SearchBarAndSort.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import {ref, computed, onMounted} from 'vue';
import PageNumAndWritingButton from "@/components/common/PageNumAndWritingButton.vue";
import {useAuthStore} from "@/stores/auth.js";
import router from "@/router/index.js";

// 데이터 관련 상태
const currentPage = ref(1);
const itemsPerPage = 10;
const filteredData = ref([]);
const sortOption = ref("recent"); // 정렬 옵션 설정
const authStore = useAuthStore();

function goToDetailPage(item) {
  router.push(`/board/post/${item.postId}`);
}

// 전체 페이지 계산
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));

// 페이지네이션에 따른 데이터 계산
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredData.value.slice(start, end);
});

// 데이터 가져오기
const fetchData = async () => {
  let url = "";

  // 정렬 옵션에 따라 URL 설정
  if (sortOption.value === "recent") {
    url = "http://localhost:8003/post/recent";
  } else if (sortOption.value === "likes-desc") {
    url = "http://localhost:8003/post/likes/desc";
  } else if (sortOption.value === "likes-asc") {
    url = "http://localhost:8003/post/likes/asc";
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });
    filteredData.value.splice(0, filteredData.value.length, ...response.data);
    currentPage.value = 1;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
  }
};

// 페이지 변경
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

// 글쓰기 페이지로 이동
function goToWritePage() {
  window.location.href = '/board/post/create';
}

// 필터링 함수
const filter = (searchTerm) => {
  if (searchTerm.trim() === "") {
    fetchData(); // 검색어가 비어 있을 때는 전체 데이터를 가져옴
    return;
  }

  filteredData.value = filteredData.value.filter(item =>
      item.title.includes(searchTerm)
  );
  currentPage.value = 1;
};

// 정렬 옵션이 변경될 때 데이터 다시 가져오기
function handleSortChange(option) {
  sortOption.value = option;
  currentPage.value = 1;
  fetchData();
}

// 신고 함수
function reportPost(item) {
  // item 객체 구조 확인
  console.log("Received item:", item);

  // postId가 유효한지 확인 후, 페이지 이동
  if (item && item.postId) {
    router.push({
      name: 'ReportCreate',
      query: {
        target: "POST",
        targetId: item.postId
      }
    });
    console.log("신고 데이터:", item.postId); // postId가 올바르게 출력되는지 확인
  } else {
    console.error("Error: postId is undefined or item is invalid."); // 오류 메시지
  }
}


// 컴포넌트가 마운트될 때 데이터 가져오기
onMounted(() => {
  fetchData();
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
</script>

<style scoped>
.parent-container {
  display: flex;
  justify-content: center;
}

.post-detail {
  background-color: var(--background-color);
  min-height: 100vh;
  width: 100%;
}

.title {
  text-align: center;
}

.title h1 {
  font-size: 2em;
  font-weight: bold;
}

.board-container {
  width: 80%;
  margin: 0 auto;
  background-color: var(--white);
  padding: 0 20px;
  border-radius: 10px;
}

.header-row {
  display: flex;
  width: calc(100% + 40px);
  margin-left: -20px;
  background-color: var(--basic-yellow);
  padding: 15px;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}

.header-item {
  flex: 1;
  text-align: center;
}

.data-row {
  display: flex;
  padding: 15px;
  margin-bottom: 14px;
  border-bottom: 1px solid #ddd;
}

.data-item {
  flex: 1;
  text-align: center;
}

/* 신고 버튼 스타일 */
.report-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--gray-font);
  margin-left: 10px;
}

.report-button:hover {
  color: red;
}
</style>
