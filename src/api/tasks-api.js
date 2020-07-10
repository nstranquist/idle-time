import { BASE_URL } from './api-utils'

// GET, POST, PUT, DELETE requests for Tasks Api (using fetch)

export const getTasks = (token, onSuccess, onError) => {
  fetch(BASE_URL + '/tasks', {
    method: 'GET',
    headers: {
      'x-access-token': token
    }
  })
    .then(async res => ({ data: await res.json(), status: res.status }))
    .then(object => {
      const { data, status } = object;

      if(status >= 400 || data.status==="error") {
        console.log('error')
        onError(data.message)
      }
      else {
        onSuccess(data.data.tasks);
      }
    })
    .catch(err => {
      console.log('error during api request:', err)
      onError(err)
    })
}

