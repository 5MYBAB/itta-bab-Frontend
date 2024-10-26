<script setup>
import axios from 'axios';
import { ref, reactive, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter, useRoute } from "vue-router";
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import router from "@/router/index.js";

const authStore = useAuthStore();
const route = useRoute();

const inquiryId = route.params.id;

const inquiryData = reactive({
  inquiry_user_id: "",  // 문의를 남긴 유저 ID
  inquiry_content: ""    // 문의 내용
});

const replyContent = ref("");

// 문의 내용 보여주기
const fetchInquiryData = async () => {
  try {
    const response = await axios.get(`http://localhost:8003/inquiry/admin/${inquiryId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });
    // API 응답에서 필요한 값 설정
    inquiryData.inquiry_user_id = response.data.inquiryUserId; // API 응답에서 유저 ID 가져오기
    inquiryData.inquiry_content = response.data.inquiryContent; // API 응답에서 내용 가져오기
  } catch (error) {
    console.error('문의 내용을 불러오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
  }
};

// 답변 등록 함수
const formData = ref({
  inquiryReply: "",
  inquiryReplyTime: new Date().toISOString()
});

// 답변 등록 함수
const registerReply = async () => {
  if (replyContent.value.trim() === "") {
    alert('답변 내용을 입력하세요.');
    return;
  }
  // formData 업데이트
  formData.value.inquiryReply = replyContent.value;
  formData.value.inquiryReplyTime = new Date().toISOString();

  try {
    console.log("formData:", formData.value); // 콘솔에 formData 내용 확인
    const response = await axios.post(`http://localhost:8003/inquiry/admin/${inquiryId}`, formData.value, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });
    alert('답변이 완료되었습니다.');
    replyContent.value = ""; // 답변 등록 후 내용 초기화
    formData.value.inquiryReply = ""; // formData도 초기화'
    router.push('/admin');
  } catch (error) {
    console.error('답변 등록 중 오류가 발생했습니다:', error);
    alert('답변 등록에 실패했습니다. 다시 시도하세요.');
  }
};


// 컴포넌트 마운트 시 데이터 요청
onMounted(async () => {
  console.log("inquiryId:", inquiryId); // inquiryId 값 확인
  await fetchInquiryData();
});
</script>


<template>
  <div class="inquiry-content">
    <PageTitleTop/>
    <h2 class="section-title">문의 답변</h2>

    <div class="full-section">
      <br>
      <div class="question-section">
        <div class="question-details">
          <div><strong>유저 ID:</strong> {{ inquiryData.inquiry_user_id }}</div> <!-- 유저 ID 표시 -->
          <div><strong>문의 내용:</strong>
            <div class="inquiry-content-indent">{{ inquiryData.inquiry_content }}</div> <!-- 문의 내용 표시 -->
          </div>
        </div>
      </div>

      <br>

      <div class="answer-section">
        <h3>답변</h3>
        <textarea v-model="replyContent" placeholder="답변 내용을 입력하세요"></textarea>
        <button @click="registerReply" class="submit-button">답변 등록</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inquiry-content-indent {
  margin-left: 20px; /* 들여쓰기 크기 설정 */
}
.full-section {
  width: 80%; /* 너비를 80%로 설정 */
  margin: 0 auto;
  background-color: var(--white);
  padding: 0 20px;
  border-radius: 20px;
  margin-bottom: 30px;
}
.inquiry-content {
  background-color: var(--background-color);
  min-height: 100vh;
  width: 100%;
  padding: 20px;
}

.question-section {
  background-color: var(--white);
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.answer-section {
  width: 90%;
  margin: 0 auto;
  background-color: var(--white);
  padding: 20px; /* 위아래 패딩 추가 */
  border-radius: 10px;
  margin-bottom: 30px; /* 아래쪽 여백 추가 */
}

.question-details div {
  margin-bottom: 10px;
}
.section-title {
  text-align: center; /* 중앙 정렬 */
  font-size: 24px; /* 글씨 크기 */
  font-weight: bold; /* 굵게 */
  margin-bottom: 20px; /* 아래쪽 여백 */
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
}

.submit-button {
  background-color: var(--basic-yellow);
  color: var(--white);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: var(--basic-yellow);
}
</style>
