<template>
  <v-container>
    <v-app-bar app color="primary" dark pl-0>

      <div class="d-flex align-left">
        <v-img alt="Logo Explorandito" class="shrink mr-2 hidden-sm-and-down"
          contain src="@/assets//logo.png"
          transition="scale-transition"
          min-width="100" width="160"/>
      </div>

    </v-app-bar>
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-container>
</template>

<style>
  header>div.v-toolbar__content{
    padding-left: 0px !important;
  }
</style>

<script>

export default {
  name: 'Botoneria',
  data() {
    return {
      drawer: false,
      fab: false,
      color: 'primary',
    }
  },
  created () {
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
}
</script>
