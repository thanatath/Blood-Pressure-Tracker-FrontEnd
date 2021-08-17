<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">TOP</span>
          </div>
          <input
            v-model="top"
            type="text"
            class="form-control"
            placeholder="Top"
            aria-label="Top"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div class="col-sm-6">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Buttom</span>
          </div>
          <input
            v-model="buttom"
            type="text"
            class="form-control"
            placeholder="Buttom"
            aria-label="Buttom"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div class="col-sm">
        <button
          @click="sendData()"
          :disabled="checkdata()"
          type="button"
          class="btn btn-primary btn-lg btn-block sm_btn"
        >
          Save
        </button>
      </div>
    </div>

    <div style="margin-top:25px" class="row">
      <div class="col-sm">
        <div class="card" style="width: 100%">
          <div class="card-header">
            <center>History Record</center>
          </div>
          <ul v-for="allRecord in allRecord.data" :key="allRecord.data" class="list-group list-group-flush">
             
             <center><li class="list-group-item"><span style="color:red">TOP:</span> {{allRecord.top}} <span style="color:blue">Buttom:</span>  {{allRecord.buttom}} <span style="color:Green">Time:</span> {{allRecord.time}} <button @click="delData(allRecord.id)" style="margin-left:35px;" type="button" class="btn btn-danger btn-sm">Delete</button> </li> </center>
            
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MainApp',
  data() {
    return {
      top: '',
      buttom: '',
      allRecord:'',

    };
  },
  methods: {
    getData(){
            axios
        .get("http://"+process.env.VUE_APP_BACKENDHOST+":"+process.env.VUE_APP_BACKENDPORT+"/history")
        .then((response) => {
          this.allRecord = response})}
          
    ,
    checkdata() {
      return !(parseInt(this.top) > 0 && parseInt(this.buttom) > 0);
    },
    sendData() {
      axios
        .get("http://"+process.env.VUE_APP_BACKENDHOST+":"+process.env.VUE_APP_BACKENDPORT+'?top=' + this.top + '&buttom=' + this.buttom)
        .then((response) => {
          if (response.data == 'OK') {
            this.$alert('Save Blood Data Complete.');
          } else {
            this.$alert('Save Blood Data Not Complete.');
          }
          (this.top = ''), (this.buttom = '');
        });
        this.getData()
    },
    delData(delId){
      axios
        .get("http://"+process.env.VUE_APP_BACKENDHOST+":"+process.env.VUE_APP_BACKENDPORT+'/del?idBlood=' + delId)
        .then((response) => {
          if (response.data == 'OK') {
            this.$alert('Delete Blood Data Complete.');
          } else {
            this.$alert('Delete Blood Data Not Complete.');
          }
          (this.top = ''), (this.buttom = '');
        });
        this.getData()
    },
  },
  mounted() {
    this.getData()
     
  },
};
</script>

<style>
.sm_btn {
  width: 100%;
}
</style>
