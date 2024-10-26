<script setup>
import '@/assets/css/resetcss.css';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import axios from "axios";
import {computed, onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore();

const friendList = ref([]);

const fetchFriendList = async () => {
  try {
    const response = await axios.get('http://localhost:8003/friend/list', {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`, // 필요한 경우 인증 토큰 추가
      }
    });
    friendList.value = response.data; // 응답 데이터를 inquiryList에 저장

  } catch (error) {
    console.error('친구 목록을 불러오는 중 에러가 발생했습니다.', error.response ? error.response.data : error.message);
  }
};

const fetchFriendRequestList = async () => {
  try {
    const response = await axios.get('http://localhost:8003/friend/request', {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`, // 필요한 경우 인증 토큰 추가
      }
    });
    friendList.value = response.data; // 응답 데이터를 inquiryList에 저장

  } catch (error) {
    console.error('친구 목록을 불러오는 중 에러가 발생했습니다.', error.response ? error.response.data : error.message);
  }
};


onMounted(() => {
  fetchFriendList();
});

// Pagination 관련 변수 및 함수
const currentPage = ref(1);
const itemsPerPage = 10;

// 총 페이지 계산
const totalPages = computed(() => Math.ceil(friendList.value.length / itemsPerPage));

// 현재 페이지에 해당하는 데이터만 보여주기
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return friendList.value.slice(start, end);
});

// 페이지 이동 함수
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

const handleDeleteClick = async () => {
  try {
    const userId = 3;

    const response = await axios.delete(
        'http://localhost:8003/friend',
        {
          data: { friendUserId: userId },
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`
          }
        }
    );

    fetchFriendList();

  } catch (error) {
    console.error('친구 삭제 실패', error);
  }
}

const currentTitle = ref("친구 목록");
const pastTitle = ref("친구 요청 목록");

const toggleTitle = () => {
  currentTitle.value = currentTitle.value === "친구 목록" ? "친구 요청 목록" : "친구 목록";
  pastTitle.value = pastTitle.value === "친구 목록" ? "친구 요청 목록" : "친구 목록";

  if (currentTitle.value === "친구 요청 목록") {
    fetchFriendRequestList();
  } else {
    fetchFriendList();
  }
};

const handleAcceptRequest = async (friend) => {
  try {
    const response = await axios.put(
        'http://localhost:8003/friend/accept',
        { fromUserId: friend.userId },
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`
          }
        }
    );
    fetchFriendRequestList();
  } catch (error) {
    console.error('친구 요청 수락 실패', error);
  }
};

const handleRejectRequest = async (friend) => {
  try {
    const response = await axios.put(
        'http://localhost:8003/friend/reject',
        { fromUserId: friend.userId },
        {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`
          }
        }
    );
    fetchFriendRequestList();
  } catch (error) {
    console.error('친구 요청 거절 실패', error);
  }
};
</script>

<template>
  <div class="display">
    <div class="title">
      <font-awesome-icon :icon="['fas', 'user-group']" size="2x"/>
      <div>{{ currentTitle }}</div>
      <button @click="toggleTitle">{{ pastTitle }}</button>
    </div>
  </div>
  <div>
    <div v-for="(friend, index) in paginatedData" :key="friend.friendId" class="list-container">
      <div class="list-content">
        <div class="contents">
          <div class="text">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</div>
          <div class="text">{{ friend.username }}</div>
          <div v-if="currentTitle === '친구 목록'" class="delete" @click="handleDeleteClick">삭제</div>
          <div v-else class="action-buttons">
            <button class="accept" @click="handleAcceptRequest(friend)">수락</button>
            <button class="reject" @click="handleRejectRequest(friend)">거절</button>
          </div>
        </div>
      </div>
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
.action-buttons {
  display: flex;
  gap: 10px;
}

.accept, .reject {
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.accept {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.reject {
  background-color: #f44336;
  color: white;
  border: none;
}

.accept:hover {
  background-color: #45a049;
}

.reject:hover {
  background-color: #da190b;
}

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

.delete {
  color: var(--gray-font);
  font-size: 15px;
  cursor: pointer;
}

.contents {
  display: flex;
  justify-content: space-between;
  gap: 230px;
  margin: 15px 30px;
}

.text {
  font-size: 20px;
  font-weight: 400;
}

.list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-content {
  width: 80%;
  border-bottom: 1px var(--gray-font) solid;
}

.display {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.title div {
  font-size: 30px;
  font-weight: 600;
  margin-left: 10px;
}
</style>