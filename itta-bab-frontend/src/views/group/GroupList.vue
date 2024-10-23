<script setup>
import {computed, ref} from "vue";
import BottomPageButton from "@/components/common/BottomPageButton.vue"
import SearchBarAndSort from "@/components/group/SearchBarAndSort.vue";

/* 테스트 데이터 */
const jsonData = [
  {
    "group_id": 1,
    "group_category_id": 1,
    "user_id": 1,
    "group_title": "아침 식사 모임",
    "user_counting": 5,
    "group_status": 1,
    "create_date": "2024-09-25T10:25:49.000Z",
    "end_date": "2024-09-25T11:25:49.000Z",
    "group_post": "아침을 함께 즐기며 대화 나누는 모임입니다.",
    "is_blinded": 0,
    "chat_room_status": "NOT_CREATED"
  },
  {
    "group_id": 2,
    "group_category_id": 2,
    "user_id": 2,
    "group_title": "점심 식사 모임",
    "user_counting": 10,
    "group_status": 1,
    "create_date": "2024-09-25T10:25:49.000Z",
    "end_date": "2024-09-25T12:25:49.000Z",
    "group_post": "점심시간에 함께 식사하고 이야기를 나눕니다.",
    "is_blinded": 0,
    "chat_room_status": "CLOSED"
  },
  {
    "group_id": 3,
    "group_category_id": 3,
    "user_id": 3,
    "group_title": "저녁 만찬 모임",
    "user_counting": 8,
    "group_status": 1,
    "create_date": "2024-09-25T10:25:49.000Z",
    "end_date": "2024-09-25T13:25:49.000Z",
    "group_post": "저녁에 맛있는 음식을 나누며 소통하는 모임입니다.",
    "is_blinded": 0,
    "chat_room_status": "NOT_CREATED"
  },
  {
    "group_id": 4,
    "group_category_id": 4,
    "user_id": 4,
    "group_title": "오락 게임 모임",
    "user_counting": 6,
    "group_status": 1,
    "create_date": "2024-09-25T10:25:49.000Z",
    "end_date": "2024-09-25T14:25:49.000Z",
    "group_post": "재미있는 게임을 함께 즐기는 모임입니다.",
    "is_blinded": 0,
    "chat_room_status": "NOT_CREATED"
  },
  {
    "group_id": 5,
    "group_category_id": 5,
    "user_id": 5,
    "group_title": "음주 모임",
    "user_counting": 4,
    "group_status": 1,
    "create_date": "2024-09-25T10:25:49.000Z",
    "end_date": "2024-09-25T15:25:49.000Z",
    "group_post": "술을 마시며 즐거운 시간을 보내는 모임입니다.",
    "is_blinded": 0,
    "chat_room_status": "NOT_CREATED"
  },
  {
    "group_id": 9,
    "group_category_id": 1,
    "user_id": 1,
    "group_title": "BHC 황금올리브",
    "user_counting": 2,
    "group_status": 1,
    "create_date": "2024-09-26T02:31:42.000Z",
    "end_date": "2024-09-25T17:40:23.000Z",
    "group_post": "황올 먹을분 5층으로 오세요",
    "is_blinded": 0,
    "chat_room_status": "NOT_CREATED"
  },
  {
    "group_id": 12,
    "group_category_id": 3,
    "user_id": 7,
    "group_title": "모수",
    "user_counting": 2,
    "group_status": 0,
    "create_date": "2024-09-30T00:53:02.000Z",
    "end_date": "2024-09-30T01:53:04.000Z",
    "group_post": "모수는 묘수",
    "is_blinded": 0,
    "chat_room_status": "NOT_CREATED"
  },
  {
    "group_id": 15,
    "group_category_id": 3,
    "user_id": 7,
    "group_title": "과자 모임",
    "user_counting": 4,
    "group_status": 1,
    "create_date": "2024-10-02T10:20:05.000Z",
    "end_date": "2024-11-02T01:19:42.000Z",
    "group_post": "과자가 제일 맛있어!!",
    "is_blinded": 1,
    "chat_room_status": "CREATED"
  },
  {
    "group_id": 16,
    "group_category_id": 1,
    "user_id": 7,
    "group_title": "음료수 모임",
    "user_counting": 1,
    "group_status": 1,
    "create_date": "2024-10-03T14:44:16.000Z",
    "end_date": "2024-10-04T05:43:59.000Z",
    "group_post": "음료수는 파워에이드",
    "is_blinded": 1,
    "chat_room_status": "NOT_CREATED"
  },
  {
    "group_id": 22,
    "group_category_id": 1,
    "user_id": 7,
    "group_title": "모임이 뭐임",
    "user_counting": 1,
    "group_status": 1,
    "create_date": "2024-10-03T14:58:38.000Z",
    "end_date": "2024-10-04T05:43:59.000Z",
    "group_post": "모임이 뭐임",
    "is_blinded": 1,
    "chat_room_status": "NOT_CREATED"
  }, {
    "group_id": 22,
    "group_category_id": 1,
    "user_id": 7,
    "group_title": "모임이 뭐임",
    "user_counting": 1,
    "group_status": 1,
    "create_date": "2024-10-03T14:58:38.000Z",
    "end_date": "2024-10-04T05:43:59.000Z",
    "group_post": "모임이 뭐임",
    "is_blinded": 1,
    "chat_room_status": "NOT_CREATED"
  }
];

