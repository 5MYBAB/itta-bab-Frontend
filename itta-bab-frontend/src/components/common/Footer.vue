<script setup>
import '@/assets/css/resetcss.css';
</script>
<template>
  <footer>
    <div class="footerWrap">
      <div id="center-info">
        <div class="info-title">FIVE MY BAB</div>
        <br>
        <br>
        <div class="info-item">
          <div>고객센터</div>
          <div class="separator">|</div>
          <div>개인정보처리방침</div>
        </div>
        <br>
        <div>평일 토요일 9:00 ~ 18:00</div>
        <br>
        <div>서울특별시 동작구</div>
        <br>
        <div class="info-representative">
          <div>대표자</div>
          <div class="separator"> </div>
          <div>김익명</div>
        </div>
        <br>
        <div>Copyright © 2024 FIVE MY BAB Inc. 모든 권리 보유.</div>
        <br>
      </div>
      <div class="sns-icons">
        <div id="logo-instagram">
          <font-awesome-icon :icon="['fab', 'instagram']"/>
        </div>
        <div id="logo-youtube">
          <font-awesome-icon :icon="['fab', 'youtube']"/>
        </div>
        <div id="logo-kakaotalk"><img class="logo-kakao" alt="Kakaotalk logo" src="../../assets/icons/kakaotalk.svg">
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

* {
  color: var(--text-color);
}

.footerWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--background-color);
}

#center-info {
  text-align: center;
  flex: 1;
}

.info-title {
  font-size: 24px;
  font-weight: 600;
}

.info-item, .info-representative {
  display: flex; /* flexbox를 사용하여 수평 배치 */
  justify-content: center; /* 중앙 정렬 */
}

.separator {
  margin: 0 5px; /* 구분 기호 주위에 간격 추가 */
}

.sns-icons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}

.sns-icons #logo-instagram, #logo-youtube {
  font-size: 20px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sns-icons #logo-kakaotalk img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
</style>