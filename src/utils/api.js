
// export const BASE_URL = process.env.API_CONN;
const BASE_URL = "http://144.202.28.229"

const fetchUtil = async (token, extension, method, body=undefined, bodyName=undefined) => {
  let result;
  
  const options = {
    method: method,
    headers: { 'x-access-token': token }
  }
  if(method==="POST" || method==="PUT") {
    options.headers['Content-Type'] = "application/json";
    options.headers['Accept'] = "application/json";
  }
  if(body)
    options.body = JSON.stringify({ [bodyName]: body })

  try {
    result = await fetch(BASE_URL + extension, options)
    console.log('result:', result, 'status:', result.status)
    const jsonresult = await result.json();
    if(jsonresult.status ==="success" || result.status < 400) {
      return { ok: true, jsonresult }
    }
    else {
      return { ok: false, jsonresult }
    }
  } catch (error) {
    console.log('error:', error)
    throw Error("new error while getting projects") // requires error boundary
  }
}

export {
  BASE_URL,
  fetchUtil
}

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
