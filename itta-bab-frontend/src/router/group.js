import GroupChat from "@/views/group/GroupChat.vue";
import GroupDetail from "@/views/group/GroupDetail.vue";
import GroupList from "@/views/group/GroupList.vue";
import GroupRegister from "@/views/group/GroupRegister.vue";
import GroupCategoryList from "@/views/group/GroupCategoryList.vue";
import GroupCategoryRegister from "@/views/group/GroupCategoryRegister.vue";

export default [
    {
        // 모임 목록
        path: '/group',
        component: GroupList,
        children: [
            {
                // 모임 등록
                path: "/register",
                component: GroupRegister
            }
        ]
    },
    {
        // 모임 채팅방
        path: '/group/chat/:id',
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
    },
    {
        // 모임 카테고리 등록
        path: "/admin/groupCategory/register",
        component: GroupCategoryRegister
    }
];
