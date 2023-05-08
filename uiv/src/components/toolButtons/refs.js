import { ref } from "vue"

export default () => {
    const dialogImport = ref(false)
    const options = ref({
        items: ["Export-PDF", "Print"],
        model: "Export-PDF",
    })

    return {
        dialogImport,
        options
    }
}