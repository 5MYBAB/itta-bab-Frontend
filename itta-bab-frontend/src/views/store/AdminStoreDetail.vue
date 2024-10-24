<script setup>
import { ref, provide, watch } from 'vue'; // watch를 import 추가
import MenuList from "@/components/store/MenuList.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const selectedItem = ref([]); // selectedItem을 ref로 초기화

// Provide the selectedItem array
provide("selectedItem", selectedItem); // selectedItem을 제공

// Watch for changes in selectedItem
watch(selectedItem, (newValue) => {
  console.log("selectedItem 배열이 변경되었습니다:", newValue);
}, { deep: true });

const modifyStore = (storeId) => {
  alert("가게 번호 받고 수정하는거 구현해야됨");
}
</script>

<template>
  <PageTitleTop/>
  <div class="store-detail-page">
    <div class="store-detail-container">
      <div class="total-container">
        <div class="page-title">
          <div class="section-title">가게 상세</div>
          <button @click="modifyStore" class="edit-store-btn">
            <font-awesome-icon :icon="['far', 'pen-to-square']"/>
            가게 수정하기
          </button>
        </div>
        <div class="menu-container">
          <MenuList/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: var(--background-color);
}

.store-detail-container {
  width: 100% !important;
}

.page-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 30px 20px 0px 70px;
  align-items: center;
}

.nav-links a {
  margin-right: 20px;
  text-decoration: none;
  color: black;
}

.header-icons i {
  margin-left: 20px;
}

.store-detail-page {
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
  background-color: white;
}

.section-title {
  margin-bottom: 20px;
  font-size: 40px;
  font-style: normal;
  font-weight: 600;
}

.store-meta h3 {
  font-size: 20px;
  font-weight: 600;
}

.store-meta p {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.edit-store-btn {
  background-color: var(--basic-yellow);
  border: none;
  cursor: pointer;
  border-radius: 50px;
  height: 44px;
  padding: 10px 20px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.50);
}

.menu-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.menu-container div {
  width: 100% !important;
}

.total-container {
  width: 80%;
}

.menu-container div {
  width: 100% !important;
}
</style>
