<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import {BModal} from "bootstrap-vue-3";
import {useAuthStore} from "@/stores/auth.js";
import axios from "axios";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    BModal
  },
  data() {
    return {
      authStore: useAuthStore(),
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        headerToolbar: {
          left: 'prev',
          center: 'title',
          right: 'next'
        },
      },
      showModal: false,
      newEvent: {
        title: '',
        start: '',
        description: ''
      },
    }
  },
  methods: {
    handleDateClick: function (arg) {
      this.showModal = true;
      this.newEvent.start = arg.dateStr;
    },
    handleEventClick: function (arg) {
      alert(`Event: ${arg.event.title}\nDescription: ${arg.event.extendedProps.description}`);
    },
    handleAddClick: function () {
      const calendar = this.$refs.calendar.getApi();
      if (confirm("추가하시겠습니까?")) {
        const eventData = {
          title: this.newEvent.title,
          start: this.newEvent.start,
          description: this.newEvent.description
        };
        if (eventData.title === "" || eventData.start === "") {
          alert('입력하지 않은 값이 있습니다.');
        } else {
          calendar.addEvent(eventData);
          this.showModal = false;
          this.newEvent = {title: '', start: '', description: ''};

          const saveEventDB = async () => {
            const token = this.authStore.accessToken;
            await axios.post('http://localhost:8003/schedule',
                {
                  scheduleTitle : eventData.title,
                  scheduleContent : eventData.description,
                  scheduleDate : eventData.start
                },{

                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                   }
                }
            )
                .catch(error => {
                  console.error('Error fetching data:', error);
                });
          }
          saveEventDB();
        }
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <FullCalendar ref="calendar" :options="calendarOptions">
      <template v-slot:eventContent='arg'>
        <b>{{ arg.event.title }}</b>
      </template>
    </FullCalendar>
    <b-modal v-model="showModal" title="일정 추가하기">
      <div class="modal-body">
        일정이름 : <input type="text" v-model="newEvent.title"/><br/>
        날짜 : <input type="date" v-model="newEvent.start"/><br/>
        설명 : <input type="text" v-model="newEvent.description"/><br/>
      </div>
      <template #footer>
        <b-button variant="secondary" @click="showModal = false">취소</b-button>
        <b-button variant="primary" @click="handleAddClick">추가</b-button>
      </template>
    </b-modal>
  </div>
</template>

<style scoped>
.fc-event {
  background-color: #42a5f5; /* 배경 색상 */
  color: white; /* 글자 색상 */
  padding: 5px; /* 패딩 추가하여 크기 증가 */
  font-size: 1.2em; /* 글자 크기 증가 */
}

.container {
  background-color: #FFFFFF;
}
</style>