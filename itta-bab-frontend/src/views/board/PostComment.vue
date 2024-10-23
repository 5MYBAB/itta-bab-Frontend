<template>
  <PageTitleTop/>
  <div class="post-detail">
    <!-- 게시글 부분 -->
    <div class="post-content-wrapper">
      <div class="post-header">
        <h1>{{ postTitle }}</h1>
        <button class="like-button" @click="togglePostLike">
          <font-awesome-icon
              :icon="postLiked ? ['fas', 'heart'] : ['far', 'heart']"
              class="heart-icon"
              style="color: #da4d10"
          />
        </button>
      </div>
      <br>
      <p class="post-date">{{ postDate }}</p>
      <p class="post-content">{{ postContent }}</p>
    </div>

    <!-- 댓글부분 -->
    <div class="comments-section">
      <div class="comments-header">
        <h5>댓글 {{ comments.length }}</h5>
      </div>
      <hr />
      <div v-for="(comment, index) in comments" :key="index" class="comment">
        <div class = "comment-container">
          <div class="comment-content">
            <p class="comment-author inline-text " >{{ comment.author }}</p>
            <p class="comment-text inline-text">{{ comment.text }}</p>
          </div>
          <div class="comment-actions">
            <button class="reply-button" @click="replyToComment(index)">대댓글 작성</button>
            <button class="report-button" @click="reportComment(index)">신고</button>
            <button class="like-button" @click="toggleLike(index)">
              <font-awesome-icon
                  :icon="comment.liked ? ['fas', 'heart'] : ['far', 'heart']"
                  class="heart-icon"
                  style="color: #da4d10"
              />
            </button>
          </div>
        </div>


        <!-- 대댓글 부분 -->
        <div v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" class="reply">
          <div class="reply-content">
            <div class="arrow"><font-awesome-icon :icon="['fas', 'arrow-turn-up']" rotation=90 /></div>
            <p class="reply-author">{{ reply.author }}</p>
            <p class="reply-text">{{ reply.text }}</p>
          </div>
        </div>
      </div>

      <!-- New Comment Section -->
      <div class="new-comment">
        <input type="text"
               placeholder="댓글을 작성하세요."
               v-model="newCommentText"
               @keydown.enter.prevent="addComment" />
        <button @click="addComment">등록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Post Data
const postTitle = '맘에 드는 사람이 있어요';
const postDate = '2024-10-22 10:30:56';
const postContent = `수업을 같이 듣는 짝궁이 마음에 들어요.
주말마다 분가가서 집안일 돕는 심성이 곱고 착한 사람이에요.
그의 애틋한 표정을 담뿍 담은 모습을 보면 가슴이 설레서 미치겠어요.
매번 담배 피러 간다고 잠시하는 모습을까지 숨이 막히는 매력쟁이에요.`;

// Like functionality

const postLiked = ref(false); // 게시물의 좋아요 상태

function toggleLike(index) {
  if (index >= 0 && index < comments.value.length) {
    comments.value[index].liked = !comments.value[index].liked;
  } else {
    console.error(`Invalid index: ${index}`);
  }
}
function togglePostLike() {
  postLiked.value = !postLiked.value;
}




// Comments Data
const comments = ref([
  {author: '익명1', text: '나 이 사람 누군지 알듯 ㄷㄷ', liked: false, replies: []},
  {author: '익명2', text: 'ㄹㅇㅋㅋ', liked: false, replies: []},
  {author: '익명3', text: '이제 누가 공지해주나', liked: false, replies: []},
  {author: '익명4', text: '꿀잼', liked: false, replies: []}

]);

// New Comment Logic
const newCommentText = ref('');

function addComment() {
  if (newCommentText.value.trim()) {
    comments.value.push({author: '익', text: newCommentText.value, liked: false, replies: []});
    newCommentText.value = '';
  }
}

function replyToComment(index) {
  const replyText = prompt("대댓글을 입력하세요:");
  if (replyText) {
    comments.value[index].replies.push({author: '익', text: replyText});
  }
}

function reportComment(index) {
  alert(`Report comment #${index + 1}`);
}

function likeComment(index) {
  comments.value[index].liked = !comments.value[index].liked;
}


</script>

<style scoped>
/* Post Container */
.post-detail {
  background-color: var(--background-color);
  padding: 20px;
  border-radius: 10px;
}

/* Post Content Wrapper */
.post-content-wrapper {
  background-color: var(--white);
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
}
.comment-author,.reply-author {
  font-weight: bold; /* 글꼴 굵기 설정 */
}
/* Post Header */
.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post-header h1 {
  font-size: 1.5em;
}

.like-button {
  background: none;
  border: none;
  cursor: pointer;
}
.comment-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  /*border-bottom: 1px solid var(--unactive-button)*/; /* 회색 줄 보다는 흰색 추가 */
}
.inline-text {
  display: inline;
  margin-right: 10px;
}
.arrow{
  margin-bottom: 15px;
}


/* Post Content */
.post-date {
  color: var(--unactive-button);
}

.post-content {
  margin: 20px 0;
}

/* Comments Section */
.comments-section {
  background: var(--white);
  padding: 20px;
  border-radius: 20px;
}

.comments-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comment {
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: none; /* 댓글 사이 회색 선 */
}

.comment-content {
  flex:1;
}

.comment-actions {
  display: flex;
  gap: 10px;
}

/* Replies Section */
.reply {
  margin-left: 20px;
  border-bottom: none /* 대댓글 사이 회색 선 */
}

.reply-content {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* New Comment */
.new-comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.new-comment input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.new-comment input::placeholder {
  color: var(--gray-font);
}

.new-comment button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: var(--basic-yellow);
  border: none;
  cursor: pointer;
}

.new-comment button:hover {
  background-color: var(--basic-yellow);
}
.reply-button, .report-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--gray-font); /* 버튼 색상 설정 */
}
</style>


정렬하는거 게시판에서 검색 -라우터 가서 모임 리스트 검색 후 동일하게 적용
페이지 연동하기
스프링 시큐리티 공부
api 연동 해서 실제 백 정보 불러오는지 확인- 일단 전역적으로 처리해서 되는지 확인
