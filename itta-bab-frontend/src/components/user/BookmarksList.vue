<script setup>
import '@/assets/css/resetcss.css';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {useAuthStore} from "@/stores/auth.js";
import {computed, onMounted, ref} from "vue";
import axios from "axios";

const authStore = useAuthStore();

const favoriteList = ref([]);

const fetchFavoriteList = async () => {
  try {
    const response = await axios.get('http://localhost:8003/store/favorite/list', {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      }
    });
    favoriteList.value = response.data;
  } catch (error) {
    console.error('문의 목록을 불러오는 중 에러가 발생했습니다.', error.response ? error.response.data : error.message);
  }
};

onMounted(() => {
  fetchFavoriteList();
});

// Pagination 관련 변수 및 함수
const currentPage = ref(1);
const itemsPerPage = 10;

// 총 페이지 계산
const totalPages = computed(() => Math.ceil(favoriteList.value.length / itemsPerPage));

// 현재 페이지에 해당하는 데이터만 보여주기
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return favoriteList.value.slice(start, end);
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
      <font-awesome-icon :icon="['far', 'bookmark']" size="2x"/>
      <div>즐겨찾기 목록</div>
    </div>
  </div>
  <div v-for="(favorite, index) in paginatedData" :key="favorite.favoriteId" class="list-container">
    <div class="borderline"></div>
    <div class="list-content">
      <div class="contents">
        <div class="text">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</div>
        <div class="text">{{ favorite.storeName }}</div>
        <div class="delete">삭제</div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.borderline {
  background-color: var(--gray-font);
  height: 2px;
  width: 80%;
}

.delete {
  color: var(--gray-font);
  font-size: 15px;
}

.contents {
  display: flex;
  justify-content: space-between;
  gap: 230px;
  margin: 15px 30px;
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