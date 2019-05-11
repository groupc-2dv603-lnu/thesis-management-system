export function capitalizeFirstLetter(string) {
    if(string == null)
        return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function uploadFile(file) {
    //TODO unfinished
    console.log("uploading file", file);
}

export function requestSupervisor(supervisor) {
    //TODO unfinished
    console.log("Requesting " + supervisor.name + "(" + supervisor.id + ") as supervisor");
}