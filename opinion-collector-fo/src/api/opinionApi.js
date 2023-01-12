import {get, post, postMultipart, put} from './api';

export function apiGetOpinions() {
    return get('/opinions')
}

export function getOpinionsById(id) {
    return get(`/opinions/${id}`)
}

export function postOpinion(body) {
    return post('/opinions',body)
}

export function putOpinion() {
    return put('/opinions')
}

export function putOpinionHidden(id) {
    return put(`/opinions/${id}`)
}

export function deleteOpinion(id) {
    return delete(`/opinions/${id}`)
}

export function getOpinionsForClient(username) {
    return get(`/opinions/client/${username}`)
}
