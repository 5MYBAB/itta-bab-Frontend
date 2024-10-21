<template>
  <header class='chat_wrap'>
    <div class="header">
      <img src="http://www.tcpschool.com/sample.jpg" alt="Logo" />
      <h1>한화시스템 부트캠프</h1>
    </div>
  </header>
  <main class="main">
    <!-- 채팅 화면 -->
    <div class="chat-container">
      <div class="chat_wrap">
        <div class="chat" ref="chat">
          <ul>
            <li v-for="(message, index) in messages" :key="index"
                :class="{'left': message.sender !== 'You', 'right': message.sender === 'You'}">
              <div class="sender" v-if="message.sender !== 'You'">
                <span>{{ message.sender }}</span>
              </div>
              <div class="message" :class="{'my-message': message.sender === 'You', 'other-message': message.sender !== 'You'}">
                <span>{{ message.text }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="input-div">
          <textarea v-model="newMessage" placeholder="여기에 내용을 입력하세요."
                    @keypress.enter.prevent="sendMessage"></textarea>
        </div>
      </div>
      <!-- 참여자 리스트 -->
      <div class="member-list">
        <div>채팅방 리스트</div>
        <hr />
        <ul>
          <li class="member-item" v-for="(member, index) in members" :key="index">
            <span>{{ member.name }}</span>
            <button @click="removeMember(member)">내보내기</button>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        { sender: "나", text: "맛있는 거 많이 먹읍시다!!" },
        { sender: "설빈", text: "맛있는 거 많이 먹읍시다!!" }
      ],
      newMessage: '',
      members: [
        { name: '설빈1' },
        { name: '설빈2' },
        { name: '설빈3' },
        { name: '설빈4' }
      ]
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({sender: 'You', text: this.newMessage});
        this.newMessage = ''; // 입력 필드 초기화
        this.$nextTick(() => {
          const chat = this.$refs.chat;
          chat.scrollTop = chat.scrollHeight; // 스크롤을 가장 아래로 이동
        });
      }
    },
    removeMember(member) {
      this.members = this.members.filter(m => m !== member);
    }
  }
};
</script>

<style scoped>
/* 기본 스타일 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: rgba(252, 244, 202, 0.5); /* 전체 배경 색상 및 투명도 50% */
}

.chat_wrap .header {
  display: flex; /* Flexbox를 사용하여 가로 배치 */
  align-items: center; /* 수직 중앙 정렬 */
  font-size: 14px;
  padding: 15px 0;
  background: rgba(252, 244, 202, 0.5);
  color: black;
}

.chat_wrap .header img {
  width: 50px; /* 이미지 크기 조정 */
  height: auto; /* 비율 유지 */
  margin-right: 10px; /* 이미지와 텍스트 간 간격 */
}

/* 메인 레이아웃 */
.main {
  display: flex; /* Flexbox를 사용하여 가로 배치 */
  height: 100vh;
}

/* 채팅 컨테이너 */
.chat-container {
  display: flex; /* 내부 요소도 Flexbox로 가로 배치 */
  width: 100%;
}

.chat_wrap {
  flex: 1; /* 채팅 영역이 남은 공간을 차지하도록 설정 */
  padding-right: 10px; /* 간격을 주기 위한 패딩 */
  background-color: rgba(255, 255, 255, 0.8); /* 채팅창 배경 투명도 설정 */
}

/* 채팅 영역 */
.chat_wrap .chat {
  padding-bottom: 80px;
  max-height: 70vh; /* 최대 높이 설정 */
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
}

.chat_wrap .chat ul {
  width: 100%;
  list-style: none;
}

/* 채팅 메시지 정렬 */
.chat_wrap .chat ul li.left .message {
  background-color: #D8F5A2; /* 상대방 메시지 배경 색상 */
  text-align: left;
}

.chat_wrap .chat ul li.right .message {
  background-color: #BEE3F8; /* 자신의 메시지 배경 색상 */
  text-align: right;
}

/* 채팅 메시지 박스 스타일 */
.chat_wrap .chat ul li > div {
  font-size: 13px;
}

.chat_wrap .chat ul li > div.sender {
  margin: 10px 20px 0 20px;
  font-weight: bold;
}

.chat_wrap .chat ul li .message {
  display: inline-block;
  word-break: break-all;
  margin: 5px 20px;
  max-width: 75%;
  border: 1px solid #888;
  padding: 10px;
  border-radius: 5px;
}

/* 입력창 스타일 */
.chat_wrap .input-div {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #FFF;
  text-align: center;
  border-top: 1px solid rgba(252, 244, 202);
}

.chat_wrap .input-div > textarea {
  width: 100%;
  height: 80px;
  border: none;
  padding: 10px;
  font-size: 16px;
  outline: none;
  resize: none; /* 텍스트 에리어 크기 조절 비활성화 */
}

/* 참여자 리스트 스타일 */
.member-list {
  width: 200px; /* 맴버 리스트의 고정 너비 설정 */
  padding-left: 10px; /* 간격을 주기 위한 패딩 */
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.9); /* 약간 투명한 배경 */
}

.member-item {
  display: flex; /* Flexbox를 사용하여 가로 배치 */
  justify-content: space-between; /* 아이템 사이의 간격을 최대로 설정 */
  align-items: center; /* 수직 중앙 정렬 */
  margin: 5px 0; /* 아이템 간 간격 조정 */
}

.member-item button {
  background-color: #FFDD57; /* 버튼 색상 */
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}

.format {
  display: none;
}
</style>
