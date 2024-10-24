<script setup>
import '@/assets/css/resetcss.css';
import AdminTopSection from "@/components/common/AdminTopSection.vue";

const modifyMenuCategory = () => {
  alert("미구현");
};
</script>

<template>
  <div class="total-container">
    <div class="back">
      <AdminTopSection class="top-section">
        <template #label>
          메뉴 카테고리 수정
        </template>
      </AdminTopSection>
      <div class="white-box">
        <div class="form-container">
          <div class="flex-box">
            <div class="title">카테고리 명</div>
            <div class="input-box"><input type="text"></div>
          </div>

        </div>
        <br><br>
        <input v-on:click="modifyMenuCategory" type="button" value="수정" id="submit-button">
      </div>

    </div>

  </div>
</template>

<style scoped>

.total-container {
  align-items: center;
  justify-content: center;
}

.top-section {
  margin-top: 2%;
}

textarea {
  background-color: var(--gray-input);
  height: 300px;
  width: 600px;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  margin-top: 10px;
}

.back {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  margin-top: 2%;
}

.flex-box {
  display: flex;
  align-items: center;
  width: 635px;
  margin: 50px 30px 4px;
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
  width: 400px;
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
  width: 348px;
}
</style>
