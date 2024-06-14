import { ref } from "vue";

export const views = ref([
    { icon: "calendar_view_month", value: "dayGridMonth" },
    { icon: "calendar_view_week", value: "timeGridWeek" },
    { icon: "calendar_view_day", value: "timeGrid" },
    { icon: "view_list", value: "listYear" },
]);