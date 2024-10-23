<script setup>
import '@/assets/css/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
<div class="padding">
  <div class="menu-container">
    <div class="menu-button"><font-awesome-icon :icon="['fas', 'user-group']" /><a>친구 목록</a></div>
    <div class="menu-button"><font-awesome-icon :icon="['far', 'pen-to-square']" /><a>문의 목록</a></div>
    <div class="menu-button"><font-awesome-icon :icon="['far', 'clipboard']" /><a>작성글 목록</a></div>
    <div class="menu-button"><font-awesome-icon :icon="['far', 'bookmark']" /><a>즐겨찾기 목록</a></div>
    <div class="menu-button"><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /><a>신고 목록</a></div>
    <div class="menu-button"><font-awesome-icon :icon="['fas', 'list-ul']" /><a>리뷰 목록</a></div>
    <div class="menu-button"><font-awesome-icon :icon="['far', 'comment']" /><a>작성 댓글 목록</a></div>
    <div class="menu-button"><font-awesome-icon :icon="['fas', 'bell']" /><a>알람 목록</a></div>
  </div>
  <div class="menu-content">

  </div>
</div>
</template>

<style scoped>
.menu-content{
  width: 1035px;
  background-color: var(--white);
}
.menu-button{
  font-size: 20px;
  font-weight: 600;
  margin: 30px;
  color: var(--white);
}
.menu-button a{
  margin-left: 5px;
}
.padding{
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.menu-container{
  background-color: var(--basic-yellow);
  width: 282px;
  border-radius: 20px 0px 0px 20px;
  height: 1149px;
  padding-top: 80px;
}
</style>