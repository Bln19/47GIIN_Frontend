<template>
  <v-app style="height: 100vh;">
    <v-main>
      <v-container fluid class="transparent-container">
        <v-row justify="center">
          <v-col cols="12" md="3">
            <v-card class="elevation-12 rounded-lg transparent-card">
              <v-card-text class="pa-5 mb-5">
                <h2 class="text-center mb-10 white--text font-weight-light">INICIAR SESIÓN</h2>
                <div class="d-flex align-center mb-5">
                  <font-awesome-icon :icon="['fas', 'user']" class="white--text mr-3" />
                  <v-text-field 
                    v-model="credentials.username"  
                    label="Nombre de Usuario" 
                    outlined
                    class="white--text flex-grow-1">
                  </v-text-field>
                </div>
                <div class="d-flex align-center mt-5 mb-5">
                  <font-awesome-icon :icon="['fas', 'lock']" class="white--text mr-3" />
                  <v-text-field 
                    v-model="credentials.password" 
                    label="Contraseña" 
                    type="password" 
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
                  class="mb-2">ENTRAR</v-btn>
                <v-alert v-if="errors.login" type="error" dense>{{ errors.login }}</v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import api from '../services/api';
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
    async login() {
      this.errors.username = this.credentials.username ? null : "El nombre de usuario es obligatorio.";
      this.errors.password = this.credentials.password ? null : "La contraseña es obligatoria.";

      if (!this.errors.username && !this.errors.password) {
        try {
          const response = await api.post('/login', {
            username: this.credentials.username,
            password: this.credentials.password
          });
          console.log("Respuesta del servidor:", response);

          if (response.data.access_token) {
            console.log("Datos de la urbanización recibidos:", response.data.urbanizacion);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('role', response.data.user.role);
            localStorage.setItem('urbanization', JSON.stringify(response.data.urbanizacion));
            this.$router.push({ 
              name: 'dashboard',
              params: { id: response.data.urbanizacion.id }
            });
          } else {
            this.errors.login = response.data.error || "Credenciales incorrectas.";
          }
        } catch (error) {
          console.log("Error en la solicitud:", error);
          this.errors.login = "Problemas de conexión o datos incorrectos. " + error.message;
        }
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
