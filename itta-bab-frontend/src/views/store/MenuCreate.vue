<script setup>
import '@/assets/css/resetcss.css';
import CreateMenuForm from "@/components/store/CreateMenuForm.vue";

</script>

<template>
  <div class="page-container">
    <div class="page-top-title">메뉴 등록</div>
  </div>
  <CreateMenuForm/>
  <div class="submit-background">
    <div class="submit-container">
      <input type="button" value="메뉴 등록" id="submit-button">
      <input type="button" value="뒤로 가기" id="back-button">
    </div>
  </div>
</template>

<style scoped>
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
  background-color: var(--basic-yellow);
  border-radius: 52px;
  border: none;
  font-weight: 600;
  text-align: center;
}
</style>
