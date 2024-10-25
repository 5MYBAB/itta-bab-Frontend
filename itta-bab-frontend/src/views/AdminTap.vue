<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();  // Vue Router 사용

const institutions = ref([
  { name: '플레이데이터 동작캠퍼스', address: '서울 동작구 보라매로 87' },
  { name: '플레이데이터 서초캠퍼스', address: '서울 서초구 효령로 335' },
]);

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

// 필터링된 데이터를 페이지별로 나눠서 반환
const paginatedInstitutions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredInstitutions.value.slice(start, end);
});

// 필터링된 데이터 (검색 필터 적용)
const filteredInstitutions = computed(() => {
  return institutions.value.filter(item => item.name.includes(searchQuery.value));
});

// 전체 페이지 수 계산
const totalPages = computed(() => {
  return Math.ceil(filteredInstitutions.value.length / itemsPerPage);
});

// 페이지 변경 핸들러
const changePage = (page) => {
  currentPage.value = page;
};

// 훈련 기관 등록 페이지로 이동하는 함수
const goToInstitutionRegistration = () => {
  router.push('/training-institution');  // 등록 버튼을 클릭 시 이동할 경로
};
</script>

<template>
  <div class="container">
    <div class="main-content">
      <aside class="sidebar">
        <ul>
          <li><a href="#" @click.prevent="router.push('/bootcamp')">부트캠프 관리</a>
            <ul>
              <li><a href="#" @click.prevent="router.push('/training-institution')">훈련기관 조회</a></li>
            </ul>
          </li>
          <li><a href="#" @click.prevent="router.push('/user-management')">회원 관리</a>
            <ul>
              <li><a href="#" @click.prevent="router.push('/user-info')">회원 정보 조회</a></li>
            </ul>
          </li>
          <li><a href="#" @click.prevent="router.push('/store-management')">가게 관리</a>
            <ul>
              <li><a href="#" @click.prevent="router.push('/store-list')">가게 목록 조회</a></li>
            </ul>
          </li>
          <li><a href="#" @click.prevent="router.push('/menu-management')">메뉴 관리</a>
            <ul>
              <li><a href="#" @click.prevent="router.push('/menu-list')">메뉴 조회</a></li>
              <li><a href="#" @click.prevent="router.push('/menu-category')">메뉴 카테고리 조회</a></li>
            </ul>
          </li>
          <li><a href="#" @click.prevent="router.push('/menu-management')">신고 관리</a>
            <ul>
              <li><a href="#" @click.prevent="router.push('/menu-list')">신고 목록 조회</a></li>
            </ul>
          </li>
          <li><a href="#" @click.prevent="router.push('/menu-management')">정지 관리</a>
            <ul>
              <li><a href="#" @click.prevent="router.push('/menu-list')">정지된 회원 조회</a></li>
            </ul>
          </li>
          <li><a>문의 관리</a>
            <ul>
              <li><a href="#" @click.prevent="router.push('/inquiry/admin')">문의 조회</a></li> <!--여기 링크를 이렇게 만들게 아니고 userTap처럼 만들어야됨-->
            </ul>
          </li>
          <li><a href="#" @click.prevent="router.push('/menu-management')">모임 관리</a>
            <ul>
              <li><a href="#" @click.prevent="router.push('/menu-list')">모임 관리</a></li>
              <li><a href="#" @click.prevent="router.push('/menu-list')">모임 카테고리 관리</a></li>
            </ul>
          </li>

        </ul>
      </aside>
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

/* 콘텐츠 스타일 */
.content {
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 250px;
  margin-right: 10px;
}

.register-btn {
  background-color: #ffe074;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
}

.institution-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
}

.institution-table th,
.institution-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.institution-table th {
  background-color: #ffe074;
}

.edit-btn,
.delete-btn {
  background-color: #ffe074;
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  margin-left: 5px;
  cursor: pointer;
}

.pagination {
  text-align: center;
  margin-top: 20px;
}

.pagination span {
  padding: 10px 15px;
  margin: 0 5px;
  background-color: #ffe074;
  border-radius: 50%;
  cursor: pointer;
}

.pagination .active {
  background-color: #ffcc00;
}
</style>
