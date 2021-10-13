<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center users--text mt-0 mb-0 pt-0 pb-0">
        <h1>Crear Usuarios</h1>
      </v-col>
    </v-row>
    <v-form ref="form" v-model="valid" lazy-validation >

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="usuarios.editedItem.documento"
            :counter="10"
            :rules="documentRules"
            type="number"
            label="Documento"
            dense
            hint="Número documento de identidad"
            required 
          ></v-text-field>        
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="usuarios.editedItem.nombres"
            :counter="100"
            :rules="nameRules"
            label="Nombres"
            dense
            required
          ></v-text-field>        
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="usuarios.editedItem.apellidos"
            :counter="100"
            :rules="nameRules"
            label="Apellidos"
            dense
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="usuarios.editedItem.email"
            :counter="100"
            :rules="emailRules"
            label="Correo Electrónico"
            dense
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="usuarios.editedItem.movil" 
            :rules="phoneRules"
            label="Telefono Contacto"
            dense
            :counter="10"
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="usuarios.editedItem.direccion"
            :counter="180"
            :rules="addressRules"
            label="Dirección"
            dense
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="usuarios.editedItem.categoria"
            item-value="id"
            item-text="name"
            :items="itemsCategory"
            label="Categoria"
            dense
            required 
          ></v-select>      
        </v-col>

        <v-col cols="12" md="6">
          <v-select
            v-model="usuarios.editedItem.pais"
            item-value="id"
            item-text="name"
            :items="itemsCountry"
            label="Pais"
            dense
            required 
          ></v-select>      
        </v-col>

        <v-col cols="12" md="4" v-if="usuarios.editedItem.categoria == 3">
          <v-text-field
            v-model="usuarios.editedItem.contraseña"
            :append-icon="show3 ? 'visibility' : 'visibility_off'"
            :rules="passwordRules"
            :type="show3 ? 'text' : 'password'"
            label="Contraseña"
            :counter="8"
            dense
            hint="Debe tener mínimo 8 caracteres"
            @click:append="show3 = !show3"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" v-if="usuarios.editedItem.categoria == 3">
          <v-text-field
            v-model="usuarios.editedItem.rePassword"
            :append-icon="show4 ? 'visibility' : 'visibility_off'"
            :rules="[passwordConfirmation]"
            :type="show4 ? 'text' : 'password'"
            label="Confirmar contraseña"
            :counter="8"
            dense
            hint="Las contraseñas deben coincidir"
            @click:append="show4 = !show4"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="usuarios.editedItem.estado"
            item-value="id"
            item-text="name"
            :items="status"
            label="Estado"
            dense
            required 
          ></v-select>        
        </v-col>

      </v-row>

      <v-row class="justify-center">
        <v-col cols="12" sm="12" md="12" class="text-center">
          <v-btn class="ml-4 mr-4 mb-3" color="primary" 
            @click="validate" :disabled="!valid">Guardar</v-btn>
            
          <v-btn class="ml-4 mr-4 mb-3" color="primary" 
            v-on:click="reset">Limpiar</v-btn>

        </v-col>
      </v-row>

    </v-form>

      <template>
        <v-row class="mt-4">
          <v-col cols="12" class="primary white--text text-center pt-0 pb-0">
            <h1>Lista de Usuarios</h1>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col cols="12" class=" pt-0 pb-0">
            <v-text-field
              append-icon="search"
              label="Buscar"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="usuarios.desserts"
          :search="search" 
          sort-by="id" 
          class="elevation-1"
        >
        <template slot="item" slot-scope="props">
          <tr class="">
            <!-- <td class="text-start">{{ props.item.id }}</td> -->
            <td class="text-start">{{ props.item.document }}</td>
            <td class="text-start">{{ props.item.first_name }}</td>
            <td class="text-start">{{ props.item.last_name }}</td>
            <td class="text-start">{{ props.item.email }}</td>
            <td class="text-start">{{ props.item.movil }}</td>
            <td class="text-start">{{ props.item.CategoryName }}</td>
          </tr>
        </template>
        
        <template v-slot:no-data>
          <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            La busqueda para "{{ search }}" no obtuvo resultados.
          </v-alert>
        </template>
        </v-data-table>  
      </template>
  </v-container>
</template>

<script>


import { mapState } from 'vuex';
import { mapMutations } from 'vuex';

