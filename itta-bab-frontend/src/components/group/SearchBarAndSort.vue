<script setup>
import SearchBar from "@/components/common/SearchBar.vue"
</script>

<template>
  <div class="total-container">
    <SearchBar/>
    <div class="sort-dropdown">
      <select>
        <option value="latest">최신순</option>
        <option value="mostHated">모집중</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.total-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100% !important;
}

.sort-dropdown {
  flex-shrink: 0; /* 드롭다운이 줄어들지 않도록 설정 */
}

.sort-dropdown select {
  justify-content: flex-end;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--white);
  background-color: var(--white);
}
</style>
