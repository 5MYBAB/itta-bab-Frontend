<script setup>
import '@/assets/css/resetcss.css';
</script>

<template>
  <div class="back">
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
          <div class="input-box"><input type="text" placeholder="09:00"></div>
        </div>
        <div class="flex-box">
          <div class="title">마감 시간</div>
          <div class="input-box"><input type="text" placeholder="21:00"></div>
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
  margin-top: 20px;
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
  margin: 30px 4px;
}
.store-info {
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
.days {
  display: flex;
  justify-content: space-between;
  width: 100%;
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
