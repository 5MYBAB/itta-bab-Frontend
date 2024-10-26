<script setup>
import '@/assets/css/resetcss.css';
import { ref, onMounted } from 'vue';
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {useAuthStore} from "@/stores/auth.js";
import PageTitleTop from "@/components/common/PageTitleTop.vue";

// 인증 토큰 가져오기
const authStore = useAuthStore();

// 라우터 이동을 위한 설정
const router = useRouter();

const route = useRoute();
const storeId = route.params.storeId;
const menuId = route.params.menuId;

const menuName = ref('');
const menuPrice = ref('');
const menuCategoryId = ref('');

// 메뉴 데이터를 서버에서 가져오는 함수
async function fetchMenuData() {
  try {
    const token = authStore.accessToken;
    const response = await axios.get(`http://localhost:8003/store/menu/detail/${storeId}/${menuId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = response.data;

    // 필드에 가져온 데이터를 초기화
    menuName.value = data.menuName;
    menuPrice.value = data.menuPrice;
    menuCategoryId.value = data.menuCategoryId;
  } catch (error) {
    console.error("메뉴 데이터를 불러오는데 오류가 발생했습니다:", error);
  }
}

onMounted(() => {
  fetchMenuData();
});

async function updateMenu() {
  try {

    console.log("storeId:", storeId);
    console.log("menuId:", menuId);
    console.log("menuName:", menuName.value);
    console.log("menuPrice:", menuPrice.value);
    console.log("menuCategory:", menuCategoryId.value);

    const formData = {
      menuName: menuName.value,
      menuPrice: menuPrice.value,
      menuCategoryId: menuCategoryId.value,
    };

    console.log(formData);
    const token = authStore.accessToken;
    const response = await axios.put(`http://localhost:8003/store/menu/${menuId}`, formData, {
      headers: { 'Authorization': `Bearer ${token}`},
    });

    console.log('메뉴 수정 성공:', response.data);
    alert('메뉴 수정이 완료되었습니다!');
    router.push({ name: 'StoreMain'}); // 등록 성공 후 이동
  } catch (error) {
    console.error('메뉴 수정 실패:', error.message);
    alert('메뉴 수정에 실패했습니다. 다시 시도해주세요.');
  }
}
</script>

<template>

  <div class="page-container">
    <div class="page-top-title">메뉴 수정</div>
  </div>

  <!-- 메뉴 수정 폼 -->
  <div class="back">
    <div class="white-box">
      <div class="form-container">
        <!-- 메뉴 이름 수정 -->
        <div class="flex-box">
          <div class="title">메뉴 이름</div>
          <div class="input-box">
            <input id="input-info" type="text" v-model="menuName">
          </div>
        </div>

        <!-- 메뉴 가격 수정 -->
        <div class="flex-box">
          <div class="title">메뉴 등록</div>
          <div class="input-box">
            <input id="input-info" type="text" value="가격(원)" v-model="menuPrice">
          </div>
        </div>

        <!-- 메뉴 사진 업로드 -->
        <div class="flex-box">
          <div class="title">메뉴 사진</div>
          <input type="button" value="사진 업로드">
        </div>

        <!-- 메뉴 카테고리 입력 -->
        <div class="flex-box">
          <div class="title">메뉴 카테고리</div>
          <div class="input-box">
            <input id="input-info" type="text" v-model="menuCategoryId">
          </div>
<!--          <input type="button" value="카테고리 찾기">-->
        </div>
      </div>
    </div>
  </div>



  <div class="submit-background">
    <div class="submit-container">
      <input type="button" value="메뉴 수정" id="submit-button" @click="updateMenu">
      <input type="button" value="뒤로 가기" id="back-button" @click="$router.back()">
    </div>
  </div>
</template>

<style scoped>
*{
  background-color: var(--white);
}

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
  background-color: var(--background-color);
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


/* 메뉴 수정 폼 */
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

.flex-box {
  display: flex;
  align-items: center;
  width: 635px;
  margin: 30px 4px;
  background-color: var(--white);
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

input[type="button"] {
  background-color: var(--basic-yellow);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: var(--text-color);
  font-weight: 600;
  border-radius: 10px;
  width: 138px;
  height: 44px;
  border: none;
}

#input-info, #money-info {
  border-radius: 10px;
  background-color: var(--gray-input);
  border: none;
  height: 44px;
  color: var(--gray-font);
  text-align: center;
}

#input-info {
  width: 328px;
}

#money-info {
  width: 120px;
}

.center-btn {
  text-align: center;
}

.center-btn input[type="button"] {
  width: 340px; /* 가게 등록 버튼의 너비를 340px로 변경 */
}

.input-box {
  width: 348px;
}

.menu-box {
  width: 94px;
}
</style>
