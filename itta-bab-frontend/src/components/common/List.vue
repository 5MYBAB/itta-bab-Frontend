<script setup>
import { ref, computed } from 'vue';
import PageNumAndWritingButton from '@/components/common/PageNumAndWritingButton.vue';
const jsonData = [ //테스트용 JSON 데이터 추후에 제거 예정
  { title: "프론트엔드 고수 되는 법", likes: 15, date: "2024-10-11 12:00" },
  { title: "신대방 삼거리의 괴담(3)", likes: 55, date: "2024-10-08 13:43" },
  { title: "Vue.js와 Spring Boot 연동하기", likes: 30, date: "2024-10-05 14:22" },
  { title: "개발자의 하루 일과", likes: 5, date: "2024-10-04 18:35" },
  { title: "초보자를 위한 백엔드 개발 시작하기", likes: 45, date: "2024-10-02 09:10" },
  { title: "JavaScript 비동기 처리 이해하기", likes: 20, date: "2024-09-30 10:15" },
  { title: "React와 Vue의 차이점", likes: 60, date: "2024-09-28 16:00" },
  { title: "Python으로 데이터 분석하기", likes: 25, date: "2024-09-25 08:45" },
  { title: "코딩 면접 준비 방법", likes: 35, date: "2024-09-23 14:20" },
  { title: "Git 기본 사용법 배우기", likes: 18, date: "2024-09-21 11:05" },
  { title: "RESTful API 설계 가이드", likes: 40, date: "2024-09-18 13:00" },
  { title: "클라우드 서비스 개요 및 활용", likes: 50, date: "2024-09-16 09:30" },
  { title: "HTML/CSS 기초 다지기", likes: 27, date: "2024-09-15 17:40" },
  { title: "DevOps 도구 소개", likes: 32, date: "2024-09-12 12:10" },
  { title: "인공지능 윤리와 법적 이슈", likes: 22, date: "2024-09-10 15:25" }
];

const currentPage = ref(1);
const itemsPerPage = 10;

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
  <div class="board-container">
    <div class="header-row">
      <div class="header-item">번호</div>
      <div class="header-item">제목</div>
      <div class="header-item">좋아요 수</div>
      <div class="header-item">작성시간</div>
    </div>
    <div v-for="(item, index) in paginatedData" :key="index" class="data-row">
      <div class="data-item">{{ index + 1 }}</div>
      <div class="data-item">{{ item.title }}</div>
      <div class="data-item">{{ item.likes }}</div>
      <div class="data-item">{{ item.date }}</div>
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
/* List.vue CSS */
.board-container {
  width: 100%;
  background-color: var(--white); /* 전체 배경색 */
  padding: 20px;
  border-radius: 10px; /* 모서리 둥글게 */
}

.header-row {

  width: 100px;
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



</style>
