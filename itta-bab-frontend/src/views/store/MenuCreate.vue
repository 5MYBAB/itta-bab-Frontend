<script setup>
import '@/assets/css/resetcss.css';
import {ref} from 'vue';
import axios from 'axios';
import {useRouter, useRoute} from 'vue-router';
import { useAuthStore } from "@/stores/auth.js";
import PageTitleTop from "@/components/common/PageTitleTop.vue";

const router = useRouter(); // 라우터 이동을 위한 설정

const route = useRoute(); // useRoute 훅 사용
const storeId = route.params.storeId; // storeId 가져오기

// 인증 토큰
const authStore = useAuthStore();

// 메뉴 정보 입력 필드들
const menuName = ref('');
const menuPrice = ref('');
const menuCategoryId = ref('');

// 메뉴 등록 함수
async function registerMenu() {
  try {

    console.log("storeId:", storeId);
    console.log("menuName:", menuName.value);
    console.log("menuPrice:", menuPrice.value);
    console.log("menuCategory:", menuCategoryId.value);

    const formData = {
      storeId: storeId,
      menuName: menuName.value,
      menuPrice: menuPrice.value,
      menuCategoryId: menuCategoryId.value,
    };

    console.log(formData);
    const token = authStore.accessToken;
    const response = await axios.post('http://localhost:8003/store/menu', formData, {
      headers: { 'Authorization': `Bearer ${token}`},
    });

    console.log('메뉴 등록 성공:', response.data);
    alert('메뉴 등록이 완료되었습니다!');
    router.push({name: 'StoreMain'}); // 등록 성공 후 이동
  } catch (error) {
    console.error('메뉴 등록 실패:', error.message);
    alert('메뉴 등록에 실패했습니다. 다시 시도해주세요.');
  }
}
</script>

<template>
<!--  <PageTitleTop/>-->
  <div class="page-container">
    <div class="page-top-title">메뉴 등록</div>
  </div>

  <!-- 메뉴 등록 폼 -->
  <div class="back">
    <div class="white-box">
      <div class="form-container">

        <!-- 메뉴 등록 -->
        <div class="flex-box">
          <div class="title">메뉴 등록</div>
          <div class="input-box">
            <input id="input-info" v-model="menuName" type="text" placeholder="메뉴명"/>
          </div>
          <div class="menu-box">
            <input id="money-info" v-model="menuPrice" type="text" placeholder="가격(원)"/>
          </div>
        </div>

        <!-- 메뉴 카테고리 입력 -->
        <div class="flex-box">
          <div class="title">메뉴 카테고리</div>
          <div class="input-box">
            <input id="input-info" v-model="menuCategoryId" type="text" placeholder="카테고리"/>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 등록 및 뒤로가기 버튼 -->
    <div class="submit-background">
    <div class="submit-container">
      <input type="button" value="메뉴 등록" id="submit-button" @click="registerMenu"/>
      <input type="button" value="뒤로 가기" id="back-button" @click="$router.back()"/>
    </div>
  </div>
</template>

<style scoped>
/* 스타일 정의 */

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


.back {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--background-color);
}

.white-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  border-radius: 43px;
  max-width: 1000px;
  width: 100%;
  padding: 65px 150px;
  margin: 0 auto;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.13) inset;
}

.flex-box {
  display: flex;
  align-items: center;
  width: 635px;
  margin: 30px 4px;
}

.title {
  font-size: 17px;
  font-weight: 600;
  width: 150px;
  text-align: center;
}

input[type="button"] {
  background-color: var(--basic-yellow);
  border-radius: 10px;
  width: 138px;
  height: 44px;
  border: none;
}

#input-info, #money-info {
  border-radius: 10px;
  background-color: var(--gray-input);
  height: 44px;
  text-align: center;
}

#input-info {
  width: 328px;
  border: none;
}

#money-info {
  margin-left: 30px;
  width: 120px;
  border: none;
}
</style>
