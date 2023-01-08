import { get } from "./api"

export function apiGetCategories() {
    return get("/categories")
}
