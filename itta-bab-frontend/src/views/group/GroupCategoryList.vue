<script setup>
import {computed, provide, ref} from "vue";
import BottomPageButton from "@/components/common/BottomPageButton.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import DeleteButton from "@/components/common/DeleteButton.vue";
import AdminTopSection from "@/components/common/AdminTopSection.vue";

/* 테스트 데이터 */
const jsonData = [
  {"group_category_id": 1, "group_category_name": "아침"},
  {"group_category_id": 2, "group_category_name": "점심"},
  {"group_category_id": 3, "group_category_name": "저녁"},
  {"group_category_id": 4, "group_category_name": "오락"},
  {"group_category_id": 5, "group_category_name": "음주"}
];

const filteredData = ref(jsonData); // 필터링된 데이터를 저장할 ref
const currentPage = ref(1);
const itemsPage = 10;

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPage);
});

const paginatedDate = computed(() => {
  const start = (currentPage.value - 1) * itemsPage;
  const end = start + itemsPage;
  return filteredData.value.slice(start, end);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function goToWRegisterPage() {
  window.location.href = '/register';
}

const filter = (searchTerm) => {
  if (searchTerm.trim() === "") {
    filteredData.value = jsonData;
    currentPage.value = 1; // 페이지를 초기화
    return;
  }
  filteredData.value = jsonData.filter(item =>
      item.group_category_name.includes(searchTerm)
  );
  currentPage.value = 1; // 검색 후 페이지를 1로 초기화
};

// filter를 제공
provide("filter", filter);
</script>

<template>
  <div class="background">
    <AdminTopSection>
      <template #icon>
        <font-awesome-icon icon="user-group"/> <!-- 아이콘 이름을 사용하여 아이콘 전달 -->
      </template>
      <template #label>
        모임 카테고리 목록
      </template>
    </AdminTopSection>
    <div class="search-container">
      <SearchBar/>
    </div>
    <div class="total-container">
      <div class="header-row">
        <div class="header-item">모임 카테고리 ID</div>
        <div class="header-item">모임 카테고리 이름</div>
        <div class="header-item">삭제</div>
      </div>

      <div class="list-style">
        <div
            v-for="item in paginatedDate"
            :key="item.group_category_id"
            class="data-row"
        >
          <div class="data-item">{{ item.group_category_id }}</div>
          <div class="data-item">{{ item.group_category_name }}</div>
          <div class="data-item">
            <DeleteButton v-slot:label>삭제</DeleteButton> <!-- 기본 슬롯을 사용하여 "삭제" 텍스트 전달 -->
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-container">
      <BottomPageButton
          :currentPage="currentPage"
          :totalPages="totalPages"
          @changePage="goToPage"
          @writePage="goToWRegisterPage"
      >등록
      </BottomPageButton>
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
  padding: 20px;
  border-radius: 10px; /* 모서리 둥글게 */
}

.search-container {
  margin-top: 2%;
  width: 80%; /* 너비를 80%로 설정 */
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 수평 중앙 정렬 */
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
  flex: 1; /* 균등하게 너비 분배 */
  text-align: center;
}

.data-row {
  display: flex;
  padding: 15px;
  margin-bottom: 14px; /* 아래 여백 추가 */
  border-bottom: 1px solid #ddd; /* 가로줄 추가 */
  align-items: center;
  justify-content: center;
}

.data-item {
  flex: 1; /* 균등하게 너비 분배 */
  text-align: center;
}

.list-style {
  background-color: white;
  border-radius: 0 0 10px 10px; /* 윗부분만 둥글게 */
}

.total-container {
  width: 80%;
  align-items: center;
  justify-content: center;
}

.bottom-container {
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 세로 방향 가운데 정렬 */
  width: 80%; /* 너비를 설정하여 부모와 맞춤 */
}

.bottom-container button {
  justify-content: flex-end;
}


</style>