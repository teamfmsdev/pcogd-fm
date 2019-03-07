<template>
<b-table class="tableClassBl"  dark :items="item" bordered :fields="fields"></b-table>  
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
  },
  methods:{
    hightlightRow:(item,index)=>{
      console.log("ROW?")
    }
  }
}
</script>


<style lang="scss" scoped>

.tableClassBl{
  tr{
    background-color: orange;
  }
  tr:hover{
    background-color:blue;
  }
  tbody{
    tr:hover{
      background-color:red;
    }
  }
}
</style>



