<script setup>

import {ref} from "vue";

const redDotStates = ref([false, false, false]);

const handleLineClick = (index) => {
  redDotStates.value[index] = true;
}

</script>

<template>
  <div class="container">
    <div class="yellow">
      <div class="text-container">
        알림
      </div>
    </div>
    <div class="list">
      <div id="line" @click="handleLineClick(0)" class="custom-cursor">
        <div class="icon">
          <img src="@/assets/icons/alarm-review-gray.svg">
        </div>
        <div class="info">
          <div class="title">리뷰<div id="red-dot" :class="{ inactive: redDotStates[0] }"></div></div>
          <div class="content">리뷰가 등록되었습니다: 버거킹 신대방삼거리점</div>
          <div class="time">10/24 12:19</div>
        </div>
      </div>
      <div id="line" @click="handleLineClick(1)" class="custom-cursor">
        <div class="icon">
          <img src="@/assets/icons/alarm-post-gray.svg">
        </div>
        <div class="info">
          <div class="title">익명 게시판<div id="red-dot" :class="{ inactive: redDotStates[1] }"></div></div>
          <div class="content">글이 등록되었습니다: 소통해요!</div>
          <div class="time">10/02 17:34</div>
        </div>
      </div>
      <div id="line" @click="handleLineClick(2)" class="custom-cursor">
        <div class="icon">
          <img src="@/assets/icons/alarm-group-gray.svg">
        </div>
        <div class="info">
          <div class="title">모임<div id="red-dot" :class="{ inactive: redDotStates[2] }"></div></div>
          <div class="content">임광택(pangtaek)님의 모임이 등록되었습니다: 저랑 컵밥 시키실 분</div>
          <div class="time">09/22 13:01</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.yellow {
  border-radius: 20px 20px 0px 0px;
  background-color: var(--basic-yellow);
  height: 72px;
  text-align: left;
  padding-left: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
  font-weight: 600;
  width: 414px;
}

.text-container {
  display: flex;
  align-items: center;
}

.faArrow {
  margin: 10px;
}

.list {
  background-color: var(--white);
  border-radius: 0px 0px 20px 20px;
  height: 513px;
  width: 414px;
  padding: 32px 0px;
  display: flex;
  flex-direction: column;
}

#line {
  margin: 10px 42px;
  border-bottom: 2px var(--gray-font) solid;
  padding-bottom: 4px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  gap: 4px;
}

#red-dot{
  width: 7px;
  height: 7px;
  background-color: var(--real-red);
  border-radius: 10px;
}

#red-dot.inactive {
  background-color: #FFFFFF;
}

.content {
  font-size: 12px;
  font-weight: 400;
}

.time {
  font-size: 10px;
  font-weight: 400;
}
.custom-cursor{
  cursor: pointer;
}
</style>