<script setup>
import { computed, ref } from "vue";
import Page from "@/components/common/Page.vue";

/* 테스트 데이터 (리뷰 데이터) */
const reviewData = ref([
  {
    id: 1,
    store_id: '1',
    user_id: '1',
    review_content: '음식이 정말 맛있어요!',
    tags: ['맛있음', '친절함'],
    rating: 5,
    create_date: '2024-10-15',
    update_date: false,
    userImageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: 2,
    store_id: '2',
    user_id: '2',
    review_content: '가격이 조금 비싸지만 만족스러웠습니다.',
    tags: ['가격 비쌈'],
    rating: 4,
    create_date: '2024-10-16',
    update_date: false,
    userImageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: 3,
    store_id: '3',
    user_id: '3',
    review_content: '서비스가 정말 좋았어요. 재방문 의사 100%입니다.',
    tags: ['서비스 좋음', '재방문 의사 있음'],
    rating: 5,
    create_date: '2024-10-17',
    update_date: false,
    userImageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: 4,
    store_id: '4',
    user_id: '4',
    review_content: '음식이 조금 식어서 나왔어요. 아쉬웠습니다.',
    tags: ['음식 식음'],
    rating: 3,
    create_date: '2024-10-18',
    update_date: false,
    userImageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: 5,
    store_id: '5',
    user_id: '5',
    review_content: '가격 대비 만족도가 높았어요. 양도 많았습니다.',
    tags: ['가성비 좋음', '양 많음'],
    rating: 4,
    create_date: '2024-10-19',
    update_date: false,
    userImageUrl: 'https://via.placeholder.com/50',
  }
]);

const currentPage = ref(1);
const itemsPerPage = 3;

const totalPages = computed(() => {
  return Math.ceil(reviewData.value.length / itemsPerPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return reviewData.value.slice(start, end);
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
  <div class="review-list">
    <div v-for="review in paginatedData" :key="review.id" class="review-row">
      <img :src="review.userImageUrl" alt="User Image" class="user-image" />
      <div class="review-content">
        <div class="review-text">{{ review.review_content }}</div>
        <div class="review-tags">
          <span v-for="tag in review.tags" :key="tag" class="review-tag">{{ tag }}</span>
        </div>
        <div class="review-info">
          <span class="review-rating">평점: {{ review.rating }}점</span>
          <span class="review-date">작성일: {{ review.create_date }}</span>
        </div>
      </div>
    </div>

    <Page
        :currentPage="currentPage"
        :totalPages="totalPages"
        @changePage="goToPage"
    />
  </div>
</template>

<style scoped>
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

.review-tags {
  margin-bottom: 5px;
}

.review-tag {
  background-color: #f1f1f1;
  padding: 2px 6px;
  margin-right: 5px;
  border-radius: 4px;
  font-size: 12px;
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
