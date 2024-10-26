<script setup>
import StoreMapApi from "@/components/common/StoreMapApi.vue";
import StoreSearchBarAndSort from "@/components/common/StoreSearchBarAndSort.vue";
import {computed, provide ,ref, onMounted} from "vue";
import Page from "@/components/common/Page.vue";
import { useRouter, useRoute } from 'vue-router';
import {useAuthStore} from "@/stores/auth.js";
import PageTitleTop from "@/components/common/PageTitleTop.vue";



const router = useRouter(); // 라우터 이동을 위한 설정

// 데이터를 저장할 상태 변수
const storeList = ref([]);

// 인증 토큰 가져오기
const authStore = useAuthStore();

// 서버로부터 데이터를 가져오는 함수
async function fetchStoreList() {
  try {
    const token = authStore.accessToken;
    const response = await fetch('http://localhost:8003/store/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // 여기에 실제 인증 토큰을 넣어야 합니다.
      },
    });

    if (!response.ok) {
      throw new Error('데이터를 가져오는 데 실패했습니다.');
    }

    const jsonData = await response.json();
    storeList.value = jsonData;  // 가져온 데이터를 storeList에 저장
  } catch (error) {
    console.error('에러 발생:', error);
  }
}

// 컴포넌트가 마운트되면 자동으로 데이터 조회
onMounted(() => {
  fetchStoreList();
});


const filteredData = ref(storeList); // 필터링된 데이터를 저장할 ref
const currentPage = ref(1);
const itemsPerPage = 5;

const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return filteredData.value.slice(start, end); // 필터링된 데이터에서 페이지네이션
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}


function goToRegisterPage() {
  window.location.href = '/store/regist'; // 가게 추가 페이지로 이동
}

const filter = (searchTerm) => {
  if (searchTerm.trim() === "") { // 빈칸인지 확인
    filteredData.value = jsonData; // 검색어가 빈칸이면 전체 데이터를 보여줌
    return;
  }
  // 검색어가 포함된 항목만 필터링
  filteredData.value = storeList.value.filter(item =>
      item.storeName.includes(searchTerm)
  );

};

// filter를 제공
provide("filter", filter);

function goToStoreMenu(storeId, storeName) {
  router.push({ name: 'MenuMain', params: { storeId, storeName } });
}

function goToStoreDetail(storeId) {
  router.push({ name: 'StoreDetail', params: { storeId }});
}


</script>

<template>
  <PageTitleTop/>
  <div class="post-detail">
    <StoreSearchBarAndSort @search="filter"/>
    <div class="white-box">
      <div id="map"><StoreMapApi/></div>
      <div class="store-container">
        <div class="header-row">
          <div class="header-item">가게 이름</div>
        </div>
        <div v-for="(item, index) in paginatedData" :key="index" class="store-item">
          <div class="store-name">
            <span class="name">{{ item.storeName }}</span>
            <span class="status">
          <input type="button"
                 :value="item.storeStatus"
                 :class="{'open-status': item.storeStatus === 'OPEN', 'closed-status': item.storeStatus === 'CLOSED'}"
                 id="submit-button"
                 @click="goToStoreMenu(item.storeId, item.storeName)"
          >
        </span>
          </div>
          <div class="store-details">
            <span class="location">{{ item.storeLocation }}</span>
          </div>
          <div class="store-open-info">
            <span class="week">{{ item.storeWeek }}&nbsp;&nbsp;</span>
            <span class="time">{{ item.storeOpenTime }} ~ {{ item.storeEndTime }}<br></span>
            <input id="update"
                   type="button" value="더보기"
                   @click = "goToStoreDetail(item.storeId)"
            >
          </div>
        </div>

        <Page
            :currentPage="currentPage"
            :totalPages="totalPages"
            @changePage="goToPage"
        />

        <!-- 가게 추가 버튼 -->
        <div class="add-store-btn">
          <button @click="goToRegisterPage">가게 추가</button>
        </div>


      </div>

    </div>
  </div>
</template>

<style scoped>
.white-box {
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.13) inset;
  border-radius: 43px;
  background-color: var(--white);
  max-width: 1000px;
  width: 100%;
  padding: 65px 100px;
  margin: 0 auto;
}

.post-detail{/*배경 화면 노란색으로 설정하는 부분*/
  background-color: var(--background-color); /* 노란색 배경 */
  min-height: 100vh; /* 화면 전체 높이 */
  width: 100%;
}

#map {
  width: 100%;
  height: 500px;
  margin-right: 20px;
}

.header-row {
  display: flex;
  background-color: var(--basic-yellow); /* 노란색 배경 */
  padding: 15px;
  border-radius: 10px 10px 0 0; /* 윗부분만 둥글게 */
  font-weight: bold;
}

input[type="button"] {
  border: none; /* 기본 테두리 제거 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 부드러운 음영 추가 */
  padding: 10px 20px; /* 여백 추가 */
  border-radius: 20px; /* 모서리 둥글게 */
  color: black;
}

.store-container {
  width: 100%; /* 가로 크기를 절반으로 줄임 */
  float: right; /* 우측에 배치 */
  padding: 15px;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
}

.store-item {
  flex-direction: column;
  padding: 15px 0;
  border-bottom: 2px solid #eaeaea;
}

.store-name {
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-right: 20px;
  margin-left: 50px;
}

.store-details {
  display: flex;
  justify-content: space-between;
  color: #555;
  font-size: 14px;
  margin-right: 50px;
  margin-left: 50px;
  margin-bottom: 10px;
}

.store-open-info {
  color: #555;
  font-size: 14px;
  margin-right: 50px;
  margin-left: 50px;
}

.location {
  flex: 1;
  text-align: left;
}

.time {
  flex: 1;
  text-align: right;
}

/* 상태에 따른 버튼 색상 정의 */
.open-status {
  background-color: #89F56C; /* 초록색 */
  color: white;
}

.closed-status {
  background-color: #F44336; /* 빨간색 */
  color: white;
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


.add-store-btn {
  margin-top: 20px;
  text-align: right;
}

#update {
  width: 100px;
  height: 40px;
  margin-top: 30px;
  text-align: center;
  background-color: var(--basic-yellow);
}

.add-store-btn button {
  width: 140px;
  height: 44px;
  background-color: var(--basic-yellow);
  border-radius: 52px;
  border: none;
  font-weight: 600;
  text-align: center;
}


</style>