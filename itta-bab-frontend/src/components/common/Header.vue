<script setup>
import '@/asset/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
<template>
  <header>
    <div class="headerWrap">
      <div id="logo">itta-bab</div>
      <ul class="header-list">
        <li>맛집 리스트</li>
        <li>모임 참여</li>
        <li>익명 커뮤니티</li>
      </ul>
      <div class="user-tap">
        <div id="alarm"><font-awesome-icon :icon="['fas', 'bell']" /></div>
        <div id="mypage"><font-awesome-icon :icon="['far', 'user']" /></div>
        <div id="log-out"><font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" /></div>
      </div>
    </div>
  </header>
</template>
<style scoped>
@import '../../asset/resetcss.css';
*{
  color: var(--text-color);
}
.headerWrap{
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;
}
#logo{
  font-size: 35px;
  margin-left: 50px;
  font-weight: 600;
}
.header-list{
  font-size: 20px;
}
li {
  display: inline;
  margin:25px;
}
.user-tap{
  display: flex;
  height: 100px;
  align-items: center; /* 세로 가운데 정렬 */
}
.user-tap div{
  font-size: 20px;
  margin: 10px;
}
#log-out{
  margin-right: 50px;
}
</style>