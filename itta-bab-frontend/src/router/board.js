import PostDetail from "@/views/board/PostDetail.vue";
import PostCreate from "@/views/board/PostCreate.vue";
import PostComment from "@/views/board/PostComment.vue";

export default [
    {
        path: '/board/post',
        component: PostDetail
    },
    {
        path: '/board/post/create',
        component: PostCreate
    },
    {
        path:'/board/post/comment',
        component: PostComment
    }
];