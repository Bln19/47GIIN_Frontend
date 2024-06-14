<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid class="transparent-container">
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <v-card class="elevation-12 rounded-lg transparent-card">
                            <v-card-text class="pa-5 mb-5">
                                <h2 class="text-center mb-10 black--text font-weight-light">EDITAR CIUDAD</h2>
                                <v-form ref="form">
                                    <v-text-field v-model="ciudad.nombre" label="Nombre" outlined></v-text-field>

                                    <v-row>
                                        <v-col>
                                            <v-select 
                                                v-model="selectedPaisId" 
                                                :items="paises" 
                                                @update:modelValue="updateCiudadPais" 
                                                label="Nombre del País" 
                                                outlined 
                                                item-title="nombre" 
                                                item-value="id_pais" 
                                                placeholder="Selecciona un país">
                                            </v-select>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-btn color="teal darken-4" small icon class="rounded-square" @click="goToAddPais">
                                                <v-icon>mdi-plus</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>

                                    <v-row justify="center">
                                        <v-col cols="8" md="4">
                                            <v-btn color="primary" rounded large block @click="updateCiudad">Guardar</v-btn>
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
            ciudad: {
                nombre: '',
                id_pais: ''
            },
            paises: [],
            selectedPaisId: null,
            success: null,
            error: null
        };
    },
    async mounted() {
        await this.fetchPaises();
        await this.loadCityData();
    },
    methods: {
        async fetchPaises() {
            try {
                const response = await api.get('/paises');
                this.paises = response.data;
            } catch (error) {
                console.error('Error al obtener la lista de países:', error);
                this.error = 'Error al obtener la lista de países.';
            }
        },
        async loadCityData() {
            const id = this.$route.params.id;
            try {
                const response = await api.get(`/ciudad/${id}`);
                if (response.data) {
                    this.ciudad = response.data;
                    this.selectedPaisId = response.data.id_pais;
                } else {
                    this.error = 'Ciudad no encontrada.';
                }
            } catch (error) {
                this.error = 'Error al cargar los datos de la ciudad.';
            }
        },
        async updateCiudad() {
            try {
                this.ciudad.id_pais = this.selectedPaisId;
                const id = this.$route.params.id;
                const response = await api.put(`/ciudad/${id}`, this.ciudad);
                if (response.data.success) {
                    this.success = 'Ciudad actualizada exitosamente';
                    setTimeout(() => {
                    this.$router.push({ name: 'list-city' });
                    }, 2000);
                } else {
                    this.error = response.data.error || 'Error al actualizar ciudad';
                }
            } catch (error) {
                this.error = 'Error en la solicitud: ' + error.message;
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        goToAddPais() {
            this.saveCityData();
            this.$router.push({ name: 'add-country' });
        },
        updateCiudadPais() {
            this.ciudad.id_pais = this.selectedPaisId;
        },
        saveCityData() {
            localStorage.setItem('cityData', JSON.stringify(this.ciudad));
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
