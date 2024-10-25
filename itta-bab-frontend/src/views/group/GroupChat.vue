<template>
  <div class="background">
    <!-- 헤더 -->
    <header class="header-container">
      <img v-bind:src="logo" alt="Logo"/>
      <h1 class="margin-left">소속 부트캠프명</h1>
    </header>

    <!-- 바디 -->
    <div class="body-container">
      <!-- 채팅창 진행 구역 -->
      <div class="chat-container">
        <!-- 채팅 내역 -->
        <div id="msgArea" class="chat-list">
          <div v-for="(message, index) in chatMessages" :key="index"
               :class="['chat-message', { 'user-message': message.isUser, 'other-message': !message.isUser }]">
            <b>{{ message.sessionId }}: {{ message.text }}</b>
          </div>
        </div>

        <!-- 채팅 입력 구역 -->
        <div class="chat-input-area">
          <input type="text" v-model="newMessage" placeholder="메시지를 입력하세요..."/>
          <button @click="send" :disabled="!isWebSocketOpen">전송</button> <!-- 버튼 비활성화 -->
        </div>
      </div>

      <!-- 참여 인원 구역 -->
      <div class="participants-area">
        <!-- 제목 -->
        <div class="title-area">
          <font-awesome-icon v-bind:icon="['fas', 'list']"/>
          <span>참여 인원</span>
        </div>
        <!-- 경계선 -->
        <div class="hr"/>
        <!-- 참여 인원 리스트 -->
        <ul class="user-list-container">
          <li>테스트 1</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import {useAuthStore} from "@/stores/auth.js";
import logo from "@/assets/icons/itta-bab_logo.svg";

const chatMessages = ref([]); // 채팅 메시지를 저장할 ref
const newMessage = ref(''); // 새 메시지 입력
const route = useRoute();
const username = "유근웅";
const authStore = useAuthStore();

let websocket;
const isWebSocketOpen = ref(false); // 웹소켓 연결 상태

// 웹소켓 연결
const connectWebSocket = () => {
  const token = authStore.accessToken;
  const websocket = new WebSocket(`ws://localhost:8003/group/${route.params.id}/chat?token=${token}`);


  websocket.onopen = () => {
    console.log('웹소켓 연결 성공');
    isWebSocketOpen.value = true; // 연결 상태 업데이트
    websocket.send(`${username}: 님이 입장하셨습니다.`);
  };

  websocket.onmessage = (event) => {
    console.log('수신한 메시지: ', event.data);
    const data = event.data.split(':');
    const sessionId = data[0];
    const message = data.slice(1).join(':'); // ':' 포함 메시지 처리

    chatMessages.value.push({
      sessionId,
      text: message,
      isUser: sessionId === username // 작성자 여부 확인
    });
  };

  websocket.onclose = (event) => {
    console.log('웹소켓 연결 종료');
    isWebSocketOpen.value = false; // 연결 상태 업데이트
    if (event.wasClean) {
      console.log(`정상적으로 연결이 종료되었습니다. 코드: ${event.code}, 이유: ${event.reason}`);
    } else {
      console.error(`비정상적인 연결 종료. 코드: ${event.code}`);
    }
  };

  websocket.onerror = (error) => {
    console.error('웹소켓 오류 발생:', error);
    console.error('오류 세부정보:', {
      message: error.message,
      name: error.name,
      type: error.type,
      target: error.target,
      currentTarget: error.currentTarget,
      eventPhase: error.eventPhase,
      timeStamp: error.timeStamp
    });
  };
};

// 메시지 전송 함수
const send = () => {
  if (newMessage.value.trim() !== '') {
    if (isWebSocketOpen.value) { // 웹소켓이 OPEN 상태인지 확인
      console.log(`전송할 메시지: ${username}:${newMessage.value}`);
      websocket.send(`${username}:${newMessage.value}`);
      newMessage.value = ''; // 입력 필드 초기화
    } else {
      console.warn('웹소켓이 아직 연결되지 않았습니다. 메시지를 전송할 수 없습니다.');
    }
  }
};

