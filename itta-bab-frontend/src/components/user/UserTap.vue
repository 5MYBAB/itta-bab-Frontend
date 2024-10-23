<script setup>
import '@/assets/css/resetcss.css';
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import FriendsList from "@/components/user/FriendsList.vue";
import InquiryList from "@/components/user/InquiryList.vue";
import WrittenPostsList from "@/components/user/WrittenPostsList.vue";
import BookmarksList from "@/components/user/BookmarksList.vue";
/*// import ReportsList from "@/components/user/ReportsList.vue";
// import ReviewsList from "@/components/user/ReviewsList.vue";
// import CommentsList from "@/components/user/CommentsList.vue";
// import NotificationsList from "@/components/user/NotificationsList.vue";*/

// 현재 선택된 메뉴를 추적하는 상태 변수
const selectedMenu = ref('friends');

// 메뉴를 변경하는 함수
const selectMenu = (menu) => {
  selectedMenu.value = menu;
};
</script>

<template>
  <div class="padding">
    <div class="menu-container">
      <!-- 각 메뉴 클릭 시 상태 업데이트 -->
      <div class="menu-button" :class="{ 'active': selectedMenu === 'friends' }" @click="selectMenu('friends')">
        <font-awesome-icon :icon="['fas', 'user-group']" />
        <a>친구 목록</a>
      </div>
      <div class="menu-button" :class="{ 'active': selectedMenu === 'inquiry' }" @click="selectMenu('inquiry')">
        <font-awesome-icon :icon="['far', 'pen-to-square']" />
        <a>문의 목록</a>
      </div>
      <div class="menu-button" :class="{ 'active': selectedMenu === 'writtenPosts' }" @click="selectMenu('writtenPosts')">
        <font-awesome-icon :icon="['far', 'clipboard']" />
        <a>작성글 목록</a>
      </div>
      <div class="menu-button" :class="{ 'active': selectedMenu === 'bookmarks' }" @click="selectMenu('bookmarks')">
        <font-awesome-icon :icon="['far', 'bookmark']" />
        <a>즐겨찾기 목록</a>
      </div>
      <div class="menu-button" :class="{ 'active': selectedMenu === 'reports' }" @click="selectMenu('reports')">
        <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
        <a>신고 목록</a>
      </div>
      <div class="menu-button" :class="{ 'active': selectedMenu === 'reviews' }" @click="selectMenu('reviews')">
        <font-awesome-icon :icon="['fas', 'list-ul']" />
        <a>리뷰 목록</a>
      </div>
      <div class="menu-button" :class="{ 'active': selectedMenu === 'comments' }" @click="selectMenu('comments')">
        <font-awesome-icon :icon="['far', 'comment']" />
        <a>작성 댓글 목록</a>
      </div>
      <div class="menu-button" :class="{ 'active': selectedMenu === 'notifications' }" @click="selectMenu('notifications')">
        <font-awesome-icon :icon="['fas', 'bell']" />
        <a>알람 목록</a>
      </div>
    </div>

    <div class="menu-content">
      <FriendsList v-if="selectedMenu === 'friends'" />
      <InquiryList v-else-if="selectedMenu === 'inquiry'" />
      <WrittenPostsList v-else-if="selectedMenu === 'writtenPosts'" />
      <BookmarksList v-else-if="selectedMenu === 'bookmarks'" />
       <ReportsList v-else-if="selectedMenu === 'reports'" />
       <ReviewsList v-else-if="selectedMenu === 'reviews'" />
       <CommentsList v-else-if="selectedMenu === 'comments'" />
       <NotificationsList v-else-if="selectedMenu === 'notifications'" />
    </div>
  </div>
</template>

<style scoped>
.menu-content {
  width: 1035px;
  background-color: var(--white);
}
.menu-button {
  font-size: 20px;
  font-weight: 600;
  margin: 30px;
  color: var(--white);
  cursor: pointer;
  transition: color 0.3s ease;
}
.menu-button a {
  margin-left: 5px;
}
/* 선택된 메뉴에 검은색 스타일 적용 */
.menu-button.active {
  color: black;
}
.padding {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.menu-container {
  background-color: var(--basic-yellow);
  width: 282px;
  border-radius: 20px 0px 0px 20px;
  height: 1149px;
  padding-top: 80px;
}
</style>
