<template>
  <div class="container sticky-top mt-3 p-0 mainArea">
    <form class="form-group p-3">
      <div class="row justify-content-center no-gutters">
        <div class="col d-flex justify-content-end align-items-center">
          <label>New</label>
          <!-- <input type="checkbox" id="checkBox" onclick="changeAction()" /> -->
          <!-- Rounded switch -->
          <label class="switch mx-3">
            <input type="checkbox" v-model="getFormState" @change="switchState">

            <span class="slider round"></span>
          </label>
          <label>Update</label>
        </div>
        <div class="col-5 d-flex justify-content-end align-item-center p-0 m-0 h-50">
          <input
            type="button"
            value="Help"
            class="btn p-0 m-0 helpButton"
            data-toggle="popover"
            data-placement="right"
            title="Help"
            data-content=" PM : Preventative Maintenance<br>
              RM : Reactive Maintenance<br>
              SM : Support Maintenance<br>
              VI : Visual Inspection<br>
              RS: Repair & Service <br>
              RP : Replace<br>
              PR : Project <br>
              HK : Housekeeping<br>
              UC : Unclogging<br>
              PT : Painting<br>
              SL : Sealing"
          >
        </div>
      </div>

      <div class="row text-center justify-content-center no-gutters">
        <label for="wTitleBox" class="col-2 col-form-label">Work Title</label>
        <input id="wTitleBox" class="form-control col-5" v-model="wTitle">
        <label class="col-1 col-form-label" for="priorityBox">Priority</label>

        <select class="form-control col-1" v-model="prio">
          <option disabled selected></option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
        </select>

        <label class="col-1 col-form-label" for="type1Box">Type</label>

        <select class="form-control col-1" v-model="t1">
          <option disabled selected></option>
          <option value="PM">PM</option>
          <option value="RM">RM</option>
          <option value="SM">SM</option>
        </select>

        <select class="form-control col-1" v-model="t2">
          <option disabled selected></option>
          <option value="VI">VI</option>
          <option value="RS">RS</option>
          <option value="RP">RP</option>
          <option value="PR">PR</option>
          <option value="HK">HK</option>
          <option value="UC">UC</option>
          <option value="PT">PT</option>
          <option value="SL">SL</option>
        </select>
      </div>
      <div class="row justify-content-center no-gutters">
        <label
          id="Description"
          class="col-2 col-form-label text-center"
          for="descriptionBox"
        >*Description</label>
        <textarea v-model="desc" rows="5" cols="50" class="form-control col"></textarea>
      </div>
      <div class="row text-center justify-content-center no-gutters">
        <label id="Location" class="col-2 col-form-label" for="locationBox">*Location</label>
        <input v-model="loca" class="form-control col-4" type="text">
        <label id="Status" class="col-2 col-form-label" for="statusBox">*Status</label>
        <select v-model="stat" class="form-control col-4">
          <option disabled selected></option>
          <option selected="selected" value="New">New</option>
          <option value="Reviewed">Reviewed</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div class="row text-center justify-content-center no-gutters">
        <label id="Company" class="col-2 col-form-label" for="companyBox">Company</label>
        <input v-model="comp" class="form-control col-4" type="text">
        <label id="SAP#" class="col-2 col-form-label" for="sapBox">SAP#</label>
        <transition name="buttonDisplay" mode="out-in">
          <select
            v-model="sapS"
            v-show="getFormState"
            :class="{'col-1':getFormState}"
            class="form-control sapC"
          >
            <option selected></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </transition>
        <!-- <transition name="sapNDisplay" mode="out-in"> -->
        <input
          v-model="sapN"
          class="form-control sapN"
          :class="{'col-4':!getFormState,'col-3':getFormState}"
          type="text"
        >
        <!-- </transition> -->
      </div>
      <div class="row text-center justify-content-center no-gutters">
        <label class="col-2 col-form-label" for="requestbyBox">*Request By</label>
        <select v-model="reqBy" class="form-control col-4" type="text">
          <option id="defReqByOption" disable selected></option>
          <option value="Aqil">Aqil</option>
          <option value="Amirul">Amirul</option>
          <option value="Zamri">Zamri</option>
          <option value="Kamarulzaman">Kamarulzaman</option>
          <option value="Malina">Malina</option>
        </select>
        <label class="col-2 col-form-label" for="requestdateBox">*Request Date</label>
        <input v-model="reqD" id="requestdateBox" class="form-control col-4" type="Date">
      </div>
      <div
        :class="{displayClosed:getFormState || stat=='Closed'}"
        class="row text-center justify-content-center no-gutters closedByLine"
      >
        <label class="col-2 col-form-label" for="closedbyBox">Closed By</label>
        <select v-model="closBy" class="form-control col-4" type="text">
          <option disabled selected></option>
          <option value="Aqil">Aqil</option>
          <option value="Amirul">Amirul</option>
          <option value="Zamri">Zamri</option>
          <option value="Kamarulzaman">Kamarulzaman</option>
          <option value="Malina">Malina</option>
        </select>

        <label class="col-2 col-form-label" for="completiondateBox">Completion Date</label>
        <input v-model="closD" class="form-control col-4" type="date">
      </div>
      <!-- <div class="row text-center my-3 justify-content-center no-gutters d-flex"> -->
      <div class="row text-center my-3 no-gutters d-flex justify-content-center">
        <!-- <transition-group tag="custom"  name="buttonDisplay" mode="out-in"> -->
        <input class="btn mx-1" type="button" id="searchBtn" value="SEARCH">

        <input class="btn mx-1" type="button" id="editBtn" value="EDIT">

        <input class="btn mx-1" type="button" id="deleteBtn" value="DELETE">

        <input class="btn mx-1" type="button" id="saveBtn" value="SAVE">
        <input class="btn mx-1" type="button" id="resetBtn" value="RESET">
        <!-- </transition-group> -->
      </div>
    </form>

    <div class="container card alertMsg justify-content-center text-center" id="alertMsg"></div>
  </div>
