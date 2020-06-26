export default function({ $axios, redirect }, inject) {
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
  })
  // Inject to context as $api
  inject('api', api)
}
