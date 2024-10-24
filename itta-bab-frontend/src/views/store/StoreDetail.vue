<script setup>
import MenuList from "@/components/store/MenuList.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 데이터 설정
const store = {
  imageUrl: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMDZfMjA2%2FMDAxNzA5NjYyMzU3OTMw.S59QAzo4zrcqiDBw2PcRmyiLkQncKrjBnBC9FOQflpAg.4MsQTaJf59MVUq_Ha3YV6li5ew1aOa91cU8zojtygfsg.JPEG%2Foutput_1415662850.jpg&type=a340',
  name: '가게 이름',
  description: '가게가게가게가게가게가게가게가게가게가게 설명',
  location: '서울시 강남구',
  openingHours: '월-금 10:00 - 22:00',
  menus: [
    { id: 1, name: '김치찌개', price: 8000 },
    { id: 2, name: '된장찌개', price: 7000 },
    { id: 3, name: '비빔밥', price: 9000 },
  ],
};

// 리뷰 데이터 설정
const reviews = ref([
  {
    id: 1,
    username: '익명1',
    date: '2024-10-15',
    text: '음식이 정말 맛있어요!',
    tags: ['맛있음', '친절함'],
    rating: 5,
    isLiked: false,
    userImageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: 2,
    username: '익명2',
    date: '2024-10-16',
    text: '가격이 조금 비싸지만 만족스러웠습니다.',
    tags: ['가격 비쌈'],
    rating: 4,
    isLiked: true,
    userImageUrl: 'https://via.placeholder.com/50',
  },
]);

const isBookmarked = ref(false); // 북마크 상태 추가

// 아이콘의 배경색을 동적으로 설정 (배경색만 변경)
const bookmarkStyle = computed(() => ({
  backgroundColor: isBookmarked.value ? 'black' : 'transparent', // 배경색만 변경
}));

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value; // 클릭할 때마다 상태 변경
};

const toggleLike = (reviewId) => {
  const review = reviews.value.find((r) => r.id === reviewId);
  if (review) {
    review.isLiked = !review.isLiked;
  }
};
</script>

<template>
  <PageTitleTop/>
  <div class="store-detail-page">

    <!-- Store Detail Section -->
    <div class="store-detail-container">
      <div class="page-title">
        <div class="section-title">가게 상세</div>
        <button class="edit-store-btn"><font-awesome-icon :icon="['far', 'pen-to-square']" /> 가게 수정하기</button>
      </div>
      <div class="light-yellow-box">
          <div class="store-left">
            <img :src="store.imageUrl" alt="Store Image" class="store-image" />
            <div class="store-meta">
              <div class="store-title">
                <h3>{{ store.name }}</h3>
                <div style="display: flex; gap: 20px">
                  <div class="store-state">영업중</div>
                  <div @click="toggleBookmark" style="cursor: pointer;">
                    <font-awesome-icon
                        :icon="[isBookmarked ? 'fas' : 'far', 'bookmark']"
                        size="lg"
                        :style="{ color: isBookmarked ? '#F8D729' : 'gray' }"
                    />
                  </div>
                </div>
              </div>
              <p>{{ store.description }}</p>
              <p><font-awesome-icon :icon="['fas', 'location-dot']" />&nbsp;&nbsp;{{ store.location }}</p>
              <p><font-awesome-icon :icon="['far', 'calendar-days']" />&nbsp;&nbsp;{{ store.openingHours }}</p>
            </div>
          </div>
          <div class="store-right">
            <MenuList/>
            <div class="menu-list">
              <button class="more-btn">더보기 &gt;</button>
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

</style>
