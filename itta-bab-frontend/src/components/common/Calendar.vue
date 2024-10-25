<template>
  <div class="container">
    <FullCalendar ref="calendar" :options="calendarOptions">
      <template v-slot:eventContent='arg'>
        <b>{{ arg.event.title }}</b>
      </template>
    </FullCalendar>

    <!-- 일정 추가 모달 -->
    <b-modal v-model="showModal" title="일정 추가하기">
      <div class="modal-body">
        일정이름 : <input type="text" v-model="newEvent.scheduleTitle"/><br/>
        날짜 : <input type="date" v-model="newEvent.scheduleDate"/><br/>
        설명 : <input type="text" v-model="newEvent.scheduleContent"/><br/>
      </div>
      <template #footer>
        <b-button variant="secondary" @click="showModal = false">취소</b-button>
        <b-button variant="primary" @click="handleAddClick">추가</b-button>
      </template>
    </b-modal>

    <!-- 이벤트 수정 및 삭제 모달 -->
    <b-modal v-model="showEventModal" title="일정 정보">
      <div class="modal-body">
        일정이름 : <input type="text" v-model="currentEventTitle"/><br/>
        날짜 : <input type="date" v-model="currentEventDate"/><br/>
        설명 : <input type="text" v-model="currentEventDescription"/><br/>
      </div>
      <template #footer>
        <b-button variant="secondary" @click="showEventModal = false">취소</b-button>
        <b-button variant="primary" @click="handleUpdateEvent">수정</b-button>
        <b-button variant="danger" @click="handleDeleteEvent">삭제</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BModal } from "bootstrap-vue-3";
import { useAuthStore } from "@/stores/auth.js";
import axios from "axios";

export default {
  components: {
    FullCalendar,
    BModal
  },
  data() {
    return {
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
      showEventModal: false,
      newEvent: {
        scheduleTitle: '',
        scheduleDate: '',
        scheduleContent: ''
      },
      currentEventId: null, // 현재 선택된 이벤트 ID
      currentEventTitle: '', // 선택된 이벤트 제목
      currentEventDate: '', // 선택된 이벤트 날짜
      currentEventDescription: '' // 선택된 이벤트 설명
    };
  },
  methods: {
    handleDateClick(arg) {
      this.showModal = true;
      this.newEvent.scheduleDate = arg.dateStr;
    },
    async handleEventClick(arg) {
      const event = arg.event;

      this.currentEventId = event.extendedProps.scheduleId;
      this.currentEventTitle = event.title;
      this.currentEventDate = event.startStr;
      this.currentEventDescription = event.extendedProps.description;

      this.showEventModal = true;
    },
    async handleAddClick() {
      const calendar = this.$refs.calendar.getApi();
      if (confirm("추가하시겠습니까?")) {
        const eventData = {
          title: this.newEvent.scheduleTitle,
          start: this.newEvent.scheduleDate,
          extendedProps: {
            description: this.newEvent.scheduleContent
          }
        };
        if (eventData.title === "" || eventData.start === "") {
          alert('입력하지 않은 값이 있습니다.');
        } else {
          calendar.addEvent(eventData);
          this.showModal = false;
          this.newEvent = { scheduleTitle: '', scheduleDate: '', scheduleContent: '' };

          const token = useAuthStore().accessToken;
          await axios.post('http://localhost:8003/schedule', {
            scheduleTitle: eventData.title,
            scheduleContent: eventData.extendedProps.description,
            scheduleDate: eventData.start
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        }
      }
    },
    async handleUpdateEvent() {
      const token = useAuthStore().accessToken;

      // DB에 업데이트 요청
      await axios.put(`http://localhost:8003/schedule/${this.currentEventId}`, {
        scheduleTitle: this.currentEventTitle,
        scheduleContent: this.currentEventDescription,
        scheduleDate: this.currentEventDate
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      // 이벤트 업데이트 후 모달 닫기
      this.showEventModal = false;
      window.location.reload();
    },
    async handleDeleteEvent() {
      const token = useAuthStore().accessToken;

      // DB에서 삭제 요청
      await axios.delete(`http://localhost:8003/schedule/${this.currentEventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      this.showEventModal = false; // 모달 닫기
      this.currentEventId = null; // 선택된 이벤트 초기화
    },
    async getEventDB() {
      const token = useAuthStore().accessToken;
      try {
        const response = await axios.get('http://localhost:8003/schedule', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const calendar = this.$refs.calendar.getApi();
        const events = response.data; // 서버에서 가져온 일정 데이터
        console.log('Fetched events:', events);

        // 일정 데이터를 FullCalendar에 추가
        events.forEach(event => {
          const eventData = {
            id: event.scheduleId,
            title: event.scheduleTitle,
            start: event.scheduleDate, // LocalDate는 ISO 형식으로 변환됨
            extendedProps: {
              description: event.scheduleContent,
              scheduleId: event.scheduleId // scheduleId를 extendedProps에 포함
            }
          };
          calendar.addEvent(eventData);
        });

      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  },
  mounted() {
    this.getEventDB(); // 컴포넌트가 마운트될 때 일정 데이터 가져오기
  }
}
</script>

<style scoped>
.container {
  background-color: #FFFFFF;
}
</style>
