import { ref } from "vue"

export default () => {
    const snackbar = ref(false)
    const snackMessage = ref("")
    const drawer = ref(true)
    const selected = ref([])
    const priority = ref([])
    const table = ref({
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

    return {
        snackbar,
        snackMessage,
        drawer,
        selected,
        priority,
        table
    }
}