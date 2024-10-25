<script setup>
import '@/assets/css/resetcss.css';
import axios from "axios";
import {useRouter} from "vue-router";
import {computed, ref} from "vue";

const loginId = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const handleSignUp = async () => {
  try {
    const response = await axios.post('http://localhost:8003/user/signup', {
      username: "string",
      loginId: loginId.value,
      pwd: password.value,
      email: "string",
      phone: "string",
      birth: "2024-10-24",
      courseId: 0,
      authCode: "string"
    });

    if (response.status === 201) {
      const name = '0test';
      router.push({
        path: '/signup-result',
        query: {username: name}
      });
    }
  } catch (error) {
    console.error('회원 가입 실패', error);
  }
};

const handleDuplicateCheckClick = async (loginId) => {
  try {
    const response = await axios.get('http://localhost:8003/user/id', {
      params: {
        id: loginId
      }
    });
    console.log(`아이디 중복확인 성공 ${response.status}`);
    alert('사용할 수 있는 아이디입니다.');
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        console.log('아이디 중복확인 실패: 이미 존재하는 아이디입니다.');
        alert('이미 존재하는 아이디입니다.');
      } else {
        console.error('아이디 중복확인 실패:', error.response.data);
      }
    } else {
      console.error('아이디 중복확인 실패', error.message);
    }
  }
};

const passwordMismatch = computed(() => {
  return password.value !== confirmPassword.value && confirmPassword.value.length > 0;
});

// 비밀번호 일치 여부
const passwordMatch = computed(() => {
  return password.value === confirmPassword.value && confirmPassword.value.length > 0;
});

const passwordCheckMessage = ref('');

// 비밀번호 유효성 검사
const isValidPassword = computed(() => {
  if (password.value.length >= 8 && password.value.length <= 15 && password.value.match(/[A-Za-z]/) && password.value.match(/\d/)) {
    passwordCheckMessage.value = '사용할 수 있는 비밀번호입니다.';
    return true; // 유효한 비밀번호
  } else if (password.value.length === 0) {
    passwordCheckMessage.value = '영문, 숫자 포함하여 8~15자 입력해주세요 '; // 비밀번호가 비어있을 경우
    return false; // 비밀번호가 유효하지 않음
  } else {
    passwordCheckMessage.value = '영문, 숫자 포함하여 8~15자 입력해주세요 '; // 유효하지 않을 경우
    return false; // 비밀번호가 유효하지 않음
  }
});

</script>

<template>
  <div class="back">
    <div class="logo">
      <img src="@/assets/icons/logo.svg">
    </div>
    <div class="white-box">
      <div class="top-title">회원가입</div>
      <div class="form-container">
        <div class="flex-box">
          <div class="title">아이디</div>
          <div class="input-box">
            <input type="text" v-model="loginId" required>
          </div>
          <div>
            <input @click="handleDuplicateCheckClick(loginId)" type="button" value="중복확인">
          </div>
        </div>
        <div class="flex-box">
          <div class="title">비밀번호</div>
          <div class="input-box">
            <input type="password" v-model="password" required @input="validatePassword">
            <div
                class="small"
                :class="{'valid': isValidPassword, 'invalid': !isValidPassword && password.length > 0}"
            >
              {{ passwordCheckMessage }}
            </div>
          </div>
        </div>
        <div class="flex-box">
          <div class="title">비밀번호 확인</div>
          <div class="input-box">
            <input type="password" v-model="confirmPassword" :disabled="!password" required>
            <div v-if="passwordMismatch" class="error-message">비밀번호가 일치하지 않습니다.</div>
            <div v-if="passwordMatch" class="success-message">비밀번호가 일치합니다.</div>
          </div>
        </div>
        <div class="flex-box">
          <div class="title">이름</div>
          <div class="input-box"><input type="text"></div>
        </div>
        <div class="flex-box">
          <div class="title">생년월일</div>
          <div class="input-box">
            <input type="date" data-placeholder="날짜 선택">
          </div>
        </div>
        <div class="flex-box">
          <div class="title">이메일</div>
          <div class="inline input-box">
            <input type="text" id="email-user">
            <div class="email-icon">@</div>
            <select name="email" class="email">
              <option value="naver">naver</option>
              <option value="gmail">gmail</option>
              <option value="daum">daum</option>
            </select>
          </div>
          <div><input type="button" value="인증번호 발송"></div>
        </div>
        <div class="flex-box">
          <div class="title">이메일 인증</div>
          <div class="input-box"><input type="text"></div>
          <div><input type="button" value="인증 확인"></div>
        </div>
        <div class="flex-box">
          <div class="title">휴대 전화</div>
          <div class="input-box inline">
            <input type="number" id="phone1">
            <div class="phone-icon">-</div>
            <input type="number" id="phone2">
            <div class="phone-icon">-</div>
            <input type="number" id="phone3">
          </div>
        </div>
        <div class="flex-box">
          <div class="title">부트캠프 정보</div>
          <div class="input-box inline">
            <select name="bootcamp" class="bootcamp">
              <option value="hanwha">hanwha</option>
              <option value="saffy">saffy</option>
            </select>
            <select name="course" class="course">
              <option value="web1">web1</option>
              <option value="web2">web2</option>
              <option value="web3">web3</option>
            </select>
          </div>
          <div><input type="button" value="위치 인증"></div>
        </div>
      </div>
      <!-- 이용 약관 -->
      <div class="notice-container">
        <div>
          <div class="notice-wrapper">
            <div class="border">이용약관</div>
            <div class="border"><input type="checkbox">&nbsp;&nbsp;전체 동의</div>
          </div>
          <div class="sub-notice">
            회원가입을 위해서는 홈페이지 이용약관 및 개인정보 수집 및 이용에 대한 정책 확인 후, 동의여부를 체크하셔야만 회원가입이 완료됩니다.
          </div>
        </div>
      </div>

      <div>
        <div class="title">홈페이지 이용약관</div>
        <div class="block-border-box">
      <span>
        제1조 (목적)
