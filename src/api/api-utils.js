
export const BASE_URL = process.env.API_CONN;
// export const BASE_URL = "http://localhost:80"

// other utils here
// const onSuccess = (settingsData) => {
//   console.log("success getting settings! Data received:", settingsData)
//   dispatch(setSettings(settingsData))
// }
// const onServerError = (message, code=undefined) => {
//   const errorCode = code ? code : "unkown";
//   console.log(`${errorCode} error: ${message}`)
//   dispatch(setErrors(`${errorCode} error: ${message}`))
// }
// const onError = (err) => {
//   console.log('error:', err)
//   dispatch(setErrors(err.message || err.toString()))
// }
