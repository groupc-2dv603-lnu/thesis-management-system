'use strict'

export function fieldsHaveInput(name, password, confirmPassword, email, roles){
    if (name === "" || password === "" || confirmPassword === "" || email === "" || roles.length === 0){return false}
    if (password !== confirmPassword) {
        alert("Passwords dont match");
        return false;
    }
    return true;
}

export function passwordsMatch(password, confirmPassword) {
    return (password !== confirmPassword);
}