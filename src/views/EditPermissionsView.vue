<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid>
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <v-card class="elevation-12 rounded-lg">
                            <v-card-text class="pa-5 mb-5">
                                <h2 class="text-center mb-10 black--text font-weight-light">EDITAR PERMISO</h2>
                                
                                <v-form ref="form">
                                    <div class="mt-5 mb-5">
                                        <div class="d-flex align-center mb-2">
                                            <font-awesome-icon :icon="['fas', 'key']" class="black--text mr-3" />
                                            <label class="label-large black--text">Nombre</label>
                                        </div>
                                        <v-text-field v-model="permiso.nombre" outlined
                                            class="black--text flex-grow-1" :rules="[rules.required]">
                                        </v-text-field>
                                    </div>
                                    <div class="mt-5 mb-5">
                                        <div class="d-flex align-center mb-2">
                                            <font-awesome-icon :icon="['fas', 'file-alt']" class="black--text mr-3" />
                                            <label class="label-large black--text">Descripción</label>
                                        </div>
                                        <v-textarea v-model="permiso.descripcion" outlined
                                            class="black--text flex-grow-1" :rules="[rules.required]">
                                        </v-textarea>
                                    </div>
                                    <div class="mt-5 mb-5">
                                        <div class="d-flex align-center mb-2">
                                            <font-awesome-icon :icon="['fas', 'users']" class="black--text mr-3" />
                                            <label class="label-large black--text">Roles</label>
                                        </div>
                                        <div v-for="role in roles" :key="role.value" class="ml-5">
                                            <v-checkbox v-model="permiso.roles" :label="role.text" :value="role.value" hide-details>
                                            </v-checkbox>
                                        </div>
                                    </div>
                                    <v-row justify="center">
                                        <v-col cols="8" md="4">
                                            <v-btn :color="buttonColor" rounded large block @click="updatePermiso"
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
    name: 'EditPermission',
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            buttonColor: 'red darken-3',
            permiso: {
                nombre: '',
                descripcion: '',
                roles: []
            },
            roles: [],
            error: null,
            success: null,
            rules: {
                required: value => !!value || 'Este campo es requerido'
            }
        };
    },
    created() {
        this.fetchRoles();
        this.fetchPermiso();
    },
    methods: {
        async fetchRoles() {
            console.log("Fetching roles...");
            try {
                const response = await api.get('/roles/all');
                this.roles = response.data.map(role => ({
                    text: role.nombre,
                    value: role.id_rol
                }));
                console.log("Roles fetched:", JSON.stringify(this.roles));
            } catch (error) {
                console.error('Error cargando los roles', error);
                this.error = 'Error cargando los roles';
            }
        },
        async fetchPermiso() {
            console.log("Fetching permiso...");
            try {
                const response = await api.get(`/permisos/${this.$route.params.id}`);
                const permisoData = response.data;
                this.permiso = {
                    nombre: permisoData.nombre,
                    descripcion: permisoData.descripcion,
                    roles: permisoData.roles || [] 
                };
                console.log("Permiso fetched:", this.permiso);
            } catch (error) {
                console.error('Error cargando el permiso', error);
                this.error = 'Error cargando el permiso';
            }
        },
        async updatePermiso() {
            console.log("Updating permiso...");
            this.error = null;
            this.success = null;
            if (this.$refs.form.validate()) {
                const requestData = {
                    nombre: this.permiso.nombre,
                    descripcion: this.permiso.descripcion,
                    roles: [...this.permiso.roles]
                };
                console.log("Request data:", requestData);

                try {
                    const response = await api.put(`/permisos/${this.$route.params.id}`, requestData);
                    if (response.data.success) {
                        this.success = 'Permiso actualizado exitosamente';
                        this.$router.push({ name: 'permissions' });
                    } else {
                        this.error = response.data.error || 'Error al actualizar el permiso';
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
    },
    watch: {
        'permiso.roles': {
            handler(newVal) {
                console.log('Roles seleccionados:', JSON.stringify(newVal));
            },
            deep: true
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
