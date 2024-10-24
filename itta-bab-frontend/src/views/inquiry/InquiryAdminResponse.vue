<script setup>
import { ref } from 'vue';
import axios from 'axios';
import UserTap from "@/components/user/UserTap.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import AdminTap from "@/components/admin/AdminTap.vue";

const replyContent = ref(''); // 답변 내용을 저장할 변수

// 답변 등록 함수
const registerReply = async () => {
  if (!replyContent.value.trim()) {
    alert('답변 내용을 입력하세요.');
    return;
  }

  try {
    // 예시로 '/api/inquiry/reply'로 POST 요청 보냄
    const response = await axios.post('답변 api 내용 넣기', {
      reply: replyContent.value
    });
    // 성공 시 알림 메시지
    alert('답변이 완료되었습니다.');
    replyContent.value = ''; // 입력 필드 초기화
  } catch (error) {
    console.error('답변 등록 중 오류가 발생했습니다:', error);
    alert('답변 등록에 실패했습니다. 다시 시도하세요.');
  }
};
</script>

<template>
  <div class="inquiry-content">
    <PageTitleTop/>
    <h2 class="section-title">문의 답변</h2>

    <div class="full-section">
      <br>
      <div class="question-section">
        <div class="question-details">
          <div><strong>유저:</strong> pangtaek</div>
          <div><strong>문의:</strong> 정지 사유</div>
          <div><strong>문의 내용:</strong>
            <div class="inquiry-content-indent">제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!제가 왜 정지를 당했는지 궁금합니다!</div>
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
.full-section{
  width:  80%; /* 너비를 80%로 설정 */
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
  /*  margin-top: 10px;
    padding-top: 10px;*/
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
