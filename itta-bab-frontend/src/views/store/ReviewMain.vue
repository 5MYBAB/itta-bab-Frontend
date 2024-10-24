<script setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import MenuList from "@/components/store/MenuList.vue";
import ReviewList from "@/components/store/ReviewList.vue";
import ReviewsList from "@/components/user/ReviewsList.vue";

// 리뷰 데이터 설정
const jsonData = ref([
  {
    id: 1,
    store_id: '익명1',
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
    store_id: '익명2',
    user_id: '2',
    review_content: '가격이 조금 비싸지만 만족스러웠습니다.',
    tags: ['가격 비쌈'],
    rating: 4,
    create_date: '2024-10-16',
    update_date: false,
    userImageUrl: 'https://via.placeholder.com/50',
  },
]);
</script>

<template>
  <div class="background">
    <div class="title">
      <font-awesome-icon :icon="['fas', 'list-ul']" size="2x" />
      <div>리뷰 목록</div>
    </div>
    <div class="total-container">
      <div class="header-row">
        <div class="header-item">우리 할매 국밥</div>
      </div>
      <ReviewList/>

    </div>
  </div>
</template>

<style scoped>


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
  align-items: center;
  margin-bottom: 30px;
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
</style>