<script setup>
import axios from 'axios';
import {ref} from "vue";
import {useRouter} from "vue-router";

const loginId = ref('');
const pwd = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8003/login', {
      loginId: loginId.value,
      pwd: pwd.value
    });

    if(response.status === 200) {
      console.log(response.headers.token);
      // authStore.login(response.headers.token);
      router.push('/');
    }

  } catch (error) {
    console.error('로그인 실패', error);
  }
}

</script>

<template>
  <div class="container">
    <div class="logo">
      <img src="/src/assets/icons/login-logo.svg" alt="Logo"/>
    </div>
    <form class="form" @submit.prevent="handleLogin">
      <input v-model="loginId" id="id" placeholder="아이디" required />
      <input v-model="pwd" id="passwd" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
    </form>
    <div class="service-link">
      <div>아이디 찾기</div>
      <div>비밀번호 찾기</div>
      <div>아이디 찾기</div>
    </div>
  </div>
</template>

<style scoped>
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
.service-link{
  margin-top: 25px;
  display: flex;
  gap: 40px;
  color: var(--gray-font);
  justify-content: center;
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
</style>