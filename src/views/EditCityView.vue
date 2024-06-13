<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid>
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <v-card class="elevation-12 rounded-lg">
                            <v-card-text class="pa-5 mb-5">
                                <h2 class="text-center mb-10 black--text font-weight-light">EDITAR CIUDAD</h2>
                                
                                <v-form ref="form">
                                    <div class="mt-5 mb-5">
                                        <div class="d-flex align-center mb-2">
                                            <font-awesome-icon :icon="['fas', 'city']" class="black--text mr-3" />
                                            <label class="label-large black--text">Nombre</label>
                                        </div>
                                        <v-text-field v-model="ciudad.nombre" outlined
                                            class="black--text flex-grow-1" :rules="[rules.required]">
                                        </v-text-field>
                                    </div>
                                    <div class="mt-5 mb-5">
                                        <div class="d-flex align-center mb-2">
                                            <font-awesome-icon :icon="['fas', 'globe']" class="black--text mr-3" />
                                            <label class="label-large black--text">País</label>
                                        </div>
                                        <v-select 
                                            v-model="ciudad.id_pais" 
                                            :items="paises" 
                                            item-title="nombre" 
                                            item-value="id_pais"
                                            outlined 
                                            class="black--text flex-grow-1" 
                                            :rules="[rules.required]">
                                        </v-select>
                                    </div>
                                    <v-row justify="center">
                                        <v-col cols="8" md="4">
                                            <v-btn :color="buttonColor" rounded large block @click="updateCiudad"
                                                @mouseover="changeColor" @mouseleave="revertColor" class="mb-2">ACTUALIZAR</v-btn>
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
    name: 'EditCityView',
    components: {
        FontAwesomeIcon
    },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            buttonColor: 'red darken-3',
            ciudad: {
                nombre: '',
                id_pais: ''
            },
            paises: [],
            error: null,
            success: null,
            rules: {
                required: value => !!value || 'Este campo es requerido'
            }
        };
    },
    created() {
        this.fetchCiudad();
        this.fetchPaises();
    },
    methods: {
        async fetchCiudad() {
            try {
                const response = await api.get(`/ciudad/${this.id}`);
                this.ciudad = response.data;
            } catch (error) {
                console.error('Error cargando la ciudad', error);
            }
        },
        async fetchPaises() {
            try {
                const response = await api.get('/paises');
                this.paises = response.data;
            } catch (error) {
                console.error('Error cargando los países', error);
            }
        },
        async updateCiudad() {
            this.error = null;
            this.success = null;
            if (this.$refs.form.validate()) {
                const requestData = {
                    nombre: this.ciudad.nombre,
                    id_pais: this.ciudad.id_pais
                };

                try {
                    const response = await api.put(`/ciudad/${this.id}`, requestData);
                    if (response.data.success) {
                        this.success = 'Ciudad actualizada exitosamente';
                        this.$router.go(-1);
                    } else {
                        this.error = response.data.error || 'Error al actualizar la ciudad';
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
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
.v-main {
    background: none;
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

.label-large {
    font-size: 1rem;
    font-weight: bold;
}
</style>
