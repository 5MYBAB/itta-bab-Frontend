import PostDetail from "@/views/board/PostDetail.vue";
import PostCreate from "@/views/board/PostCreate.vue";

export default [
    {
        path: '/board/post',
        component: PostDetail
    },
    {
        path: '/board/post/create',
        component: PostCreate
    }
];