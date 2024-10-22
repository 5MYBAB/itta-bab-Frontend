<script setup>
import '@/assets/css/resetcss.css';
</script>

<template>
  <div class="back">
    <div class="page-container">
      <div class="page-top-title">가게 등록</div>
    </div>
    <div class="white-box">
      <div class="form-container">
        <div class="flex-box">
          <div class="title">가게 명</div>
          <div class="input-box"><input type="text"></div>
        </div>
        <div class="flex-box">
          <div class="title">가게 위치</div>
          <div class="input-box">
            <input type="text">
          </div>
        </div>
        <div class="flex-box">
          <div class="title">오픈 시간</div>
          <div class="input-box"><input type="text" placeholder="00:00"></div>
        </div>
        <div class="flex-box">
          <div class="title">마감 시간</div>
          <div class="input-box"><input type="text" placeholder="00:00"></div>
        </div>
        <div class="flex-box">
          <div class="title">가게 영업 요일</div>
          <div class="input-box days">
            <input type="button" value="월">
            <input type="button" value="화">
            <input type="button" value="수">
            <input type="button" value="목">
            <input type="button" value="금">
            <input type="button" value="토">
            <input type="button" value="일">
          </div>
        </div>
        <div class="flex-box">
          <div class="title">가게 사진</div>
          <div><input type="button" value="사진 업로드"></div>
        </div>
        <div class="flex-box">
          <div class="store-info">가게 소개</div>
          <div class="input-box">
            <textarea type="text" name="message" rows="4" cols="50" placeholder="가게에 대한 설명을 입력하세요"></textarea>
          </div>
        </div>
      </div>

      <!-- Update: Buttons in one row -->
      <div class="submit-container">
        <input type="button" value="가게 등록" id="submit-button">
        <input type="button" value="뒤로 가기" id="back-button">
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-top-title{
  padding-left: 100px;
  padding-bottom: 30px;
  font-size: 40px;
  font-weight: 600;
  width: 1130px;
  border-bottom: 2px var(--gray-font) solid;
}
.page-container{

  padding-top:130px;
  padding-bottom: 100px;
  display: flex;
  justify-content: center;
}

textarea{
  background-color: var(--gray-input);
  height: 300px;
  width: 600px;
  border: none;
  border-radius: 10px;
}

.submit-container {
  margin-top: 30px;
  display: flex;
  justify-content: space-between; /* Align buttons in one row */
  width: 100%; /* Ensure full width */
  max-width: 360px; /* Limit maximum width */
}
#submit-button, #back-button {
  width: 48%; /* Adjust the width to half of the container */
  height: 44px;
  background-color: var(--basic-yellow);
  border-radius: 52px;
  border: none;
  font-weight: 600;
  text-align: center;
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
  max-width: 800px;
  width: 100%;
  padding: 65px 150px;
  margin: 0 auto;
}

.flex-box{
  display: flex;
  align-items: center;
  width: 635px;
  margin: 30px 4px;
}
.store-info {
  font-size: 17px;
  font-weight: 600;
  white-space: nowrap;
  height: 44px;
  text-align: center; /* optional: for left text alignment */
  display: flex;
  align-items: flex-start; /* Align the content at the top */
  width: 150px;
  padding-top: 5px; /* optional: to add some space from the top */
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
.days {
  display: flex;
  justify-content: space-between;
  width: 100%; /* Adjust to fit all buttons */
}
.days input[type="button"] {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #FFD700; /* Light yellow */
  margin-right: 8px; /* Add space between buttons */
  border: none;
  font-weight: 600;
  color: var(--text-color);
}
.input-box{
  width: 348px;
}
</style>
