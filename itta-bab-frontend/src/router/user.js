import SignUpView from "@/views/user/SignUp.vue";
import LoginView from "@/views/user/Login.vue";
import MyPageView from "@/views/user/MyPage.vue";
import UpdateUserInfo from "@/views/user/UpdateUserInfo.vue";
import DeleteUser from "@/views/user/DeleteUser.vue";
import DeleteUserResult from "@/views/user/DeleteUserResult.vue";
import FindId from "@/views/user/FindId.vue";

export default [
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/signup',
        component: SignUpView
    },
    {
        path: '/findId',
        component: FindId
    },
    {
        path: '/mypage',
        component: MyPageView
    },
    {
        path: '/update-user',
        component: UpdateUserInfo
    },
    {
        path: '/delete-user',
        component: DeleteUser
    },
    {
        path: '/delete-user-result',
        name: 'DeleteUserResult',
        component: DeleteUserResult
    }
];