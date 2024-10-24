<template>
  <div class="post-detail">
    <StoreSearchBarAndSort/>
    <div class="white-box">
      <div id="map"><StoreMapApi/></div>
      <div id="store-list"><StoreList/></div>

    </div>
  </div>
</template>

<style scoped>
.white-box {
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.13) inset;
  border-radius: 43px;
  background-color: var(--white);
  max-width: 1000px;
  width: 100%;
  padding: 65px 100px;
  margin: 0 auto;
}

.post-detail{/*배경 화면 노란색으로 설정하는 부분*/
  background-color: var(--background-color); /* 노란색 배경 */
  min-height: 100vh; /* 화면 전체 높이 */
  width: 100%;
}

#map {
  flex: 1; /* 공간을 자동으로 할당받도록 설정 */
}
#store-list {
  flex: 1;
  margin-left: 20px;
}
</style>
<script setup lang="ts">
import StoreMapApi from "@/components/common/StoreMapApi.vue";
import StoreSearchBarAndSort from "@/components/common/StoreSearchBarAndSort.vue";
import StoreList from "@/components/store/StoreList.vue";
</script>