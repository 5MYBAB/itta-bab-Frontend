<script setup>
import axios from "axios";
import logo from '@/assets/icons/itta-bab_logo.svg';
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import {nextTick, onMounted, ref} from 'vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import ReportButton from "@/components/common/ReportButton.vue";

// 로그인 사용자 정보
const authStore = useAuthStore();

// DB 데이터
const data = ref([]);

// 라우터
const router = useRouter();
const route = useRoute(); // 현재 라우트 정보 가져오기

// 댓글 데이터 정의
const comments = ref([
  {author: '작성자(작성자ID)', text: '내용'},
  {author: '나', text: '내용'}
]);

const newComment = ref('');
const commentsList = ref(null);
const commentInput = ref(null);
const postLiked = ref(false); // 게시물의 좋아요 상태

function toggleLike(index) {
  if (index >= 0 && index < comments.value.length) {
    comments.value[index].liked = !comments.value[index].liked;
  } else {
    console.error(`Invalid index: ${index}`);
  }
}
function togglePostLike() {
  postLiked.value = !postLiked.value;
}

// 댓글 추가 메서드
function addComment() {
  if (newComment.value.trim() !== '') {
    comments.value.push({author: '나', text: newComment.value}); // "나" 아이디로 댓글 추가
    newComment.value = ''; // 입력 필드 초기화
    nextTick(() => {
      // 댓글 추가 후 스크롤을 가장 아래로 이동
      commentsList.value.scrollTop = commentsList.value.scrollHeight;
      // 댓글 입력 필드로 포커스 이동
      commentInput.value.focus();
    });
  }
}

// REST API 호출 함수
const fetchData = async () => {
  try {
    const responseAboutGroupDetail = await axios.get(`http://localhost:8003/group/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    data.value = responseAboutGroupDetail.data;
    console.log(data);
  } catch (error) {
    console.log("어라라...?\n" + error);
  }
}

// 데이터 전송 함수
async function sendData() {
  try {
    const groupId = route.params.id; // 그룹 ID 가져오기
    const response = await axios.post(`http://localhost:8003/group/detail/${groupId}`, {}, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    if (response.status === 200) {
      alert("참여에 성공하였습니다.");
    } else if (response.status === 208) {
      alert("이미 참여하였습니다.");
    } else if (response.status === 404) {
      alert("모임이 없습니다.");
    } else if (response.status === 423) {
      alert("모임이 마감되었습니다.");
    }
  } catch (error) {
    console.log(error.response);

    if (error.response) {
      // 서버가 응답을 보냈지만 상태 코드가 2xx가 아닌 경우
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      alert("참여에 실패하였습니다. " + error.response.data); // 사용자에게 오류 메시지 표시
    } else {
      // 요청이 이루어지지 않았거나 네트워크 오류
      console.log("Error:", error.message);
      alert("참여에 실패하였습니다. 네트워크 오류입니다."); // 네트워크 오류 메시지 표시
    }
  }
}

const reportData = ref({
  target: "GROUP",
  targetId: null
})

function reporting(groupId) {
  reportData.value.targetId = groupId;
  router.push({
    name: 'ReportCreate',
    query: {
      target: reportData.value.target,
      targetId: reportData.value.targetId
    }
  });
}

// DateTime 형식 변경 함수
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 목록으로 돌아가는 함수
function goToListPage() {
  router.push("/group");
}

// 컴포넌트가 마운트될 때 데이터 가져오기
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="meeting-detail">
    <!-- Header Section -->
    <header class="header">
      <img v-bind:src="logo" alt="Logo"/>
      <h1>한화시스템 BEYOND SW 캠프</h1>
<!--      <h1>{{ data.courseId }}</h1>-->
    </header>

    <div class="content-wrapper">
      <!-- 제목 -->
      <div class="top-section">
        <h1>{{ data.groupTitle }}</h1>
      </div>
      <div class="middle-section">
        <!-- 내용 -->
        <div class="left">
          <div class="title-section">
            <p>작성자 : 유근웅(test01)</p>
<!--            <p>작성자 : {{ data.userId }}</p>-->
            <div class="plz-end">
              <ReportButton v-on:click="reporting(data.groupId)"/>
              <button class="like-button" @click="togglePostLike">
                <font-awesome-icon
                    :icon="postLiked ? ['fas', 'heart'] : ['far', 'heart']"
                    class="heart-icon"
                    style="color: #da4d10"
                />
              </button>
            </div>
          </div>
          <p>{{ data.groupPost }}</p>
        </div>
        <div class="meeting-info">
          <div class="meeting-deco"></div>
          <div class="meeting-detail-item">
            <font-awesome-icon :icon="['fas', 'flag']" class="icon"/>
            <span class="location-text">테스트 장소</span>
          </div>
          <div class="meeting-detail-item">
            <font-awesome-icon :icon="['fas', 'receipt']"/>
            <span class="members-count">{{ data.userCounting }}</span>
          </div>
          <div class="meeting-detail-item">
            <font-awesome-icon :icon="['far', 'clock']" class="icon"/>
            <span class="meeting-time">{{ formatDate(data.endDate) }}</span>
          </div>
          <div class="participation">
            <div class="dashed-line"></div> <!-- 점선 추가 -->
            <button class="participate-btn" v-on:click="sendData">
              <font-awesome-icon :icon="['fas', 'user-plus']"/>
              참여하기
            </button>
          </div>
        </div>
      </div>

      <!-- Comment Section -->
      <section class="comment-section">
        <div class="comments-list" ref="commentsList">
          <div v-for="(comment, index) in comments" :key="index"
               :class="{'my-comment': comment.author === '나', 'other-comment': comment.author !== '나'}">
            <div :class="{'my-comment-bubble': comment.author === '나', 'other-comment-bubble': comment.author !== '나'}">
              <span>{{ comment.author }}</span>
              <hr/>
              <p>{{ comment.text }}</p>
            </div>
          </div>
        </div>

        <!-- Comment Input -->
        <div class="comment-input">
          <textarea v-model="newComment" placeholder="댓글을 입력하세요" ref="commentInput"></textarea>
          <button @click="addComment">댓글 작성</button>
        </div>
      </section>
    </div>

  </div>
  <!-- Back Button -->
  <div class="button-container">
    <button class="back-btn" v-on:click="goToListPage">목록</button>
  </div>
