<script setup>
import '@/assets/css/resetcss.css';
</script>

<template>
  <div class="back">
    <div class="logo">
      <img src="@/assets/icons/logo.svg">
    </div>
    <div class="white-box">
      <div class="top-title">모임 등록</div>
      <div class="form-container">

        <div class="flex-box">
          <div class="title">모임명</div>
          <div class="input-box">
            <input type="text">
            <div class="small">영문 ,숫자 포함하여 255자까지 입력가능합니다.</div>
          </div>
        </div>

        <div class="flex-box">
          <div class="title">카테고리</div>
          <div class="input-box">
            <input type="text">
          </div>
        </div>

        <div class="flex-box">
          <div class="title">모임장소</div>
          <div class="input-box">
            <input type="text">
            <div class="small">영문 ,숫자 포함하여 255자까지 입력가능합니다.</div>
          </div>
        </div>

        <div class="flex-box">
          <div class="title">마감 시간</div>
          <div class="input-box">
            <input type="datetime-local"
                   id="datetime"
                   max="2024-06-20T21:00"
                   min="2034-06-05T12:30"
                   value="2023-06-26T13:27"
                   class="datetime-style"
            />
          </div>
        </div>

        <div class="flex-box">
          <div class="title">모집인원</div>
          <div class="input-box">
            <input type="text">
            <div class="small">정수를 입력하세요.</div>
          </div>
        </div>

        <div class="flex-box">
          <div id="tit" class="title">내용</div>
          <textarea id="content" placeholder="내용을 입력하세요"></textarea>
        </div>

      </div>
      <div class="submit">
        <input type="button" value="등록" id="submit-button">
      </div>
    </div>
  </div>
</template>

<style scoped>
.submit {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
}


#content {
  width: 328px;
  height: 300px;
  background-color: var(--gray-input);
  border: none;
  resize: none;
  color: black;
  outline: none;
  border-radius: 8px;
}

#submit-button {
  width: 360px;
  height: 44px;
  background-color: var(--basic-yellow);
  border-radius: 52px;
}

.back {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--background-color);
}

.logo {
  margin-top: 130px;
  margin-bottom: 50px;
}

.white-box {
  display: flex; /* Flexbox 사용 */
  flex-direction: column; /* 수직 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.13) inset;
  border-radius: 43px;
  background-color: var(--white);
  max-width: 800px; /* 원하는 최대 너비 설정 */
  width: 100%; /* 너비를 100%로 설정하여 최대 너비를 활용 */
  padding: 65px 150px;
  margin: 0 auto; /* 수평 가운데 정렬 */
}

.top-title {
  font-size: 25px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 50px;
}

.flex-box {
  display: flex;
  align-items: center;
  width: 635px;
  margin: 18px 4px;
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

.small {
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-font);
  padding-left: 20px;
  margin-top: 5px;
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

input[type="text"], [type="password"], [type="date"] {
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

.input-box {
  width: 348px;
}

.datetime-style {
  width: 210px;
}
</style>