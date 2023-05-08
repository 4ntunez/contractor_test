import { reactive } from "vue"

export default () => {
    const initialDialog = {
        state: false,
        title: "Add New",
        action: "add",
        button: "Add",
    }

    const dialog = reactive({
        ...initialDialog,
    })

    return {
        initialDialog,
        dialog
    }
}