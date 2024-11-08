/* eslint-disable no-useless-escape */
const checkValidateEmail = (email) => {
    const reg =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return reg.test(email)
}

export const checkValidateName = (name) => {
    const reg = /^[a-zA-Z0-9\s]+$/

    return reg.test(name)
}

export default checkValidateEmail