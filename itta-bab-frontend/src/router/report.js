import ReportCreate from "@/views/report/ReportCreate.vue";
import ReportList from "@/views/report/ReportList.vue";


export default [
    {
        path: '/report/create',
        component: ReportCreate
    },
    {
        path: '/report/list',
        component:ReportList
    }
];