import ReportCreate from "@/views/report/ReportCreate.vue";
import ReportList from "@/components/admin/ReportList.vue";


export default [
    {
        path: '/report/user',
        name: 'ReportCreate',
        component: ReportCreate
    },
    {
        path: '/report/list',
        component:ReportList
    }
];