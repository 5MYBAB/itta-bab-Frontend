<script setup>

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {onMounted, ref} from "vue";
import alarmReviewIcon from '@/assets/icons/alarm-review-gray.svg'
import alarmPostIcon from '@/assets/icons/alarm-post-gray.svg'
import alarmGroupIcon from '@/assets/icons/alarm-group-gray.svg'
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import axios from "axios";

const isDropdownVisible = ref(false);
const redDotStates = ref([false, false, false]);

const notifications = ref([]);
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

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const handleLineClick = (index) => {
  redDotStates.value[index] = true;
}

const router = useRouter();

const goToMypage = () => {
  isDropdownVisible.value = false;
  router.push('/mypage');
}

onMounted(() => {
  fetchNotificationList();
});


</script>

<template>
  <div class="notification-dropdown">
    <div @click="toggleDropdown" id="notification-button" class="custom-cursor">
      <font-awesome-icon :icon="['fas', 'bell']"/>
    </div>
    <div v-if="isDropdownVisible" class="container">
      <div class="yellow">
        <div class="text-container">
          알림
        </div>
      </div>
      <div class="list">
        <div id="item" @click="handleLineClick(index)" class="custom-cursor"
             v-for="(notification, index) in notifications" :key="index">
          <div class="icon">
            <img :src="notification.icon" alt="알림 아이콘"/>
          </div>
          <div class="info">
            <div class="title">{{ notification.title }}
              <div id="red-dot" :class="{ inactive: redDotStates[index] }"/>
            </div>
            <div class="content">{{ notification.content }}</div>
            <div class="time">{{ notification.time }}</div>
          </div>
        </div>
        <div @click="goToMypage" id="show-more-button" class="custom-cursor">
          <div class="faArrowRight"><font-awesome-icon :icon="['fas', 'angle-right']" /></div>
          <div class="text-more">더보기</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-dropdown {
  position: relative;
}

.container {
  position: absolute;
  top: 100%;
  left: 0;
  transform: translateX(-414px);
  z-index: 10;
}

.yellow {
  border-radius: 20px 20px 0px 0px;
  background-color: var(--basic-yellow);
  height: 72px;
  text-align: left;
  padding-left: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
  font-weight: 600;
  width: 414px;
}

.text-container {
  display: flex;
  align-items: center;
}

.faArrow {
  margin: 10px;
}

.list {
  background-color: var(--white);
  border-radius: 0px 0px 20px 20px;
  height: 513px;
  width: 414px;
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
}

#item {
  padding: 10px 0px;
  border-bottom: 2px var(--gray-font) solid;
  display: flex;
  gap: 20px;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
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

.content {
  font-size: 12px;
  font-weight: 400;
}

.time {
  font-size: 10px;
  font-weight: 400;
}

.faArrowRight {
  width: 12px;
  height: 28px;
  margin-right: 4px;
}

#show-more-button {
  color: var(--gray-font);
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-more {
  font-size: 18px;
  font-weight: 600;
}

.custom-cursor {
  cursor: pointer;
}
</style>