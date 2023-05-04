import { ref } from "vue"

export default {
    drawer: ref(true),
    selected: ref([]),
    priority: ref([]),
    table: ref({
        headers: [
            { title: "Name", key: "name" },
            { title: "Company Name", key: "company" },
            { title: "Country", key: "country" },
            { title: "Priority", key: "priority" },
            { title: "Email", key: "email" },
            { title: "Phone Number", key: "phone_number" },
        ],
        items: [],
    })
}