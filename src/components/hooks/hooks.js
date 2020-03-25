const useFetch = endpoint => {
    const defaultHeader = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };

    const customFetch = (
        url,
        method = "GET",
        body = false,
        mode: "no-cors",
        headers = defaultHeader
    ) => {
        const options = {
            method,
            mode,
            headers
        };
        if (body) options.body = JSON.stringify(body);
        return fetch(url, options)
            .then(response => response.json())
            .catch(err => {
                throw new Error(err);
            });
    };

    const get = id => {
        const url = `${endpoint}${id ? `/${id}` : ''}`;
        return customFetch(url);
    };

    const post = (body = false) => {
        if (!body) throw new Error('to add a new task you must provide a body of new task');
        return customFetch(endpoint, 'POST', body);
    };

    const put = (id = false, body = false) => {
        if (!id || !body)
            throw new Error('to mark the task as done you must provide the id and the body of task');
        const url = `${endpoint}/${id}`;
        return customFetch(url, 'PUT', body);
    };

    const del = (id = false) => {
        if (!id)
            throw new Error('to delete task you must provide the id and the body of task');
        const url = `${endpoint}/${id}`;
        return customFetch(url, 'DELETE');
    };

    return {
        get,
        post,
        put,
        del
    };
};

export default useFetch;