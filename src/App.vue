<template>
  <v-app>
    
    <Menu/>
    
    <Notificacion/>

    <v-main>
      <router-view/>
    </v-main>

    <!-- el contenido del pie de página aquí -->
    <footer style="background-color:#eaeaea">
      <MFooter/>
    </footer>

  </v-app>
</template>

<script>

// import CrudVue from "@/services/CrudVue";

// import HelloWorld from './components/HelloWorld';
import Notificacion from '@/components/Notificacion.vue'
import Menu from '@/components/Menu.vue';
import MFooter from '@/components/Footer.vue';

export default {
  name: 'App',

  components: {
    Menu,
    Notificacion,
    MFooter
  },

  data: () => ({

  }),

  created () {
    // CrudVue.getToken('apiusers');
  },

  methods: {

  },

};
</script>
<style>
  table>tbody>tr{
    cursor: pointer;
  }
  .footer--text{
    color: #000000;
  }
  .social-links img {
    width: 2em;
  }
</style>
