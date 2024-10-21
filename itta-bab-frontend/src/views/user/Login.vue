<script setup>
import '@/assets/css/resetcss.css';
</script>

<template>
  <div class="back">
    <div class="container">
      <div class="logo">
        <img src="/src/asset/login-logo.png" alt="Logo" />
      </div>
      <div class="form">
        <input type="text" id="id" placeholder="아이디" />
        <input type="password" id="passwd" placeholder="비밀번호" />
        <button>로그인</button>
      </div>
      <div class="service-link">
        <div>아이디 찾기</div>
        <div>비밀번호 찾기</div>
        <div>아이디 찾기</div>
      </div>
    </div>
    <div class="notice">수료하고 계시는 부트 캠프가 없다면 ittababCompaby@ohmybab.com으로 연락 주세요.</div>
  </div>
</template>

<style scoped>
.back {
  padding-top: 30px;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center; /* 세로 가운데 정렬 */
  flex-direction: column;
}
.notice{
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
}
.container {
  border-radius: 20px;
  width: 623px;
  height: 550px;
  background-color: var(--white);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding-top: 40px;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column; /* 수직 방향으로 정렬 */
  align-items: center; /* 입력 필드를 가로 가운데 정렬 */
}
.form button{
  margin-top: 40px;
  border-radius: 20px;
  background-color: var(--basic-yellow);
  width: 479px;
  height: 70px;
  border: none;
  font-size: 20px;
  font-weight: 600;;
}
.form input {
  border: none;
  width: 479px;
  height: 80px;
  border-radius: 20px;
  background: #f2f1f1;
  margin-bottom: 10px; /* 아래쪽 간격 */
  padding: 0 20px; /* 좌우 패딩 추가 */
}
.service-link{
  margin-top: 25px;
  display: flex;
  gap: 40px;
  color: var(--gray-font);
  justify-content: center;
}
.notice{
  margin-top: 30px;
  margin-bottom: 50px;
  color: var(--gray-font);
}
</style>
