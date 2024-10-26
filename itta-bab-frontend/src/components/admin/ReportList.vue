<script setup>
import '@/assets/css/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useAuthStore } from "@/stores/auth.js";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const reportList = ref([]);

const fetchReportList = async () => {
  try {
    const response = await axios.get('http://localhost:8003/report/admin', {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      }
    });
    reportList.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('문의 목록을 불러오는 중 에러가 발생했습니다.', error.response ? error.response.data : error.message);
  }
};

onMounted(() => {
  fetchReportList();
});

// Pagination 관련 변수 및 함수
const currentPage = ref(1);
const itemsPerPage = 10;

// 총 페이지 계산
const totalPages = computed(() => Math.ceil(reportList.value.length / itemsPerPage));

// 현재 페이지에 해당하는 데이터만 보여주기
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return reportList.value.slice(start, end);
});

// 페이지 이동 함수
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

// 신고 처리 버튼 클릭 시 호출되는 함수
// 신고 처리 함수
const handleReportProcess = async (report) => {
  const confirmed = confirm(`정말로 '${report.reportTitle}' 신고를 처리하시겠습니까?`);

  if (confirmed) {
    try {
      await axios.post(`http://localhost:8003/report/admin/${report.reportId}`, {
        reportId: report.reportId,
        reportTarget: report.target
      }, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      });

      alert('신고 처리가 완료되었습니다.');
      fetchReportList(); // 목록을 새로 고침하여 상태 반영
    } catch (error) {
      alert('신고 처리 중 오류가 발생했습니다.');
      console.error(error);
    }
  }
};

</script>

<template>
  <div class="display">
    <div class="title">
      <font-awesome-icon :icon="['fas', 'triangle-exclamation']" size="2x"/>
      <div>신고 목록</div>
    </div>
  </div>
  <div v-for="(report, index) in paginatedData" :key="report.reportId" class="list-container">
    <div class="list-content">
      <div class="contents">
        <div class="text">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</div>
        <div class="text">{{ report.reportTitle }}</div>
        <div class="ctg"
             :class="{
        'review-style': report.target === 'REVIEW',
        'post-style': report.target === 'POST',
        'comment-style': report.target === 'COMMENT',
        'group-style': report.target === 'GROUP'
      }"
        >
          <span v-if="report.target === 'REVIEW'">리뷰</span>
          <span v-else-if="report.target === 'POST'">게시판</span>
          <span v-else-if="report.target === 'COMMENT'">댓글</span>
          <span v-else-if="report.target === 'GROUP'">그룹</span>
        </div>
        <!-- 신고 처리 버튼 또는 완료 메시지 -->
        <div v-if="report.isResolved === false">
          <button @click="handleReportProcess(report)">신고 처리</button>
        </div>
        <div v-else-if="report.isResolved === true">
          신고 처리 완료
        </div>

      </div>
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
</template>

<style scoped>
/* 스타일 관련 코드는 그대로 유지합니다. */
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

.ctg {
  font-size: 20px;
  font-weight: 600;
  border-radius: 20px;
  width: 87px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.review-style {
  background-color: var(--semi-red);
}

.post-style {
  background-color: var(--active-green);
}

.comment-style {
  background-color: var(--basic-yellow);
}

.group-style {
  background-color: var(--sky-blue);
}

.contents {
  display: flex;
  justify-content: space-between;
  margin: 15px 30px;
  align-items: center;
}

.text {
  font-size: 20px;
  font-weight: 400;
}

.list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-content {
  width: 80%;
  border-bottom: 1px var(--gray-font) solid;
}

.display {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.title div {
  font-size: 30px;
  font-weight: 600;
  margin-left: 10px;
}
</style>
