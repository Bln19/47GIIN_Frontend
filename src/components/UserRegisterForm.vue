<template>
    <v-app>
      <v-main>
        <v-container fluid class="form-container">
          <v-row justify="center">
            <v-col cols="12" md="3">
              <v-card class="elevation-12 rounded-lg">
                <v-card-text class="pa-5 mb-5">
                  <h2 class="text-center mb-10 font-weight-light">REGISTRAR NUEVO USUARIO</h2>
                  <div class="d-flex align-center mb-5">
                    <font-awesome-icon :icon="['fas', 'user']" class="mr-3" />
                    <v-text-field 
                      v-model="user.username"  
                      label="Nombre de Usuario" 
                      outlined
                      class="flex-grow-1">
                    </v-text-field>
                  </div>
                  <div class="d-flex align-center mt-5 mb-5">
                    <font-awesome-icon :icon="['fas', 'lock']" class="mr-3" />
                    <v-text-field 
                      v-model="user.password" 
                      label="Contraseña" 
                      type="password" 
                      outlined
                      class="flex-grow-1">
                    </v-text-field>
                  </div>
                  <div class="d-flex align-center mt-5 mb-5">
                    <font-awesome-icon :icon="['fas', 'user-cog']" class="mr-3" />
                    <v-select 
                      v-model="user.role" 
                      :items="roles" 
                      label="Selecciona Rol" 
                      outlined
                      class="flex-grow-1">
                    </v-select>
                  </div>
                  <v-btn 
                    :color="buttonColor" 
                    rounded
                    large
                    block
                    @click="registerUser" 
                    @mouseover="changeColor" 
                    @mouseleave="revertColor"
                    class="mb-2">REGISTRAR</v-btn>
                  <v-btn 
                    :color="returnButtonColor"
                    rounded
                    large
                    block
                    @click="goToDashboard"
                    @mouseover="changeReturnButtonColor"
                    @mouseleave="revertReturnButtonColor"
                    class="mb-2">VOLVER</v-btn>
                  <v-alert v-if="error" type="error" dense>{{ error }}</v-alert>
                  <v-alert v-if="success" type="success" dense>{{ success }}</v-alert>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import axios from 'axios';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    name: 'UserRegisterForm',
    components: {
      FontAwesomeIcon
    },
    data() {
      return {
        buttonColor: 'red darken-3',
        returnButtonColor: 'secondary',
        user: {
          username: '',
          password: '',
          role: ''
        },
        roles: ['propietario', 'empleado'],
        error: null,
        success: null,
        rules: {
          required: value => !!value || 'Este campo es requerido'
        }
      };
    },
    methods: {
      registerUser() {
        this.error = null;
        this.success = null;
        if (this.$refs.form.validate()) {
          axios.post('http://localhost:4000/register', this.user)
            .then(response => {
              if (response.data.success) {
                this.success = 'Usuario registrado exitosamente';
                this.user.username = '';
                this.user.password = '';
                this.user.role = '';
              } else {
                this.error = response.data.error || 'Error al registrar usuario';
              }
            })
            .catch(error => {
              this.error = 'Error en la solicitud: ' + error.message;
            });
        }
      },
      changeColor() {
        this.buttonColor = "teal darken-4";
      },
      revertColor() {
        this.buttonColor = "red darken-3";
      },
      changeReturnButtonColor() {
        this.returnButtonColor = "red darken-3";
      },
      revertReturnButtonColor() {
        this.returnButtonColor = "secondary";
      },
      goToDashboard() {
        const urbanizacion = JSON.parse(sessionStorage.getItem('urbanizacion'));
        this.$router.push({ name: 'dashboard', params: { id: urbanizacion.id } });
      }
    }
  };
  </script>
  
  <style scoped>
  .v-main {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  
  .form-container {
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .rounded-lg {
    border-radius: 10px;
  }
  
  .pa-5 {
    padding: 2.5rem !important;
  }
  
  .text-center {
    text-align: center;
  }
  
  .mb-10 {
    margin-bottom: 2rem !important;
  }
  
  .mb-5 {
    margin-bottom: 1rem !important;
  }
  </style>
  