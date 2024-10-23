<script setup>
import Calendar from "@/components/common/Calendar.vue";
import GroupList from "@/components/user/GroupList.vue";
import StoreList from "@/components/user/StoreList.vue";
import PostList from "@/components/user/PostList.vue";
</script>

<template>
  <div class="back">
      <div class="calendar">
        <Calendar/>
      </div>
      <div class="menu-list">
        <GroupList/>
        <StoreList/>
        <PostList/>
      </div>
  </div>
</template>

<style scoped>
.back {
  padding-top: 30px;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 54px;
}
.calendar {
  width: 825px;
  height: 657px;
}
.menu-list {
  gap: 45px;
  display: flex;
  justify-content: center;
}
</style>
