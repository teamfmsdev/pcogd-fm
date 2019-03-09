<template>
<b-container fluid>
  <b-table @row-clicked="populateForm" hover stacked="md" :items="item" bordered :fields="fields"></b-table>
</b-container>

</template>

<script>
import dayjs from 'dayjs'
import '@/styles/custom.scss'
import { mapActions } from 'vuex'
name = 'customTable'
export default {
  data () {
    return {
      fields: [
        { key: 'fmNo', label: 'FM No', sortable: true },
        { key: 'wTitle', label: 'Work Title', sortable: true },
        { key: 'prio', label: 'Priority', sortable: true },
        { key: 't1', label: 'Type 1', sortable: true },
        { key: 'loca', label: 'Location', sortable: true },
        { key: 'stat', label: 'Status', sortable: true },
        { key: 'comp', label: 'Company', sortable: true },
        { key: 'reqBy', label: 'Request By', sortable: true },
        { key: 'reqD', label: 'Request Date', formatter: 'dateFormat', sortable: true },
        { key: 'closD', label: 'Complete Date', formatter: 'dateFormat', sortable: true }
      ]
    }
  },
  computed: {
    item: {
      get () {
        return this.$store.getters.getTableTtems
      }

    },
    getIsLoading: {
      get () {
        return this.$store.getters.getIsLoading
      },
      set (value) {
        this.$store.commit('changeIsLoading', value)
      }
    },
    getFormState () {
      return this.$store.getters.getFormState
    }
  },
  methods: {
    ...mapActions(['updateFormData']),
    populateForm (index) {
      if (!this.getFormState) {
        return
      }

      this.getIsLoading = true
      axios.get('http://localhost:80/pcogdfm/rewritesvue/public/server/selectedRetrieve.php',
        {
          params: {
            dataId: index.fmNo
          }
        })
        .then(({ data }) => {
          let payload
          for (let column in data) {
            payload = {
              field: column,
              data: data[column]
            }

            this.updateFormData(payload)
          }
          this.getIsLoading = false
        }).catch(error => {
          console.log(error)
          this.getIsLoading = false
        })
    },
    dateFormat (value) {
      if (value) {
        return dayjs(new Date(value)).format('DD-MM-YYYY')
      } else {

      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
