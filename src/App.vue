<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Vehicles</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <a href="https://github.com/Ram4Vall/vehicles-front-vue"><v-icon>fab fa-github</v-icon></a>
      </v-btn>
    </v-toolbar>

    <v-content>
      <VehicleForm/>
    </v-content>
  </v-app>
</template>

<script>
  import VehicleForm from './views/VehicleForm';

  export default {
    name: 'App',
    components: {
      VehicleForm,
    },
    data() {
      return {
      };
    },
  };
</script>
