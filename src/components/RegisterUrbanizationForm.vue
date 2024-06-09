<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid class="transparent-container">
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <v-card class="elevation-12 rounded-lg transparent-card">
                            <v-card-text class="pa-5 mb-5">
                                <h2 class="text-center mb-10 black--text font-weight-light">NUEVA URBANIZACIÓN</h2>
                                <v-form ref="form">
                                    <v-text-field v-model="urbanizacion.nombre" label="Nombre" outlined></v-text-field>
                                    <v-text-field v-model="urbanizacion.cif" label="CIF" outlined></v-text-field>
                                    <v-text-field v-model="urbanizacion.direccion" label="Dirección" outlined></v-text-field>
                                    <v-text-field v-model="urbanizacion.cod_postal" label="Código Postal" outlined></v-text-field>
                                    

                                    <v-file-input
                                        label="Seleccionar Logo"
                                        prepend-icon="mdi-camera"
                                        @change="handleFileUpload"
                                        outlined
                                    ></v-file-input>

                                    <v-row>
                                        <v-col>
                                            <v-select v-model="selectedCityId" :items="ciudades" @update:modelValue="updateUrbanizacionCiudad" label="Nombre de la Ciudad" outlined item-title="nombre" item-value="id_ciudad" placeholder="Selecciona una ciudad"></v-select>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-btn color="teal darken-4" small icon class="rounded-square" @click="goToAddCity">
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>

                                    <v-row justify="center">
                                        <v-col cols="8" md="4">
                                            <v-btn color="primary" rounded large block @click="registerUrbanization">Guardar</v-btn>
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
            urbanizacion: {
                nombre: '',
                cif: '',
                direccion: '',
                cod_postal: '',
                id_ciudad: '',
            },
            logoFile: null,
            ciudades: [],
            selectedCityId: null,
            success: null,
            error: null
        };
    },
    async mounted() {
        await this.fetchCiudades();
    },
    methods: {
        async fetchCiudades() {
            try {
                const response = await api.get('/ciudades');
                this.ciudades = response.data;
            } catch (error) {
                console.error('Error al obtener la lista de ciudades:', error);
                this.error = 'Error al obtener la lista de ciudades.';
            }
        },
        handleFileUpload(event) {
            this.logoFile = event.target.files[0];
        },
        async registerUrbanization() {
            try {
                this.urbanizacion.id_ciudad = this.selectedCityId;
                let formData = new FormData();

                formData.append('nombre', this.urbanizacion.nombre);
                formData.append('cif', this.urbanizacion.cif);
                formData.append('direccion', this.urbanizacion.direccion);
                formData.append('cod_postal', this.urbanizacion.cod_postal);
                formData.append('id_ciudad', this.selectedCityId);
                
                if (this.logoFile) {
                    formData.append('logo', this.logoFile);
                }
                const response = await api.post('/register_urbanizacion', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.success) {
                    this.success = 'Urbanización registrada exitosamente';
                    this.urbanizacion = {
                        nombre: '',
                        cif: '',
                        direccion: '',
                        cod_postal: '',
                        id_ciudad: '',
                    };
                    this.logoFile = null;
                } else {
                    this.error = response.data.error || 'Error al registrar urbanización';
                }
            } catch (error) {
                this.error = 'Error en la solicitud: ' + error.message;
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        goToAddCity() {
            this.$router.push({ name: 'add-city' });
        },
        updateUrbanizacionCiudad() {
            this.urbanizacion.id_ciudad = this.selectedCityId;
        }
    },
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
