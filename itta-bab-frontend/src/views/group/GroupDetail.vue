<template>
  <div class="meeting-detail">
    <!-- Header Section -->
    <header class="header">
      <img v-bind:src="logo" alt="Logo"/>
      <h1>소속 부트캠프명</h1>
    </header>

    <div class="content-wrapper">
      <!-- Meeting Content Section -->
      <section class="meeting-content">
        <p>모임 내용이 나옵니다.</p>

        <div class="meeting-info">
          <div class="meeting-deco"></div>
          <div class="meeting-detail-item">
            <font-awesome-icon :icon="['fas', 'flag']" class="icon"/>
            <span class="location-text">장소</span>
          </div>
          <div class="meeting-detail-item">
            <font-awesome-icon :icon="['fas', 'receipt']"/>
            <span class="members-count">현재 모집된 인원 / 전체 모집 인원</span>
          </div>
          <div class="meeting-detail-item">
            <font-awesome-icon :icon="['far', 'clock']" class="icon"/>
            <span class="meeting-time">마감시간</span>
          </div>
          <div class="participation">
            <div class="dashed-line"></div> <!-- 점선 추가 -->
            <button class="participate-btn">
              <font-awesome-icon :icon="['fas', 'user-plus']"/>
              참여하기
            </button>
          </div>
        </div>
      </section>

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
    <button class="back-btn">목록</button>
  </div>
</template>

<script setup>
import logo from '@/assets/icons/itta-bab_logo.svg';
import {nextTick, ref} from 'vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

// 댓글 데이터 정의
const comments = ref([
  {author: '작성자(작성자ID)', text: '내용'},
  {author: '나', text: '내용'}
]);

const newComment = ref('');
const commentsList = ref(null);
const commentInput = ref(null);

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
</script>

<style scoped>
/* 전체 배경 */
.meeting-detail {
  background-color: #fdf7d7;
  padding: 20px;
  font-family: Arial, sans-serif;
  min-height: 600px; /* 원하는 높이로 설정 */
}


/* 헤더 스타일 */
.header {
  display: flex;
  align-items: center;
  background-color: #fcf4ca;
  padding: 10px;
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
  display: flex; /* 좌우 배치 */
  margin-top: 20px; /* 위쪽 여백 */
  min-height: 500px;
}

/* 모임 정보 섹션 */
.meeting-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1; /* 가변 너비 */
  margin-right: 20px; /* 오른쪽 간격 */
}

.meeting-info {
  display: flex;
  flex-wrap: nowrap; /* 아이템이 한 줄에 모두 들어가도록 설정 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  margin: 20px 0;
  padding: 10px; /* 패딩 추가 */
  border: 1px solid #e3e3e3; /* 테두리 색상 및 두께 */
  border-radius: 10px; /* 모서리 둥글게 */
  background-color: #fafafa; /* 배경색 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  width: max-content; /* 부모 요소의 너비를 자동 조정 */
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

/* 기타 스타일링 */
.my-comment {
  text-align: right;
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
</style>

