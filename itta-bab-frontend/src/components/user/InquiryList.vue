<script setup>
import '@/assets/css/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from "axios";
import {computed, onMounted, reactive, ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const inquiryList = ref([]);

const fetchInquiryList = async () => {
  try {
    const response = await axios.get('http://localhost:8003/inquiry/user', {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`, // 필요한 경우 인증 토큰 추가
      }
    });

    inquiryList.value = response.data; // 응답 데이터를 inquiryList에 저장
  } catch (error) {
    console.error('문의 목록을 불러오는 중 에러가 발생했습니다.', error.response ? error.response.data : error.message);
  }
};

onMounted(() => {
  fetchInquiryList();
});

// Pagination 관련 변수 및 함수
const currentPage = ref(1);
const itemsPerPage = 10;

// 총 페이지 계산
const totalPages = computed(() => Math.ceil(inquiryList.value.length / itemsPerPage));

// 현재 페이지에 해당하는 데이터만 보여주기
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return inquiryList.value.slice(start, end);
});

// 페이지 이동 함수
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

</script>

<template>
  <div class="display">
    <div class="title">
      <font-awesome-icon :icon="['far', 'pen-to-square']" size="2x"/>
      <div>문의 목록</div>
    </div>
  </div>
  <div v-for="(inquiry, index) in paginatedData" :key="inquiry.inquiryId" class="list-container">
    <div class="borderline"></div>
    <div class="list-content">
      <div class="inquiry-content inquiry-title">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</div>
      <div class="inquiry-content1">
        <div class="inquiry-title">{{ inquiry.inquiryContent }}</div>
      </div>
      <div class="inquiry-content date">{{ inquiry.createDate }}</div>
    </div>
    <div class="yellow" v-if="inquiry.inquiryReply">
      <div class="box">
        <div><font-awesome-icon :icon="['fas', 'arrow-turn-up']" rotation=90 /></div>
        <div class="inquiry-answer">{{ inquiry.inquiryReply }}</div>
      </div>
    </div>
    <div class="line"></div>
  </div>


</template>

<style scoped>
.borderline{
  background-color: var(--gray-font);
  height: 2px;
  width: 80%;
}
.line{
  background-color: var(--gray-font);
  height: 1px;
  width: 80%;
}
.inquiry-answer{
  padding: 0px 20px;
  word-wrap: break-word;
  width: 90%;
}
.box{
  width: 70%;
  margin-left: 50px;
  background-color: var(--background-color);
  border-radius: 10px;
  padding: 30px 10px;
  display: flex;
  margin-bottom: 15px;
}
.yellow{
  width:100%;
  display: flex;
  justify-content: center;
}
.inquiry-content1{
  width: 600px;
}
.inquiry-title{
  word-wrap: break-word;
  font-weight: 600;
  margin-bottom: 10px;
}
.date{
  font-size: 15px;
}
.inquiry-content{
  margin: 0px 15px;
  word-wrap: break-word;
  padding-bottom: 10px;
}
.list-content{
  align-items: center;
  width: 80%;
  display: flex;
  justify-content: space-between;
  padding: 15px 0px;
}
.list-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.display{
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.title{
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.title div{
  font-size: 30px;
  font-weight: 600;
  margin-left: 10px;
}
</style>