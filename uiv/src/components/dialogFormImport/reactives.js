import { reactive } from "vue"

export default () => {
    const table = reactive({
        headers: [
            { title: "Contact Name", key: "Contact Name" },
            { title: "Company Name", key: "Company Name" },
            { title: "Country", key: "Country" },
            { title: "Priority", key: "Priority" },
            { title: "Email", key: "Email" },
            { title: "Phone Number", key: "Phone Number" },
        ],
        items: [],
    })

    return {
        table
    }
}