// 카테고리 정보
const groupCategories = [
  {
    "group_category_id": 1,
    "group_category_name": "아침"
  },
  {
    "group_category_id": 2,
    "group_category_name": "점심"
  },
  {
    "group_category_id": 3,
    "group_category_name": "저녁"
  },
  {
    "group_category_id": 4,
    "group_category_name": "오락"
  },
  {
    "group_category_id": 5,
    "group_category_name": "음주"
  }
];

const currentPage = ref(1);
const itemsPage = 10;

const totalPages = computed(() => {
  return Math.ceil(jsonData.length / itemsPage);
});

const paginatedDate = computed(() => {
  const start = (currentPage.value - 1) * itemsPage;
  const end = start + itemsPage;

  return jsonData.slice(start, end);
});

// 날짜 형식화 함수
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 카테고리 이름 반환 함수
function getCategoryName(categoryId) {
  const category = groupCategories.find(cat => cat.group_category_id === categoryId);
  return category ? category.group_category_name : "기타";
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function goToWRegisterPage() {
  window.location.href = '/register';
}
</script>

<template>
  <div class="background">
    <div class="search-container">
      <SearchBarAndSort/>
    </div>
    <div class="total-container">
      <div class="header-row">
        <div class="header-item">모임종류</div>
        <div class="header-item">제목</div>
        <div class="header-item">모집인원</div>
        <div class="header-item">마감시간</div>
      </div>

      <div class="list-style">
        <div
            v-for="item in paginatedDate"
            :key="item.group_id"
            class="data-row"
        >
          <div class="data-item">{{ getCategoryName(item.group_category_id) }}</div>
          <div class="data-item">{{ item.group_title }}</div>
          <div class="data-item">{{ item.user_counting }}</div>
          <div class="data-item">{{ formatDate(item.end_date) }}</div>
        </div>
      </div>
    </div>

    <div class="bottom-container">
      <BottomPageButton
          :currentPage="currentPage"
          :totalPages="totalPages"
          @changePage="goToPage"
          @writePage="goToWRegisterPage"
      />
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

.search-container {
  width: 80%;
  margin-bottom: 12px;
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

.data-row {
  display: flex;
  padding: 15px;
  margin-bottom: 14px; /* 아래 여백 추가 */
  border-bottom: 1px solid #ddd; /* 가로줄 추가 */
}

.data-item {
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

.list-style {
  background-color: white;
  border-radius: 0 0 10px 10px; /* 윗부분만 둥글게 */
}

.total-container{
  width: 80%;
}

.bottom-container {
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 세로 방향 가운데 정렬 */
  margin-top: 20px; /* 필요한 경우 여백 추가 */
  width: 80%; /* 너비를 설정하여 부모와 맞춤 */
}

.bottom-container button{
  justify-content: flex-end; /* 글쓰기 버튼을 오른쪽 끝 정렬 */
}

</style>