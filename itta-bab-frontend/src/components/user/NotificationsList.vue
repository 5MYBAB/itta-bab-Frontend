<script setup>
import '@/assets/css/resetcss.css';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {computed, onMounted, ref} from "vue";
import alarmReviewIcon from '@/assets/icons/alarm-review-gray.svg'
import alarmPostIcon from '@/assets/icons/alarm-post-gray.svg'
import alarmGroupIcon from '@/assets/icons/alarm-group-gray.svg'
import {useAuthStore} from "@/stores/auth.js";
import axios from "axios";

const redDotStates = ref([false, false, false]);
const notifications = ref([]);

const handleLineClick = (index) => {
  redDotStates.value[index] = true;
}

const authStore = useAuthStore();

const notificationList = ref([]);

const fetchNotificationList = async () => {
  try {
    const response = await axios.get('http://localhost:8003/notification/list', {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`, // 필요한 경우 인증 토큰 추가
      }
    });

    notificationList.value = response.data;
    console.log(notificationList)

    notifications.value = notificationList.value.map(item => ({
      icon: item.target === 'REVIEW' ? alarmReviewIcon :
            item.target === 'POST' ? alarmPostIcon :
            item.target === 'GROUP' ? alarmGroupIcon :
            alarmReviewIcon, // 기본 아이콘 설정
      title: item.target === 'REVIEW' ? '리뷰' :
             item.target === 'POST' ? '게시판' :
             item.target === 'GROUP' ? '모임' :
             '리뷰',
      content: item.content,
      time: item.createDate,
    }));

    console.log(notifications.value)
    console.log(notifications.value[0])

  } catch (error) {
    console.error('알림 목록을 불러오는 중 에러가 발생했습니다.', error.response ? error.response.data : error.message);
  }
};

onMounted(() => {
  fetchNotificationList();
});

// Pagination 관련 변수 및 함수
const currentPage = ref(1);
const itemsPerPage = 10;

// 총 페이지 계산
const totalPages = computed(() => Math.ceil(notificationList.value.length / itemsPerPage));

// 현재 페이지에 해당하는 데이터만 보여주기
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return notifications.value.slice(start, end);
});

// 페이지 이동 함수
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

</script>

<template>
  <div class="display">
    <div class="title">
      <font-awesome-icon :icon="['fas', 'bell']" size="2x"/>
      <div>알림 목록</div>
    </div>
  </div>
  <div class="list-container">
    <div @click="handleLineClick(index)"
         v-for="(notification, index) in paginatedData"
         :key="index"
         class="list-content">
      <div class="contents">
        <div class="ctg">
          <div class="icon">
            <img :src="notification.icon" alt="알림 아이콘"/>
          </div>
          <div class="n-title">{{ notification.title }}
            <div id="red-dot" :class="{ inactive: redDotStates[index] }"/>
          </div>
        </div>
      </div>
      <div class="content">{{ notification.content }}</div>
      <div class="date">{{ notification.time }}</div>
    </div>
  </div>
  <div class="page-named">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">〈</button>
    <span
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
    >
          {{ page }}
        </span>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">〉</button>
  </div>
</template>

<style scoped>

.page-named {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;
}

.page-named span {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid var(--gray-font);
  background-color: var(--white);
}

.page-named .active {
  font-weight: bold;
  color: black;
}

.ctg {
  display: flex;
  align-items: center;
}

.ctg img {
  margin-right: 30px;
}

.ctg div {
  width: 100px;
  font-weight: 600;
  font-size: 20px;
  display: flex;
}

.date {
  color: var(--gray-font);
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
}

.contents {
  display: flex;
  justify-content: space-between;
  margin: 15px 20px;
  align-items: center;

}

.content {
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 400px;
  font-size: 15px;
  padding: 5px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.list-content {
  width: 80%;
  border-bottom: 1px var(--gray-font) solid;
  display: flex;
  justify-content: space-between;
}

.display {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.title {
  display: flex;
  align-items: center;
}

.title div {
  font-size: 30px;
  font-weight: 600;
  margin-left: 10px;
}


.icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.n-title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  gap: 4px;
}

#red-dot {
  width: 7px;
  height: 7px;
  background-color: var(--real-red);
  border-radius: 10px;
}

#red-dot.inactive {
  background-color: #FFFFFF;
}

</style>