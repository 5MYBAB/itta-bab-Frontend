import PostDetail from "@/views/board/PostDetail.vue";
import PostWrite from "@/views/board/PostWrite.vue";

export default [
    {
        path: '/board/post',
        component: PostDetail
    },
    {
        path: '/board/postwrite',
        component: PostWrite
    }
];