</template>

<style scoped>
/* 전체 배경 */
.meeting-detail {
  background-color: #fdf7d7;
  padding: 20px;
  font-family: Arial, sans-serif;
  min-height: 600px; /* 원하는 높이로 설정 */
}

.top-section {
  background-color: var(--basic-yellow);
  border: none; /* 기존 테두리 제거 */
  border-top-left-radius: 10px; /* 왼쪽 상단 모서리 둥글게 */
  border-top-right-radius: 10px; /* 오른쪽 상단 모서리 둥글게 */
  height: 10%;
}

.top-section h1 {
  padding-left: 1px;
  margin: 2%; /* 필요에 따라 여백 조정 */
}

.middle-section {
  background-color: white;
  display: flex; /* Flexbox 사용 */
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 중앙 정렬 */

}

.left {
  text-align: left; /* p 태그 왼쪽 정렬 */
  padding-left: 2%;
  margin: 2%; /* 필요에 따라 여백 조정 */
  width: 100%; /* 부모 요소의 너비를 사용 */
  /* 추가적인 여백 조정 필요 시 아래 속성 사용 */
}

/* 헤더 스타일 */
.header {
  display: flex;
  align-items: center;
  background-color: #fcf4ca;
  padding: 10px;
  border: none !important;
}

.header img {
  width: 40px;
  margin-right: 10px;
}

.header h1 {
  font-size: 20px;
  font-weight: bold;
}

/* Content Wrapper */
.content-wrapper {
  margin-top: 20px; /* 위쪽 여백 */
  min-height: 500px;
}

/* 모임 정보 섹션 */
.meeting-info {
  display: flex;
  flex-wrap: nowrap; /* 아이템이 한 줄에 모두 들어가도록 설정 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  padding: 10px; /* 패딩 추가 */
  border: 1px solid #e3e3e3; /* 테두리 색상 및 두께 */
  border-radius: 10px; /* 모서리 둥글게 */
  background-color: #fafafa; /* 배경색 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  width: max-content; /* 부모 요소의 너비를 자동 조정 */
  margin-top: 10%;
}

/* 댓글 섹션 */
.comment-section {
  display: flex; /* Flexbox 사용 */
  flex-direction: column; /* 세로 방향으로 배치 */
  justify-content: space-between; /* 공간을 최대로 활용 */
  background-color: rgba(255, 255, 255, 0); /* 배경색을 완전 투명으로 설정 */
  padding: 20px;
  border-radius: 10px;
  flex: 1; /* 가변 너비 */
}

/* 댓글 입력 */
.comment-input {
  display: flex;
  align-items: center;
  margin-top: 10px; /* 위쪽 여백 */
}

/* 댓글 리스트 */
.comments-list {
  max-height: 380px; /* 댓글 영역의 최대 높이를 늘림 */
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
  border-radius: 10px; /* 모서리 둥글게 */
  padding: 10px; /* 패딩 추가 */
  background-color: rgba(255, 255, 255, 0); /* 배경색을 완전 투명으로 설정 */
}

.comment-input textarea {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.comment-input button {
  background-color: #f7d794;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

/* 목록 버튼 중앙 정렬을 위한 컨테이너 */
.button-container {
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  margin-top: 20px; /* 위쪽 여백 */
}

/* 목록 버튼 */
.back-btn {
  background-color: #f7d794;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.my-comment-bubble {
  background-color: #a4d1ff;
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  margin-bottom: 10px;
}

.other-comment {
  text-align: left;
}

.other-comment-bubble {
  background-color: #f1f1f1;
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
  margin-bottom: 10px;
}

.meeting-detail-item {
  display: flex;
  align-items: center;
  margin-right: 20px; /* 각 아이템 사이의 간격 */
}

.meeting-deco {
  background-color: #f76c6c; /* 배경색 */
  width: 3px; /* 너비 조정 */
  height: 50px; /* 높이 조정 */
  margin-right: 20px; /* 다른 요소와의 간격 */
}

.icon {
  margin-right: 10px; /* 아이콘과 텍스트 사이의 간격 설정 */
  font-size: 20px; /* 필요시 크기 조정 */
}

.participation {
  display: flex;
  align-items: center;
}

.dashed-line {
  border-left: 2px dashed #d3d3d3; /* 점선 설정 */
  height: 30px; /* 점선 높이 설정 */
  margin-right: 10px; /* 점선과 버튼 간격 */
}

.participate-btn {
  background-color: #f7d794;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.members-count {
  margin-left: 10px;
}

.title-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 1%;
  margin-bottom: 1%;
}

.plz-end {
  border: none !important;
  background-color: transparent !important;
  cursor: pointer;
}

.like-button {
  border: none;
  background-color: var(--white);
}
</style>
