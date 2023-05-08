import { computed } from "vue"

export default (table) => {
    const duplicates = computed(() => {
        const field = "Contact Name";
        const newArray = table.items.map((m) => [m[field], m]);
        const newMap = new Map(newArray);
        const iterator = newMap.values();
        const unique = [...iterator];
        return `${table.items.length - unique.length}`;
    });

    return {
        duplicates
    }
}