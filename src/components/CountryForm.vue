<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid class="transparent-container">
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <v-card class="elevation-12 rounded-lg transparent-card">
                            <v-card-text class="pa-5 mb-5">
                                <h2 class="text-center mb-10 black--text font-weight-light">NUEVO PAÍS</h2>
                                <v-form ref="form">
                                    <v-text-field v-model="pais.nombre" label="Nombre" outlined></v-text-field>
                                    <v-text-field v-model="pais.capital" label="Capital" outlined></v-text-field>
                                    
                                    <v-row justify="center">
                                        <v-col cols="8" md="4">
                                            <v-btn color="primary" rounded large block @click="registerPais">Guardar</v-btn>
                                        </v-col>
                                        <v-col cols="8" md="4">
                                            <v-btn color="secondary" rounded large block @click="goBack">Volver</v-btn>
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
    data() {
        return {
            pais: {
                nombre: '',
                capital: ''
            },
            success: null,
            error: null
        };
    },
    methods: {
        async registerPais() {
            try {
                const response = await api.post('/paises', this.pais);
                if (response.data.success) {
                    this.success = 'País registrado exitosamente';
                    this.clearCountryData();
                    this.$router.push({ name: 'add-city' });
                } else {
                    this.error = response.data.error || 'Error al registrar país';
                }
            } catch (error) {
                this.error = 'Error en la solicitud: ' + error.message;
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        saveCountryData() {
            localStorage.setItem('countryData', JSON.stringify(this.pais));
        },
        clearCountryData() {
            this.pais = {
                nombre: '',
                capital: ''
            };
            localStorage.removeItem('countryData');
        }
    },
    mounted() {
        const savedCityData = localStorage.getItem('cityData');
        if (savedCityData) {
            this.cityData = JSON.parse(savedCityData);
        }
    }
};
</script>

<style scoped>
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

.v-btn.icon {
    padding: 0;
    min-width: 0;
    width: 28px;
    height: 28px;
    border-radius: 3px;
}
</style>
