export const UPDATE_REGISTER_USERNAME = "UPDATE_REGISTER_USERNAME"
export const UPDATE_REGISTER_PASSWORD = "UPDATE_REGISTER_PASSWORD"
export const UPDATE_REGISTER_ALERT = "UPDATE_REGISTER_ALERT"
export const UPDATE_LOGIN_USERNAME = "UPDATE_LOGIN_USERNAME"
export const UPDATE_LOGIN_PASSWORD = "UPDATE_LOGIN_PASSWORD"
export const UPDATE_LOGIN_ALERT = "UPDATE_LOGIN_ALERT"
export const UPDATE_SESSION_SESSIONHASH = "UPDATE_SESSION_SESSIONHASH"

export let updateRegisterUsername = (value) => ({type: UPDATE_REGISTER_USERNAME, username: value})
export let updateRegisterPassword = (value) => ({type: UPDATE_REGISTER_PASSWORD, password: value})
export let updateRegisterAlert = (value) => ({type: UPDATE_REGISTER_ALERT, alert: value})
export let updateLoginUsername = (value) => ({type: UPDATE_LOGIN_USERNAME, username: value})
export let updateLoginPassword = (value) => ({type: UPDATE_LOGIN_PASSWORD, password: value})
export let updateLoginAlert = (value) => ({type: UPDATE_LOGIN_ALERT, alert: value})
export let updateSessionSessionhash = (value) => ({type: UPDATE_SESSION_SESSIONHASH, session: value})