</template>

<script>
import '@/styles/customForm.css'
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import Velocity from 'velocity-animate'

export default {
  name: 'mainForm',
  data () {
    return {
      // formState: false,
      // reqDate: dayjs(new Date()).format("YYYY-MM-DD")
    }
  },
  computed: {
    getFormState: {
      get () {
        return this.$store.getters.getFormState
      },
      set (value) {
        this.changeFormState(value)
      }
    },
    // getFormData: {
    //   get(){
    //     return this.$store.getters.getFormData
    //   },
    // },
    wTitle: {
      get () {
        return this.$store.getters.getFormData['wTitle']
      },
      set (value) {
        let payload = {
          field: 'wTitle',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    prio: {
      get () {
        return this.$store.getters.getFormData['prio']
      },
      set (value) {
        let payload = {
          field: 'prio',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    t1: {
      get () {
        return this.$store.getters.getFormData['t1']
      },
      set (value) {
        let payload = {
          field: 't1',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    t2: {
      get () {
        return this.$store.getters.getFormData['t2']
      },
      set (value) {
        let payload = {
          field: 't2',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    desc: {
      get () {
        return this.$store.getters.getFormData['desc']
      },
      set (value) {
        let payload = {
          field: 'desc',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    loca: {
      get () {
        return this.$store.getters.getFormData['loca']
      },
      set (value) {
        let payload = {
          field: 'loca',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    stat: {
      get () {
        return this.$store.getters.getFormData['stat']
      },
      set (value) {
        let payload = {
          field: 'stat',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    comp: {
      get () {
        return this.$store.getters.getFormData['comp']
      },
      set (value) {
        let payload = {
          field: 'comp',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    sapS: {
      get () {
        return this.$store.getters.getFormData['sapS']
      },
      set (value) {
        let payload = {
          field: 'sapS',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    sapN: {
      get () {
        return this.$store.getters.getFormData['sapN']
      },
      set (value) {
        let payload = {
          field: 'sapN',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    reqBy: {
      get () {
        return this.$store.getters.getFormData['reqBy']
      },
      set (value) {
        let payload = {
          field: 'reqBy',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    reqD: {
      get () {
        return this.$store.getters.getFormData['reqD']
      },
      set (value) {
        let payload = {
          field: 'reqD',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    closBy: {
      get () {
        return this.$store.getters.getFormData['closBy']
      },
      set (value) {
        let payload = {
          field: 'closBy',
          data: value
        }
        this.updateFormData(payload)
      }
    },
    closD: {
      get () {
        return this.$store.getters.getFormData['closD']
      },
      set (value) {
        let payload = {
          field: 'closD',
          data: value
        }
        this.updateFormData(payload)
      }
    }
  },
  methods: {
    ...mapActions(['changeFormState', 'updateFormData']),
    switchState () {
      let searchBtn = document.querySelector('#searchBtn')
      let editBtn = document.querySelector('#editBtn')
      let deleteBtn = document.querySelector('#deleteBtn')
      // console.log(searchBtn)
      if (this.getFormState) {
        Velocity(searchBtn, { width: '15%' }, 1000) // Velocity
        Velocity(editBtn, { width: '15%' }, 1000) // Velocity
        Velocity(deleteBtn, { width: '15%' }, 1000) // Velocity
        this.resetForm()
      } else if (!this.getFormState) {
        Velocity(searchBtn, { width: 0 }, 1000) // Velocity
        Velocity(editBtn, { width: '0' }, 1000) // Velocity
        Velocity(deleteBtn, { width: '0' }, 1000) // Velocity
        this.resetForm()
      }
    },
    resetForm () {
      let payload
      for (let field in this.$store.getters.getFormData) {
        switch (field) {
          case 'reqD':
            if (this.getFormState) {
              payload = {
                field: field,
                data: ''
              }
            } else {
              payload = {
                field: field,
                data: dayjs(new Date()).format('YYYY-MM-DD')
              }
            }
            this.updateFormData(payload)
            break
          case 'stat':
            if (!this.getFormState) {
              payload = {
                field: field,
                data: 'New'
              }
            } else {
              payload = {
                field: field,
                data: ''
              }
            }
            this.updateFormData(payload)
            break
          case 'sapN':
            if (!this.getFormState) {
              payload = {
                field: field,
                data: '-'
              }
            } else {
              payload = {
                field: field,
                data: ''
              }
            }
            this.updateFormData(payload)

            break
          default:
            payload = {
              field: field,
              data: ''
            }
            this.updateFormData(payload)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.buttonDisplay-enter {
  opacity: 0;
}
.buttonDisplay-leave {
  display: none;
  // width:90.15px;
}
.buttonDisplay-leave-active {
  // transition: opacity 0s;
  // width:90.15px;
  display: none;
}
.buttonDisplay-enter-active {
  transition: opacity 1s;
}

.displayClosed {
  opacity: 0;
  transition: opacity 1s;
  visibility: hidden;
}

.closedByLine {
  transition: all 1s;
}
.sapN {
  // transition: max-width 1s;
  // width: auto;
  // transition: width 1s;
  // transition: background-color 1s;
}

.sapN:hover {
  // transform: translateX(300px);

  // background-color: red;
  // max-width:3000px;
}

custom {
  // transition: transform 1s;
  width: 100%;
}

.btn {
  -moz-box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
  -webkit-box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
  box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
  background-color: rgb(0, 177, 169);
  -moz-border-radius: 25px;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Verdana;
  font-size: 15px;
  padding: 5px 20px;
  text-decoration: none;
  width:15%;
  // min-width: 15%;
  max-width: 18%;
  font-weight: bold;
  position: relative;
  // width: 200px;
}
.btn:hover {
  background-color: #1ab0d6;
}
.btn:active {
  position: relative;
  top: 1px;
}
</style>
