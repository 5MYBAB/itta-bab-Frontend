<script setup>
import '@/assets/css/resetcss.css';
</script>

<template>
  <div class="back">
    <div class="form-header">
      <img src="@/assets/icons/itta-bab-logo.svg" class="icons" alt="훈련 기관 아이콘" />
      <h1>훈련 기관 등록</h1>
    </div>

    <div class="white-box">
      <div class="form-container">
        <div class="flex-box">
          <div class="title">훈련 기관 명</div>
          <div class="input-box">
            <input type="text" placeholder="">
          </div>
        </div>

        <div class="flex-box">
          <div class="title">주소</div>
          <div class="input-box">
            <input type="text" placeholder="">
          </div>
        </div>

        <div class="flex-box">
          <div class="title"></div>
          <div class="input-box">
            <button class="submit-button">훈련기관 수정</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea{
  background-color: var(--gray-input);
  height: 300px;
  width: 600px;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  margin-top: 10px;
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.back{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--background-color);
}


.form-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
  border-bottom: 2px solid #dedede;
  padding-bottom: 20px;
}

.form-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
  border-bottom: 2px solid #dedede;
  padding-bottom: 20px;
  margin-right: 50px;
  width: 1300px;
}

.form-header img.icons {
  width: 50px;
  height: 50px;
}

.form-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #555;
}

.white-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.13) inset;
  border-radius: 43px;
  background-color: var(--white);
  max-width: 800px;
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

input[type="button"], input[type="file"], .submit-button {
  background-color: var(--basic-yellow);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  color: var(--text-color);
  text-align: center;
  font-weight: 600;
  border-radius: 10px;
  width: 100%;
  height: 44px;
  border: none;
  cursor: pointer;
}

input[type="text"], textarea {
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

.input-box {
  width: 50%;
}
</style>