// 컴포넌트 마운트 시 웹소켓 연결
onMounted(() => {
  connectWebSocket();
});

// 컴포넌트 언마운트 시 웹소켓 연결 종료
onBeforeUnmount(() => {
  if (websocket) {
    websocket.send(`${username}: 님이 방을 나가셨습니다.`);
    websocket.close();
  }
});
</script>

<style scoped>
/* 전체 배경 */
.background {
  display: flex;
  background-color: var(--background-color);
  padding-top: 30px;
  justify-content: center;
  flex-direction: column;
}

/* 헤더 */
.header-container {
  display: flex;
  flex-direction: row;
  align-items: center; /* 수직 중앙 정렬 */
  margin-left: 2%;
  margin-bottom: 2%;
}

.header-container h1 {
  font-size: 20px;
  margin-left: 2%;
}

/* 바디 */
.body-container {
  display: flex;
  flex-direction: row;
  width: 100%; /* 전체 너비 사용 */
}

/* 채팅 컨테이너 */
.chat-container {
  margin-left: 3%;
  min-width: 60%;
  min-height: 100px; /* 최소 높이 설정 */
  background-color: var(--backbackground-color);
  border-radius: 4%;
}

/* 채팅 내역 */
.chat-list {
  height: 400px; /* 고정된 높이 설정 */
  width: 100%; /* 전체 너비 사용 */
  border: none; /* 테두리 지우기 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  display: flex;
  flex-direction: column; /* 세로 정렬 */
}

/* 채팅 메시지 스타일 */
.chat-message {
  padding: 10px;
  border-radius: 5px;
  margin: 5px 2%; /* 위아래는 5px, 좌우는 10px 마진 추가 */
  max-width: 50%; /* 최대 너비를 50%로 설정하여 길이 줄이기 */
  align-self: flex-start; /* 기본값은 왼쪽 정렬 */
}

.user-message {
  background-color: white; /* 작성자 채팅 배경 */
  color: black; /* 작성자 채팅 글씨 색상 */
  align-self: flex-end; /* 오른쪽 정렬 */
}

.other-message {
  background-color: green; /* 다른 채팅 배경 */
  color: white; /* 다른 채팅 글씨 색상 */
}

/* 채팅 입력 구역 */
.chat-input-area {
  display: flex;
  flex-direction: row;
  min-height: 170px; /* 최소 높이 설정 */
  width: 70%; /* 전체 너비 사용 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
}

/* 입력 영역 스타일 */
.chat-input-area input {
  min-width: 100px;
  margin-left: 2%;
  margin-right: 2%; /* 버튼과의 간격 */
}

/* 버튼 스타일 */
.chat-input-area button {
  padding: 5px 10px; /* 버튼 내부 여백 추가 */
}

/* 참여 인원 영역 */
.participants-area {
  min-width: 22%;
  margin-left: 5%;
  background-color: white;
  border-radius: 8%;
  padding: 10px; /* 내부 여백 추가 */
}

/* 제목 영역 */
.title-area {
  margin-top: 8%;
  margin-left: 8%;
}

.title-area span {
  margin-left: 7%;
  font-size: 18px;
}

/* 유저 리스트 */
.user-list-container {
  margin-top: 10%;
  margin-left: 5%;
  padding: 0; /* 기본 패딩 제거 */
  list-style-type: none; /* 리스트 스타일 제거 */
}

/* 각 유저 아이템 */
.user-item {
  display: flex;
  justify-content: space-between; /* 아이템 간의 공간 분배 */
  align-items: center; /* 수직 중앙 정렬 */
}

.user-list-container li {
  font-size: 18px;
}

/* 액션 영역 */
.action-area {
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  margin-left: auto; /* 오른쪽 정렬 */
}

.action-area button {
  margin-left: 5%; /* 아이콘과 버튼 사이의 간격 */
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
  padding: 5px 10px; /* 버튼 내부 여백 추가 */
}

/* 경계선 */
.hr {
  border-top: 1px solid gray; /* 경계선 스타일 추가 */
  margin-top: 10px; /* 경계선 위쪽 여백 */
}
</style>