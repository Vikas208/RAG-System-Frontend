export const createSessionAPI = ()=> 
    fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_SUBPATH}/v1/auth/create-session/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())