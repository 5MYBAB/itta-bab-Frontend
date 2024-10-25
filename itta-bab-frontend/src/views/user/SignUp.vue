<script setup>
import '@/assets/css/resetcss.css';
import axios from "axios";
import {useRouter} from "vue-router";
import {computed, onMounted, ref, watch} from "vue";

const loginId = ref('');
const password = ref('');
const confirmPassword = ref('');
const username = ref('');
const birthDate = ref('');
const emailUser = ref('');
const emailDomain = ref('');
const fullEmail = ref('');
const authCode = ref('');
const phone1 = ref('');
const phone2 = ref('');
const phone3 = ref('');
const router = useRouter();
const agreement = ref('');

const handleSignUp = async () => {
  try {

    if (agreement.value !== 'agree') {
      alert('이용약관에 동의하셔야 회원가입을 진행할 수 있습니다.');
      return; // 동의하지 않은 경우 함수 종료
    }

    const fullPhone = `${phone1.value}${phone2.value}${phone3.value}`;

    const response = await axios.post('http://localhost:8003/user/signup', {
      username: username.value,
      loginId: loginId.value,
      pwd: password.value,
      email: fullEmail.value,
      phone: fullPhone,
      birth: birthDate.value,
      courseId: selectedCourseId.value
    });

    if (response.status === 201) {
      const name = username.value;
      router.push({
        path: '/signup/result',
        query: {username: name}
      });
    }
  } catch (error) {
    console.error('회원 가입 실패', error);
  }
};

