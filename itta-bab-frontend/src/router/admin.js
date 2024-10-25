import bootcampForm from "@/components/admin/BootcampForm.vue";
    import adminTap from "@/views/AdminTap.vue";

export default [
    {
        path: '/bootcamp/register',
        component: bootcampForm,
    },
    {
        path: '/admin',
        component: adminTap
    }
];
