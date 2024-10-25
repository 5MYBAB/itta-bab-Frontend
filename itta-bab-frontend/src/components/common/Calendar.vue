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
        일정이름 : <input type="text" v-model="newEvent.scheduleTitle"/><br/>
        날짜 : <input type="date" v-model="newEvent.scheduleDate"/><br/>
        설명 : <input type="text" v-model="newEvent.scheduleContent"/><br/>
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

let authStore = null;

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
      currentEvent: null // 현재 선택된 이벤트
    };
  },
  methods: {
    handleDateClick(arg) {
      this.showModal = true;
      this.newEvent.scheduleDate = arg.dateStr;
    },
    handleEventClick(arg) {
      this.currentEvent = arg.event; // 현재 선택된 이벤트 저장
      console.log('Current Event clicked:', this.currentEvent); // 클릭한 이벤트 확인
      this.newEvent.scheduleTitle = arg.event.title; // 이벤트 제목
      this.newEvent.scheduleDate = arg.event.startStr; // 이벤트 시작 날짜
      this.newEvent.scheduleContent = arg.event.extendedProps.description; // 이벤트 설명
      this.showEventModal = true; // 이벤트 모달 표시
    },
    async handleAddClick() {
      const calendar = this.$refs.calendar.getApi();
      if (confirm("추가하시겠습니까?")) {
        const eventData = {
          title: this.newEvent.scheduleTitle,
          start: this.newEvent.scheduleDate,
          description: this.newEvent.scheduleContent
        };
        if (eventData.title === "" || eventData.start === "") {
          alert('입력하지 않은 값이 있습니다.');
        } else {
          calendar.addEvent(eventData);
          this.showModal = false;
          this.newEvent = { scheduleTitle: '', scheduleDate: '', scheduleContent: '' };

          const saveEventDB = async () => {
            const token = authStore.accessToken;
            await axios.post('http://localhost:8003/schedule', {
              scheduleTitle: eventData.title,
              scheduleContent: eventData.description,
              scheduleDate: eventData.start
            }, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
          }

          saveEventDB();
        }
      }
    },
    async handleUpdateEvent() {
      const calendar = this.$refs.calendar.getApi();
      const eventData = {
        scheduleTitle: this.newEvent.scheduleTitle,
        scheduleDate: this.newEvent.scheduleDate,
        scheduleContent: this.newEvent.scheduleContent
      };

      // 선택한 이벤트를 업데이트
      this.currentEvent.setProp('title', eventData.scheduleTitle);
      this.currentEvent.setStart(eventData.scheduleDate);
      this.currentEvent.setExtendedProp('description', eventData.scheduleContent);

      // DB에 업데이트 요청
      const token = authStore.accessToken;
      await axios.put(`http://localhost:8003/schedule/${this.currentEvent.id}`, {
        scheduleTitle: eventData.scheduleTitle,
        scheduleContent: eventData.scheduleContent,
        scheduleDate: eventData.scheduleDate
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      this.showEventModal = false; // 모달 닫기
    },
    async handleDeleteEvent() {
      const calendar = this.$refs.calendar.getApi();

      // 현재 이벤트를 콘솔에 출력하여 확인
      console.log('Current Event before delete:', this.currentEvent); // 디버깅: 삭제 전 현재 이벤트 확인

      // currentEvent가 정의되어 있는지 확인
      if (!this.currentEvent || !this.currentEvent.id) {
        console.error('No event selected or event ID is undefined:', this.currentEvent);
        alert('삭제할 이벤트가 선택되지 않았습니다.');
        return; // 이벤트가 선택되지 않았거나 ID가 없으면 실행 중지
      }

      // 선택한 이벤트를 삭제
      const eventToDelete = calendar.getEventById(this.currentEvent.id);
      if (eventToDelete) {
        eventToDelete.remove(); // 캘린더에서 이벤트 제거
      } else {
        console.error('Event not found in calendar:', this.currentEvent.id);
      }

      // DB에서 삭제 요청
      const token = authStore.accessToken;
      try {
        await axios.delete(`http://localhost:8003/schedule/${this.currentEvent.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        alert('이벤트가 삭제되었습니다.'); // 성공 메시지
      } catch (error) {
        console.error('Error deleting event:', error.response ? error.response.data : error); // 에러 메시지 출력
      }

      this.showEventModal = false; // 모달 닫기
      this.currentEvent = null; // 선택된 이벤트 초기화
    },
    async getEventDB() {
      const token = authStore.accessToken;
      try {
        const response = await axios.get('http://localhost:8003/schedule', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const calendar = this.$refs.calendar.getApi();
        const events = response.data;
        console.log('Fetched events:', events);

        for (let i = 0; i < events.length; i++) {
          const eventData = {
            id: events[i].id, // 이벤트 ID 추가
            title: events[i].scheduleTitle,
            start: events[i].scheduleDate,
            description: events[i].scheduleContent
          };
          calendar.addEvent(eventData);
        }

      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  },
  mounted() {
    authStore = useAuthStore();
    this.getEventDB();
  }
}
</script>

<style scoped>
.container {
  background-color: #FFFFFF;
}
</style>
