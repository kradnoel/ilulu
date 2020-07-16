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
  },
  accounts: {
    values: []
  }
})

export const getters = {
  status: (state) => state.auth.status,
  user: (state) => state.auth.user,
  loggedIn: (state) => !!state.auth.token,
  getToken: (state) => state.auth.token,
  isAlertActive: (state) => state.alert.active,
  alertType: (state) => state.alert.type,
  alertMessage: (state) => state.alert.message,
  Accounts: (state) => state.accounts.values
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
  },
  setAccounts(state, data) {
    state.accounts.values = data
  }
}

export const actions = {
  async login({ commit }, data) {
    await this.$api
      .post('/accounts/login', data, { handlerDisabled: true })
      .then((res) => {
        if (res.status === 200) {
          commit('setToken', res.data.data)
        }
        return Promise.resolve()
      })
      .catch((e) => {
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
  },
  async createAccount({ commit }, data) {
    await this.$api
      .post('accounts/register', data)
      .then((res) => {
        const response = res
        if (res.status === 200) {
          commit('setAlertActive', true)
          commit(
            'setAlertMessage',
            `${response.data.code} - ${response.data.data}`
          )
          commit('setAlertType', response.data.status)
        }
        return Promise.resolve()
      })
      .catch((e) => {
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
  async fetchAccounts({ commit }) {
    await this.$api
      .get('/accounts')
      .then((res) => {
        const data = res.data.data
        data.forEach((item) => {
          if (item.isActive === false) {
            item.isActive = 'DESACTIVO'
          } else {
            item.isActive = 'ACTIVO'
          }
        })
        commit('setAccounts', data)
        return Promise.resolve()
      })
      .catch((e) => {
        commit('setAccounts', [])
        return Promise.reject(e)
      })
  },
  async deleteAccount({ commit, dispatch }, data) {
    await this.$api
      .delete('/accounts/delete', { params: data })
      .then((res) => {
        dispatch('fetchAccounts')
        return Promise.resolve(res)
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  },
  async updateAccount({ commit, dispatch }, data) {
    await this.$api
      .put('/accounts/update', data)
      .then((res) => {
        dispatch('fetchAccounts')
        return Promise.resolve(res)
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  }
}
