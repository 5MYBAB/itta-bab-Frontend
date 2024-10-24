import StoreCreate from "@/views/store/StoreCreate.vue";
import StoreUpdate from "@/views/store/StoreUpdate.vue";
import StoreMain from "@/views/store/StoreMain.vue";
import StoreDetail from "@/views/store/StoreDetail.vue";
import MenuCreate from "@/views/store/MenuCreate.vue";
import MenuMain from "@/views/store/MenuMain.vue";
import MenuUpdate from "@/views/store/MenuUpdate.vue";
import AdminStoreDetail from "@/views/store/AdminStoreDetail.vue";

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
        path: '/store/update',
        component: StoreUpdate
    },
    {
        path: '/store/menu/main',
        component: MenuMain
    },
    {
        path: '/store/menu/regist',
        component: MenuCreate
    },
    {
        path: '/store/menu/update',
        component: MenuUpdate
    }, {
        path: "/admin/store/:id",
        component: AdminStoreDetail
    }



];