<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {computed, ref} from "vue";
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
// 페이지네이션 관련 설정
const currentPage = ref(1);
const itemsPerPage = 10;

// 총 페이지 수 계산
const totalPages = computed(() => Math.ceil(jsonData.length / itemsPerPage));

// 현재 페이지에 보여줄 데이터 계산
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return jsonData.slice(start, end);
});

// 페이지 이동 함수
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
  <main class="post-detail">
    <div class="inline-content">
      <img src="@/assets/icons/itta-bab-logo.svg" alt="밥 이미지" />
      <h3>한화 시스템 부트캠프</h3>
    </div>

    <br>

    <div class="title">
      <h1> 게시판</h1>
    </div>

    <br>
    <br>
    <br>

    <div class="search-sort-container">
      <!-- 검색 바 -->
      <div class="search-bar">
        <input type="text" placeholder="원하는 내용을 작성해서 검색하세요." />
      </div>
      <!-- 정렬 드롭다운 -->
      <div class="sort-dropdown">
        <select>
          <option value="latest">최신순</option>
          <option value="mostHated">좋아요 적은순</option>
          <option value="mostLiked">좋아요 많은 순</option>
        </select>
      </div>
    </div>
    <br>
    <br>
    <div class="board-container">
      <!-- 상단 노란색 헤더 -->
      <div class="header-row">
        <div class="header-item">번호</div>
        <div class="header-item">제목</div>
        <div class="header-item">좋아요 수</div>
        <div class="header-item">작성시간</div>
      </div>
      <!-- 하단 목록 -->
      <!--이 부분이 이제 json 값 담아올 부분이 되겠지 잘 들어가겠지? -->
      <div v-for="(item, index) in paginatedData" :key="index" class="data-row">
        <div class="data-item">{{ index + 1 }}</div>
        <div class="data-item">{{ item.title }}</div>
        <div class="data-item">{{ item.likes }}</div>
        <div class="data-item">{{ item.date }}</div>
      </div>
    </div>
      <!-- 페이지 보여주는 부분   -->
    <!-- 페이지 번호 표시 -->
    <div class="page-named">
      <button @click="goToPage(currentPage.value - 1)" :disabled="currentPage.value === 1">〈</button>
      <span
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="{ active: currentPage.value === page }"
      >
    {{ page }}
  </span>

      <button @click="goToPage(currentPage.value + 1)" :disabled="currentPage.value === totalPages.value">〉</button>
    </div>


    <br>

    <!-- 글쓰기 버튼 -->
    <div class ="button-container">
      <button class="write-button" @click="goToWritePage" >글쓰기</button>
    </div>


  </main>
</template>



<style scoped>

.post-detail{/*배경 화면 노란색으로 설정하는 부분*/
  background-color: var(--background-color); /* 노란색 배경 */
  min-height: 100vh; /* 화면 전체 높이 */
  width: 100%;
}
.inline-content { /*글씨랑 사진 조화 설정*/
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
}
.title{/* 게시판 글씨 가운데로 정렬*/
  align-content: space-between;
  text-align: center;
}
.title h1 { /* 사진 옆 글씨 사진이랑 맞게 설정*/
  font-size: 2em; /* 글씨 크기 설정 */
  font-weight: bold; /* 글씨 두께 설정 (필요 시) */
}
img {/* 사진과 글씨 간격 조정*/
  margin-right: 10px; /* 이미지 오른쪽에 간격 추가 */
}
.search-bar.text { /*검색 글씨 회색 입히기*/
  background-color: var(--gray-font);
}
.search-bar { /* 흰색 바 만들기 둥그렇게 깎음을 곁들인*/
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 25px;
  padding: 10px 15px;
  width: 70%; /* 검색 바의 너비를 설정 */
  border: var(--background-color );
  margin-left: 20px; /* 왼쪽에서 너무 붙어서 조금 떨어트리는 코드*/
  flex: 1; /* 검색 바가 남은 공간을 차지하도록 설정 */
}

.search-bar input {
  flex: 1; /* 입력 필드가 남은 공간을 차지하도록 설정 */
  border: none; /* 입력 필드 경계 제거 */
  outline: none; /* 포커스 시 기본 테두리 제거 */
  font-size: 1em; /* 글씨 크기 설정 */
}
.search-sort-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 80px; /* 검색 바와 드롭다운 사이의 간격 */
  width: 90%; /* 컨테이너의 전체 너비 사용 */
}

.sort-dropdown {
  flex-shrink: 0; /* 드롭다운이 줄어들지 않도록 설정 */
  margin-left: 0;
}
.sort-dropdown select {
  padding: 10px;
  border-radius: 12px; /* 모서리의 깎음 정도 더 둥글게 설정 */
  border: 1px solid var(--white);
  background-color: var(--white);
}

 .board-container {
   width: 100%;
   background-color:var( --white ); /* 전체 배경색 */
   padding: 20px;
   border-radius: 10px; /* 모서리 둥글게 */
 }

.header-row { /*배경 노란색 및 비율 조정*/
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
  margin-bottom: 14px; /* 아래 여백 추가 14로 두라는게 이게 맞을거 같은데  */
  border-bottom: var(--text-color); /* 가로줄 추가 */
}

.data-item {
  flex: 1;
  text-align: center;
}

.write-button {
  background-color: var(--basic-yellow);
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
}
.button-container /*버튼 위치 우 하단으로 고정*/{
  display: flex;
  justify-content: flex-end; /* 오른쪽 끝으로 배치 */
  margin-top: 20px; /* 필요에 따라 위쪽 여백 추가 */
  width: 100%; /* 부모 컨테이너의 전체 너비 사용 */
}

.write-button:hover {
  background-color: var(--basic-yellow);
  transform: scale(1.05); /* 마우스 오버 시 살짝 확대라는 잔재주 한접시 */
}

.page-named {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
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