<!--<script setup>-->
<!--import {useRoute, useRouter} from "vue-router";-->

<!--const currentRoute = useRoute();-->

<!--const router = useRouter();-->

<!--function goToLogin() {-->
<!--  router.push('/user/login')-->
<!--}-->

<!--function goToSignUp() {-->
<!--  router.push('/user/signup')-->
<!--}-->

<!--</script>-->

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: false,
        events: [
          { title: 'Meeting', start: new Date() }
        ]
      }
    }
  }
}
</script>

<!--<template>-->
<!--  <div>-->
<!--    <h1>Home 화면 입니다.</h1>-->
<!--    <button @click="goToLogin">로그인</button>-->
<!--    <button @click="goToSignUp">회원가입</button>-->
<!--  </div>-->
<!--</template>-->

<template>
  <h1>Demo App</h1>
  <FullCalendar :options='calendarOptions' />
</template>

<!--
<style scoped>
div{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1{
  font-size: 50px;
  margin: 20px;
}
button {
  font-size: 40px;
}
</style>-->
