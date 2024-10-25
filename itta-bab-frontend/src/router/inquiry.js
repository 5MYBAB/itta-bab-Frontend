import Inquiry from "@/views/inquiry/Inquiry.vue";
import InquiryList from "@/views/inquiry/InquiryList.vue";
import InquiryAdminResponse from "@/views/inquiry/InquiryAdminResponse.vue";


export default [
    {
        path: '/inquiry',
        component: Inquiry
    },
    {
        path:'/inquiry/admin',
        component: InquiryList
    },
    {
        path: '/inquiry/admin/response',
        component: InquiryAdminResponse
    }

];