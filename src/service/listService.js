import { list_url } from '../config';

export const fetchList = async () => {
    return fetch(list_url).then(res => res.json()).then(res => res);
}