const valid = ({fullname, username, mobile, email, password, cf_password}) => {
    const err = {}

    if(!fullname) {
        err.fullname = "Please add your full name."
    }else if(fullname.length > 25){
        err.fullname = "Full name is up to 25 characters long."
    }

    if(!username) {
        err.username = "Please add your user name."
    }else if(username.replace(/ /g, '').length > 25){
        err.username = "User name is up to 25 characters long."
    }

    if(!mobile) {
        err.mobile = "Please add your phone number."
    }else if(!validPhone(mobile)){
        err.mobile = "Phone number format is incorrect."
    }

    if(!email) {
        err.email = "Please add your email."
    }else if(!validateEmail(email)){
        err.email = "Email format is incorrect."
    }

    if(!password) {
        err.password = "Please add your password."
    }else if(password.length < 6){
        err.password = "Password must be at least 6 characters."
    }

    if(password !== cf_password) {
        err.cf_password = "Confirm password did not match."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

function validPhone(mobile) {
    const re = /^[+]/g;
    return re.test(mobile);
  }

function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const isEmpty = value => {
    if(!value) return true
    return false
}

export const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const isLength = password => {
    if(password.length < 6) return true
    return false
}

export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}

export default valid