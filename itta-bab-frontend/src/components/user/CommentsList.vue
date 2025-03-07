<script setup>
import '@/assets/css/resetcss.css';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {useAuthStore} from "@/stores/auth.js";
import {computed, onMounted, ref} from "vue";
import axios from "axios";

const authStore = useAuthStore();

const commentList = ref([]);

const fetchCommentList = async () => {
  try {
    const response = await axios.get('http://localhost:8003/postComment/user', {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`, // 필요한 경우 인증 토큰 추가
      }
    });

    commentList.value = response.data;
    console.log(commentList.value[0])
  } catch (error) {
    console.error('작성 댓글 목록을 불러오는 중 에러가 발생했습니다.', error.response ? error.response.data : error.message);
  }
};

onMounted(() => {
  fetchCommentList();
});

// Pagination 관련 변수 및 함수
const currentPage = ref(1);
const itemsPerPage = 10;

// 총 페이지 계산
const totalPages = computed(() => Math.ceil(commentList.value.length / itemsPerPage));

// 현재 페이지에 해당하는 데이터만 보여주기
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return commentList.value.slice(start, end);
});

// 페이지 이동 함수
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

</script>

<template>
  <div class="display">
    <div class="title">
      <font-awesome-icon :icon="['far', 'comment']" size="2x"/>
      <div>작성 댓글 목록</div>
    </div>
  </div>
  <div v-for="(comment, index) in paginatedData" :key="comment.commentId" class="list-container">
    <div class="list-content">
      <div class="contents">
        <div class="num">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</div>
        <div class="text">{{ comment.commentContent }}</div>
        <div class="date">{{ comment.createDate }}</div>
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

.date {
  color: var(--gray-font);
  font-size: 15px;
}

.contents {
  display: flex;
  justify-content: space-between;
  margin: 15px 30px;
}

.num {
  font-size: 20px;
  font-weight: 400;
}

.text {
  white-space: nowrap; /* 한 줄로 표시되도록 */
  overflow: hidden; /* 넘치는 텍스트는 숨김 처리 */
  text-overflow: ellipsis;
  width: 400px;
  font-size: 20px;
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