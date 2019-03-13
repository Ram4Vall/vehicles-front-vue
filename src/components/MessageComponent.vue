<template>
  <div class="message">
    <div v-if="show">
      <v-alert
        :value="true"
        :type="type"
      >
        {{message}}
      </v-alert>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class MessageComponent extends Vue {
    //@Prop({default: 'Example'})
    public message: string = '';
    //@Prop({default: true})
    public show: boolean = false;

    public type : string =  'info';

    public showMessage(message: string, type: string): void {
      this.show = true;
      this.message = message;
      this.type = type;
    }

    mounted(){
      this.$root.$on('showMessage', (message: string, type: string)=>{
        this.showMessage(message, type);
      });
    }
  }
</script>