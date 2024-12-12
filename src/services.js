export function fetchSession() {
    return fetch('/api/v1/session', {
        method: 'GET',
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
}

export function fetchAllowPost() {
    return fetch('/api/v1/post', {
        method: 'GET',
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
}

export function fetchMakePost(userInput) {
    return fetch('/api/v1/post', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(userInput),
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })

}

export function fetchLogin(username) {
    return fetch('/api/v1/session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();;
        })
}

export function fetchRegister(username) {
    return fetch('/api/v1/user', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();;
        })
}

export function fetchLogout() {

    return fetch('/api/v1/session', {
        method: 'DELETE',
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }

            return response.json();
        })
}

export function fetchGetAll() {
    return fetch('/api/v1/manage', {
        method: 'GET',
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }

            return response.json();
        })
}

export function fetchResetEditorPick(newPicks) {
    return fetch('/api/v1/manage', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newPicks),
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }

            return response.json();
        })
}

export function fetchCategory() {
    return fetch('/api/v1/category', {
        method: 'GET',
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
}

export function fetchGallery(filterList) {
    return fetch('/api/v1/gallery', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ filterList }),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        });
}

export function fetchArtworkIntro(id) {
    return fetch(`/api/v1/artwork/${id}`, {
        method: 'GET',
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
}
export function fetchArtworkLikes(id) {
    return fetch(`/api/v1/artwork/${id}/like`, {
        method: 'POST',
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
}


export function fetchNewestData() {
    return fetch('/api/v1/new-artworks', {
        method: 'GET',
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
}

export function fetchEditorPicks() {
    return fetch('/api/v1/editor-picks', {
        method: 'GET',
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
}

export function fetchBanner() {
    return fetch('/api/v1/banner', {
        method: 'GET',
    }).catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
}
