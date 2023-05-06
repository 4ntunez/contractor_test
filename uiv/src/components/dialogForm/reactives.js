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

    bindProps: {
        mode: "international",
        defaultCountry: null,
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "Phone number",
        required: false,
        enabledCountryCode: false,
        enabledFlags: true,
        preferredCountries: [],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: "off",
        name: "telephone",
        maxLen: 25,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
            disabledDialCode: false
        },
        inputOptions: {
            showDialCode: false
        }
    }
}