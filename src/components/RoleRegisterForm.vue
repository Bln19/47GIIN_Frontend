<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid class="transparent-container">
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <v-card class="elevation-12 rounded-lg transparent-card">
                            <v-card-text class="pa-5 mb-5">
                                <h2 class="text-center mb-10 black--text font-weight-light">AÑADIR NUEVO ROL</h2>
                                <v-form ref="form" @submit.prevent="addRole">
                                    <v-text-field v-model="roleName" label="Nombre del Rol" outlined
                                        class="black--text flex-grow-1" :rules="[rules.required]">
                                    </v-text-field>
                                    <v-row justify="center">
                                        <v-col cols="8" md="4">
                                            <v-btn :color="buttonColor" rounded large block type="submit" @mouseover="changeColor" @mouseleave="revertColor" class="mb-2">Añadir</v-btn>
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

export default {
    name: 'RoleRegisterForm',
    data() {
        return {
            roleName: '',
            buttonColor: 'red darken-3',
            error: null,
            success: null,
            rules: {
                required: value => !!value || 'Este campo es requerido'
            }
        };
    },
    methods: {
        async addRole() {
            this.error = null;
            this.success = null;
            const urbanization = JSON.parse(localStorage.getItem('urbanizacion'));
            if (!urbanization || !urbanization.id_urbanizacion) {
                this.error = 'No se encontró la urbanización';
                console.error('No se encontró la urbanización');
                return;
            }

            const requestData = {
                nombre: this.roleName
            };

            try {
                const response = await api.post('/roles', requestData);
                if (response.data.success) {
                    this.success = 'Rol añadido exitosamente';
                    this.$router.push({ name: 'roles', params: { id: urbanization.id } });
                } else {
                    this.error = response.data.error || 'Error al añadir rol';
                }
            } catch (error) {
                this.error = 'Error en la solicitud: ' + error.message;
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
