<template>
  <main class="post-detail">
    <div class="inline-content">
      <img src="@/assets/icons/itta-bab-logo.svg" alt="밥 이미지" />
      <h3>한화 시스템 부트캠프</h3>
    </div>
    <br />
    <div class="post-write-container">
      <h2>게시물 작성</h2>
      <form @submit.prevent="submitPost">
        <div class="form-group">
          <label for="title">게시물 제목</label>
          <input type="text" id="title" placeholder="제목을 입력하세요" v-model="title" />
        </div>
        <div class="form-group">
          <label for="content">게시물 내용</label>
          <textarea id="content" placeholder="내용을 입력하세요" v-model="content"></textarea>
        </div>
        <button type="submit" class="submit-button">작성 완료</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth'; // authStore를 가져옵니다.

const authStore = useAuthStore(); // authStore 인스턴스를 가져옵니다.

const title = ref('');
const content = ref('');

console.log('AccessToken 받아오는지 테스트:', authStore.accessToken);

function getUserIdFromToken() {
  if (!authStore.accessToken) return null;

  try {
    const payload = JSON.parse(atob(authStore.accessToken.split('.')[1])); // JWT 토큰의 페이로드를 디코딩
    console.log('Payload 작동하는지 테스트:', payload);
    return payload.sub; // 페이로드에서 userId 추출
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

async function submitPost() {
  const userId = getUserIdFromToken(); // userId를 추출합니다.
  console.log('유저아이디 뜨는 지 테스트:', userId);

  if (!userId) {
    alert('로그인이 필요합니다.');
    return;
  }

  const postData = {
    title: title.value,
    content: content.value,
    userId: userId, // userId를 포함합니다.
    createDate: new Date().toISOString() // 현재 시간을 ISO 8601 형식으로 추가합니다.
  };

  console.log('게시물 데이터 확인:', postData);

  try {
    const response = await axios.post('http://localhost:8003/post', postData, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });
    console.log('게시물 전송 성공:', response.data);
    alert('게시물이 성공적으로 작성되었습니다.');
    // 게시물 전송 성공 시 추가 작업을 여기에 작성합니다. 예: 페이지 이동
  } catch (error) {
    console.error('게시물 전송 실패:', error);
    alert('게시물 전송에 실패했습니다.');
  }
}
</script>

<style scoped>
.post-detail {
  background-color: var(--background-color);
  min-height: 100vh;
  width: 100%;
}

.inline-content {
  display: flex;
  align-items: center;
}

img {
  margin-right: 10px;
}

.post-write-container {
  padding: 30px;
  background-color: var(--white);
  max-width: 600px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

textarea {
  resize: none;
  height: 150px;
}

.submit-button {
  display: block;
  width: 100%;
  background-color: var(--basic-yellow);
  color: var(--white);
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: var(--basic-yellow);
}
#title {
  background-color: var(--unactive-button); /* 회색 배경색 */
}
#content {
  background-color: var(--unactive-button); /* 회색 배경색 */
}
</style>
