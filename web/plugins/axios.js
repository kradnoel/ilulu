export default function({ $axios, redirect, $store }, inject) {
  // Create handler config verification
  const isHandlerDisabled = (config = {}) => {
    return (
      Object.prototype.hasOwnProperty.call(config, 'handlerDisabled') &&
      (config.handlerDisabled || true)
    )
  }
  const errorHandler = (error) => {
    if (!error.response) {
      const response = {}
      response.status = 500
      response.data = {
        data:
          'Ligacao ao Servidor Indisponivel. Verifique a sua ligacao a Internet',
        status: 'error',
        code: 500
      }
      error.response = response
    }
    if (!isHandlerDisabled(error.config)) {
      // Handle errors
    }
    // return
    return Promise.reject(error)
  }
  const successHandler = (response) => {
    if (!isHandlerDisabled(response.config)) {
      //
    }
    return Promise.resolve(response)
  }
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })
  // Set baseURL to something different
  api.setBaseURL('http://localhost:3001')
  api.onRequest((config) => {
    // eslint-disable-next-line
    console.log('Making request to ' + config.url)
    // eslint-disable-next-line
    console.log(`isHandlerDisabled: ${isHandlerDisabled(config)}`)
  })
  api.onResponse((config) => {
    console.log(`Making responste`)
  })
  api.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
  )
  api.interceptors.request.use((config) => {
    if (!isHandlerDisabled(config)) {
      config.headers.Autorization = `Bearer ${$store.getters.getToken}`
    }
    config.headers.Accept = `application/json; charset=utf-8`
    return config
  })
  // Inject to context as $api
  inject('api', api)
}
