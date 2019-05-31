const client = require("../client");

export function getFromAPI(getPath) {
    // return fetch(getPath, {
    //     method: "GET",
    //     mode: 'CORS',
    //     // headers: {
    //     //     'Accept': 'application/json',
    //     //     'Content-Type': 'application/json'
    //     // }
    // });

    return client({ 
        method: "GET", 
        path: getPath,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export function putToAPI2(putPath, data) {
    return client({ 
        method: "PUT", 
        path: putPath,
        entity: data,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}
export function putToAPI(putPath, data) {
    return client({ 
        method: "PUT", 
        path: putPath,
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

export function postToAPI(postPath, object) {
    return client({ 
        method: "POST",
        path: postPath,
        entity: object,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function deleteFromAPI(delPath) {
    return client({ method: "DELETE", path: delPath });
}
  
export function capitalizeFirstLetter(string) {
    if(string == null)
        return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

