import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/Home.vue";
import LoginView from "@/views/user/Login.vue";
import SignUpView from "@/views/user/SignUp.vue";

const router = createRouter({
   history: createWebHistory(),
   routes : [
       {
           path : '/',
           component: HomeView
       },
       {
           path : '/login',
           component: LoginView
       },
       {
           path : '/signup',
           component: SignUpView
       }
   ]
});

export default router;
