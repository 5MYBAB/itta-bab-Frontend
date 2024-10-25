<script setup>
import axios from "axios";
import {computed, provide, ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import BottomPageButton from "@/components/common/BottomPageButton.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import DeleteButton from "@/components/common/DeleteButton.vue";
import AdminTopSection from "@/components/common/AdminTopSection.vue";

// 로그인 사용자 정보
const authStore = useAuthStore(); // 로그인 토큰

// 데이터 저장
const jsonData = ref([]);

// REST API 호출 함수
const fetchData = async () => {
  try {
    const response1 = await axios.get("http://localhost:8003/groupCategory", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    if (response1.status === 200) {
      jsonData.value = response1.data; // API에서 받은 데이터를 jsonData에 저장
    } else {
      console.log("데이터 불러오기 실패");
    }
  } catch (error) {
    console.error("어라라...?\n", error);
  }
};

const filteredData = ref(jsonData); // 필터링된 데이터를 저장할 ref
const currentPage = ref(1);
const itemsPage = 10;
const router = useRouter();

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPage;
  const end = start + itemsPage;
  return filteredData.value.slice(start, end);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

const filter = (searchTerm) => {
  if (searchTerm.trim() === "") {
    filteredData.value = jsonData.value; // .value로 접근
    currentPage.value = 1; // 페이지를 초기화
    return;
  }
  filteredData.value = jsonData.value.filter(item =>
      item.groupCategoryName.includes(searchTerm) // 대소문자 구분 없이 검색
  );
  currentPage.value = 1; // 검색 후 페이지를 1로 초기화
};

function goToRegisterPage() {
  router.push("groupCategory/register");
}

function deleteItem(groupCategoryId) {

}

async function sendData() {
  try {
    const request = await axios.delete("http://localhost:8003/groupCategory/", {
      "groupId": 0,
      "groupCategoryId": data.value.category,
      "userId": 0,
      "groupTitle": data.value.title,
      "userCounting": data.value.counting,
      "groupStatus": true,
      "createDate": new Date(),
      "endDate": data.value.endDate,
      "groupPost": data.value.content,
      "chatRoomStatus": "NOT_CREATED",
      "blinded": false
    }, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    if (request.status === 200) {
      alert("새로운 모임을 등록하였습니다.");
    } else {
      alert("새로운 모임을 등록에 실패하였습니다.");
      console.log(`모임 등록 실패
      상태코드 = ${request.valueOf()}`);
    }
    router.push("/group");

  } catch (error) {
    console.log("어라라?\n" + error);
  }
}

onMounted(() => {
  fetchData();
});

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
      <SearchBar @search="filter"/> <!-- 검색어를 filter 함수로 전달 -->
    </div>

    <div class="total-container">
      <div class="header-row">
        <div class="header-item">모임 카테고리 ID</div>
        <div class="header-item">모임 카테고리 이름</div>
        <div class="header-item">삭제</div>
      </div>

      <div class="list-style">
        <div v-if="filteredData.length === 0" class="data-row">
          <div class="data-item">데이터가 없습니다.</div>
        </div>

        <div
            v-for="item in paginatedData"
            :key="item.groupCategoryId"
            class="data-row"
        >
          <div class="data-item">{{ item.groupCategoryId }}</div>
          <div class="data-item">{{ item.groupCategoryName }}</div>
          <div class="data-item">
            <DeleteButton v-slot:label @click="deleteItem(item.groupCategoryId)">삭제</DeleteButton>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-container">
      <BottomPageButton
          :currentPage="currentPage"
          :totalPages="totalPages"
          @changePage="goToPage"
          @click="goToRegisterPage"
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
