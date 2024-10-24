<script setup>
import {computed, defineProps, ref} from 'vue';
import PageNumAndWritingButton from '@/components/common/PageNumAndWritingButton.vue';
import SearchBarAndSort from '@/components/common/SearchBarAndSort.vue';
import Header from "@/App.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";

const jsonData = [
  { title: "신고1", likes: 15, target: "회원", answered: false },
  { title: "신고2", likes: 55, target: "모임", answered: false },
  { title: "신고3", likes: 30, target: "댓글", answered: false },
  { title: "신고4", likes: 5, target: "게시판", answered: true },
  { title: "신고5", likes: 45, target: "모임", answered: true },
  { title: "신고6", likes: 20, target: "댓글", answered: false },
  { title: "신고7", likes: 60, target: "댓글", answered: false },
  { title: "신고8", likes: 25, target: "댓글", answered: false },
  { title: "신고9", likes: 35, target: "게시판", answered: true },
  { title: "신고10", likes: 18, target: "모임", answered: true },
  { title: "신고11", likes: 40, target: "모임", answered: true },
  { title: "신고12", likes: 50, target: "게시판", answered: true },
  { title: "신고13", likes: 27, target: "모임", answered: true },
  { title: "신고14", likes: 32, target: "게시판", answered: true },
  { title: "신고15", likes: 22, target: "게시판", answered: true }
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


function answerInquiry(index) {
  alert(`${paginatedData.value[index].title}에 답변을 작성합니다.`);
  // 답변 로직 구현 필요
}

function viewAnswer(index) {
  alert(`${paginatedData.value[index].title}의 답변을 확인합니다.`);
  // 답변 보기 로직 구현 필요
}

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});
</script>

<template>
  <PageTitleTop/>
  <div class="inquiry-detail">
    <div class="title">
      <h1>신고 목록</h1>
    </div>
    <br>
    <div class="parent-container">
      <SearchBarAndSort/>
    </div>
    <br>

    <div class="board-container">
      <div class="header-row">
        <div class="header-item">신고 번호</div>
        <div class="header-item">제목</div>
        <div class="header-item">신고 대상</div>
        <div class="header-item">처리 상태</div>
      </div>
      <div v-for="(item, index) in paginatedData" :key="index" class="data-row">
        <div class="data-item">{{ index + 1 }}</div>
        <div class="data-item">{{ item.title }}</div>
        <div class="data-item">{{ item.target }}</div>
        <div class="data-item">
          <button
              v-if="!item.answered"
              class="answer-button"
              @click="answerInquiry(index)"
          >
            대기
          </button>
          <button
              v-else
              class="view-answer-button"
              @click="viewAnswer(index)"
          >
            처리
          </button>
        </div>
      </div>
      <div class="page-named">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">〈</button>
        <span
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: currentPage === page }"
        >
     {{ page }}
   </span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">〉</button>
      </div>
      <br>



    </div>
    <br>
  </div>
</template>

<style scoped>
.inquiry-detail {
  background-color: var(--background-color);
  min-height: 100vh;
  width: 100%;
}
.parent-container {
  display: flex;
  justify-content: center;
}


.title {
  text-align: center;
}

.title h1 {
  font-size: 2em;
  font-weight: bold;
}

img {
  margin-right: 10px;
}

.board-container {
  width:  80%; /* 너비를 80%로 설정 */
  margin: 0 auto;
  background-color: var(--white);
  padding: 0 20px;
  border-radius: 10px;
}

.header-row {
  display: flex;
  width: calc(100% + 40px); /* Compensate for the left and right padding */
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

.answer-button {
  background-color: var(--basic-yellow);
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
}

.view-answer-button {
  background-color: #ccc;
  border: none;
  padding: 8px 12px;
  border-radius: 10px;
  cursor: pointer;
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
  border: 1px solid var(--gray-font);
  background-color: var(--white);
}

.page-named .active {
  font-weight: bold;
  color: black;
}
</style>