import CrudVue from "@/services/CrudVue";

  export default {
    name: "Usuarios",
    components:{
    },

    data: () => ({
      status:[
        {'id':1, 'name':'Activo'},
        {'id':0, 'name':'Inactivo'},
      ],
      date: null,
      menu: false,
      selected:[],
      itemsCategory: [],
      itemsCountry: [],
      dialog2: false,
      search: '',
      valid: true,
      editedIndex: -1,
      editedItem: {
        id: 0,
        documento: '',
        email: '',
        estado: 1,
        apellidos: '',
        nombres: '',
        movil: '',
        categoria: '',
        pais: '',
        contraseña: '',
        rePassword: '',
      },
      nameRules: [
        v => !!v || 'Campo Obligatorio',
        v => (v && v.length <= 100 && v.length >= 5) || 'Este Campo debe tener entre 5 y 100 caracteres',
      ],
      addressRules: [
        // v => !!v || 'Campo Obligatorio',
        v => (v && v.length <= 180) || 'Este Campo debe tener maximo 180 caracteres',
      ],
      phoneRules: [
        // v => !!v || 'Campo Obligatorio',
        v => (!v || v.length == 10) || 'Telefono debe tener 10 caracteres',
      ],
      documentRules: [
        v => !!v || 'Campo Obligatorio',
        v => (!v || v.length <= 10) || 'El documento debe tener máximo de 10 caracteres',
      ],
      emailRules: [
        v => !!v || 'Campo Obligatorio',
        v => (!v || v.length <= 150) || 'El documento debe tener máximo de 150 caracteres',
        v => (!v || /.+@.+\..+/.test(v)) || 'Correo debe ser valido',
      ],
      passwordRequired:  {
          required: value => !!value || 'Campo Obligatorio',
      },
      passwordRules: [
        // v => !!v || 'Campo Obligatorio',
        v => (!v || (v && v.length >= 8)) || 'Contraseña debe tener mínimo de 8 caracteres',
      ],
      show3: false,
      show4: false,
      headers: [
        // { text: 'Id', value: 'id' },
        { text: 'Cedula', value: 'document' },
        { text: 'Nombres', value: 'first_name' },
        { text: 'Apellidos', value: 'last_name' },
        { text: 'Correo', value: 'email' },
        { text: 'Telefono', value: 'movil' },
        { text: 'Categoria', value: 'CategoryName' },
      ],

    }),

    computed:{
      ...mapState(['usuarios']),
      
      passwordConfirmation() {
        return () => (this.usuarios.editedItem.password === this.usuarios.editedItem.rePassword) || 'Las contraseñas deben coincidir'
      },
    },

    created () {
      this.initialize()
    },

    methods: {

      ...mapMutations([
        'clearForm',
        'loadAllData', 
        'editFormData'
      ]),

      initialize () {       

        this.loadDataTable()
        this.loadCategories()
        this.loadCountries()
      },
      validate () {
        if(this.$refs.form.validate()){
          this.saveUsuario();
        }
      },
      reset () {
        this.clearForm('usuarios');
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      saveUsuario() {
        let data = this.usuarios.editedItem;
        data.date_old = this.date;
        console.info(data)
        let route = (!data.id) ? 'profile/users' : 'profile/users/update'
        CrudVue.create(route, data, data.id)
          .then(response => {
            this.$store.commit("alert", {
              color: "success",
              visible: true,
              text: response.data.msg,
            });

            this.reset();
            this.loadDataTable()
          })
          .catch(error => {
            console.info(error.response)
            let msg = error.response.data.message;
            let objectArray = null;
            if(error.response.status == 422){
              objectArray = Object.entries(error.response.data.data.errors);
            }
            this.$store.commit("alert", {
              color: "error",
              visible: true,
              text: msg,
              html: objectArray,
            });
          });        
      },

      loadDataTable() {
        CrudVue.getAll('profile/users')
          .then(response => {
            let desserts = []
            response.data.data.forEach((value) => {
                
                desserts.push({
                  'id': value.id,
                  'document': value.document,
                  'email': value.email,
                  'first_name': value.first_name,
                  'last_name': value.last_name,
                  'movil': value.movil,
                  'CategoryName': value.category.name,
                });
            });
            this.loadAllData({'load': desserts, 'proceso':'usuarios'})
          });
      },

      loadCountries() {
        this.itemsCountry = [];
        CrudVue.getAll('countries')
          .then(response => { 
            const objectArray = Object.entries(response.data['data']);
            objectArray.forEach((value) => {
              this.itemsCountry.push({
                'id': value[0],
                'name': value[1].country
              });
            });
          });
      },

      loadCategories() {
        this.itemsCategory = [];
        CrudVue.getAll('categories')
          .then(response => { 
            response.data.data.forEach((value) => {
              this.itemsCategory.push({
                'id': value.id,
                'name': value.name
              });
            });
          });
      },
      
    },
  }

</script>

<style>
  .users--text{
    color: #2f556f;
  }
</style>