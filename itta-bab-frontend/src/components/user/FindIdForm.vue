<script setup>
import axios from "axios";
import {ref} from "vue";
import {useRouter} from "vue-router";

const username = ref('');
const phone = ref('');
const loginId = ref('');
const router = useRouter();

const handleFindIdClick = async () => {
  try {

    const response = await axios.get('http://localhost:8003/user/find-id', {
      params: {
        username: username.value,
        phone: phone.value
      }
    });
    loginId.value = response.data;

    if (response.status === 200) {
      router.push({
        path: '/find-id/result',
        query: {
          username: username.value,
          loginId: loginId.value
        }
      });
    }

  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        console.log('아이디 찾기 실패: 입력값이 틀립니다.');
      } else {
        console.error('아이디 찾기 실패:', error.response.data);
      }
    } else {
      console.error('아이디 찾기 실패', error.message);
    }
  }
};

</script>

<template>
  <form class="container">
    <div class="logo">
      <img src="/src/assets/icons/login-logo.svg" alt="Logo"/>
    </div>
    <div class="form">
      <input type="text" v-model="username" placeholder="이름" required/>
      <input type="text" v-model="phone" placeholder="전화번호 ( - 제외)" required/>
      <button type="button" @click="handleFindIdClick" :disabled="!username || !phone">아이디 찾기</button>
    </div>
    <div class="service-link">
      <div>비밀번호 찾기</div>
      <div>회원 가입</div>
    </div>
  </form>
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
.form {
  display: flex;
  flex-direction: column; /* 수직 방향으로 정렬 */
  align-items: center; /* 입력 필드를 가로 가운데 정렬 */
}
.form button {
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
.service-link {
  margin-top: 25px;
  display: flex;
  gap: 40px;
  color: var(--gray-font);
  justify-content: center;
}
</style>