본 약관은'five my bab'(이하 “회사”)에서 운영하는 MOP 홈페이지(이하 "홈페이지")의 서비스 이용 및 제공에 관한 제반 사항의 규정을 목적으로 한다.
제2조 (용어의 정의)
① 홈페이지란 회사가 컴퓨터 등 정보통신설비를 이용하여 보험상품 또는 용역을 이용자에게 제공하고 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 홈페이지를 운영하는 사업자의 의미로도 사용한다.
② 이용자란 "홈페이지"에 접속하여 이 약관에 따라 "홈페이지"가 제공하는 서비스를 받는 회원 및 비회원을 말한다.
      </span>
        </div>
      </div>
      <div class="agree">
        <div><input type="radio" id="agree">동의함</div>
        <div><input type="radio" id="agree">동의안함</div>
      </div>
      <div class="submit">
        <input type="button" value="회원가입" id="submit-button" @click="handleSignUp">
      </div>
    </div>

  </div>
</template>

<style scoped>
.submit {
  margin-top: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

#submit-button {
  width: 360px;
  height: 44px;
  background-color: var(--basic-yellow);
  border-radius: 52px;
}

#agree {
  margin: 10px;
}

.agree {
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

.block-border-box {
  border-radius: 10px;
  padding: 20px 24px;
  border: var(--text-color) solid 2px;
  color: var(--gray-font);

}

.phone-icon {
  margin: 16px 3px;
}

.sub-notice {
  margin-top: 20px;
  color: var(--gray-font);
  font-size: 14px;
  margin-bottom: 32px;
}

.border {
  font-size: 17px;
  font-weight: 600;

}

.notice-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 10px;
  border-bottom: var(--gray-font) solid 2px;
}

.bootcamp {
  width: 136px;
  border-radius: 10px;
  background-color: var(--gray-input);
  color: var(--gray-font);
  border: none;
  height: 44px;
  padding-left: 12px;
  margin-right: 22px;
}

.course {
  width: 173px;
  border-radius: 10px;
  background-color: var(--gray-input);
  color: var(--gray-font);
  padding-left: 12px;
  border: none;
  height: 44px;
}

.back {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--background-color);
}

#phone1, #phone2, #phone3 {
  width: 97px;
  border-radius: 10px;
  background-color: var(--gray-input);
  display: flex;
  text-align: center;
}

#email-user {
  width: 184px;
}

.email {
  width: 119px;
  border-radius: 10px;
  background-color: var(--gray-input);
  border: none;
  padding-left: 20px;
  color: var(--gray-font);
}

.logo {
  margin-top: 130px;
  margin-bottom: 50px;
}

.white-box {
  display: flex; /* Flexbox 사용 */
  flex-direction: column; /* 수직 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.13) inset;
  border-radius: 43px;
  background-color: var(--white);
  max-width: 800px; /* 원하는 최대 너비 설정 */
  width: 100%; /* 너비를 100%로 설정하여 최대 너비를 활용 */
  padding: 65px 150px;
  margin: 0 auto; /* 수평 가운데 정렬 */
}

.top-title {
  font-size: 25px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 50px;
}

.email-icon {
  display: flex;
  align-items: center;
  margin: 18px 4px;
}

.flex-box {
  display: flex;
  align-items: center;
  width: 635px;
  margin: 18px 4px;
}

.title {
  font-size: 17px;
  font-weight: 600;
  white-space: nowrap;
  height: 44px;
  text-align: center;
  display: flex;
  align-items: center;
  width: 150px;
}

.small {
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-font);
  padding-left: 20px;
  margin-top: 5px;
}

input[type="button"] {
  background-color: var(--basic-yellow);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: var(--text-color);
  text-align: center;
  font-weight: 600;
  border-radius: 10px;
  width: 138px;
  height: 44px;
  border: none;
}

input[type="text"], [type="password"] {
  border-radius: 10px;
  background-color: var(--gray-input);
  border: none;
  width: 328px;
  height: 44px;
  padding-left: 20px;
  color: var(--gray-font);
  display: flex;
  align-items: center;
}

input[type="date"], [type="number"] {
  border-radius: 10px;
  background-color: var(--gray-input);
  border: none;
  width: 328px;
  height: 44px;
  color: var(--gray-font);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.inline {
  display: flex;
}

.input-box {
  width: 348px;
}

.success-message, .valid{
  color: var(--active-green);
}

.invalid {
  color: var(--real-red);
}
</style>