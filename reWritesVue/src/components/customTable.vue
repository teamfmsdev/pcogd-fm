<template>
<b-table  dark :items="item" bordered :fields="fields"></b-table>  
</template>

<script>
name="customTable"
export default {
  data(){
    return{
      fields:[
        {key:"fmNo", label:"FM No"},
        {key:"wTitle", label:"Work Title"},
        {key:"prio", label:"Priority"},
        {key:"t1", label:"Type 1"},
        {key:"loca", label:"Location"},
        {key:"stat", label:"Status"},
        {key:"comp", label:"Company"},
        {key:"reqBy", label:"Request By"},
        {key:"reqD", label:"Request Date"},
        {key:"closD", label:"Complete Date"}
      ]
    }
  },
  computed:{
    item:{
      get(){
      return this.$store.getters.getTableTtems
      }
      
    }
  }
}
</script>

<style lang="sass" scoped>

</style>