const handleDuplicateCheckClick = async () => {
  try {
    const response = await axios.get('http://localhost:8003/user/id', {
      params: {
        id: loginId.value
      }
    });
    if (response.status === 200) {
      console.log(`아이디 중복확인 성공 ${response.status}`);
      alert('사용할 수 있는 아이디입니다.');
    }
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

const emailSendMessage = ref('');

const handleSendAuthCodeClick = async () => {
  try {
    fullEmail.value = `${emailUser.value}@${emailDomain.value}`;
    emailSendMessage.value = '인증코드를 발송중입니다. 잠시 기다려주세요.';
    const response = await axios.post('http://localhost:8003/user/email-request', {
      email: fullEmail.value
    });

    if (response.status === 200) {
      emailSendMessage.value = '이메일 인증코드를 전송하였습니다. 메일을 확인해주세요.';
    }

  } catch (error) {
    console.error('인증번호 발송 실패', error);
    emailSendMessage.value = '인증번호 발송에 실패했습니다.';
  }
};

const emailAuthMessage = ref('');
const isAuth = ref(false);

const handleAuthCodeCheckClick = async () => {
  try {
    const response = await axios.post('http://localhost:8003/user/email-check', {
      email: fullEmail.value,
      authCode: authCode.value
    });

    if (response.status === 200) {
      console.log(`이메일 인증 확인 성공 ${response.status}`);
      emailAuthMessage.value = '인증이 확인되었습니다.';
      isAuth.value = true;
    }

  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        console.log('이메일 인증 확인 실패: 인증번호가 틀립니다.');
        emailAuthMessage.value = '인증번호가 틀립니다. 다시 시도해주세요.';
      } else {
        console.error('이메일 인증 확인 실패:', error.response.data);
      }
    } else {
      console.error('이메일 인증 확인 실패', error.message);
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

const bootcamps = ref([]);
const bootcampInfo = ref([]);

const fetchBootcampList = async () => {
  try {
    const response = await axios.get('http://localhost:8003/bootcamp/list');

    if(response.status === 200) {
      bootcampInfo.value = response.data.map(item => ({
        bootId: item.bootId,
        bootName: item.bootName
      }));
      bootcamps.value = bootcampInfo.value.map(item => item.bootName);
    }
  } catch (error) {
    console.error('훈련 기관 불러오기 실패', error);
  }
};

const selectedBootcamp = ref('');
const selectedBootcampId = computed(() => {
  const bootcamp = bootcampInfo.value.find(item => item.bootName === selectedBootcamp.value);
  return bootcamp ? bootcamp.bootId : null;
});
const courses = ref([]);
const coursesInfo = ref([]);

const fetchCourseList = async (bootId) => {
  try {
    const response = await axios.get('http://localhost:8003/course/list', {
      params: {
        bootId: bootId
      }
    });

    if(response.status === 200) {
      coursesInfo.value = response.data.map(item => ({
        courseId: item.courseId,
        courseName: `${item.className} ${item.seasonNum}기`
      }));
      courses.value = coursesInfo.value.map(item => item.courseName);
    }
  } catch (error) {
    console.error('훈련 과정 불러오기 실패', error);
  }
};

watch(selectedBootcampId, (newId) => {
  if (newId) {
    fetchCourseList(newId);
    selectedCourse.value = '';
  }
});

const selectedCourse = ref('');
const selectedCourseId = computed(() => {
  const course = coursesInfo.value.find(item => item.courseName === selectedCourse.value);
  return course ? course.courseId : null;
});

onMounted(() => {
  fetchBootcampList();
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
            <input @click="handleDuplicateCheckClick" type="button" value="중복확인" :disabled="!loginId">
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
          <div class="input-box">
            <input type="text" v-model="username" required>
          </div>
        </div>
        <div class="flex-box">
          <div class="title">생년월일</div>
          <div class="input-box">
            <input type="date" v-model="birthDate" data-placeholder="날짜 선택" required>
          </div>
        </div>
        <div class="flex-box">
          <div class="title">이메일</div>
          <div>
            <div class="email-and-button">
              <div class="input-box">
                <div class="email-box">
                  <input type="text" v-model="emailUser" id="email-user" required>
                  <div class="email-icon">@</div>
                  <select v-model="emailDomain" class="email">
                    <option value="naver.com" selected>naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                  </select>
                </div>
              </div>
              <div>
                <input @click="handleSendAuthCodeClick" type="button" value="인증번호 발송" :disabled="!emailUser || !emailDomain">
              </div>
            </div>
            <div class="email-message">{{ emailSendMessage }}</div>
          </div>
        </div>
        <div class="flex-box">
          <div class="title">이메일 인증</div>
          <div class="input-box">
            <input type="text" v-model="authCode">
            <div v-if="!isAuth" class="email-message">{{ emailAuthMessage }}</div>
            <div v-if="isAuth" class="success-message">{{ emailAuthMessage }}</div>
          </div>
          <div>
            <input @click="handleAuthCodeCheckClick" type="button" value="인증 확인" :disabled="!fullEmail">
          </div>
        </div>
        <div class="flex-box">
          <div class="title">휴대 전화</div>
          <div class="input-box inline">
            <input type="text" v-model="phone1" id="phone1">
            <div class="phone-icon">-</div>
            <input type="text" v-model="phone2" id="phone2">
            <div class="phone-icon">-</div>
            <input type="text" v-model="phone3" id="phone3">
          </div>
        </div>
        <div class="flex-box">
          <div class="title">부트캠프 정보</div>
          <div class="bootcamp-box">
            <div class="input-box">
              <select v-model="selectedBootcamp" name="bootcamp" class="bootcamp">
                <option v-for="(bootcamp, index) in bootcamps" :key="index" :value="bootcamp">
                  {{ bootcamp }}
                </option>
              </select>
            </div>
            <div class="input-box">
              <select v-model="selectedCourse" name="course" class="course">
                <option v-for="(course, index) in courses" :key="index" :value="course">
                  {{ course }}
                </option>
              </select>
              <div class="location-message">해당 부트캠프 위치 근처에 있을 시에만<br>가입이 가능합니다.</div>
            </div>
             </div>

        </div>
      </div>
      <!-- 이용 약관 -->
      <div class="notice-container">
        <div>
          <div class="notice-wrapper">
            <div class="border">이용약관</div>
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
        <div><input type="radio" id="agree" value="agree" v-model="agreement">동의함</div>
        <div><input type="radio" id="agree" value="disagree" v-model="agreement">동의안함</div>
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
  width: 328px;
  border-radius: 10px;
  background-color: var(--gray-input);
  color: var(--gray-font);
  border: none;
  height: 44px;
  padding-left: 12px;
  margin-right: 22px;
}

.course {
  width: 328px;
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
  height: 44px;
  border-radius: 10px;
  background-color: var(--gray-input);
  border: none;
  padding-left: 10px;
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
  margin: 0px 4px;
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

.small, .email-message, .location-message {
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
  font-size: 14px;
  font-weight: 500;
  padding-left: 20px;
  margin-top: 5px;
}

.error-message, .invalid {
  color: var(--real-red);
  font-size: 14px;
  font-weight: 500;
  padding-left: 20px;
  margin-top: 5px;
}

.email-box, .email-and-button {
  display: flex;
}

.bootcamp-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#phone1, #phone2, #phone3 {
  display: flex;
  padding-right: 20px;
}
</style>