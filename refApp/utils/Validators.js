const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{6,}$/;
const phoneNoRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const nameRegex = /^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/;
const pincodeRegex = /^[1-9][0-9]{5}$/;

export const isEmailValid = (email) =>{
    return regex.test(email)
}

export const isNameValid = (name) =>{
    return nameRegex.test(name)
}

export const isPasswordValid = (password) =>{
    return passwordRegex.test(password)
}

export const isPhoneNoValid = (phone) =>{
    return phoneNoRegex.test(phone)
}

export const isPincodeValid = (pin) =>{
    return pincodeRegex.test(pin)
}