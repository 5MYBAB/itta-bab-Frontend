<script setup>
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import SearchBarAndSort from '@/components/common/SearchBarAndSort.vue';
import axios from "axios";
import { ref, reactive, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

// Authentication Store
const authStore = useAuthStore();
const router = useRouter();

const inquiryData = reactive({
  inquiry: [],
  inquiryId: 0,
  inquiryContent: "",
  createDate: "",
  inquiryReply: ""
});

// Inquiry List Ref
const inquiryList = ref([]);

// API 요청 함수
const fetchInquiryList = async () => {
  try {
    const response = await axios.get('http://localhost:8003/inquiry/admin', {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`, // 필요한 경우 인증 토큰 추가
      },
      params: {
        inquiryContent: inquiryData.inquiryContent || null, // 문의 내용
        createDate: inquiryData.createDate || null, // 작성 날짜
        inquiryId: inquiryData.inquiryId || null,
        inquiryReply: inquiryData.inquiryReply
      }
    });

    inquiryList.value = response.data; // 응답 데이터를 inquiryList에 저장
  } catch (error) {
    console.error('문의 목록을 불러오는 중 에러가 발생했습니다.', error.response ? error.response.data : error.message);
  }
};

// 컴포넌트 마운트 시 API 호출
onMounted(() => {
  fetchInquiryList();
});

// Pagination 관련 변수 및 함수
const currentPage = ref(1);
const itemsPerPage = 10;

// 총 페이지 계산
const totalPages = computed(() => Math.ceil(inquiryList.value.length / itemsPerPage));

// 현재 페이지에 해당하는 데이터만 보여주기
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return inquiryList.value.slice(start, end);
});

// 페이지 이동 함수
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

// 답변하기 버튼 클릭 처리
function answerInquiry(index) {
  const inquiryId = paginatedData.value[index].inquiryId;
  alert(`${paginatedData.value[index].inquiryContent}에 답변을 작성합니다.`);
  router.push(`/inquiry/admin/${inquiryId}`);
}

function viewAnswer(index) {
  const inquiryId = paginatedData.value[index].inquiryId;
  alert(`답변 : ${paginatedData.value[index].inquiryReply} \n 수정하고 싶으시면 확인을 눌러주세요.`)
  router.push(`/inquiry/admin/${inquiryId}`)
}

</script>

<template>
  <div class="inquiry-detail">
    <div class="title">
      <h1>문의</h1>
    </div>
    <br />
    <div class="parent-container">
      <SearchBarAndSort />
    </div>
    <br />

    <div class="board-container">
      <div class="header-row">
        <div class="header-item">번호</div>
        <div class="header-item">제목</div>
        <div class="header-item">작성시간</div>
        <div class="header-item">답변</div>
      </div>
      <!-- 문의 데이터를 화면에 출력 -->
      <div v-for="(inquiry, index) in paginatedData" :key="inquiry.inquiryId" class="data-row">
        <div class="data-item">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</div>
        <div class="data-item">{{ inquiry.inquiryContent }}</div>
        <div class="data-item">{{ inquiry.createDate }}</div>
        <div class="data-item">
          <button
              v-if="!inquiry.inquiryReply"
              class="answer-button"
              @click="answerInquiry(index)"
          >
            답변하기
          </button>
          <button
              v-else
              class="view-answer-button"
              @click="viewAnswer(index)"
          >
            답변수정
          </button>
        </div>
      </div>
      <!-- 페이지네이션 -->
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
    </div>
    <br />
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
