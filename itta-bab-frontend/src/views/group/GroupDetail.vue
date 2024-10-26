<template>
  <PageTitleTop />
  <div class="post-detail">
    <!-- 게시글 부분 -->
    <div class="post-content-wrapper">
      <div class="post-header">
        <h3>{{ groupTitle }}</h3>
        <button class="like-button" @click="togglePostLike">
          <font-awesome-icon
              :icon="postLiked ? ['fas', 'heart'] : ['far', 'heart']"
              class="heart-icon"
              style="color: #da4d10"
          />
        </button>
      </div>
      <br />
      <p class="post-date">{{ createDate }}</p>
      <p class="post-content">{{ groupPost }}</p>
    </div>

    <!-- 신청 버튼 추가 -->
    <div class="action-section">
      <button class="apply-button" @click="applyForGroup">신청</button>
    </div>

    <!-- 댓글 부분 -->
    <div class="post-detail">
      <div class="comments-section">
        <div class="comments-header">
          <h5>댓글 {{ comments.length }}</h5>
        </div>
        <hr />

        <!-- 댓글 표시 -->
        <div v-for="comment in comments" :key="comment.groupCommentId" class="comment">
          <div class="comment-container">
            <div class="comment-content">
              <p class="comment-author inline-text">{{ comment.author }}</p>
              <p class="comment-text inline-text">{{ comment.commentContent }}</p>
            </div>
            <div class="comment-actions">
              <ReportButton @click="reportComment(comment.groupCommentId)" />
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "@/router/index.js";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRoute } from "vue-router";
import ReportButton from "@/components/common/ReportButton.vue";

const authStore = useAuthStore();
const route = useRoute();
const groupId = route.params.id;

// 게시물 데이터
const groupTitle = ref("");
const createDate = ref("");
const groupPost = ref("");
const postLiked = ref(false); // 좋아요 상태

// 댓글 데이터
const comments = ref([]);
const newCommentText = ref("");

// 댓글 데이터 가져오기
const fetchComments = async () => {
  try {
    const response = await axios.get(`http://localhost:8003/groupComment/${groupId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    const commentData = response.data.map(comment => ({
      ...comment,
      author: `사용자${comment.userId}` // 사용자 ID를 기반으로 익명 이름 설정
    }));

    comments.value = commentData;
  } catch (error) {
    console.error('댓글 데이터를 불러오는 중 오류가 발생했습니다:', error.response ? error.response.data : error.message);
  }
};

// 게시물 데이터 가져오기
const fetchPostData = async () => {
  try {
    const response = await axios.get(`http://localhost:8003/group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    const postData = response.data;
    groupTitle.value = postData.groupTitle;
    createDate.value = postData.createDate;
    groupPost.value = postData.groupPost;
  } catch (error) {
    console.error("게시물 데이터를 가져오는 중 오류가 발생했습니다:", error.response ? error.response.data : error.message);
  }
};

// 모임 신청 API 호출 함수
const applyForGroup = async () => {
  try {
    const response = await axios.post(`http://localhost:8003/group/detail/${groupId}`, {}, {
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
      },
    });

    if (response.status === 200) {
      alert("모임에 성공적으로 신청되었습니다.");
    } else {
      alert("이미 신청한 모임입니다.");
    }
  } catch (error) {
    console.error("모임 신청 중 오류가 발생했습니다:", error.response ? error.response.data : error.message);
    alert("모임 신청에 실패했습니다.");
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
          `http://localhost:8003/groupComment`,
          {
            groupId: groupId,
            commentContent: newCommentText.value,
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
      );

      fetchComments();
      newCommentText.value = "";
    } catch (error) {
      console.error("댓글 추가 중 오류가 발생했습니다:", error.response ? error.response.data : error.message);
    }
  }
};

// 좋아요 토글
const togglePostLike = () => {
  postLiked.value = !postLiked.value;
};

// 댓글 신고 함수
const reportComment = (index) => {
  alert(`Report comment ${index}`);
  router.push({
    name: "ReportCreate",
    query: {
      target: "COMMENT",
      targetId: index,
    },
  });
};
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

.post-header h3 {
  font-size: 1.5em;
}

.like-button {
  background: none;
  border: none;
  cursor: pointer;
}

/* 신청 버튼 스타일 */
.apply-button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: var(--basic-yellow);
  border: none;
  cursor: pointer;
  margin-top: 20px;
}

.apply-button:hover {
  background-color: #e0a800; /* 버튼 호버 시 색상 변경 */
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
