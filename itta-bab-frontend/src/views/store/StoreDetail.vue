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


// 컴포넌트가 마운트되면 자동으로 데이터 조회
onMounted(() => {
  fetchStoreList();
  fetchMenuData();
});



// 데이터 설정
// const store = {
//   imageUrl: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMDZfMjA2%2FMDAxNzA5NjYyMzU3OTMw.S59QAzo4zrcqiDBw2PcRmyiLkQncKrjBnBC9FOQflpAg.4MsQTaJf59MVUq_Ha3YV6li5ew1aOa91cU8zojtygfsg.JPEG%2Foutput_1415662850.jpg&type=a340',
//   name: '가게 이름',
//   description: '가게가게가게가게가게가게가게가게가게가게 설명',
//   location: '서울시 강남구',
//   openingHours: '월-금 10:00 - 22:00',
//   menus: [
//     { id: 1, name: '김치찌개', price: 8000 },
//     { id: 2, name: '된장찌개', price: 7000 },
//     { id: 3, name: '비빔밥', price: 9000 },
//   ],
// };
//
// // 리뷰 데이터 설정
// const reviews = ref([
//   {
//     id: 1,
//     username: '익명1',
//     date: '2024-10-15',
//     text: '음식이 정말 맛있어요!',
//     tags: ['맛있음', '친절함'],
//     rating: 5,
//     isLiked: false,
//     userImageUrl: 'https://via.placeholder.com/50',
//   },
//   {
//     id: 2,
//     username: '익명2',
//     date: '2024-10-16',
//     text: '가격이 조금 비싸지만 만족스러웠습니다.',
//     tags: ['가격 비쌈'],
//     rating: 4,
//     isLiked: true,
//     userImageUrl: 'https://via.placeholder.com/50',
//   },
// ]);

const isBookmarked = ref(false); // 북마크 상태 추가

// 아이콘의 배경색을 동적으로 설정 (배경색만 변경)
const bookmarkStyle = computed(() => ({
  backgroundColor: isBookmarked.value ? 'black' : 'transparent', // 배경색만 변경
}));

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value; // 클릭할 때마다 상태 변경
};

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

function goToStoreUpdate(storeId) {
  router.push({ name: 'StoreUpdate', params: { storeId }});
}

function goToStoreMenu(storeId, storeName) {
  router.push({ name: 'MenuMain', params: { storeId, storeName } });
}


// function goToStoreMenuUpdate(storeId, menuId) {
//   router.push(`/store/menu/update/${storeId}/${menuId}`);
// }

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
            <!-- 가게 리스트 -->
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

<!--                <input id="update"-->
<!--                       type="button" value="메뉴 수정"-->
<!--                       @click = "goToStoreMenuUpdate(storeId, item.menuId)"-->
<!--                >-->

              </div>



              <Page
                  :currentPage="currentPage"
                  :totalPages="totalPages"
                  @changePage="goToPage"
              />
            </div>
            <!-- 가게 리스트 -->
            <div class="menu-list">
              <button class="more-btn"
                      @click="goToStoreMenu(storeId, storeName)"
              >더보기 &gt;</button>
            </div>
          </div>
      </div>
    </div>


    <!-- Reviews Section -->
    <div class="review-section">
      <div class="page-title">
        <div class="section-title">리뷰</div>
        <button class="edit-store-btn"><font-awesome-icon :icon="['far', 'pen-to-square']" />리뷰 추가</button>
      </div>
      <div class="review-container">
        <div v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-left">
          <span :class="{'heart-icon': true, 'liked': review.isLiked}" @click="toggleLike(review.id)">
            {{ review.isLiked ? '❤️' : '🤍' }}
          </span>
            <img :src="review.userImageUrl" alt="User Image" class="user-image" />
          </div>
          <div class="review-right">
            <div class="review-header">
              <p class="username">{{ review.username }}</p>
              <p class="date">{{ review.date }}</p>
            </div>
            <p class="review-text">{{ review.text }}</p>
            <div class="review-tags">
              <span v-for="tag in review.tags" :key="tag" class="review-tag">{{ tag }}</span>
            </div>
            <div class="review-rating">
            <span v-for="n in 5" :key="n" class="star">
              {{ n <= review.rating ? '⭐' : '' }}
            </span>
            </div>
          </div>
        </div>

        <button class="more-btn">더보기 &gt;</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.review-container{
  padding: 35px 57px;
  background-color: var(--half-white);
  border-radius: 20px;
}
body {
  font-family: 'Arial', sans-serif;
  background-color: var(--background-color);
}
.page-title{
  display: flex;
  justify-content: space-between;
  margin: 30px 20px 0px 70px;
  align-items: center;
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


.review-section {
  width: 100%;
  margin-bottom: 20px;
}

.review-item {
  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid var(--unactive-button);
  border-radius: 5px;
}

.review-left {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.heart-icon {
  font-size: 24px;
  cursor: pointer;
}

.liked {
  color: red;
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 10px;
}

.review-right {
  flex-grow: 1;
}

.review-header {
  display: flex;
  justify-content: space-between;
}

.review-tags {
  margin-top: 5px;
}

.review-tag {
  background-color: #e0e0e0;
  border-radius: 5px;
  padding: 2px 5px;
  margin-right: 5px;
}

.review-rating {
  margin-top: 10px;
}



.add-review-btn,
.more-btn {
  width: 100%;
  height: 44px;
  background-color: var(--basic-yellow);
  border-radius: 52px;
  border: none;
  font-weight: 600;
  text-align: center;
}

.add-review-btn {
  align-self: flex-end; /* 버튼을 오른쪽 끝으로 이동 */
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

#update {
  width: 120px;
  height: 44px;
  background-color: var(--basic-yellow);
  border-radius: 52px;
  border: none;
  font-weight: 600;
  text-align: center;
  margin-right: 50px;
}

</style>
