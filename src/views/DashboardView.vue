<template>
    <v-app>
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="4" v-if="role === 'administrador'">
                    <v-card class="mx-2 my-4 pa-3">
                        <v-card-title class="d-flex justify-center mb-8 mt-4">SERVICIOS PARA ADMINISTRADORES</v-card-title>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="12">
                                    <v-btn @click="goToRegister" color="primary" block class="mb-2">Registrar Nuevo
                                        Usuario</v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn @click="goToOwnersList" color="secondary" block>Propietarios</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" v-if="role === 'propietario'">
                    <v-card class="mx-2 my-4 pa-3">
                        <v-card-title class="d-flex justify-center">Servicios para Propietarios</v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" v-if="role === 'empleado'">
                    <v-card class="mx-2 my-4 pa-3">
                        <v-card-title class="d-flex justify-center">Servicios para Empleados</v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import api from '../services/api';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            loading: true,
            urbanizacion: {},
            role: ''
        };
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user')); // Cambiado a localStorage
        if (user) {
            this.role = user.role;
        } else {
            console.error('No se encontró el usuario en localStorage');
            this.role = null; // O algún valor por defecto
        }

        const urbanizacion = JSON.parse(localStorage.getItem('urbanizacion')); // Cambiado a localStorage
        if (urbanizacion && urbanizacion.id === parseInt(this.$route.params.id, 10)) {
            this.urbanizacion = urbanizacion;
            this.loading = false;
        } else {
            this.fetchUrbanizacion(this.$route.params.id);
        }
    },
    methods: {
        ...mapActions(['login']),
        fetchUrbanizacion(id) {
            api.get(`/urbanizacion/${id}`)
                .then(response => {
                    this.urbanizacion = response.data;
                    localStorage.setItem('urbanizacion', JSON.stringify(this.urbanizacion)); // Almacenar en localStorage
                    this.login(this.urbanizacion); // Actualizar el estado en Vuex
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error cargando los datos de la urbanización', error);
                    this.loading = false;
                });
        },
        goToRegister() {
            const urbanizacion = JSON.parse(localStorage.getItem('urbanizacion')); // Cambiado a localStorage
            if (urbanizacion) {
                this.$router.push({ name: 'register', params: { id: urbanizacion.id } });
            } else {
                console.error('No se encontró la urbanización en localStorage');
            }
        },
        goToOwnersList() {
            const urbanizacion = JSON.parse(localStorage.getItem('urbanizacion')); // Cambiado a localStorage
            if (urbanizacion) {
                this.$router.push({ name: 'propietarios', params: { id: urbanizacion.id } });
            } else {
                console.error('No se encontró la urbanización en localStorage');
            }
        }
    }
};
</script>