<script setup>
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import { ref, computed, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter, useRoute } from 'vue-router';
import {useAuthStore} from "@/stores/auth.js";
import axios from "axios";
import Page from "@/components/common/Page.vue";
import store from "@/router/store.js";

// 라우터 이동을 위한 설정
const router = useRouter();

// 인증 토큰 가져오기
const authStore = useAuthStore();

// 가게 id 가져오기
const route = useRoute();
const storeId = route.params.storeId;


// const storeList = ref([]); // 서버에서 가져올 가게 데이터
const storeName = ref('');
const storeLocation = ref('');
const storeOpenTime = ref('');
const storeEndTime = ref('');
const storeWeek = ref('');
const storeInfo = ref('');
const storeStatus = ref('');


// 서버로부터 데이터를 가져오는 함수
async function fetchStoreList() {
  try {
    const token = authStore.accessToken;
    const response = await axios.get(`http://localhost:8003/store/detail/${storeId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });


    const data = response.data;

    // 필드에 가져온 데이터를 초기화
    storeName.value = data.storeName;
    storeLocation.value = data.storeLocation;
    storeWeek.value = data.storeWeek;
    storeOpenTime.value = data.storeOpenTime;
    storeEndTime.value = data.storeEndTime;
    storeInfo.value = data.storeInfo;
    storeStatus.value = data.storeStatus;

  } catch (error) {
    console.error('가게 데이터를 불러오는데 에러가 발생했습니다', error);
  }
}

// 메뉴 데이터 가져오기
const jsonMenuData = ref([]); // 서버에서 가져올 메뉴 데이터를 저장할 변수


const currentPage = ref(1);
const itemsPage = 3;
const totalPages = computed(() => {
  return Math.ceil(jsonMenuData.value.length / itemsPage);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPage;
  const end = start + itemsPage;
  return jsonMenuData.value.slice(start, end);
});

// 서버에서 메뉴 데이터 가져오기
async function fetchMenuData() {
  try {
    const token = authStore.accessToken;
    const response = await axios.get(`http://localhost:8003/store/menu/list/${storeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    jsonMenuData.value = await response.data;
  } catch (error) {
    console.error("메뉴 데이터를 불러오는데 에러가 발생했습니다: fetch Error:", error);
  }
}

// 리뷰 데이터 가져오기
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



const reviewCurrentPage = ref(1);
const reviewItemsPage = 3;
const reviewTotalPages = computed(() => {
  return Math.ceil(jsonReviewData.value.length / reviewItemsPage);
});

const reviewPaginatedData = computed(() => {
  const start = (reviewCurrentPage.value - 1) * reviewItemsPage;
  const end = start + reviewItemsPage;
  return jsonReviewData.value.slice(start, end);
});




// 컴포넌트가 마운트되면 자동으로 데이터 조회
onMounted(() => {
  fetchStoreList();
  fetchMenuData();
  fetchStoreReviewList();
});



const isBookmarked = ref(false); // 북마크 상태 추가

// 아이콘의 배경색을 동적으로 설정 (배경색만 변경)
const bookmarkStyle = computed(() => ({
  backgroundColor: isBookmarked.value ? 'black' : 'transparent', // 배경색만 변경
}));

// 가게 즐겨찾기 북마크
const toggleBookmark = async () => {
  isBookmarked.value = !isBookmarked.value; // 클릭할 때마다 상태 변경

  if (isBookmarked.value) {
    // 북마크 추가
    await addBookmark(storeId);
  } else {
    // 북마크 삭제
    await removeBookmark(storeId);
  }

};

// 즐겨찾기 추가 및 삭제
async function addBookmark(storeId) {
  try {
    const token = authStore.accessToken;
    await axios.post(`http://localhost:8003/store/favorite`, { "storeId" : storeId }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log("북마크 추가 완료");
  } catch (error) {
    console.error("북마크 추가 오류 발생:", error);
    isBookmarked.value = true; // 오류 시 상태 복구
  }
}

async function removeBookmark(storeId) {
  try {

    const token = authStore.accessToken;
    await axios.delete(`http://localhost:8003/store/favorite/${storeId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log("북마크 삭제 완료");
  } catch (error) {
    console.error("북마크 삭제 오류 발생:", error);
    isBookmarked.value = false; // 오류 시 상태 복구
  }
}


// const toggleLike = (reviewId) => {
//   const review = reviews.value.find((r) => r.id === reviewId);
//   if (review) {
//     review.isLiked = !review.isLiked;
//   }
// };

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

function goToReviewPage(page) {
  if (page >= 1 && page <= reviewTotalPages.value) {
    reviewCurrentPage.value = page;
  }
}

function goToStoreUpdate(storeId) {
  router.push({ name: 'StoreUpdate', params: { storeId }});
}

function goToStoreMenu(storeId, storeName) {
  router.push({ name: 'MenuMain', params: { storeId, storeName } });
}

function goToStoreReview(storeId, storeName) {
  router.push({ name: 'ReviewMain', params: { storeId, storeName } });
}


</script>

<template>
  <PageTitleTop/>
  <div class="store-detail-page">

    <!-- Store Detail Section -->
    <div class="store-detail-container">
      <div class="page-title">
        <div class="section-title">가게 상세</div>
        <button class="edit-store-btn"
                @click = "goToStoreUpdate(storeId)"
        ><font-awesome-icon :icon="['far', 'pen-to-square']" /> 가게 수정하기</button>
      </div>
      <div class="light-yellow-box">
          <div class="store-left">
<!--            <img :src="store.imageUrl" alt="Store Image" class="store-image" />-->
            <div class="store-meta">
              <div class="store-title">
                <h3>{{ storeName }}</h3>
                <div style="display: flex; gap: 20px">
                  <div class="store-state">{{ storeStatus }}</div>
                  <div @click="toggleBookmark" style="cursor: pointer;">
                    <font-awesome-icon
                        :icon="[isBookmarked ? 'fas' : 'far', 'bookmark']"
                        size="lg"
                        :style="{ color: isBookmarked ? '#F8D729' : 'gray' }"
                    />
                  </div>
                </div>
              </div>
              <br>
              <p><font-awesome-icon :icon="['fas', 'location-dot']" />&nbsp;&nbsp;{{ storeLocation }}</p>
              <p v-if="storeWeek || storeOpenTime || storeEndTime"><font-awesome-icon :icon="['far', 'calendar-days']" />&nbsp;&nbsp;{{ storeWeek }}<br>&emsp;&ensp;{{ storeOpenTime.slice(0, -3) }} ~ {{ storeEndTime.slice(0, -3) }}</p>
              <p>{{ storeInfo }}</p>
            </div>
          </div>
          <div class="store-right">

            <!-- 가게 메뉴 -->
            <div class="list-style">
              <div
                  v-for="item in paginatedData"
                  :key="item.menuId"
                  class="data-row"
              >
<!--                <img :src="item.userImageUrl" alt="Menu Image" class="menu-image" />-->
                <div class="data-item">
                  <div class="item_name">{{ item.menuName }}</div>
                  <div class="item_price">{{ item.menuPrice }}원</div>

                </div>

              </div>

              <Page
                  :currentPage="currentPage"
                  :totalPages="totalPages"
                  @changePage="goToPage"
              />
            </div>

            <div class="menu-list">
              <button class="more-btn"
                      @click="goToStoreMenu(storeId, storeName)"
              >더보기 &gt;</button>
            </div>
          </div>
      </div>
    </div>


    <!-- 리뷰 리스트 -->
    <div class="page-title">
      <div class="section-title">리뷰</div>
    </div>


    <div class="review-list">
      <div v-for="review in reviewPaginatedData"
           :key="review.storeId"
           class="review-row"
      >
        <!--          <img :src="review.userImageUrl" alt="User Image" class="user-image" />-->
        <div class="review-content">
          <div class="review-text">{{ review.reviewContent }}</div>
          <!--            <div class="review-tags">-->
          <!--              <span v-for="tag in review.tags" :key="tag" class="review-tag">{{ tag }}</span>-->
          <!--            </div>-->
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
          :currentPage="reviewCurrentPage"
          :totalPages="reviewTotalPages"
          @changePage="goToReviewPage"
      />
    </div>
    <!-- 리뷰 리스트 -->


    <button class="more-btn" @click="goToStoreReview(storeId, storeName)">더보기 &gt;</button>


  </div>
</template>


<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: var(--background-color);
}
.page-title{
  display: flex;
  justify-content: space-between;
  margin: 30px 20px 0px 70px;
  align-items: center;
  margin-bottom: 20px;
}
.store-state{
  width: 73px;
  height: 29px;
  background-color: var(--active-green);
  border-radius: 20px;
  display: flex;
  text-align: center;
  align-items: center;
  font-weight: 600;
  justify-content: center;
}
.light-yellow-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 43px;
  background-color: var(--half-white);
  padding: 65px 150px;
  margin: 0 auto;
  flex-direction: row;
}

.store-title{
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
}
.nav-links a {
  margin-right: 20px;
  text-decoration: none;
  color: black;
}

.header-icons i {
  margin-left: 20px;
}

.store-detail-page{
  padding: 40px;
  background-color: var(--background-color);
}
.section-title {
  margin-bottom: 20px;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
}
.store-info {
  display: flex;
  justify-content: space-between;
}

.store-left {
  display: flex;
  flex-direction: column;
  padding-right: 30px;
  border-right: 2px var(--unactive-button) solid;
}

.store-image {
  width: 350px;
  height: 350px;
  border-radius: 20px;
  object-fit: cover;
}

.store-meta {
  padding: 15px 8px;
  border-radius: 10px;
  width: 350px;
}
.store-meta h3{
  font-size: 20px;
  font-weight: 600;
}
.store-meta p {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
.store-right {
  flex-grow: 1;
  margin-left: 40px;
}

.edit-store-btn {
  background-color: var(--basic-yellow);
  border: none;
  cursor: pointer;
  border-radius: 50px;
  height: 44px;
  padding: 10px 20px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.50);
}

.menu-list {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}


.review-rating {
  margin-top: 10px;
}


.more-btn {
  width: 100%;
  height: 44px;
  background-color: var(--basic-yellow);
  border-radius: 52px;
  border: none;
  font-weight: 600;
  text-align: center;
}


.more-btn:hover {
  background-color: #e0b030;
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
  margin-left: 10px;
  margin-top: 20px;
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
}
.bottom-container button {
  justify-content: flex-end;
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


.bottom-container button{
  justify-content: flex-end; /* 글쓰기 버튼을 오른쪽 끝 정렬 */
}

/* 리뷰 리스트 */
.review-list {
  padding: 20px;
  background-color: var(--half-white);
  border-radius: 20px;
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
