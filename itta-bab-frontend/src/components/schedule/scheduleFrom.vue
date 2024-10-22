<script setup>
import '@/assets/css/resetcss.css';
</script>

<template>
  <div class="form-container">
    <div class="white-box">
      <div class="flex-box">
        <div class="subtitle">날짜 선택</div>
        <div><input type="date"></div>
      </div>
      <div class="flex-box">
        <div class="subtitle">일정 내용</div>
        <div><textarea></textarea></div>
      </div>
    </div>
    <div class="button-area">
      <input type="button" value="작성 완료">
    </div>
  </div>
</template>

<style scoped>
.form-container{
  padding-top: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.white-box{
  height: 586px;
  width: 60%;
  background-color: var(--white);
  border-radius: 20px;
  padding:80px 130px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.flex-box{
  display: flex;
  margin: 40px 0px;
  justify-content: space-around;
}
.subtitle{
  font-weight: 600;
  font-size: 30px;
}
input[type="date"]{
  background-color: var(--gray-input);
  height: 44px;
  width: 700px;
  border: none;
  border-radius: 10px;
}
textarea{
  background-color: var(--gray-input);
  height: 240px;
  width: 640px;
  border: none;
  border-radius: 10px;
  padding: 30px;
  font-size: 20px;
}
input[type="button"]{
  border-radius: 25px;
  background: var(--basic-yellow);
  box-shadow: 4px 4px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: 25px;
  font-weight: 600;
  width: 351px;
  height: 70px;
  border: none;
  margin: 60px 0px;
}
.button-area{
  width: 1152px;
  border-bottom: 2px var(--gray-font) solid;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-evenly;
}
</style>