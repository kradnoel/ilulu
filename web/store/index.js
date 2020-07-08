export const state = () => ({
  auth: {
    status: '',
    token: localStorage.getItem('access_token') || '',
    user: {}
  },
  alert: {
    active: false,
    message: '',
    type: 'success'
  }
})

export const getters = {
  status: (state) => state.auth.status,
  user: (state) => state.auth.user,
  loggedIn: (state) => !!state.auth.token,
  getToken: (state) => state.auth.token,
  isAlertActive: (state) => state.alert.active,
  alertType: (state) => state.alert.type,
  alertMessage: (state) => state.alert.message
}

export const mutations = {
  setToken(state, token) {
    localStorage.setItem('access_token', token)
    state.auth.token = token
  },
  setAlertActive(state, value) {
    state.alert.active = value
  },
  setAlertMessage(state, message) {
    state.alert.message = message
  },
  setAlertType(state, type) {
    state.alert.type = type
  },
  logoutUser(state) {
    localStorage.removeItem('access_token')
    state.auth.token = null
  }
}

export const actions = {
  async login({ commit }, data) {
    await this.$api
      .post('/Accounts/login', data, { handlerDisabled: true })
      .then((res) => {
        // eslint-disable-next-line
        console.log(res)
        if (res.status === 200) {
          commit('setToken', res.data.data)
        }
        return Promise.resolve()
      })
      .catch((e) => {
        console.log(e.response)
        const response = e.response
        commit('setAlertActive', true)
        commit(
          'setAlertMessage',
          `${response.data.code} - ${response.data.data}`
        )
        commit('setAlertType', response.data.status)
        return Promise.reject(response)
      })
  },
  logout({ commit }) {
    commit('logoutUser')
  }
}
