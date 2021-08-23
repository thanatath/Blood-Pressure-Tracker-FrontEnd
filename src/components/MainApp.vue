<template>
  <div>
    <div class="row">
      <div class="col-sm-4">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"
              ><i
                style="margin-right:7px"
                class="fa fa-bolt"
                aria-hidden="true"
              ></i
              >TOP</span
            >
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
      <div class="col-sm-4">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"
              ><i
                style="margin-right:7px"
                class="fa fa-hourglass-end"
                aria-hidden="true"
              ></i
              >Buttom</span
            >
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
      <div class="col-sm-4">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"
              ><i
                style="margin-right:7px"
                class="fa fa-heartbeat"
                aria-hidden="true"
              ></i>
              HeartRate</span
            >
          </div>
          <input
            v-model="heartRate"
            type="text"
            class="form-control"
            placeholder="HeartRate"
            aria-label="HeartRate"
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
          <ul
            v-for="allRecord in allRecord.data"
            :key="allRecord.data"
            class="list-group list-group-flush"
          >
            <center>
              <li class="list-group-item">
                <i
                  style="margin-right:7px"
                  class="fa fa-bolt"
                  aria-hidden="true"
                ></i>
                {{ allRecord.top }}
                <i
                  style="margin-right:7px;margin-left:19px"
                  class="fa fa-hourglass-end"
                  aria-hidden="true"
                ></i>
                {{ allRecord.buttom }}
                <i
                  style="margin-right:7px;margin-left:19px"
                  class="fa fa-heartbeat"
                  aria-hidden="true"
                ></i>
                {{ allRecord.heartrate }}
                <i
                  style="margin-right:7px;margin-left:19px"
                  class="fa fa-calendar"
                  aria-hidden="true"
                ></i>
                {{ allRecord.time }}
                <button
                  @click="delData(allRecord.id)"
                  style="margin-left:35px;;margin-left:19px"
                  type="button"
                  class="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </li>
            </center>
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
      allRecord: '',
      heartRate: '',
    };
  },
  methods: {
    getData() {
      axios
        .get(
          'http://' +
            process.env.VUE_APP_BACKENDHOST +
            ':' +
            process.env.VUE_APP_BACKENDPORT +
            '/history'
        )
        .then((response) => {
          this.allRecord = response;
        });
    },

    checkdata() {
      return !(
        parseInt(this.top) > 0 &&
        parseInt(this.buttom) > 0 &&
        parseInt(this.heartRate) > 0
      );
    },
    sendData() {
      axios
        .get(
          'http://' +
            process.env.VUE_APP_BACKENDHOST +
            ':' +
            process.env.VUE_APP_BACKENDPORT +
            '?top=' +
            this.top +
            '&buttom=' +
            this.buttom +
            '&heartrate=' +
            this.heartRate
        )
        .then((response) => {
          if (response.data == 'OK') {
            this.$alert('Save Blood Data Complete.');
          } else {
            this.$alert('Save Blood Data Not Complete.');
          }
          this.resetInput()
        });
      this.getData();
    },
    resetInput() {
      this.top = '';
      this.buttom = '';
      this.heartRate ='';
    },
    delData(delId) {
      axios
        .get(
          'http://' +
            process.env.VUE_APP_BACKENDHOST +
            ':' +
            process.env.VUE_APP_BACKENDPORT +
            '/del?idBlood=' +
            delId
        )
        .then((response) => {
          if (response.data == 'OK') {
            this.$alert('Delete Blood Data Complete.');
          } else {
            this.$alert('Delete Blood Data Not Complete.');
          }
          this.resetInput();
        });
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.sm_btn {
  width: 100%;
}
</style>
