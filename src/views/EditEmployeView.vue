<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid class="transparent-container">
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <v-card class="elevation-12 rounded-lg transparent-card">
                            <v-card-text class="pa-5 mb-5">
                                <h2 class="text-center mb-10 black--text font-weight-light">EDITAR EMPLEADO</h2>
                                <v-form @submit.prevent="updateEmpleado">
                                    <v-text-field v-model="empleado.nombre" label="Nombre" outlined></v-text-field>
                                    <v-text-field v-model="empleado.apellidos" label="Apellidos" outlined></v-text-field>
                                    <v-text-field v-model="empleado.telefono" label="Teléfono" outlined></v-text-field>
                                    <v-text-field v-model="empleado.email" label="Email" outlined></v-text-field>
                                    <v-row justify="center">
                                        <v-col cols="8" md="4">
                                            <v-btn type="submit" color="primary" rounded large block>Guardar</v-btn>
                                        </v-col>
                                        <v-col cols="8" md="4">
                                            <v-btn color="secondary" rounded large block @click="goBack">Volver</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
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
import api from '../services/api';

export default {
    data() {
        return {
            empleado: {
                nombre: '',
                apellidos: '',
                telefono: '',
                email: ''
            },
            success: null,
            error: null
        };
    },
    created() {
        this.fetchEmpleado();
    },
    methods: {
        async fetchEmpleado() {
            const { id } = this.$route.params;
            try {
                const response = await api.get(`/empleados/${id}`);
                this.empleado = response.data;
            } catch (error) {
                console.error('Error cargando los datos del empleado', error);
                this.error = 'Error cargando los datos del empleado';
            }
        },
        async updateEmpleado() {
            const { id } = this.$route.params;
            try {
                const response = await api.put(`/empleados/${id}`, this.empleado);
                if (response.data.success) {
                    this.success = 'Empleado actualizado exitosamente';
                } else {
                    this.error = response.data.error || 'Error al actualizar empleado';
                }
            } catch (error) {
                console.error('Error en la solicitud', error);
                this.error = 'Error en la solicitud: ' + error.message;
            }
        },
        goBack() {
            this.$router.go(-1);
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
