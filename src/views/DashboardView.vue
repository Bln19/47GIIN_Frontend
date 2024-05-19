<template>
    <div v-if="loading">
        Cargando datos...
    </div>
    <div v-else>
        <h1>Urbanización: {{ urbanizacion.nombre }}</h1>
        <p>CIF: {{ urbanizacion.cif }}</p>
        <p>Dirección: {{ urbanizacion.direccion }}</p>
        <p>Código Postal: {{ urbanizacion.cod_postal }}</p>
        <img :src="urbanizacion.url_logo" alt="Logo de la Urbanización" />
        <div v-if="role === 'administrador'">
            <h2>Servicios para Administradores</h2>
            <!-- Componentes y servicios exclusivos para administradores -->
            <v-btn @click="goToRegister" color="primary">Registrar Nuevo Usuario</v-btn>
        </div>
        <div v-if="role === 'propietario'">
            <h2>Servicios para Propietarios</h2>
            <!-- Componentes y servicios exclusivos para propietarios -->
        </div>
        <div v-if="role === 'empleado'">
            <h2>Servicios para Empleados</h2>
            <!-- Componentes y servicios exclusivos para empleados -->
        </div>
    </div>
</template>

<script>
import api from '../services/api';

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
        
        const urbanizacion = JSON.parse(localStorage.getItem('urbanization')); // Cambiado a localStorage
        if (urbanizacion && urbanizacion.id === parseInt(this.$route.params.id, 10)) {
            this.urbanizacion = urbanizacion;
            this.loading = false;
        } else {
            this.fetchUrbanizacion(this.$route.params.id);
        }
    },
    methods: {
        fetchUrbanizacion(id) {
            api.get(`/urbanizacion/${id}`)
                .then(response => {
                    this.urbanizacion = response.data;
                    localStorage.setItem('urbanization', JSON.stringify(this.urbanizacion)); // Almacenar en localStorage
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error cargando los datos de la urbanización', error);
                    this.loading = false;
                });
        },
        goToRegister() {
            const urbanizacion = JSON.parse(localStorage.getItem('urbanization')); // Cambiado a localStorage
            if (urbanizacion) {
                this.$router.push({ name: 'register', params: { id: urbanizacion.id } });
            } else {
                console.error('No se encontró la urbanización en localStorage');
            }
        }
    }
};
</script>
