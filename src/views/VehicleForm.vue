<template>
  <div class="form">
    <h1>Vehicles Validation</h1>
    <form>
      <v-text-field
        label="Vehicle ID"
        v-model="vehicle.VehicleId"
      ></v-text-field>
      <v-text-field
        v-model="vehicle.Type"
        label="Type"
      ></v-text-field>
      <v-text-field
        v-model="vehicle.ManufacturerNameShort"
        label="Manufacturer Name Short"
      ></v-text-field>
      <v-text-field
        v-model="vehicle.Price"
        label="Price"
      ></v-text-field>
      <v-btn @click="submit">submit</v-btn>
    </form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {VehicleRequest} from '@/classes/vehicle-request';
  import {ProcessVehicleResponse} from '@/classes/process-vehicle-response';
  import {VehicleValidationResultCode} from '@/classes/vehicle-validation-result-code';
  import axios from 'axios';

  @Component
  export default class VehicleForm extends Vue {

    public vehicle: VehicleRequest = new VehicleRequest();
    private processVehicleResponse!: ProcessVehicleResponse;
    public message: String = '';

    public submit(): void {
      console.log(this.vehicle);

      axios.post('http://localhost:8081/api/Vehicle/ProcessVehicle', this.vehicle)
      .then((response) => {
        this.processVehicleResponse = response.data;
        this.processResponse();
        console.log(this.processVehicleResponse);
        console.log(this.message);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    private processResponse(): void {
      let result: string = '';
      switch(this.processVehicleResponse.resultCode){
          case VehicleValidationResultCode.Valid:
            result = 'Valid';
          break;
          case VehicleValidationResultCode.Invalid:
            result = 'Invalid';
          break;
          case VehicleValidationResultCode.NotSpecified :
          default :
            result = 'Validation Error';
          break;
        }

      this.message =  result + ' form for vehicle id: ' + this.processVehicleResponse.vehicleId;
    }
  }
</script>