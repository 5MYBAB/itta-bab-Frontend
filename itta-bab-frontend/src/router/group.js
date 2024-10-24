import GroupChat from "@/views/group/GroupChat.vue";
import GroupDetail from "@/views/group/GroupDetail.vue";
import GroupList from "@/views/group/GroupList.vue";
import GroupRegister from "@/views/group/GroupRegister.vue";
import GroupCategoryList from "@/views/group/GroupCategoryList.vue";

export default [
    {
        // 모임 리스트
        path: '/group',
        component: GroupList
    },
    {
        // 모임 채팅방
        path: '/group/:id/chat',
        component: GroupChat
    },
    {
        // 모임 정보
        path: '/group/:id',
        component: GroupDetail
    },
    {
        // 모임 등록
        path: '/group/register',
        component: GroupRegister
    },
    {
        // 모임 카테고리 목록
        path: '/admin/groupCategory',
        component: GroupCategoryList
    }
];
