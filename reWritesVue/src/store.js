import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formState: false,
    clickedRow: false,
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
    tableItems:[{
      fmNo: "1",
      wTitle: "Olefin Substation Repainting",
      prio: "P4",
      t1: "PM",
      t2: "PT",
      desc: "15/11-final touch up and house keeping.\n\n17/12- amended PO, signed JCT.",
      loca: "Olefins Sub Station",
      stat: "Closed",
      comp: "Enproserve",
      sapN: "-",
      reqBy: "Aqil",
      reqD: "2018-11-15",
      closBy: "Aqil",
      closD: "2018-12-18"
    }]

  },
  getters: {
    getFormData: (state) => {
      return state.formData
    },
    getFormState: (state) => {
      return state.formState
    },
    getClickedRow:(state)=>{
      return state.clickedRow
    },
    getTableTtems:(state)=>{
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
    submitFormData(state,payload){
      console.log("mutations!")
    },
    searchDataResult(state,payload){
      state.tableItems = payload
    }

  },
  actions: {
    changeFormState ({ commit }, payload) {
      commit('changeFormState', payload)
    },
    async updateFormData ({ commit,getters }, payload) {
      // If user change sapChoice to something other than yes, clear sapNumber field
      if(payload.field=="sapS" && payload.data !="Yes" && getters.getFormState){
        payload.data = payload.data.trim()  
        await commit('updateFormData', payload)

        payload.field="sapN"
        payload.data=""

        await commit('updateFormData',payload)
      }
      else{
        payload.data = payload.data.trim()
        await commit('updateFormData', payload)
      }
      
    },
    async submitFormData(context,payload){
      context.commit("submitFormData")
      console.log("Actions called")
    },
    async saveSearchData({commit},payload){
      commit("searchDataResult",payload)
    }
  }
})
