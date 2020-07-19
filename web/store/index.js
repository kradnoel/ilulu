'use strict'

// import JWT from 'jsonwebtoken'

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
  },
  operators: {
    values: [],
    item: {}
  },
  orphanAccounts: {
    values: []
  },
  orphanClientAccounts: {
    values: []
  },
  typeDocuments: {
    values: []
  },
  residents: {
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
  Accounts: (state) => state.accounts.values,
  Operators: (state) => state.operators.values,
  OrphanAccounts: (state) => state.orphanAccounts.values,
  OrphanClientAccounts: (state) => state.orphanClientAccounts.values,
  TypeDocuments: (state) => state.typeDocuments.values,
  OperatorItem: (state) => state.operators.item,
  Residents: (state) => state.residents.values
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
  },
  setOperators(state, data) {
    state.operators.values = data
  },
  setOrphanAccounts(state, data) {
    state.orphanAccounts.values = data
  },
  setOrphanClientAccounts(state, data) {
    state.orphanClientAccounts.values = data
  },
  setTypeDocuments(state, data) {
    state.typeDocuments.values = data
  },
  setOperatorItem(state, data) {
    state.operators.item = data
  },
  setResidents(state, data) {
    state.residents.values = data
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
  },
  async fetchOrphanAccounts({ commit }) {
    await this.$api
      .get('/accounts/search')
      .then((res) => {
        // const data = res.data.data
        // console.log(data)

        const accounts = res.data.data
        const data = []
        accounts.forEach((account) => data.push({ text: account.username }))
        commit('setOrphanAccounts', data)
        return Promise.resolve()
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  },
  async fetchOrphanClientAccounts({ commit }) {
    await this.$api
      .get('/accounts/clients')
      .then((res) => {
        // const data = res.data.data
        // console.log(data)

        const accounts = res.data.data
        const data = []
        accounts.forEach((account) => data.push({ text: account.username }))
        commit('setOrphanClientAccounts', data)
        return Promise.resolve()
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  },
  async fetchTypeDocuments({ commit }) {
    await this.$api
      .get('/typeDocuments')
      .then((res) => {
        const typeDocuments = res.data.data
        const data = []
        typeDocuments.forEach((typeDocument) => {
          data.push({ text: typeDocument.type })
        })
        commit('setTypeDocuments', data)
        return Promise.resolve()
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  },
  async fetchOperators({ commit }) {
    await this.$api
      .get('/operators')
      .then((res) => {
        const data = res.data.data
        commit('setOperators', data)
        return Promise.resolve()
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  },
  async createResident({ commit }, data) {
    await this.$api
      .post('/residents/create', data)
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
  async deleteResident({ commit, dispatch }, data) {
    await this.$api
      .delete('/residents/delete', { params: data })
      .then((res) => {
        dispatch('fetchResidents')
        return Promise.resolve(res)
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  },
  async fetchResidents({ commit }) {
    await this.$api
      .get('/residents')
      .then((res) => {
        const data = res.data.data
        commit('setResidents', data)
        return Promise.resolve()
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  },
  async fetchOperatorItem({ commit }, data) {
    const url = `/operators/${data.id}`
    await this.$api
      .get(url)
      .then((res) => {
        const data = res.data.data
        commit('setOperatorItem', data)
        return Promise.resolve()
      })
      .catch((e) => {
        return Promise.reject(e)
      })
  }
}
