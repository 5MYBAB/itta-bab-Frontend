<script setup>
import StoreMapApi from "@/components/common/StoreMapApi.vue";
import StoreSearchBarAndSort from "@/components/common/StoreSearchBarAndSort.vue";
import {computed, provide ,ref, onMounted} from "vue";
import Page from "@/components/common/Page.vue";
import { useRouter, useRoute } from 'vue-router';
import {useAuthStore} from "@/stores/auth.js";
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import axios from "axios";



const router = useRouter(); // 라우터 이동을 위한 설정

// 데이터를 저장할 상태 변수
const storeList = ref([]);

// 인증 토큰 가져오기
const authStore = useAuthStore();


// 데이터 관련 상태
const currentPage = ref(1);
const itemsPerPage = 5;
const filteredData = ref([]);
const sortOption = ref("open"); // 정렬 옵션 설정

function goToDetailPage(item) {
  router.push(`/store/detail/${item.storeId}`);
}


// 전체 페이지 계산
const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));

// 페이지네이션에 따른 데이터 계산
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredData.value.slice(start, end);
});

// 데이터 가져오기
const fetchData = async () => {
  let url = "";

  // 정렬 옵션에 따라 URL 설정
  if (sortOption.value === "open") {
    url = "http://localhost:8003/store/list";
  } else if (sortOption.value === "popular") {
    url = "http://localhost:8003/store/popular";
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    storeList.value = response.data; // 전체 데이터를 저장
    filteredData.value = [...storeList.value]; // 필터링 데이터 초기화

    currentPage.value = 1;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
  }
};

// 페이지 변경
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}


// 필터링 함수
const filter = (searchTerm) => {
  if (searchTerm.trim() === "") {
    // 검색어가 비어있다면 전체 데이터로 복원
    filteredData.value = [...storeList.value];

  }

  // 검색어에 맞는 데이터만 필터링하여 filteredData에 저장
  filteredData.value = storeList.value.filter(item =>
          item.storeName.toLowerCase().includes(searchTerm.toLowerCase()) // 대소문자 구분 없이 검색
  );
  currentPage.value = 1;
};

// 정렬 옵션이 변경될 때 데이터 다시 가져오기
function handleSortChange(option) {
  sortOption.value = option;
  currentPage.value = 1;
  fetchData();
}


// 컴포넌트가 마운트되면 자동으로 데이터 조회
onMounted(() => {
  fetchData();
});


function goToStoreDetail(storeId) {
  router.push({ name: 'StoreDetail', params: { storeId }});
}

function goToRegisterPage() {
  window.location.href = '/store/regist'; // 가게 추가 페이지로 이동
}



</script>

<template>
  <PageTitleTop/>
  <div class="post-detail">
    <StoreSearchBarAndSort @search="filter" @sort="handleSortChange"/>
    <div class="white-box">
      <div id="map"><StoreMapApi/></div>
      <div class="store-container">
        <div class="header-row">
          <div class="header-item">가게 이름</div>
        </div>
        <div v-for="(item, index) in paginatedData" :key="index" class="store-item" v-on:click="goToDetailPage(item.storeId)">
          <div class="store-name">
            <span class="name">{{ item.storeName }}</span>
            <span class="status">
          <input type="button"
                 :value="item.storeStatus"
                 :class="{'open-status': item.storeStatus === 'OPEN', 'closed-status': item.storeStatus === 'CLOSED'}"
                 id="submit-button"
                 tabindex="-1"
                 style="pointer-events: none;"
          >
        </span>
          </div>
          <div class="store-details">
            <span class="location">{{ item.storeLocation }}</span>
          </div>
          <div class="store-open-info">
            <span class="week" v-if="item.storeWeek">{{ item.storeWeek }}&nbsp;&nbsp;</span>
            <span class="time" v-if="item.storeOpenTime">{{ item.storeOpenTime.slice(0, -3) }} ~</span>
            <span class="time" v-if="item.storeEndTime">{{ item.storeEndTime.slice(0, -3) }}<br></span>
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