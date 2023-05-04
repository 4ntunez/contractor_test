import { reactive } from "vue"

var initialDialog = {
    state: false,
    title: "Add New",
    action: "add",
    button: "Add",
}

export default {
    initialDialog: initialDialog,

    dialog: reactive({
        ...initialDialog,
    })
}