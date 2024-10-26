<script setup>
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth.js";

const isDropdownVisible = ref(false);
const username = ref('');
const authStore = useAuthStore();
const isFriendRequested = ref(false); // 요청 상태를 저장하는 변수

const toggleDropdown = (event) => {
  username.value = event.target.innerText;
  isDropdownVisible.value = !isDropdownVisible.value;
};

const handleRequestClick = async () => {
  try {
    const toUserId = 3;

    console.log('123');

    const response = await axios.post(
        'http://localhost:8003/friend/request',
        { toUserId },
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`
          }
        }
    );

    console.log('1234');
    alert(`${username.value}에게 친구를 신청했습니다.`);
    isFriendRequested.value = true; // 친구 요청 성공 시 상태 업데이트
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // 서버가 409 Conflict로 이미 요청이 존재함을 알려줄 경우
      alert('이미 친구 요청이 진행 중입니다.');
      isFriendRequested.value = true;
    } else {
      console.error('친구 신청 중 에러가 발생했습니다.', error);
    }
  }
};
</script>

<template>
  <div class="notification-dropdown">
    <div @click="toggleDropdown" id="notification-button" class="custom-cursor">
      임광택 <!-- 클릭 시 이 값을 username에 할당 -->
    </div>
    <div v-if="isDropdownVisible" class="container">
      <div
          v-if="!isFriendRequested"
          @click="handleRequestClick"
          class="custom-cursor"
          id="friend-add"
      >
        친구 신청
      </div>
      <div
          v-else
          class="custom-cursor"
          id="friend-pending"
          style="background-color: gray;"
      >
        친구 요청 대기중
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-cursor {
  cursor: pointer;
}

.container {
  background-color: var(--gray-input);
  left: 0;
  z-index: 10;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#friend-add {
  background-color: var(--basic-yellow);
  width: 73px;
  height: 23px;
  border-radius: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

#friend-pending {
  background-color: var(--unactive-button);
  width: 100px;
  height: 23px;
  border-radius: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
</style>
