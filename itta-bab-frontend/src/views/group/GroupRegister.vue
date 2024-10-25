<script setup>
import '@/assets/css/resetcss.css';
import axios from "axios";
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";

// 라우터
const router = useRouter();

// DB 카테고리 데이터
const category = ref([]);

// 로그인 사용자 정보
const authStore = useAuthStore();

// 카테고리 선택 상태
const selectedCategory = ref(null);
const showDropdown = ref(false); // 드롭다운 표시 여부

// 모집인원 입력란에 대한 참조
const countingInput = ref(null);

// 입력받은 데이터
const data = ref({
  title: '',
  category: '',
  location: '',
  endDate: '',
  counting: '',
  content: ''
});

// REST API 호출
const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8003/groupCategory", {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    category.value = response.data;
    // 첫 번째 카테고리가 존재할 때만 초기 선택값 설정
    if (category.value.length > 0) {
      selectedCategory.value = category.value[0];
    }
    console.log("불러온 카테고리 정보");
    console.log(category.value);
  } catch (error) {
    console.log("어라라...?\n", error);
  }
};

// 데이터 전송
const sendData = async () => {
  try {
    const request = await axios.post("http://localhost:8003/group", {
      "groupId": 0,
      "groupCategoryId": data.value.category,
      "userId": 0,
      "groupTitle": data.value.title,
      "userCounting": data.value.counting,
      "groupStatus": true,
      "createDate": new Date(),
      "endDate": data.value.endDate,
      "groupPost": data.value.content,
      "chatRoomStatus": "NOT_CREATED",
      "blinded": false
    }, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`
      }
    });

    if (request.status === 200) {
      alert("새로운 모임을 등록하였습니다.");
    } else {
      alert("새로운 모임을 등록에 실패하였습니다.");
      console.log(`모임 등록 실패
      상태코드 = ${request.valueOf()}`);
    }
    router.push("/group");

  } catch (error) {
    console.log("어라라?\n" + error);
  }
}

const register = () => {
  // 카테고리 값 추가
  data.value.category = selectedCategory.value ? selectedCategory.value.groupCategoryId : '';

  console.log(data.value);

  sendData();
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value; // 드롭다운 토글
};

const selectCategory = (cat) => {
  selectedCategory.value = cat; // 선택된 카테고리 설정
  data.value.category = cat.groupCategoryName;
  showDropdown.value = false; // 드롭다운 닫기
};

// 선택된 카테고리 이름을 computed로 정의
const selectedCategoryName = computed(() => {
  return selectedCategory.value ? selectedCategory.value.groupCategoryName : '';
});

// 모집인원 유효성 검사
const validateCounting = () => {
  const counting = parseInt(data.value.counting);
  if (isNaN(counting) || counting < 2 || counting > 11) {
    alert("모집인원은 2에서 11 사이의 정수만 입력 가능합니다.");
    data.value.counting = ''; // 잘못된 입력일 경우 초기화
    countingInput.value.focus(); // 모집인원 입력란에 포커스 이동
  }
};

onMounted(() => {
  fetchData();
});
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
            <input type="text" v-model="data.title">
            <div class="small">영문, 숫자 포함하여 255자까지 입력가능합니다.</div>
          </div>
        </div>

        <div class="flex-box">
          <div class="title">카테고리</div>
          <div class="input-box" @click="toggleDropdown">
            <input type="text" v-model="selectedCategoryName" readonly>
          </div>
          <div v-if="showDropdown" class="dropdown">
            <div v-for="cat in category" :key="cat.groupCategoryId" @click="selectCategory(cat)">
              <input type="radio"
                     :value="cat.groupCategoryName"
                     :checked="selectedCategory.groupCategoryId === cat.groupCategoryId"/>
              {{ cat.groupCategoryName }}
            </div>
          </div>
        </div>

        <div class="flex-box">
          <div class="title">모임장소</div>
          <div class="input-box">
            <input type="text" v-model="data.location">
            <div class="small">영문, 숫자 포함하여 255자까지 입력가능합니다.</div>
          </div>
        </div>

        <div class="flex-box">
          <div class="title">마감 시간</div>
          <div class="input-box">
            <input type="datetime-local"
                   v-model="data.endDate"
                   class="datetime-style"
            />
          </div>
        </div>

        <div class="flex-box">
          <div class="title">모집인원</div>
          <div class="input-box">
            <input type="text" v-model="data.counting" @blur="validateCounting">
            <div class="small">정수를 입력하세요 (2~11 사이).</div>
          </div>
        </div>

        <div class="flex-box">
          <div id="tit" class="title">내용</div>
          <textarea id="content" v-model="data.content" placeholder="내용을 입력하세요"></textarea>
        </div>

      </div>
      <div class="submit">
        <input type="button" value="등록" id="submit-button" v-on:click="register">
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

.dropdown {
  border: 1px solid var(--gray-font);
  background-color: var(--white);
  position: absolute; /* 드롭다운 위치 설정 */
  z-index: 10; /* 드롭다운이 다른 요소 위에 표시되도록 */
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