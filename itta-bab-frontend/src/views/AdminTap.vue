<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ReportsList from "@/components/user/ReportsList.vue";
import Inquiry from "@/views/inquiry/Inquiry.vue";
import InquiryAdminResponse from "@/components/admin/InquiryAdminResponse.vue";
import InquiryList from "@/components/admin/InquiryList.vue";
import WrittenPostsList from "@/components/user/WrittenPostsList.vue";
import ReportList from "@/components/admin/ReportList.vue";

// Vue Router 사용
const router = useRouter();

const selectedMenu = ref('');  // 선택된 메뉴 항목을 저장하는 상태 변수

// 메뉴 클릭 핸들러
const selectMenu = (menuName) => {
  selectedMenu.value = menuName;  // 선택된 메뉴 이름 업데이트
};
</script>

<template>
  <div class="container">
    <div class="main-content">
      <aside class="sidebar">
        <ul>
          <li>
            <div>
              부트캠프 관리
            </div>
            <ul>
              <li>
                <div class="menu-button" :class="{ 'active': selectedMenu === 'training-institution' }" @click="(selectMenu('training-institution'))">
                  훈련기관 조회
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div>
              회원 관리
            </div>
            <ul>
              <li>
                <div class="menu-button" :class="{ 'active': selectedMenu === 'user-info' }" @click="(selectMenu('user-info'))">
                  회원 정보 조회
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div>
              가게 관리
            </div>
            <ul>
              <li>
                <div class="menu-button" :class="{ 'active': selectedMenu === 'store-list' }" @click="(selectMenu('store-list'))">
                  가게 목록 조회
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div>
              메뉴 관리
            </div>
            <ul>
              <li>
                <div class="menu-button" :class="{ 'active': selectedMenu === 'menu-list' }" @click="(selectMenu('menu-list'))">
                  메뉴 조회
                </div>
              </li>
              <li>
                <div class="menu-button" :class="{ 'active': selectedMenu === 'menu-category' }" @click="(selectMenu('menu-category'))">
                  메뉴 카테고리 조회
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div>
              신고 관리
            </div>
            <ul>
              <li>
                <div class="menu-button" :class="{ 'active': selectedMenu === 'reports' }" @click="(selectMenu('reports'))">
                  신고 목록 조회
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div>
              정지 관리
            </div>
            <ul>
              <li>
                <div class="menu-button" :class="{ 'active': selectedMenu === 'suspended-users' }" @click="(selectMenu('suspended-users'))">
                  정지된 회원 조회
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div>
              문의 관리
            </div>
            <ul>
              <li>
                <div class="menu-button" :class="{ 'active': selectedMenu === 'inquiry' }" @click="(selectMenu('inquiry'))">
                  문의 조회
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div>
              모임 관리
            </div>
            <ul>
              <li>
                <div class="menu-button" :class="{ 'active': selectedMenu === 'meeting' }" @click="(selectMenu('meeting'))">
                  모임 관리
                </div>
              </li>
              <li>
                <div class="menu-button" :class="{ 'active': selectedMenu === 'meeting-category' }" @click="(selectMenu('meeting-category'))">
                  모임 카테고리 관리
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </aside>

      <!-- 선택된 메뉴에 따른 컴포넌트 렌더링 -->
      <div class="menu-content">
        <ReportList v-if="selectedMenu === 'reports'" />
        <InquiryList v-else-if="selectedMenu === 'inquiry'" />

      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체 레이아웃 설정 */
.container {
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 메인 컨텐츠 레이아웃 */
.main-content {
  display: flex;
  flex: 1;
  margin: 20px;
}

/* 사이드바 스타일 */
.sidebar {
  width: 200px;
  background-color: #FFD700;
  padding: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 10px;
}

.sidebar ul li {
  margin-bottom: 20px;
  font-weight: 600;
}

.sidebar ul li ul {
  padding-left: 20px;
}

.sidebar ul li ul li {
  list-style-type: disc;
  margin-bottom: 10px;
  font-weight: 400;
}

/* 메뉴 버튼 스타일 */
.menu-button {
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.menu-button.active {
  background-color: #ffcc00;  /* 선택된 메뉴의 배경 색상 */
  color: white;  /* 선택된 메뉴의 텍스트 색상 */
}

/* 콘텐츠 스타일 */
.menu-content {
  width: 1035px;
  background-color: var(--background-color);
}
</style>
