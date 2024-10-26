<script setup>
import '@/assets/css/resetcss.css';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import {useAuthStore} from "@/stores/auth.js";
import { ref } from 'vue';

// 인증 토큰 가져오기
const authStore = useAuthStore();


const router = useRouter(); // 라우터 이동을 위한 설정
const route = useRoute(); // useRoute 훅 사용


// 폼 전송 데이터 변수
const storeId = route.params.storeId; // storeId 가져오기
const reviewContent = ref('');
const rating = ref('');


// 폼 제출 함수
const submitForm = async () => {
  // 제출할 데이터
  const formData = {
    storeId: storeId,
    reviewContent: reviewContent.value,
    rating: rating.value,
    "blinded": false
  };

  try {
    // 서버에 POST 요청 보내기
    const token = authStore.accessToken;
    const response = await axios.post('http://localhost:8003/store/review', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    console.log('리뷰가 성공적으로 등록되었습니다:', response.data);
    alert('리뷰 등록이 완료되었습니다!');
    router.push({name: 'StoreDetail', params : { storeId}}); // 등록 성공 후 이동
  } catch (error) {
    console.error('리뷰 등록 중 오류가 발생했습니다:', error);
    alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
  }
};

</script>

<template>
  <div class="page-container">
    <div class="page-top-title">리뷰 등록하기</div>
  </div>

<!--  리뷰 폼-->


  <div class="back">
    <div class="white-box">
      <div class="form-container">
        <div class="flex-box">
          <div class="title">가게 별점</div>
          <div class="input-box"><input v-model="rating" type="text"></div>
        </div>
<!--        <div class="flex-box">-->
<!--          <div class="title">주문 메뉴</div>-->
<!--          <div class="input-box">-->
<!--            <input type="text">-->
<!--          </div>-->
<!--          <div><input type="button" value="메뉴 추가"></div>-->
<!--        </div>-->
<!--        <div class="flex-box">-->
<!--          <div class="title">메뉴 사진</div>-->
<!--          <div><input type="button" value="사진 업로드"></div>-->
<!--        </div>-->
        <div class="flex-box">
          <div class="review-info">가게 리뷰</div>
          <div class="input-box">
            <textarea type="text" v-model="reviewContent" name="message" rows="4" cols="50" placeholder="가게에 대한 설명을 입력하세요"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>


<!--  리뷰 폼 종료-->

  <div class="submit-background">
    <div class="submit-container">
      <input type="button" value="리뷰 등록" id="submit-button" @click="submitForm">
      <input type="button" value="뒤로 가기" id="back-button" @click="$router.back()">
    </div>
  </div>
</template>

<style scoped>

.page-container{
  padding-top:130px;
  padding-bottom: 100px;
  display: flex;
  justify-content: center;
  background-color: var(--background-color);
}
.page-top-title{
  padding-left: 100px;
  padding-bottom: 30px;
  font-size: 40px;
  font-weight: 600;
  width: 1130px;
  border-bottom: 2px var(--gray-font) solid;
  background-color: var(--background-color);
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
  background-color: var(--basic-yellow);
  border-radius: 52px;
  border: none;
  font-weight: 600;
  text-align: center;
}


/* 리뷰 폼 */


textarea{
  background-color: var(--gray-input);
  height: 300px;
  width: 600px;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  margin-top: 10px;
}

.back{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--background-color);
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
  margin: 50px 30px 4px;
}
.review-info {
  font-size: 17px;
  font-weight: 600;
  white-space: nowrap;
  height: 44px;
  text-align: center;
  display: flex;
  align-items: flex-start;
  width: 150px;
  padding-top: 5px;
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
input[type="text"] {
  border-radius: 10px;
  background-color: var(--gray-input);
  border: none;
  width: 328px;
  height: 44px;
  color: var(--gray-font);
  display: flex;
  text-align: center;
  align-items: center;
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

</style>
