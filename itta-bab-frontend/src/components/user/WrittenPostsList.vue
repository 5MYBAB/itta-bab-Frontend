<script setup>
import '@/assets/css/resetcss.css';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {useAuthStore} from "@/stores/auth.js";
import {computed, onMounted, ref} from "vue";
import axios from "axios";

const authStore = useAuthStore();

const postList = ref([]);

const fetchPostList = async () => {
  try {
    const response = await axios.get('http://localhost:8003/post/list', {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      }
    });
    postList.value = response.data;
  } catch (error) {
    console.error('문의 목록을 불러오는 중 에러가 발생했습니다.', error.response ? error.response.data : error.message);
  }
};

onMounted(() => {
  fetchPostList();
});

// Pagination 관련 변수 및 함수
const currentPage = ref(1);
const itemsPerPage = 10;

// 총 페이지 계산
const totalPages = computed(() => Math.ceil(postList.value.length / itemsPerPage));

// 현재 페이지에 해당하는 데이터만 보여주기
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return postList.value.slice(start, end);
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
      <font-awesome-icon :icon="['far', 'clipboard']" size="2x"/>
      <div>작성글 목록</div>
    </div>
  </div>
  <div v-for="(post, index) in paginatedData" :key="post.postId" class="list-container">
    <div class="inline">
      <div class="text">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</div>
      <div class="text">{{ post.postTitle }}</div>
      <div class="date">{{ post.createDate }}</div>
    </div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  margin: 15px 0px;
}

.text {
  font-size: 20px;
  font-weight: 600;
}

.date {
  font-weight: 400;
  font-size: 15px;
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

.line {
  background-color: var(--gray-font);
  height: 1px;
  width: 80%;
}

.list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>