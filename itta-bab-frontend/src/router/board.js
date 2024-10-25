import PostDetail from "@/views/board/PostDetail.vue";
import PostCreate from "@/views/board/PostCreate.vue";
import PostComment from "@/views/board/PostComment.vue";
import MenuCategoryList from "@/views/store/MenuCategoryList.vue";
import StoreList from "@/views/store/StoreList.vue";

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
        path: '/board/post/comment',
        component: PostComment
    }, {
        path: "/admin/menuCategory",
        component: MenuCategoryList
    }, {
        path: "/admin/store",
        component: StoreList
    }
];