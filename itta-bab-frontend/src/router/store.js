import StoreCreate from "@/views/store/StoreCreate.vue";
import StoreUpdate from "@/views/store/StoreUpdate.vue";
import StoreMain from "@/views/store/StoreMain.vue";
import StoreDetail from "@/views/store/StoreDetail.vue";
import MenuCreate from "@/views/store/MenuCreate.vue";
import MenuMain from "@/views/store/MenuMain.vue";
import MenuUpdate from "@/views/store/MenuUpdate.vue";
import ReviewMain from "@/views/store/ReviewMain.vue";
import AdminStoreDetail from "@/views/store/AdminStoreDetail.vue";
import ReviewCreate from "@/views/store/ReviewCreate.vue";

export default [
    {
        path: '/store',
        name: 'StoreMain',
        component: StoreMain
    },
    {
        path: '/store/detail/:storeId',
        name: 'StoreDetail',
        component: StoreDetail
    },
    {
        path: '/store/regist',
        component: StoreCreate
    },
    {
        path: '/store/update/:storeId',
        name: 'StoreUpdate',
        component: StoreUpdate
    },
    {
        path: '/store/menu/:storeId/:storeName',
        name : 'MenuMain',
        component: MenuMain
    },
    {
        path: '/store/menu/:storeId/regist',
        name: 'MenuCreate',
        component: MenuCreate
    },
    {

        path: '/store/menu/update/:storeId/:menuId',
        name: 'MenuUpdate',
        component: MenuUpdate,

    },
    {
        path: `/store/review/:storeId/:storeName`,
        name: 'ReviewMain',
        component: ReviewMain

    },
    {
        path: `/store/review/:storeId`,
        name: 'ReviewCreate',
        component: ReviewCreate

    },
    {
        path: "/admin/store/:id",
        component: AdminStoreDetail

    },




];