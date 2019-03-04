<template>
  <div class="container sticky-top mt-3 p-0 mainArea">
    <form class="form-group p-3">
      <div class="row justify-content-center no-gutters">
        <div class="col d-flex justify-content-end align-items-center">
          <label>New</label>
          <!-- <input type="checkbox" id="checkBox" onclick="changeAction()" /> -->
          <!-- Rounded switch -->
          <label class="switch mx-3">
            <input type="checkbox" v-model="formState">
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
        <input id="wTitleBox" class="form-control col-5">
        <label class="col-1 col-form-label" for="priorityBox">Priority</label>

        <select class="form-control col-1" id="priorityBox">
          <option disabled selected></option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
        </select>

        <label class="col-1 col-form-label" for="type1Box">Type</label>

        <select class="form-control col-1" id="type1Box">
          <option disabled selected></option>
          <option value="PM">PM</option>
          <option value="RM">RM</option>
          <option value="SM">SM</option>
        </select>

        <select class="form-control col-1" id="type2Box">
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
        <textarea id="descriptionBox" rows="5" cols="50" class="form-control col"></textarea>
      </div>
      <div class="row text-center justify-content-center no-gutters">
        <label id="Location" class="col-2 col-form-label" for="locationBox">*Location</label>
        <input id="locationBox" class="form-control col-4" type="text">
        <label id="Status" class="col-2 col-form-label" for="statusBox">*Status</label>
        <select id="statusBox" class="form-control col-4">
          <option disabled selected></option>
          <option selected="selected" value="New">New</option>
          <option value="Reviewed">Reviewed</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div class="row text-center justify-content-center no-gutters">
        <label id="Company" class="col-2 col-form-label" for="companyBox">Company</label>
        <input id="companyBox" class="form-control col-4" type="text">
        <label id="SAP#" class="col-2 col-form-label" for="sapBox">SAP#</label>

        <select id="sapChoice" class="form-control col-1 sapChoice">
          <option selected></option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input id="sapBox" class="form-control col-3" type="text">
      </div>
      <div class="row text-center justify-content-center no-gutters">
        <label class="col-2 col-form-label" for="requestbyBox">*Request By</label>
        <select id="requestbyBox" class="form-control col-4" type="text">
          <option id="defReqByOption" disable selected></option>
          <option value="Aqil">Aqil</option>
          <option value="Amirul">Amirul</option>
          <option value="Zamri">Zamri</option>
          <option value="Kamarulzaman">Kamarulzaman</option>
          <option value="Malina">Malina</option>
        </select>
        <label class="col-2 col-form-label" for="requestdateBox">*Request Date</label>
        <input v-model="reqDate" id="requestdateBox" class="form-control col-4" type="Date">
      </div>
      <div class="row text-center justify-content-center no-gutters closedByLine">
        <label class="col-2 col-form-label" for="closedbyBox">Closed By</label>
        <select id="closedbyBox" class="form-control col-4" type="text">
          <option disabled selected></option>
          <option value="Aqil">Aqil</option>
          <option value="Amirul">Amirul</option>
          <option value="Zamri">Zamri</option>
          <option value="Kamarulzaman">Kamarulzaman</option>
          <option value="Malina">Malina</option>
        </select>

        <label class="col-2 col-form-label" for="completiondateBox">Completion Date</label>
        <input id="completiondateBox" class="form-control col-4" type="date">
      </div>
      <!-- <div class="row text-center my-3 justify-content-center no-gutters d-flex"> -->
        <div class="row text-center my-3 no-gutters ">
        <transition-group tag="custom"  name="buttonDisplay" mode="out-in">
        <input :key="1" v-if="formState" class="btn mx-1 " type="button" value="SEARCH">

        <input :key="2" v-if="formState"  class="btn mx-1 " type="button" value="EDIT">

        <input :key="3" v-if="formState"  class="btn mx-1 " type="button" value="DELETE">

        <input :key="3" v-if="!formState" class="btn mx-1 " type="button" value="SAVE">

        <input :key="4" v-if="!formState"  class="btn mx-1 " type="button" value="RESET">
        </transition-group>

      </div>
    </form>

    <div class="container card alertMsg justify-content-center text-center" id="alertMsg"></div>
  </div>
</template>

<script>
import '@/styles/customForm.css'
import dayjs from 'dayjs'
export default {
  name: 'form',
  data () {
    return {
      formState: false,
      reqDate: dayjs(new Date()).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>

.buttonDisplay-enter,.buttonDisplay-leave-to{
opacity:0;
transform: translateY(0px)
}
.buttonDisplay-enter-active,.buttonDisplay-leave-active{
  transition: opacity 1s ;
}
// .buttonDisplay-move{
//   // transition: transform 1s;
//   transition: transform 1s;

// }

custom{
  // transition: transform 1s;
  width:100%;
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
  min-width: 15%;
  max-width: 18%;
  font-weight: bold;
  position:relative;
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
