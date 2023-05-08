import { ref } from "vue"

export default () => {
    const files = ref(null)
    const selected =  ref([])

    return {
        files,
        selected
    }
}