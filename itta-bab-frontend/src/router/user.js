import SignUpView from "@/views/user/SignUp.vue";
import LoginView from "@/views/user/Login.vue";
import MyPageView from "@/views/user/MyPage.vue";
import UpdateUserInfo from "@/views/user/UpdateUserInfo.vue";
import DeleteUser from "@/views/user/DeleteUser.vue";
import DeleteUserResult from "@/views/user/DeleteUserResult.vue";
import FindId from "@/views/user/FindId.vue";
import FindPassword from "@/views/user/FindPassword.vue";
import SignUpResult from "@/views/user/SignUpResult.vue";
import FindIdResult from "@/views/user/FindIdResult.vue";
import FindPwdResult from "@/views/user/FindPwdResult.vue";

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
        path: '/signup/result',
        component: SignUpResult
    },
    {
        path: '/find-id',
        component: FindId
    },
    {
        path: '/find-id/result',
        component: FindIdResult
    },
    {
        path: '/find-pwd',
        component: FindPassword
    },
    {
        path: '/find-pwd/result',
        component: FindPwdResult
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
        component: DeleteUserResult
    }
];