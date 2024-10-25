import ScheduleCreate from "@/views/schedule/ScheduleCreate.vue";
import ScheduleUpdate from "@/views/schedule/ScheduleUpdate.vue";

export default [
    {
        path: '/schedule/create',
        component: ScheduleCreate
    },
    {
        path: '/schedule/:id',
        component: ScheduleUpdate
    }
];