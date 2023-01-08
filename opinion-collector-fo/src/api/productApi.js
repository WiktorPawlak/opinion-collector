import { get } from "./api"

export function getProducts() {
    return get('/products')
}
