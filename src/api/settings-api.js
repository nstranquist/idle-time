import { BASE_URL } from './api-utils'


export const getSettingsApiCall = (token, onSuccess, onServerError, onError) => {
  fetch(BASE_URL + '/settings', {
    method: 'GET',
    headers: {
      'x-access-token': token,
    }
  })
    .then(async res => ({ data: await res.json(), status: res.status }))
    .then(object => {
      const { data, status } = object;
      console.log('response object:', object)

      if(status >= 400 || data.status === "error")
        onServerError(data.message, status);
      else {
        if(data.data.settings)
          onSuccess(data.data.settings)
        else
          onServerError("Did not receive settings", 500)
      }
    })
    .catch(err => {
      console.log('error during request:', err)
      onError(err)
    })
}

export const updateSettingsApiCall = (token, settingsData, onSuccess, onServerError, onError) => {
  fetch(BASE_URL + '/settings/update', {
    method: 'PUT',
    headers: {
      'x-access-token': token,
    },
    body: JSON.stringify({settings: settingsData})
  })
    .then(async res => ({ data: await res.json(), status: res.status }))
    .then(object => {
      const { data, status } = object;
      console.log('response object:', object)

      if(status >= 400 || data.status === "error")
        onServerError(data.message, status)
      else {
        if(data.data.settings)
          onSuccess(data.data.settings)
        else
          onServerError("Did not recieve settings", 500)
      }
    })
    .catch(err => {
      console.log('error received:', err)
      onError(err);
    })
}