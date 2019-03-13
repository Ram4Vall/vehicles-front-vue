<template>
  <div class="form">
    <v-container fluid grid-list-lg>
    <h1>Vehicles Validation</h1>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    >
      <v-text-field
        label="Vehicle ID"
        type="number"
        :rules="[v => !!v || 'Vehicle ID is required']"
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
        type="number"
        label="Price"
        :rules="[v => !!v || 'Price is required']"
        required
      ></v-text-field>
      <v-btn @click="submit">submit</v-btn>
    </v-form>
    <MessageComponent/>
    </v-container>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {VehicleRequest} from '@/classes/vehicle-request';
  import {ProcessVehicleResponse} from '@/classes/process-vehicle-response';
  import {VehicleValidationResultCode} from '@/classes/vehicle-validation-result-code';
  import axios from 'axios';

  import MessageComponent from '@/components/MessageComponent.vue';


  @Component({
    components: {
      MessageComponent,
    },
  })
  export default class VehicleForm extends Vue {

    public valid: boolean = true;
    public vehicle: VehicleRequest = new VehicleRequest();
    private processVehicleResponse!: ProcessVehicleResponse;

    public submit(): void {
      console.log(this.vehicle);
      if((this.$refs.form as any).validate()){
        axios.post('http://localhost:8081/api/Vehicle/ProcessVehicle', this.vehicle)
        .then((response) => {
          this.processVehicleResponse = response.data;
          this.processResponse();
        })
        .catch((error) => {
          console.log(error);
          this.showMessageComponent('An error occurred, try again later.', 'error');
        });
      }
    }

    private processResponse(): void {
      let messageResult: string = '';
      let messageType: string = '';

      switch(this.processVehicleResponse.resultCode){
        case VehicleValidationResultCode.Valid:
          messageResult = 'Valid';
          messageType = 'success';
        break;
        case VehicleValidationResultCode.Invalid:
          messageResult = 'Invalid';
          messageType = 'info';
        break;
        case VehicleValidationResultCode.NotSpecified :
        default :
          messageResult = 'Validation Error';
          messageType = 'error';
        break;
      }

      messageResult =  messageResult + ' form for vehicle id: ' + this.processVehicleResponse.vehicleId;
      this.showMessageComponent(messageResult, messageType);
    }

    private showMessageComponent(messageResult: string, messageType: string): void {
      this.$root.$emit('showMessage', messageResult, messageType);
    }
  }
</script>