<script setup>

import Header from "@/components/common/Header.vue";
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import ScheduleFrom from "@/components/schedule/scheduleFrom.vue";
</script>


<template>
  <Header/>
  <page-title-top/>
  <div class="page-container">
    <div class="pagetitle">일정 수정</div>
  </div>
  <ScheduleFrom/>
</template>

<style scoped>
*{
  background-color: var(--background-color);
}
.pagetitle{
  padding-left: 25px;
  padding-bottom: 25px;
  font-size: 40px;
  font-weight: 600;
  width: 1130px;
  border-bottom: 2px var(--gray-font) solid;
}
.page-container{

  padding-top:130px;
  display: flex;
  justify-content: center;
}
</style>