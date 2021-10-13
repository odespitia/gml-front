<template>
  <v-snackbar 
    top="" right="" 
    v-model="snackbar.visible" 
    :timeout="snackbar.timeout" 
    :multi-line="snackbar.multiline === true" 
    :color="snackbar.color">
    <v-row class="justify-center" v-if="snackbar.html">
      <v-col cols="12" sm="12" md="12" class="text-left">
        <b>{{ snackbar.text }}</b>
      </v-col>
      <v-col cols="12" v-for="error in snackbar.html" :key="`p-${error[0]}`" class="pt-0 pb-0">
        {{ error[1][0] }}
      </v-col>
    </v-row>
    <v-row class="justify-center" v-if="!snackbar.html">
      <v-col cols="12" sm="12" md="12" class="text-left">
        <b>{{ snackbar.text }}</b>
      </v-col>
    </v-row>
    <template v-slot:action="{ attrs }">
      <v-btn dark text 
        v-bind="attrs" @click="closeAlert" >
        <v-icon size="25">
          cancel
        </v-icon>
      </v-btn>
    </template>
 </v-snackbar>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    }
  },
  methods: {
    ...mapMutations(["closeAlert"])
  }
};
</script>