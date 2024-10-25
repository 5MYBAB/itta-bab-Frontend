<script setup>
import '@/assets/css/resetcss.css';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from "@/stores/auth.js";

const router = useRouter();
const route = useRoute();
const storeId = route.params.storeId;

const authStore = useAuthStore();

// 가게 정보 필드들
const storeName = ref('');
const storeAddress = ref('');
const storeCategory = ref('');

// 가게 정보를 불러오는 함수
async function fetchStoreInfo() {
  try {
    const token = authStore.accessToken;
    const response = await axios.get(`http://localhost:8003/store/${storeId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const storeData = response.data;
    storeName.value = storeData.storeName;
    storeAddress.value = storeData.storeAddress;
    storeCategory.value = storeData.storeCategory;

  } catch (error) {
    console.error("가게 정보를 불러오는데 실패했습니다:", error.message);
    alert("가게 정보를 불러오는데 실패했습니다.");
  }
}

// 가게 수정 함수
async function updateStore() {
  try {
    const formData = {
      storeName: storeName.value,
      storeAddress: storeAddress.value,
      storeCategory: storeCategory.value
    };

    const token = authStore.accessToken;
    const response = await axios.put(`http://localhost:8003/store/${storeId}`, formData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    console.log('가게 수정 성공:', response.data);
    alert('가게 정보가 수정되었습니다!');
    router.push({ name: 'StoreMain' }); // 수정 후 메인 페이지로 이동

  } catch (error) {
    console.error('가게 수정 실패:', error.message);
    alert('가게 수정에 실패했습니다. 다시 시도해주세요.');
  }
}

// 컴포넌트가 마운트될 때 가게 정보를 불러옴
onMounted(() => {
  fetchStoreInfo();
});
</script>

<template>
  <div class="page-container">
    <div class="page-top-title">가게 수정</div>
  </div>

  <div class="back">
    <div class="white-box">
      <div class="form-container">

        <!-- 가게 이름 수정 -->
        <div class="flex-box">
          <div class="title">가게 이름</div>
          <div class="input-box">
            <input id="input-info" v-model="storeName" type="text" placeholder="가게 이름"/>
          </div>
        </div>

        <!-- 가게 주소 수정 -->
        <div class="flex-box">
          <div class="title">가게 주소</div>
          <div class="input-box">
            <input id="input-info" v-model="storeAddress" type="text" placeholder="가게 주소"/>
          </div>
        </div>

        <!-- 가게 카테고리 수정 -->
        <div class="flex-box">
          <div class="title">카테고리</div>
          <div class="input-box">
            <input id="input-info" v-model="storeCategory" type="text" placeholder="카테고리"/>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 수정 및 뒤로가기 버튼 -->
  <div class="submit-background">
    <div class="submit-container">
      <input type="button" value="가게 수정" id="submit-button" @click="updateStore"/>
      <input type="button" value="뒤로 가기" id="back-button" @click="$router.back()"/>
    </div>
  </div>
</template>

<style scoped>
/* 스타일 정의 */
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

#input-info {
  border-radius: 10px;
  background-color: var(--gray-input);
  height: 44px;
  text-align: center;
  width: 328px;
}
</style>
