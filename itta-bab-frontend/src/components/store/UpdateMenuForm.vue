<script setup>
import '@/assets/css/resetcss.css';
</script>

<template>
  <div class="back">
    <div class="white-box">
      <div class="form-container">
        <!-- 메뉴 이름 수정 -->
        <div class="flex-box">
          <div class="title">메뉴 이름</div>
          <div class="input-box">
            <input id="input-info" type="text">
          </div>
          <input type="button" value="메뉴 찾기">
        </div>

        <!-- 메뉴 가격 수정 -->
        <div class="flex-box">
          <div class="title">메뉴 등록</div>
          <div class="input-box">
            <input id="input-info" type="text" value="가격(원)">
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
            <input id="input-info" type="text">
          </div>
          <input type="button" value="카테고리 찾기">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
