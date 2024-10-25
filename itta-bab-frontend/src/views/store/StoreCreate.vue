<script setup>
import '@/assets/css/resetcss.css';
import axios from 'axios';
import { ref } from 'vue';
import {useAuthStore} from "@/stores/auth.js";

// 데이터를 저장할 상태 변수
const storeList = ref([]);

// 인증 토큰 가져오기
const authStore = useAuthStore();


// 폼 전송 데이터 변수
const storeName = ref('');
const storeLocation = ref('');
const storeOpenTime = ref('');
const storeEndTime = ref('');
const storeInfo = ref('');
const storeStatus = ref('');


// 요일 데이터
// 선택된 요일을 저장하는 배열
const selectedDays = ref([]);
// 요일 순서 배열 (월, 화, 수, 목, 금, 토, 일)
const dayOrder = ['월', '화', '수', '목', '금', '토', '일'];
// storeWeek 변수, 최종적으로 요일이 여기에 정렬된 상태로 합쳐짐
const storeWeek = ref('');

// 요일 토글 함수
const toggleDay = (day) => {
  const index = selectedDays.value.indexOf(day);
  if (index === -1) {
    // 선택되지 않았을 때는 추가
    selectedDays.value.push(day);
  } else {
    // 이미 선택된 요일은 제거
    selectedDays.value.splice(index, 1);
  }
  // 선택된 요일을 순서대로 정렬 후 문자열로 저장
  storeWeek.value = dayOrder.filter(d => selectedDays.value.includes(d)).join(', ');
};

// 폼 제출 함수
const submitForm = async () => {
  // 제출할 데이터
  const formData = {
    storeName: storeName.value,
    storeLocation: storeLocation.value,
    storeOpenTime: storeOpenTime.value,
    storeEndTime: storeEndTime.value,
    storeInfo: storeInfo.value,
    storeStatus: storeStatus.value,
    storeWeek: storeWeek.value
  };

  try {
    // 서버에 POST 요청 보내기
    const token = authStore.accessToken;
    const response = await axios.post('http://localhost:8003/store', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    console.log('가게가 성공적으로 등록되었습니다:', response.data);
    alert('가게 등록이 완료되었습니다!');
  } catch (error) {
    console.error('가게 등록 중 오류가 발생했습니다:', error);
    alert('가게 등록에 실패했습니다. 다시 시도해주세요.');
  }
};





// '뒤로 가기' 버튼을 클릭하면 이전 페이지로 이동하는 함수
function goBack() {
  window.history.back();
}
</script>

<template>
  <div class="page-container">
    <div class="page-top-title">가게 등록</div>
  </div>


  <!-- 가게 정보 입력 폼-->
  <div class="back">
    <div class="white-box">
      <div class="form-container">
        <div class="flex-box">
          <div class="title">가게 명</div>
          <div class="input-box"><input type="text" v-model="storeName"></div>
        </div>
        <div class="flex-box">
          <div class="title">가게 위치</div>
          <div class="input-box">
            <input type="text" v-model="storeLocation">
          </div>
        </div>
        <div class="flex-box">
          <div class="title">오픈 시간</div>
          <div class="input-box"><input type="text" placeholder="09:00" v-model="storeOpenTime"></div>
        </div>
        <div class="flex-box">
          <div class="title">마감 시간</div>
          <div class="input-box"><input type="text" placeholder="21:00" v-model="storeEndTime"></div>
        </div>
        <div class="flex-box">
          <div class="title">가게 영업 요일</div>
          <div class="input-box days">
            <input type="button" value="월" :class="{ active: selectedDays.includes('월') }" @click="toggleDay('월')">
            <input type="button" value="화" :class="{ active: selectedDays.includes('화') }" @click="toggleDay('화')">
            <input type="button" value="수" :class="{ active: selectedDays.includes('수') }" @click="toggleDay('수')">
            <input type="button" value="목" :class="{ active: selectedDays.includes('목') }" @click="toggleDay('목')">
            <input type="button" value="금" :class="{ active: selectedDays.includes('금') }" @click="toggleDay('금')">
            <input type="button" value="토" :class="{ active: selectedDays.includes('토') }" @click="toggleDay('토')">
            <input type="button" value="일" :class="{ active: selectedDays.includes('일') }" @click="toggleDay('일')">

          </div>
        </div>


        <div class="flex-box">
          <div class="title">가게 사진</div>
          <div><input type="button" value="사진 업로드"></div>
        </div>
        <div class="flex-box">
          <div class="store-info">가게 소개</div>
          <div class="input-box">
            <textarea type="text" v-model="storeInfo" name="message" rows="4" cols="50" placeholder="가게에 대한 설명을 입력하세요"></textarea>
          </div>
        </div>
        <div class="flex-box">
          <div class="title">가게 상태</div>
          <div class="input-box"><input type="text" placeholder="OPEN / CLOSED" v-model="storeStatus"></div>
        </div>
      </div>
    </div>
  </div>





  <div class="submit-background">
    <div class="submit-container">
      <input type="button" value="가게 등록" id="submit-button" @click="submitForm">
      <!-- 뒤로 가기 버튼에 goBack 함수 연결 -->
      <input type="button" value="뒤로 가기" id="back-button" @click="goBack">
    </div>
  </div>
</template>

<style scoped>
.form-container{
  background-color: var(--white) !important;
}

textarea{
  background-color: var(--gray-input);
  height: 300px;
  width: 600px;
  border: none;
  border-radius: 10px;
  font-size: 17px;
}

.back{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.white-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.13) inset;
  border-radius: 43px;
  background-color: var(--white);
  max-width: 1000px;
  width: 100%;
  padding: 65px 150px;
  margin: 0 auto;
}

