
import axios from 'axios';

export const fetchApi = async (url, method = 'get', body, headers, responseType) => {
    let token = localStorage.getItem("token");

    try {
        let opts = {
            method,
            url: `${url}`,
            timeout: 1 * 1000 * 60,//1phut     
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
        if (headers) {
            opts = {
                ...opts,
                headers: {
                    ...headers,
                    [headers.key]: headers.value,
                }
            }
        }
        if (method === 'get') {
            opts.params = body;
        } else {
            opts.data = body;
        }
        if (responseType) {
            opts.responseType = responseType;
        }
        let fetchdata = await axios(opts);
        if (fetchdata.data.code !== 200) {
            return fetchdata.data;
        }
        if (fetchdata.data.code === 401) {
            window.location = '/login'
        }
        return fetchdata.data;
    } catch (error) {
        console.log('error124', error)
        let { response } = error;
        if (response) {
            return response.data;
        }
        return error;
    }
};