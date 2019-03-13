import Vue from 'vue';
import Router from 'vue-router';
import VehicleForm from './views/VehicleForm.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'vehicleForm',
      component: VehicleForm,
    },
  ],
});