.flex-box{
  display: flex;
  align-items: center;
  width: 635px;
  margin: 30px 4px;
  background-color: var(--white);
}
.store-info {
  font-size: 17px;
  font-weight: 600;
  white-space: nowrap;
  height: 44px;
  text-align: center;
  display: flex;
  align-items: flex-start;
  width: 150px;
  padding-top: 5px;
  background-color: var(--white);
}
.title{
  font-size: 17px;
  font-weight: 600;
  white-space: nowrap;
  height: 44px;
  text-align: center;
  display: flex;
  align-items: center;
  width: 150px;
  background-color: var(--white);
}
input[type="button"] {
  background-color: var(--backbackground-color) !important;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: var(--text-color);
  text-align: center;
  font-weight: 600;
  border-radius: 10px;
  width: 138px;
  height: 44px;
  border: none;
}

/* 선택된 버튼 스타일링 */
input[type="button"].active {
  background-color: var(--basic-yellow) !important; /* 선택된 상태일 때 배경 색상 */
  color: white;
}


input[type="text"] {
  border-radius: 10px;
  background-color: var(--gray-input);
  border: none;
  width: 400px;
  height: 44px;
  color: var(--gray-font);
  display: flex;
  text-align: center;
  align-items: center;
}
.days {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: var(--white);
}
.days input[type="button"] {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--basic-yellow);
  margin-right: 8px;
  border: none;
  font-weight: 600;
  color: var(--text-color);
}
.input-box{
  width: 348px;
}




*{
  background-color: var(--background-color);
}
.page-container{
  padding-top:130px;
  padding-bottom: 100px;
  display: flex;
  justify-content: center;
}
.page-top-title{
  padding-left: 100px;
  padding-bottom: 30px;
  font-size: 40px;
  font-weight: 600;
  width: 1130px;
  border-bottom: 2px var(--gray-font) solid;
}

.submit-background {
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
}
.submit-container {
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
}
#submit-button, #back-button {
  width: 160px;
  height: 44px;
  background-color: var(--basic-yellow) !important;
  border-radius: 52px;
  border: none;
  font-weight: 600;
  text-align: center;
}
</style>
