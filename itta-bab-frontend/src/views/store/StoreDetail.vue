<script>
import MenuList from "@/components/store/MenuList.vue";

export default {
  components: {MenuList},
  data() {
    return {
      store: {
        imageUrl: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMDZfMjA2%2FMDAxNzA5NjYyMzU3OTMw.S59QAzo4zrcqiDBw2PcRmyiLkQncKrjBnBC9FOQflpAg.4MsQTaJf59MVUq_Ha3YV6li5ew1aOa91cU8zojtygfsg.JPEG%2Foutput_1415662850.jpg&type=a340', // 가게 이미지 URL
        name: '가게 이름',
        description: '가게 설명',
        location: '서울시 강남구',
        openingHours: '월-금 10:00 - 22:00', // 운영 시간 필드 수정
        menus: [
          { id: 1, name: '김치찌개', price: 8000 },
          { id: 2, name: '된장찌개', price: 7000 },
          { id: 3, name: '비빔밥', price: 9000 },
        ],
      },
      reviews: [
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
      ],
    };
  },
  methods: {
    toggleLike(reviewId) {
      const review = this.reviews.find((r) => r.id === reviewId);
      if (review) {
        review.isLiked = !review.isLiked;
      }
    },
  },
};
</script>

<template>
  <div class="store-detail-page">

    <!-- Store Detail Section -->
    <div class="store-detail-container">
      <h2 class="section-title">가게 상세</h2>
      <div class="light-yellow-box">
        <div class="store-info">
          <div class="store-left">
            <img :src="store.imageUrl" alt="Store Image" class="store-image" />
            <div class="store-meta">
              <h3>{{ store.name }}</h3>
              <p>{{ store.description }}</p>
              <p>{{ store.location }}</p>
              <p>{{ store.openingHours }}</p>
            </div>
          </div>
          <div class="store-right">
            <MenuList/>
            <button class="edit-store-btn"><font-awesome-icon :icon="['far', 'pen-to-square']" /> 가게 수정하기</button>
            <div class="menu-list">

              <button class="more-btn">더보기 &gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Reviews Section -->
    <div class="review-section">
      <h2 class="section-title">리뷰</h2>
      <button class="add-review-btn">리뷰 추가</button>
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
</template>


<style scoped>
body {
  font-family: 'Arial', sans-serif;
}

.light-yellow-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.13) inset;
  border-radius: 43px;
  background-color: var(--half-white);
  max-width: 1000px;
  width: 100%;
  padding: 65px 150px;
  margin: 0 auto;
}


.nav-links a {
  margin-right: 20px;
  text-decoration: none;
  color: black;
}

.header-icons i {
  margin-left: 20px;
}

.store-detail-container {
  padding: 40px;
  background-color: var(--background-color);
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.store-info {
  display: flex;
  justify-content: space-between;
}

.store-left {
  display: flex;
  flex-direction: column;
}

.store-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.store-meta {
  background-color: #fff5e5;
  padding: 15px;
  border-radius: 10px;
}

.store-right {
  flex-grow: 1;
  margin-left: 40px;
}

.edit-store-btn {

  background-color: var(--basic-yellow);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.menu-list {
  width: 50%;
  margin-top: 20px;
}


.review-section {
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
}

.review-item {
  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
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
  width: 160px;
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
