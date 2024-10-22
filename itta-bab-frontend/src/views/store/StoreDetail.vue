<template>
  <div class="post-detail">
    <div class="title">
      <h1>게시판</h1>
    </div>
    <br>
    <SearchBarAndSort/>
    <br>
    <List/>
    <br>
  </div>
</template>

<style scoped>
.post-detail{/*배경 화면 노란색으로 설정하는 부분*/
  background-color: var(--background-color); /* 노란색 배경 */
  min-height: 100vh; /* 화면 전체 높이 */
  width: 100%;
}
.inline-content {
  display: flex;
  align-items: center;
}
.title {
  text-align: center;
}
.title h1 {
  font-size: 2em;
  font-weight: bold;
}
img {
  margin-right: 10px;
}
</style>
<script setup lang="ts">
import List from "@/components/common/List.vue";
import SearchBarAndSort from "@/components/common/SearchBarAndSort.vue";
</script>