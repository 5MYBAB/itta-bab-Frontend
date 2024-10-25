<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Header from "@/App.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import { useAuthStore } from '@/stores/auth'; // authStore를 가져옵니다.

const authStore = useAuthStore();
// 폼 데이터 상태
const inquiryTitle = ref('');
const inquiryContent = ref('');

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
// 문의 등록 함수
async function submitInquiry() {
  // 입력 값이 비어 있는지 확인
  if (!inquiryContent.value) {
    alert('내용을 입력해주세요.');
    return;
  }

  const inquiryData = {
    inquiryContent: inquiryContent.value,
    createDate: new Date().toISOString() // 현재 시간을 ISO 8601 형식으로 추가
  };

  try {
    const response = await axios.post('http://localhost:8003/inquiry/user', inquiryData, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });
    console.log('문의 등록 성공:', response.data);
    alert('문의가 성공적으로 등록되었습니다.');
    // 성공 시 폼 초기화

    inquiryContent.value = '';
  } catch (error) {
    console.error('문의 등록 실패:', error);
    alert('문의 등록에 실패했습니다.');
  }
}
</script>

<template>
  <main class="post-detail">
    <br />
    <div class="post-write-container">
      <h2>문의 하기</h2>
      <form @submit.prevent="submitInquiry">
        <div class="form-group">
<!--          <label for="title">문의</label>
          <input type="text" id="title" v-model="inquiryTitle" placeholder="제목을 입력하세요" />-->
        </div>
        <div class="form-group">
          <label for="content">문의 내용</label>
          <textarea id="content" v-model="inquiryContent" placeholder="내용을 입력하세요"></textarea>
        </div>
        <button type="submit" class="submit-button">작성 완료</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
/* 스타일 코드 생략 (기존 코드 그대로 유지) */
</style>

<style scoped>
.post-detail{/*배경 화면 노란색으로 설정하는 부분*/
  background-color: var(--background-color); /* 노란색 배경 */
  min-height: 100vh; /* 화면 전체 높이 */
  width: 100%;
}
.inline-content { /*글씨랑 사진 조화 설정*/
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
}

img {/* 사진과 글씨 간격 조정*/
  margin-right: 10px; /* 이미지 오른쪽에 간격 추가 */
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
  border: 1px solid var(--unactive-button);
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