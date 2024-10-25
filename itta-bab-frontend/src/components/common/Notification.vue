<script setup>

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {ref} from "vue";
import alarmReviewIcon from '@/assets/icons/alarm-review-gray.svg'
import alarmPostIcon from '@/assets/icons/alarm-post-gray.svg'
import alarmGroupIcon from '@/assets/icons/alarm-group-gray.svg'
import {useRouter} from "vue-router";

const isDropdownVisible = ref(false);
const redDotStates = ref([false, false, false]);

const notifications = ref([
  {
    icon: alarmReviewIcon,
    title: "리뷰",
    content: "리뷰가 등록되었습니다: 버거킹 신대방삼거리점",
    time: "10/24 12:19",
  },
  {
    icon: alarmPostIcon,
    title: "익명 게시판",
    content: "글이 등록되었습니다: 소통해요!",
    time: "10/02 17:34",
  },
  {
    icon: alarmGroupIcon,
    title: "모임",
    content: "임광택(pangtaek)님의 모임이 등록되었습니다: 저랑 컵밥 시키실 분",
    time: "09/22 13:01",
  },
  {
    icon: alarmReviewIcon,
    title: "리뷰",
    content: "새로운 리뷰가 등록되었습니다!",
    time: "10/20 10:00",
  },
  {
    icon: alarmPostIcon,
    title: "익명 게시판",
    content: "새 글이 등록되었습니다: 소통해요!",
    time: "10/15 14:00",
  },
]);

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
        <div v-if="notifications.length === 5" @click="goToMypage" id="show-more-button" class="custom-cursor">
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