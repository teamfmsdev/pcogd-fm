import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formState: false,
    clickedRow: false,
    isLoading: false,
    formData: {
      wTitle: '',
      prio: '',
      t1: '',
      t2: '',
      desc: '',
      loca: '',
      stat: 'New',
      comp: '',
      sapS: '',
      sapN: '-',
      reqBy: '',
      reqD: dayjs(new Date()).format('YYYY-MM-DD'),
      closBy: '',
      closD: ''
    },
    tableItems: []

  },
  getters: {
    getFormData: (state) => {
      return state.formData
    },
    getFormState: (state) => {
      return state.formState
    },
    getClickedRow: (state) => {
      return state.clickedRow
    },
    getIsLoading: (state) => {
      return state.isLoading
    },
    getTableTtems: (state) => {
      return state.tableItems
    }
  },
  mutations: {
    changeFormState (state, payload) {
      state.formState = payload
    },
    updateFormData (state, { field, data }) {
      state.formData[field] = data
    },
    submitFormData (state, payload) {
      state.tableItems.push(payload)
    },
    searchDataResult (state, payload) {
      state.tableItems = payload
    },
    changeIsLoading (state, payload) {
      state.isLoading = payload
    }

  },
  actions: {
    changeFormState ({ commit }, payload) {
      commit('changeFormState', payload)
    },
    async updateFormData ({ commit, getters }, payload) {
      // If user change sapChoice to something other than yes, clear sapNumber field
      if (payload.field == 'sapS' && payload.data != 'Yes' && getters.getFormState) {
        payload.data = payload.data.trim()
        await commit('updateFormData', payload)

        payload.field = 'sapN'
        payload.data = ''

        await commit('updateFormData', payload)
      } else {
        payload.data = payload.data.trim()
        await commit('updateFormData', payload)
      }
    },
    async submitFormData ({ commit, state }, payload) {
      let newData = { ...state.formData, fmNo: payload }
      commit('submitFormData', newData)
    },
    async saveSearchData ({ commit }, payload) {
      commit('searchDataResult', payload)
    },
    changeIsLoading ({ commit }, payload) {
      commit('changeIsLoading', payload)
    }
  }
})
