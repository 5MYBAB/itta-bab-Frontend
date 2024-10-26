<script setup>
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import { ref, computed, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter, useRoute } from 'vue-router';
import {useAuthStore} from "@/stores/auth.js";
import axios from "axios";
import Page from "@/components/common/Page.vue";

// 라우터 이동을 위한 설정
const router = useRouter();

// 인증 토큰 가져오기
const authStore = useAuthStore();

// 가게 id 가져오기
const route = useRoute();
const storeId = route.params.storeId;
const storeName = route.params.storeName;
// const storeId = 3; //임시값 1

// const reviewContent = ref('');
// const rating = ref(0);
// const createDate = ref('');
// const updateDate = ref('');

// 서버에서 가져올 데이터를 저장할 변수
const jsonReviewData = ref([]);






// 서버로부터 데이터를 가져오는 함수
async function fetchStoreReviewList() {
  try {
    const token = authStore.accessToken;
    const response = await axios.get(`http://localhost:8003/store/review/${storeId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    jsonReviewData.value = await response.data;

  } catch (error){
    console.error('리뷰 데이터를 불러오는데 에러가 발생했습니다', error);
  }
}



function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

onMounted(() => {
  fetchStoreReviewList();
});

// 페이징
const currentPage = ref(1);
const itemsPerPage = 3;
const totalPages = computed(() => {
  return Math.ceil(jsonReviewData.value.length / itemsPerPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return jsonReviewData.value.slice(start, end);
});

function goToStoreReviewCreate(storeId){
  router.push({ name: 'ReviewCreate', params: { storeId }});
}

const userId = authStore;
console.log(userId);

</script>

<template>
  <div class="background">

    <div class="title">
      <div class="section-title">가게 리뷰</div>
    </div>

    <button class="edit-store-btn"
            @click = "goToStoreReviewCreate(storeId)"
    ><font-awesome-icon :icon="['far', 'pen-to-square']" /> 리뷰 등록</button>

    <div class="total-container">
      <div class="header-row">
        <div class="header-item">{{ storeName }}</div>
      </div>


      <!-- 리뷰 리스트 -->
      <div class="review-list">
        <div v-for="review in paginatedData"
             :key="review.storeId"
             class="review-row"
        >

          <div class="review-content">
            <div class="review-text">{{ review.reviewContent }}</div>
            <div class="review-info">
              <span class="review-rating">평점:
                <span v-for="n in 5" :key="n" class="star">{{ n <= review.rating ? '⭐' : '' }}</span>
              </span>
              <span class="review-date">작성일: {{ review.createDate }}</span>
              <span class="review-date" v-if="review.updateDate"> 수정일: {{ review.updateDate }}</span>
            </div>
          </div>
        </div>

        <Page
            :currentPage="currentPage"
            :totalPages="totalPages"
            @changePage="goToPage"
        />
      </div>
      <!-- 리뷰 리스트 -->

    </div>
  </div>
</template>

<style scoped>
/* 리뷰 등록 버튼 */
.edit-store-btn {
  background-color: var(--basic-yellow);
  border-radius: 20px;
  border: none;
  margin-bottom: 30px;
  width: 120px;
  height: 40px;
}

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

.title{
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
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

.total-container{
  width: 80%;
}

.bottom-container button{
  justify-content: flex-end; /* 글쓰기 버튼을 오른쪽 끝 정렬 */
}

/* 리뷰 리스트 */
.review-list {
  padding: 20px;
  background-color: var(--white);
}

.review-row {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 14px;
  padding-bottom: 10px;
}

.user-image {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.review-content {
  flex: 1;
}

.review-text {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}


.review-info {
  font-size: 12px;
  color: #888;
}

.review-rating {
  margin-right: 10px;
}

.review-date {
  color: #888;
}

.page-named span {
  cursor: pointer;
  padding: 5px 13px;
  border: 1px solid var(--white);
  background-color: var(--white);
}

.page-named .active {
  font-weight: bold;
  color: black;
}
</style>