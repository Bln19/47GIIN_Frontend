<template>
  <v-app style="height: 100vh;">
    <v-main>
      <v-container fluid class="transparent-container">
        <v-row justify="center">
          <v-col cols="12" md="3">
            <v-card class="elevation-12 rounded-lg transparent-card ">
              <v-card-text class="pa-5 mb-5">
                <h2 class="text-center mb-10 white--text font-weight-light">INICIAR SESI&Oacute;N</h2>

                <div class="d-flex align-center mb-5">
                  <font-awesome-icon :icon="['fas', 'user']" class="white--text mr-3" />
                  <v-text-field v-model="credentials.username" label="Nombre de Usuario" outlined
                    class="white--text flex-grow-1">
                  </v-text-field>
                </div>

                <div class="d-flex align-center mt-5 mb-5">
                  <font-awesome-icon :icon="['fas', 'lock']" class="white--text mr-3" />
                  <v-text-field v-model="credentials.password" label="Contrase&ntilde;a" type="password" 
                    outlined
                    class="white--text flex-grow-1">
                  </v-text-field>
                </div>

                <v-btn 
                  :color="buttonColor" 
                  rounded
                  large
                  block
                  @click="login" 
                  @mouseover="changeColor" 
                  @mouseleave="revertColor"
                  class="mb-2"
                >ENTRAR
                </v-btn>
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
  name: 'LoginForm',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      buttonColor: 'red darken-3',
      credentials: {
        username: '',
        password: ''
      },
      errors: {
        username: null,
        password: null,
        login: null
      }
    };
  },
  methods: {

    login() {
      this.errors.username = this.credentials.username ? null : "El nombre de usuario es obligatorio.";
      this.errors.password = this.credentials.password ? null : "La contraseña es obligatoria.";
      
      if (!this.errors.username && !this.errors.password) {
        axios.post('/api/login', {
          username: this.credentials.username,
          password: this.credentials.password
        })
        .then(response => {
          console.log(response);
          // Redirección al componente Home si el inicio de sesión es exitoso
          this.$router.push({ name: 'home' });
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            this.errors.login = "Usuario o contraseña no son correctos.";
          } else if (error.response && error.response.status === 404) {
            this.errors.login = "Usuario no registrado. Por favor, contacte al administrador.";
          } else {
            // Otro tipo de error HTTP
            this.errors.login = "Error al intentar iniciar sesión.";
          }
        });
      }

    },

    changeColor(){
      this.buttonColor = "teal darken-4";
    },
    revertColor(){
      this.buttonColor = "red darken-3";

    }
  }
}
</script>

<style scoped>
html,body,#app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.v-main {
  background: url('@/assets/background_2.jpg') no-repeat center center fixed;
  background-size: cover;
  
}

.transparent-container {

  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.transparent-card {
  background-color: rgba(255, 255, 255, 0.001);
}

.rounded-lg {
  border-radius: 10px;
}

.pa-5 {
  padding: 2.5rem !important;
  /* Ajusta el espaciado interno */
}

.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 1rem !important;
}

.white--text {
  color: white;
 
}


</style>
