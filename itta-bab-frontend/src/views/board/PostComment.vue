<template>
  <PageTitleTop />
  <div class="post-detail">
    <!-- 게시글 부분 -->
    <div class="post-content-wrapper">
      <div class="post-header">
        <h3>{{ title }}</h3> <!-- postTitle -> title -->
        <button class="like-button" @click="togglePostLike">
          <font-awesome-icon
              :icon="postLiked ? ['fas', 'heart'] : ['far', 'heart']"
              class="heart-icon"
              style="color: #da4d10"
          />
        </button>
      </div>
      <br />
      <p class="post-date">{{ createdAt }}</p> <!-- postDate -> createdAt -->
      <p class="post-content">{{ content }}</p> <!-- postContent -> content -->
    </div>

    <!-- 댓글 부분 -->
    <div class="post-detail">
      <div class="comments-section">
        <div class="comments-header">
          <h5>댓글 {{ comments.length }}</h5>
        </div>
        <hr />

        <!-- 댓글 및 대댓글 표시 -->
        <div v-for="comment in comments" :key="comment.postCommentId" class="comment">
          <div v-if="!comment.parentCommentId" class="comment-container">
            <div class="comment-content">
              <p class="comment-author inline-text">{{ comment.author }}</p>
              <p class="comment-text inline-text">{{ comment.commentContent }}</p>
            </div>
            <div class="comment-actions">
              <button class="reply-button" @click="replyToComment(comment.postCommentId)">대댓글 작성</button>
              <ReportButton  @click="reportComment(comment.postCommentId)"/>
            </div>
          </div>

          <div v-for="reply in comment.replies" :key="reply.postCommentId" class="reply">
            <div class="reply-content">
              <div class="arrow"><font-awesome-icon :icon="['fas', 'arrow-turn-up']" rotation=90 /></div>
              <div style="display: flex;">
                <p class="reply-author"> {{  reply.author }}</p>
                <p class="reply-text"> {{  reply.commentContent }}</p>
              </div>
              <div style="margin-right: 0px"><ReportButton  @click="reportComment(comment.postCommentId)"/></div>
            </div>
          </div>
        </div>

        <!-- New Comment Section -->
        <div class="new-comment">
          <input type="text" placeholder="댓글을 작성하세요." v-model="newCommentText" />
          <button @click="addComment">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageTitleTop from "@/components/common/PageTitleTop.vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from "@/router/index.js";
import axios from 'axios';
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRoute } from "vue-router";
import ReportButton from "@/components/common/ReportButton.vue";

const authStore = useAuthStore();
const route = useRoute();
const postId = route.params.id;

// 게시물 데이터
const title = ref(''); // postTitle -> title
const createdAt = ref(''); // postDate -> createdAt
const content = ref(''); // postContent -> content

const comments = ref([]); // 댓글 목록
const newCommentText = ref(''); // 새 댓글 입력 필드
const postLiked = ref(false); // 좋아요 상태

// 댓글 데이터 가져오기
const fetchComments = async () => {
  try {
    const response = await axios.get(`http://localhost:8003/postComment/${postId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    const commentData = response.data.reduce((acc, comment) => {
      if (!acc.counter) acc.counter = 1; // 전체 카운터 초기화

      const authorName = `익명${acc.counter}`;
      acc.counter += 1;

      if (!comment.parentCommentId) {
        acc.push({ ...comment, author: authorName, replies: [] });
      } else {
        const parentComment = acc.find(c => c.postCommentId === comment.parentCommentId);
        if (parentComment) parentComment.replies.push({ ...comment, author: authorName });
      }
      return acc;
    }, []);

    commentData.forEach(item => delete item.counter);

    comments.value = commentData;
  } catch (error) {
    console.error('댓글 데이터를 불러오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
  }
};

// 게시물 데이터 가져오기
const fetchPostData = async () => {
  try {
    const response = await axios.get(`http://localhost:8003/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    const postData = response.data;
    title.value = postData.title; // postTitle -> title
    createdAt.value = postData.createdAt; // postDate -> createdAt
    content.value = postData.content; // postContent -> content
  } catch (error) {
    console.error('게시물 데이터를 가져오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
  }
};

onMounted(() => {
  fetchComments();
  fetchPostData();
});

// 새 댓글 작성 함수
const addComment = async () => {
  if (newCommentText.value.trim()) {
    try {
      await axios.post(
          "http://localhost:8003/postComment",
          {
            postId: postId,
            commentContent: newCommentText.value,
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
      );

      fetchComments();
      newCommentText.value = '';
    } catch (error) {
      console.error("댓글 추가 중 오류가 발생했습니다:", error.response ? error.response.data : error.message);
    }
  }
};

// 대댓글 추가
const replyToComment = async (parentCommentId) => {
  const replyText = prompt("대댓글을 입력하세요:");
  if (replyText) {
    try {
      const response = await axios.post(`http://localhost:8003/postComment/replies`, {
        postId: postId,
        commentContent: replyText,
        parentCommentId: parentCommentId,
      }, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });

      const parentComment = comments.value.find(c => c.postCommentId === parentCommentId);
      if (parentComment) {
        parentComment.replies.push({ ...response.data });
      }
    } catch (error) {
      console.error('대댓글 추가 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
    }
  }
};

// 좋아요 토글
const togglePostLike = () => {
  postLiked.value = !postLiked.value;
}

// 댓글 신고 함수
const reportComment = (index) => {
  alert(`Report comment ${index}`);
  router.push({
    name: 'ReportCreate',
    query: {
      target: "COMMENT",
      targetId: index,
    },
  });
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

.comment-author,
.reply-author {
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
}

.inline-text {
  display: inline;
  margin-right: 10px;
}

.arrow {
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
  flex: 1;
}

.comment-actions {
  display: flex;
  gap: 10px;
}

/* Replies Section */
.reply {
  margin-left: 20px;
  border-bottom: none; /* 대댓글 사이 회색 선 */
}

.reply-content {
  display: flex;
  gap: 10px;
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

.reply-button,
.report-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--gray-font); /* 버튼 색상 설정 */
}
</style>
