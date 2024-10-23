<template>
  <div class="map-container">
    <div id="map" @dblclick="goToNaverMap"></div>
  </div>
</template>

<script>
import { nextTick } from 'vue';

export default {
  mounted() {
    // 환경 변수에서 ncpClientId 가져오기
    const ncpClientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

    // 네이버 지도 API 로드
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      nextTick(() => {
        // 네이버 지도 생성
        new window.naver.maps.Map("map", {
          center: new window.naver.maps.LatLng(37.499677, 126.928061), // 신대방삼거리 좌표
          zoom: 18
        });
      });
    };
  },
  methods: {
    goToNaverMap() {
      // 네이버 지도 페이지로 이동
      window.open("https://map.naver.com/v5/?c=126.928061,37.499677,16,0,0,0,d", "_blank");
    }
  }
};
</script>

<style>
.map-container {
  width: 120%;
  height: 400px;
}

#map {
  width: 80%; /* 화면의 절반 */
  height: 191%;
  border-radius: 20px;
}

</style>
