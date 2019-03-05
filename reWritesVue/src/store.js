import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formState: false,
    formData: {
      wTitle: '',
      prio: '',
      t1: '',
      t2: '',
      desc: '',
      loca: '',
      stat: '',
      comp: '',
      sapS: '',
      sapN: '',
      reqBy: '',
      reqD: dayjs(new Date()).format('YYYY-MM-DD'),
      closBy: '',
      closD: ''
    }

  },
  getters: {
    getFormData: (state) => {
      return state.formData
    },
    getFormState: (state) => {
      return state.formState
    }
  },
  mutations: {
    changeFormState (state, payload) {
      state.formState = payload
    },
    updateFormData (state, { field, data }) {
      state.formData[field] = data
    }

  },
  actions: {
    changeFormState ({ commit }, payload) {
      commit('changeFormState', payload)
    },
    updateFormData ({ commit }, payload) {
      payload.data = payload.data.trim()
      commit('updateFormData', payload)
    }
  }
})
