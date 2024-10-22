import {createRouter, createWebHistory} from "vue-router";

import userRoutes from './user';
import boardRoutes from './board.js';
import groupRoutes from './group.js';
import scheduleRoutes from './schedule.js';
import storeRoutes from './store.js';

import HomeView from "@/views/Home.vue";

const routes = [
    {
        path: '/',
        component: HomeView
    },
    ...userRoutes,
    ...boardRoutes,
    ...groupRoutes,
    ...scheduleRoutes,
    ...storeRoutes,
];

const router = createRouter({
   history: createWebHistory(),
   routes
});

export default router;
