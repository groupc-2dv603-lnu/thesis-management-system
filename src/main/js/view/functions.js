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

//to download a submission
//Gets blocked by cors
export function downloadFromAPI(downloadPath) {
    return client({ method: "GET", path: `localhost:8080${downloadPath}` });
  }
  
export function capitalizeFirstLetter(string) {
    if(string == null)
        return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


/**
 * 
 * @param {String} url - Where to send the request 
 * @param {Object} object - Submission object to update -> JSON
 */
export const updateSubmission = async (url, object) =>  {
    const request = await fetch(
      url,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: object
      }
    );
    return request
  
  }
