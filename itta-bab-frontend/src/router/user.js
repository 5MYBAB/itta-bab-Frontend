import SignUpView from "@/views/user/SignUp.vue";
import LoginView from "@/views/user/Login.vue";

export default [
    {
        path: '/user/login',
        component: LoginView
    },
    {
        path: '/user/signup',
        component: SignUpView
    },
];