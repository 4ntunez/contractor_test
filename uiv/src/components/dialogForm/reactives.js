import { reactive } from "vue"

var initialState = {
    name: "",
    company: "",
    country: "",
    priority: "",
    email: "",
    phone_number: "",
}

export default {
    initialState: initialState,

    state: reactive({
        ...initialState,
    }),
}