<template>
  <div class="container sticky-top mb-1 mt-3 p-0 mainArea">
    <form class="form-group p-3" @submit.prevent="saveData">
      <div class="row justify-content-center no-gutters">
        <div class="col-md d-flex justify-content-end align-items-center formSwitch">
          <label>New</label>
          <!-- <input type="checkbox" id="checkBox" onclick="changeAction()" /> -->
          <!-- Rounded switch -->
          <label class="switch mx-3">
            <input type="checkbox" v-model="getFormState" @change="switchState">

            <span class="slider round"></span>
          </label>
          <label>Update</label>
        </div>

        <div class="col-md-5 d-flex justify-content-end align-item-center p-0 m-0 h-50 helpBtn">
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

      <div class="row text-center justify-content-center no-gutters mb-1">
        <label for="wTitleBox" class="col-md-2 col-form-label">Work Title</label>
        <input
          id="wTitleBox"
          class="form-control col-md-5"
          v-model="wTitle"
          :required="!getFormState"
        >

        <label class="col-1 col-form-label" for="priorityBox">Priority</label>

        <select class="form-control col-md-1" v-model="prio" :required="!getFormState">
          <option disabled selected></option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
        </select>

        <label class="col-md-1 col-form-label" for="type1Box">Type</label>

        <select class="form-control col-md-1" v-model="t1" :required="!getFormState">
          <option disabled selected></option>
          <option value="PM">PM</option>
          <option value="RM">RM</option>
          <option value="SM">SM</option>
        </select>

        <select class="form-control col-md-1" v-model="t2" :required="!getFormState">
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
      <div class="row justify-content-center no-gutters mb-1">
        <label
          id="Description"
          class="col-md-2 col-form-label text-center"
          for="descriptionBox"
        >*Description</label>
        <textarea
          :required="!getFormState"
          v-model="desc"
          rows="5"
          cols="50"
          class="form-control col-md"
        ></textarea>
      </div>
      <div class="row text-center justify-content-center no-gutters mb-1">
        <label id="Location" class="col-md-2 col-form-label" for="locationBox">*Location</label>
        <input v-model="loca" class="form-control col-md-4" type="text" :required="!getFormState">
        <label id="Status" class="col-md-2 col-form-label" for="statusBox">*Status</label>
        <select v-model="stat" class="form-control col-md-4" :required="!getFormState">
          <option disabled selected></option>
          <option selected="selected" value="New">New</option>
          <option value="Reviewed">Reviewed</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div class="row text-center justify-content-center no-gutters mb-1">
        <label id="Company" class="col-md-2 col-form-label" for="companyBox">Company</label>
        <input v-model="comp" class="form-control col-md-4" type="text">
        <label id="SAP#" class="col-md-2 col-form-label" for="sapBox">SAP#</label>
        <transition name="buttonDisplay" mode="out-in">
          <select v-model="sapS" id="sapC" class="form-control sapC col-md-1">
            <option selected></option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </transition>
        <!-- <transition name="sapNDisplay" mode="out-in"> -->
        <input
          v-model="sapN"
          class="form-control sapN col-md-4"
          id="sapN"
          :disabled="getFormState && sapS!='Yes'"
          type="text"
          :required="!getFormState"
        >
        <!-- </transition> -->
      </div>
      <div class="row text-center justify-content-center no-gutters mb-1">
        <label class="col-md-2 col-form-label" for="requestbyBox">*Request By</label>
        <select v-model="reqBy" class="form-control col-md-4" type="text" :required="!getFormState">
          <option id="defReqByOption" disable selected></option>
          <option value="Aqil">Aqil</option>
          <option value="Amirul">Amirul</option>
          <option value="Zamri">Zamri</option>
          <option value="Kamarulzaman">Kamarulzaman</option>
          <option value="Malina">Malina</option>
        </select>
        <label class="col-md-2 col-form-label" for="requestdateBox">*Request Date</label>
        <input
          :required="!getFormState"
          v-model="reqD"
          id="requestdateBox"
          class="form-control col-md-4"
          type="Date"
        >
      </div>
      <div
        :class="{displayClosed:(!getFormState && stat!='Closed')}"
        class="row text-center justify-content-center no-gutters closedByLine"
      >
        <label class="col-md-2 col-form-label" for="closedbyBox">Closed By</label>
        <select
          v-model="closBy"
          class="form-control col-md-4"
          type="text"
          :required="!getFormState && stat=='Closed'"
        >
          <option disabled selected></option>
          <option value="Aqil">Aqil</option>
          <option value="Amirul">Amirul</option>
          <option value="Zamri">Zamri</option>
          <option value="Kamarulzaman">Kamarulzaman</option>
          <option value="Malina">Malina</option>
        </select>

        <label class="col-md-2 col-form-label" for="completiondateBox">Completion Date</label>
        <input v-model="closD" class="form-control col-md-4" type="date" :required="!getFormState && stat=='Closed'">
      </div>

      <div
        class="row text-center my-3 no-gutters d-flex align-content-center justify-content-center flex-column flex-md-row flex-sm-column"
      >
        <!-- <input
          class="btn mx-1"
          type="button"
          id="searchBtn"
          value="SEARCH "
          v-show="getFormState"
          @click="searchData"
        >

        <input class="btn mx-1" type="button" id="editBtn" value="EDIT" v-show="getFormState">

        <input
          class="btn mx-1"
          type="button"
          id="deleteBtn"
          value="DELETE"
          v-show="getFormState && getClickedRow"
        >

        <input class="btn mx-1" type="submit" id="saveBtn" value="SAVE" v-show="!getFormState">
        <input
          class="btn mx-1"
          type="button"
          id="resetBtn"
          value="RESET"
          v-show="!getFormState || getFormState"
        >-->
        <input class="btn mx-1" type="button" id="searchBtn" value="SEARCH " @click="searchData">

        <input class="btn mx-1" type="button" id="editBtn" value="EDIT">

        <input class="btn mx-1" type="button" id="deleteBtn" value="DELETE">

        <input class="btn mx-1" type="submit" id="saveBtn" value="SAVE" >
        <input class="btn mx-1" type="button" id="resetBtn" value="RESET" @click="resetForm">
      </div>
    </form>

    <div class="container card alertMsg justify-content-center text-center" id="alertMsg"></div>

    <!-- <div v-show="getIsLoading" class="d-inline-block" style=" bottom:10%;"> -->
    <div class="loadingBar">
      <b-spinner
        v-show="getIsLoading"
        variant="primary"
        type="grow"
        label="Spinning"
        style="bottom:10%;"
      />
      <b-spinner
        v-show="getIsLoading"
        variant="primary"
        type="grow"
        label="Spinning"
        style=" bottom:10%;"
      />
      <b-spinner
        v-show="getIsLoading"
        variant="primary"
        type="grow"
        label="Spinning"
        style=" bottom:10%;"
      />
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import '@/styles/customForm.css'
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import axios from 'axios'
import uiControl from '@/helperScript/uiControl.js'

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
    getClickedRow: {
      get () {
        return this.$store.getters.getClickedRow
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
    ...mapActions([
      'changeFormState',
      'updateFormData',
      'submitFormData',
      'saveSearchData'
    ]),
    switchState () {
      const searchBtn = document.querySelector('#searchBtn')
      const editBtn = document.querySelector('#editBtn')
      const deleteBtn = document.querySelector('#deleteBtn')
      const saveBtn = document.querySelector('#saveBtn')
      const resetBtn = document.querySelector('#resetBtn')
      const sapN = document.querySelector('#sapN')
      const sapC = document.querySelector('#sapC')
      if (this.getFormState) {
        uiControl.updateMode()

        this.resetForm()
      } else if (!this.getFormState) {
        uiControl.newMode()
        this.resetForm()
      }
    },
    resetForm () {
      const form = document.querySelector('form')
      // form.reset();
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
            if (this.getFormState) {
              payload = {
                field: field,
                data: ''
              }
            } else {
              payload = {
                field: field,
                data: '-'
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
    },
    saveData () {
      this.getIsLoading = true
      axios
        .get(
          'http://localhost:80/pcogdfm/rewritesvue/public/server/save.php',
          {
            params: {
              'Work Title': this.wTitle,
              Priority: this.prio,
              'Type 1': this.t1,
              'Type 2': this.t2,
              Description: this.desc,
              Location: this.loca,
              Status: this.stat,
              Company: this.comp,
              'SAP Choice': this.sapS,
              'SAP#': this.sapN,
              'Request By': this.reqBy,
              'Request Date': this.reqD,
              'Closed By': this.closBy,
              'Completion Date': this.closD
            }
          }
        )
        .then(({ data }) => {
          // this.saveSearchData(data);
          this.$store.dispatch('submitFormData', data.row)
          this.getIsLoading = false

          const alertMsg = document.querySelector('.alertMsg')
          uiControl.displayMessage(data['serverMessage'])
        })
    },
    searchData () {
      this.getIsLoading = true
      axios
        .get(
          'http://localhost:80/pcogdfm/rewritesvue/public/server/retrieve.php',
          {
            params: {
              'Work Title': this.wTitle,
              Priority: this.prio,
              'Type 1': this.t1,
              'Type 2': this.t2,
              Description: this.desc,
              Location: this.loca,
              Status: this.stat,
              Company: this.comp,
              'SAP Choice': this.sapS,
              'SAP#': this.sapN,
              'Request By': this.reqBy,
              'Request Date': this.reqD,
              'Closed By': this.closBy,
              'Completion Date': this.closD
            }
          }
        )
        .then(({ data }) => {
          this.saveSearchData(data)
          this.getIsLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$mobile: 768px;

@mixin mobile {
  @media (max-width: #{$mobile}) {
    @content;
  }
}

#searchBtn {
  width: 0;
  display: none;
  // visibility: hidden;
}

#editBtn {
  width: 0;
  display: none;
  // visibility: hidden;
}

#deleteBtn {
  width: 0;
  display: none;
  // visibility: hidden;
}

#sapC {
  display: none;
}

.displayClosed {
  opacity: 0;
  transition: opacity 1s;
  // visibility: hidden;
}

.closedByLine {
  transition: all 1s;
}

.loadingBar {
  min-height: 50px;
}

.btn {
  background-color: rgb(0, 177, 169);
  border: 1px solid rgb(0, 177, 169);
  width: 150px;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  font-family: verdana;
  box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
  // letter-spacing: .15em;

  @include mobile {
    width: 75px;
  }
}

.btn:hover {
  color: White;
  background-color: white;
  background-color: #00b151;
  transition: background-color 0.5s;
  // border-radius: 25%
}

.btn:active {
  transform: translateY(2px);
  transition: transform 0.1s;
}

.helpButton {
  width: 80px;
}

// .btn {
//   -moz-box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
//   -webkit-box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
//   box-shadow: 0px 0px 10px 0px rgb(0, 177, 169);
//   background-color: rgb(0, 177, 169);
//   -moz-border-radius: 25px;
//   -webkit-border-radius: 25px;
//   border-radius: 25px;
//   display: inline-block;
//   cursor: pointer;
//   color: #ffffff;
//   font-family: Verdana;
//   font-size: 15px;
//   padding: 5px 20px;
//   text-decoration: none;
//   width: 15%;
//   // min-width: 15%;
//   max-width: 18%;
//   font-weight: bold;
//   position: relative;
//   // width: 200px;
// }
// .btn:hover {
//   background-color: #ffffff;
//   color:rgb(0, 177, 169);
//   border: 1.5px solid rgb(0, 177, 169);
//   // transition: background-color 5s;
//   // transition: color .5s;
//   // transition: border .5s;
// }
// .btn:active {
//   position: relative;
//   top: 1px;
// }

/* Alert div */
.alertDiv {
  /* background-color: rgba(58, 84, 65, 0.507); */
  min-height: 25px;
  border-radius: 25px;
  width: 50%;
  color: black;
}

.alertMsg {
  min-height: 25px;
  width: 25%;
  font-weight: bold;
  border: 1px solid rgba(0, 0, 0, 0.5);
  opacity:0;
}

@media (max-width: 768px) {
  .mainArea {
    position: static;
  }
  .formSwitch {
    justify-content: center !important;
  }
  .helpBtn {
    justify-content: center !important;
  }
}
</style>
