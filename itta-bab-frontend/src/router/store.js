import StoreCreate from "@/views/store/StoreCreate.vue";
import StoreUpdate from "@/views/store/StoreUpdate.vue";
import StoreMain from "@/views/store/StoreMain.vue";
import StoreDetail from "@/views/store/StoreDetail.vue";
import MenuCreate from "@/views/store/MenuCreate.vue";
import MenuMain from "@/views/store/MenuMain.vue";
import MenuUpdate from "@/views/store/MenuUpdate.vue";
import ReviewMain from "@/views/store/ReviewMain.vue";

export default [
    {
        path: '/store',
        component: StoreMain
    },
    {
        path: '/store/detail',
        component: StoreDetail
    },
    {
        path: '/store/regist',
        component: StoreCreate
    },
    {
        path: '/store/:id/update',
        component: StoreUpdate
    },
    {
        path: '/store/:storeId/menu',
        name : 'MenuMain',
        component: MenuMain
    },
    {
        path: '/store/menu/:storeId/regist',
        name: 'MenuCreate',
        component: MenuCreate
    },
    {
        path: '/store/menu/:id/update',
        name: 'MenuUpdate',
        component: MenuUpdate,
    },
    {
        path: '/store/review',
        component: ReviewMain
    }



];