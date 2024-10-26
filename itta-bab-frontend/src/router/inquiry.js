import Inquiry from "@/views/inquiry/Inquiry.vue";
import InquiryList from "@/components/admin/InquiryList.vue";
import InquiryAdminResponse from "@/components/admin/InquiryAdminResponse.vue";

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
        path: '/inquiry/admin/:id',
        component: InquiryAdminResponse
    }
];