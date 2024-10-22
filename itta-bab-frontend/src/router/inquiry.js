import Inquiry from "@/views/inquiry/Inquiry.vue";
import InquiryList from "@/views/inquiry/InquiryList.vue";



export default [
    {
        path: '/inquiry',
        component: Inquiry
    },
    {
        path:'/inquiry/list',
        component: InquiryList
    }

];