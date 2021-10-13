import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
    snackbar: {
      visible: false,
      color: "success",
      text: null,
      timeout: 10000,
      multiline: false
    },

    usuarios:{
      editedIndex: -1,
      desserts: [],
      editedItem: {
        username: '',
        id: 0,
        statusId: 0,
        selRol: []
      },
      defaultItem: {
        name: '',
        id: 0,
        statusId: 0,
        selRol: [],
      },
    },
  },

  mutations: {
    alert(state, payload) {
      state.snackbar.text = payload.text;
      state.snackbar.html = payload.html ? payload.html : null;
      state.snackbar.multiline = payload.text.length + 50;
      if (payload.multiline) {
        state.snackbar.multiline = payload.multiline;
      }
      if (payload.color) {
        state.snackbar.color = payload.color;
      }
      if (payload.timeout) {
        state.snackbar.timeout = payload.timeout;
      }
      state.snackbar.visible = true;
    },
    
    closeAlert(state) {
      state.snackbar.visible = false;
      state.snackbar.multiline = false;
      state.snackbar.text = null;
    },

    editFormData (state, data) {
      state[data.proceso].editedItem = data.item
      state[data.proceso].editedIndex = data.index
    },

    loadAllData (state, data) {
      state[data.proceso].desserts = data.load
    },

    clearForm(state, proceso) {
      state[proceso].editedIndex = -1
      state[proceso].editedItem = state[proceso].defaultItem
    },
    
  },
  actions: {
  },
  modules: {
  }
})
