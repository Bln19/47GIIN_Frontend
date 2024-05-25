<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid class="transparent-container">
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <v-card class="elevation-12 rounded-lg transparent-card">
                            <v-card-text class="pa-5 mb-5">
                                <h2 class="text-center mb-10 black--text font-weight-light">REGISTRAR NUEVO USUARIO</h2>
                                
                                <v-form ref="form">
                                    <div class="d-flex align-center mt-5 mb-5">
                                        <font-awesome-icon :icon="['fas', 'user']" class="black--text mr-3" />
                                        <v-text-field v-model="user.name" label="Nombre" outlined
                                            class="black--text flex-grow-1" :rules="[rules.required]">
                                        </v-text-field>
                                    </div>
                                    <div class="d-flex align-center mt-5 mb-5">
                                        <font-awesome-icon :icon="['fas', 'user']" class="black--text mr-3" />
                                        <v-text-field v-model="user.surnames" label="Apellidos" outlined
                                            class="black--text flex-grow-1" :rules="[rules.required]">
                                        </v-text-field>
                                    </div>
                                    <div class="d-flex align-center mt-5 mb-5">
                                        <font-awesome-icon :icon="['fas', 'phone']" class="black--text mr-3" />
                                        <v-text-field v-model="user.telephone" label="Teléfono" outlined
                                            class="black--text flex-grow-1" :rules="[rules.required]">
                                        </v-text-field>
                                    </div>
                                    <div class="d-flex align-center mt-5 mb-5">
                                        <font-awesome-icon :icon="['fas', 'envelope']" class="black--text mr-3" />
                                        <v-text-field v-model="user.email" label="E-mail" outlined
                                            class="black--text flex-grow-1" :rules="[rules.required]">
                                        </v-text-field>
                                    </div>
                                    <div class="d-flex align-center mb-5">
                                        <font-awesome-icon :icon="['fas', 'user']" class="black--text mr-3" />
                                        <v-text-field v-model="user.username" label="Nombre de Usuario" outlined
                                            class="black--text flex-grow-1" :rules="[rules.required]">
                                        </v-text-field>
                                    </div>
                                    <div class="d-flex align-center mt-5 mb-5">
                                        <font-awesome-icon :icon="['fas', 'lock']" class="black--text mr-3" />
                                        <v-text-field v-model="user.password" label="Contraseña" type="password" outlined
                                            class="black--text flex-grow-1" :rules="[rules.required]">
                                        </v-text-field>
                                    </div>
                                    <div class="d-flex align-center mt-5 mb-5">
                                        <font-awesome-icon :icon="['fas', 'user-tag']" class="black--text mr-3" />
                                        <v-select v-model="user.role" :items="roles" label="Selecciona Rol" outlined
                                            class="black--text flex-grow-1" :rules="[rules.required]">
                                        </v-select>
                                    </div>
                                    <v-row justify="center">
                                        <v-col cols="8" md="4">
                                            <v-btn :color="buttonColor" rounded large block @click="registerUser"
                                                @mouseover="changeColor" @mouseleave="revertColor" class="mb-2">REGISTRAR</v-btn>
                                        </v-col>
                                        <v-col cols="8" md="4">
                                            <v-btn color="secondary" rounded large block @click="goBack" class="mb-2">Volver</v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-alert v-if="error" type="error" dense>{{ error }}</v-alert>
                                    <v-alert v-if="success" type="success" dense>{{ success }}</v-alert>
                                </v-form>
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
    name: 'UserRegisterForm',
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            buttonColor: 'red darken-3',
            user: {
                name: '',
                surnames: '',
                telephone: '',
                username: '',
                email: '',
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
        async registerUser() {
            this.error = null;
            this.success = null;
            if (this.$refs.form.validate()) {
                const urbanization = JSON.parse(localStorage.getItem('urbanizacion'));
                if (!urbanization || !urbanization.id_urbanizacion) {
                    this.error = 'No se encontró la urbanización';
                    console.error('No se encontró la urbanización');
                    return;
                }

                const requestData = {
                    urbanization_id: urbanization.id_urbanizacion,
                    nombre: this.user.name,
                    apellidos: this.user.surnames,
                    telefono: this.user.telephone,
                    email: this.user.email,
                    username: this.user.username,
                    contrasena: this.user.password,
                    rol: this.user.role,
                };

                try {
                    const response = await api.post('/register', requestData);
                    if (response.data.success) {
                        this.success = 'Usuario registrado exitosamente';
                        this.user = {
                            name: '',
                            surnames: '',
                            telephone: '',
                            email: '',
                            username: '',
                            password: '',
                            role: ''
                        };
                    } else {
                        this.error = response.data.error || 'Error al registrar usuario';
                    }
                } catch (error) {
                    this.error = 'Error en la solicitud: ' + error.message;
                }
            }
        },
        changeColor() {
            this.buttonColor = "teal darken-4";
        },
        revertColor() {
            this.buttonColor = "red darken-3";
        },
        goBack() {
            this.$router.go(-1); // Volver a la página anterior
        }
    }
};
</script>

<style scoped>
html,
body,
#app {
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
    background-color: rgba(255, 255, 255, 0.6) !important;
    /* Ajustar transparencia */
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

.black--text {
    color: rgb(8, 8, 8);
}
</style>
