<script setup>
import {useAuthStore} from "@/stores/auth.js";
import {onMounted, ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import axios from "axios";

// 로그인 정보
const authStore = useAuthStore();

// 참여 중인 모임
const groupData = ref([]);

// REST API 호출 함수
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8003/group/attend', {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    if (response.status === 200) {
      groupData.value = response.data;
      console.log(groupData.value);
    } else {
      console.log("참여중인 모임 정보를 불러오는데 실패했습니다.");
    }
  } catch (error) {
    console.error('참여 중인 모임 정보 가져오기 실패', error);
  }
};

// 컴포넌트가 마운트될 때 데이터 호출
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="container">
    <div class="yellow">
      <div class="text-container">
        모임 참여
        <div class="faArrow">
          <font-awesome-icon :icon="['fas', 'circle-arrow-right']"/>
        </div>
      </div>
    </div>

    <div class="list">
      <div v-if="groupData.length === 0" class="line">
        <div class="title">참여 중인 모임이 없습니다.</div>
      </div>

      <div v-for="group in groupData" :key="group.groupCategoryId" class="line">
        <div class="title">{{ group.title }}</div>
        <div class="end-time">{{ group.endTime }}</div>
        <div class="faUser">
          <font-awesome-icon :icon="['far', 'user']"/>
          {{ group.currentParticipants }}/{{ group.maxParticipants }}
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
  padding: 32px 0px;
  display: flex;
  flex-direction: column;
}

.line {
  margin: 10px 42px;
  border-bottom: 2px var(--gray-font) solid;
  padding-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 12px;
  font-weight: 400;
}

.end-time {
  margin-left: 100px;
}
</style>
