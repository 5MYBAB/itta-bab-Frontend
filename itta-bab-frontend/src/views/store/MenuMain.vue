<script setup>

import { computed, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from 'vue-router';
import {useAuthStore} from "@/stores/auth.js";
import Page from "@/components/common/Page.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";

// 인증 토큰 가져오기
const authStore = useAuthStore();


const jsonData = ref([]); // 서버에서 가져올 데이터를 저장할 변수
const currentPage = ref(1);
const itemsPage = 3;

const totalPages = computed(() => {
  return Math.ceil(jsonData.value.length / itemsPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPage;
  const end = start + itemsPage;
  return jsonData.value.slice(start, end);
});

// 라우터에서 storeId 가져오기
const route = useRoute();
const storeId = route.params.storeId;
const storeName = route.params.storeName;


const router = useRouter(); // Vue Router 사용


// 서버에서 메뉴 데이터 가져오기
async function fetchMenuData() {
  try {
    const token = authStore.accessToken;
    const response = await axios.get(`http://localhost:8003/store/menu/list/${storeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    jsonData.value = await response.data;
  } catch (error) {
    console.error("메뉴 데이터를 불러오는데 에러가 발생했습니다: fetch Error:", error);
  }
}


// 메뉴 등록 페이지로 이동하며 storeId 값 전달
function goToMenuRegisterPage() {

  if (!storeId) {
    console.error('storeId가 없습니다.');
    return; // storeId가 없으면 이동을 중단합니다.
  }

  router.push({
    name: 'MenuCreate',
    params: { storeId } // storeId 값을 전달
  });
}

// 메뉴 수정 페이지로 이동하며 storeId 값 전달
function goToMenuUpdatePage() {

  if (!storeId) {
    console.error('storeId가 없습니다.');
    return; // storeId가 없으면 이동을 중단합니다.
  }

  router.push({
    name: 'MenuUpdate',
    params: { storeId, menuId } // storeId, menuId 값을 전달
  });
}



onMounted(() => {
  fetchMenuData();
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function goToStoreMenuUpdate(storeId, menuId) {
  router.push(`/store/menu/update/${storeId}/${menuId}`);
}



</script>



<template>
  <PageTitleTop/>
  <div class="background">
    <div class="page-container">
      <div class="page-top-title">가게 메뉴</div>

        <div class="submit-container">
          <input type="button" value="메뉴 등록" id="submit-button" @click="goToMenuRegisterPage">
        </div>

    </div>
    <div class="total-container">
      <div class="header-row">
        <div class="header-item">{{ storeName }}</div>
      </div>

      <!-- 가게 리스트 -->
      <div class="list-style">
        <div
            v-for="item in paginatedData"
            :key="item.menuId"
            class="data-row"
        >

          <div class="data-item">
            <div class="item_name">{{ item.menuName }}</div>
            <div class="item_price">{{ item.menuPrice }}원</div>



          </div>


          <input id="update"
                 type="button" value="메뉴 수정"
                 @click = "goToStoreMenuUpdate(storeId, item.menuId)"
          >


        </div>



        <Page
            :currentPage="currentPage"
            :totalPages="totalPages"
            @changePage="goToPage"
        />
      </div>
      <!-- 가게 리스트 -->


    </div>
  </div>
</template>


<style scoped>

.page-container{
  padding-top:50px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
}
.page-top-title{
  padding-left: 100px;
  padding-bottom: 30px;
  font-size: 40px;
  font-weight: 600;
  width: 1130px;

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

.submit-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 30%;

}
#submit-button {
  width: 160px;
  height: 44px;
  background-color: var(--basic-yellow);
  border-radius: 52px;
  border: none;
  font-weight: 600;
  text-align: center;
}


/* 가게 리스트 */
.item_name{
  font-size: 20px;
  font-weight: 600;
}
.item_price{
  font-size: 15px;
}
.menu-image {
  width: 107px;
  height: 107px;
  margin:20px
}
.data-row {
  display: flex;
  margin-bottom: 14px;
  border-bottom: 1px solid #ddd;
}

.data-item {
  flex: 1;
  text-align: left;
  margin-left: 50px;
  margin-top: 30px;
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

.list-style {
  border-radius: 0 0 10px 10px;
  background-color: var(--white);
}
.bottom-container button {
  justify-content: flex-end;
}

#update {
  width: 120px;
  height: 44px;
  background-color: var(--basic-yellow);
  border-radius: 52px;
  border: none;
  font-weight: 600;
  text-align: center;
  margin-right: 50px;
  margin-top: 40px;
  margin-bottom: 30px;
}


</style>