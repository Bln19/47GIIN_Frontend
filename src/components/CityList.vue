<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid class="transparent-container">
                <v-row justify="center">
                    <v-col cols="12" md="8">
                        <v-card class="elevation-12 rounded-lg transparent-card">
                            <v-card-text class="pa-5 mb-5">
                                <h2 class="text-center mb-10 black--text font-weight-light">LISTADO DE TODAS LAS CIUDADES</h2>
                                <v-list>
                                    <v-list-item v-for="(ciudad, index) in ciudades" :key="ciudad.id_ciudad" :class="['list-item', { 'alt-row': index % 2 === 1 }]" two-line>
                                        <v-row class="d-flex align-center" style="width: 100%;">
                                            <v-col cols="6">
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ ciudad.ciudad_nombre }}</v-list-item-title>
                                                    <v-list-item-subtitle>{{ ciudad.pais_nombre }}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-col>
                                            <v-col cols="6" class="d-flex justify-end">
                                                <v-btn color="amber" rounded class="mr-2 small-btn" @click="editCity(ciudad.id_ciudad)">Editar</v-btn>
                                                <v-btn color="red" rounded class="ml-2 small-btn" @click="deleteCity(ciudad.id_ciudad)">Eliminar</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-list-item>
                                </v-list>
                                <v-row justify="center">
                                    <v-col cols="1" md="2" class="text-center">
                                        <v-btn color="secondary" rounded block @click="goBack" class="mb-2 small-btn">Volver</v-btn>
                                    </v-col>
                                </v-row>
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
            ciudades: [],
        };
    },
    created() {
        this.fetchCiudades();
    },
    methods: {
        async fetchCiudades() {
            try {
                const response = await api.get('/ciudades');
                this.ciudades = response.data;
            } catch (error) {
                console.error('Error cargando las ciudades', error);
            }
        },
        async deleteCity(id) {
            if (confirm("¿Estás seguro de que deseas eliminar esta ciudad?")) {
                try {
                    const response = await api.delete(`/ciudad/${id}`);
                    this.ciudades = this.ciudades.filter(ciudad => ciudad.id_ciudad !== id);
                    alert(response.data.success);
                } catch (error) {

                    alert('No se pueden eliminar ciudades que contienen urbanizaciones');
                }
            }
        },
        editCity(id) {
            this.$router.push({ name: 'edit-city', params: { id } });
        },
        goBack() {
            this.$router.go(-1);
        },
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

.alt-row {
    background-color: rgba(240, 240, 240, 0.8);
}

.list-item {
    margin-bottom: 2rem;
}

.small-btn {
    min-width: 100px;
}
</style>
