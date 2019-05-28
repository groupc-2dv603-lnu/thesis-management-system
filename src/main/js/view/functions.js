const client = require("../client");

export function getFromAPI(getPath) {
    return client({ method: "GET", path: getPath });
}

export function putToAPI(putPath) {
    client({ method: "PUT", path: putPath });
}

export function postToAPI(postPath) {
    client({ method: "PUT", path: postPath });
}

export function deleteToAPI(delPath) {
    client({ method: "DELETE", path: delPath });
}

export function capitalizeFirstLetter(string) {
    if(string == null)
        return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}