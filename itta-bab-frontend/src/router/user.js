import SignUpView from "@/views/user/SignUp.vue";
import LoginView from "@/views/user/Login.vue";
import MyPageView from "@/views/user/MyPage.vue";

export default [
    {
        path: '/user/login',
        component: LoginView
    },
    {
        path: '/user/signup',
        component: SignUpView
    },
    {
        path: '/mypage',
        component: MyPageView
    }
];