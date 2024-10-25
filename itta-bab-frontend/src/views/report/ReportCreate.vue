<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from "@/stores/auth.js";

const route = useRoute();
const authStore = useAuthStore();

const reportTitle = ref('');
const reportContent = ref('');
const createDate = new Date().toISOString();
const targetId = route.query.groupId; // URL 쿼리에서 groupId 가져오기
const reportTarget = route.query.target; // URL 쿼리에서 target 가져오기
console.log('groupId:', targetId, 'target:', reportTarget);
const submitReport = async (event) => {
  event.preventDefault(); // 기본 제출 동작 방지
  try {
    await axios.post('http://localhost:8003/report/user', {
      reportTitle: reportTitle.value,
      reportContent: reportContent.value,
      targetId: targetId,
      reportTarget: reportTarget,
      createDate: createDate
    }, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });
    alert("신고가 성공적으로 제출되었습니다.");
    reportTitle.value = '';
    reportContent.value = '';
  } catch (error) {
    if (error.response) {
      console.error("신고 제출 오류:", error.response.data); // 서버에서 반환된 에러 메시지
    } else {
      console.error("신고 제출 오류:", error.message); // 네트워크 오류 등
    }
    alert("신고 제출에 실패했습니다. 다시 시도해 주세요.");
  }

};
</script>

<template>
  <main class="post-detail">
    <div class="inline-content">
      <img src="@/assets/icons/itta-bab-logo.svg" alt="밥 이미지" />
      <h3>한화 시스템 부트캠프</h3>
    </div>
    <br />
    <div class="post-write-container">
      <h2>신고 작성</h2>
      <form @submit="submitReport">
        <div class="form-group">
          <label for="title">신고 제목</label>
          <input type="text" id="title" placeholder="제목을 입력하세요" v-model="reportTitle" />
        </div>
        <div class="form-group">
          <label for="content">신고 내용</label>
          <textarea id="content" placeholder="내용을 입력하세요" v-model="reportContent"></textarea>
        </div>
        <button type="submit" class="submit-button">작성 완료</button>
      </form>
    </div>
  </main>
</template>


<style scoped>
.post-detail{
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
  background-color: var(--unactive-button);
}
#content {
  background-color: var(--unactive-button);
}

</style>