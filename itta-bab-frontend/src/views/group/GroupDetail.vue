<template>
  <div class="meeting-detail">
    <!-- Header Section -->
    <header class="header">
      <img v-bind:src="logo" alt="Logo"/>
      <h1>소속 부트캠프명</h1>
    </header>

    <!-- Meeting Title Section -->
    <section class="meeting-title">
      <div class="status">모집 상태</div>
      <div class="title">제목</div>
      <div class="post-id">12345</div>
    </section>

    <!-- Author Section -->
    <section class="author-section">
      <div class="author">
        <span>작성자 : 작성명(작성자ID)</span>
        <div class="actions">
          <button class="report-btn">신고</button>
          <button class="like-btn">♡</button>
        </div>
      </div>
    </section>

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
      <div v-for="(comment, index) in comments" :key="index"
           :class="{'my-comment': comment.author === '나', 'other-comment': comment.author !== '나'}">
        <div :class="{'my-comment-bubble': comment.author === '나', 'other-comment-bubble': comment.author !== '나'}">
          <span>{{ comment.author }}</span>
          <hr/>
          <p>{{ comment.text }}</p>
        </div>
      </div>
    </section>

    <!-- Comment Input -->
    <div class="comment-input">
      <textarea v-model="newComment" placeholder="댓글을 입력하세요"></textarea>
      <button @click="addComment">댓글 작성</button>
    </div>

    <!-- Back Button -->
    <button class="back-btn">목록</button>
  </div>
</template>

<script setup>
import logo from '@/resource/itta-bab_logo.png';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
</script>

<style scoped>
/* 전체 배경 */
.meeting-detail {
  background-color: #fdf7d7;
  padding: 20px;
  font-family: Arial, sans-serif;
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

/* 모임 제목 섹션 */
.meeting-title {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.status {
  background-color: #d9f99d;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.post-id {
  font-size: 12px;
  color: #999;
}

/* 작성자 섹션 */
.author-section {
  margin-bottom: 20px;
}

.author {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
}

.report-btn,
.like-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
}

/* 모임 정보 섹션 */
.meeting-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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

.meeting-detail-item {
  display: flex;
  align-items: center;
  margin-right: 20px; /* 각 아이템 사이의 간격 */
  /* flex-grow 제거 */
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

/* 댓글 섹션 */
.comment-section {
  margin-top: 20px;
}

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

/* 댓글 입력 */
.comment-input {
  display: flex;
  align-items: center;
  margin-top: 20px;
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

/* 목록 버튼 */
.back-btn {
  background-color: #f7d794;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
