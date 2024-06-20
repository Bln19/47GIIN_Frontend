<template>
    <v-app>
        <v-container fluid>
            <v-row>

                <v-col cols="12" md="4" v-if="role === 'superadmin'">
                    <v-card class="mx-2 my-4 pa-3">
                        <v-card-title class="d-flex justify-center mb-8 mt-4">SERVICIOS PARA SUPERADMIN</v-card-title>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="12">
                                    <v-btn @click="goToRegisterUrbanization" class="rounded-btn superadmin-border mb-2" block>Registrar Nueva Urbanización</v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn @click="goToUrbanizationsList" class="rounded-btn superadmin-border mb-2" block>Urbanizaciones</v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn @click="goToCountryList" class="rounded-btn superadmin-border mb-2" block>Paises</v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn @click="goToCityList" class="rounded-btn superadmin-border mb-2" block>Ciudades</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4" v-if="role === 'administrador'">
                    <v-card class="mx-2 my-4 pa-3">
                        <v-card-title class="d-flex justify-center mb-8 mt-4">SERVICIOS PARA ADMINISTRADORES</v-card-title>
                        <v-card-actions>
                            <v-row>
                                <v-col cols="12">
                                    <v-btn @click="goToRegister" class="rounded-btn admin-border mb-2" block>Registrar Nuevo Usuario</v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn @click="goToOwnersList" class="rounded-btn owner-border" block>Propietarios</v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn @click="goToEmployesList" class="rounded-btn employee-border" block>Empleados</v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn @click="goToRolesList" class="rounded-btn role-border" block>Roles</v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn @click="goToPermissionsList" class="rounded-btn permission-border" block>Permisos</v-btn>
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
        const user = JSON.parse(localStorage.getItem('user')); 
        if (user) {
            this.role = user.role;
        } else {
            console.error('No se encontró el usuario en localStorage');
            this.role = null;
        }

        const urbanizacion = JSON.parse(localStorage.getItem('urbanizacion')); 
        console.log(urbanizacion);
        if (urbanizacion !== undefined) {
            // Cuando no sea superAdmin
            this.fetchUrbanizacion(this.$route.params.id);
        }
    },
    methods: {
        ...mapActions(['login']),
        fetchUrbanizacion(id) {
            api.get(`/urbanizacion/${id}`)
                .then(response => {
                    this.urbanizacion = response.data;
                    localStorage.setItem('urbanizacion', JSON.stringify(this.urbanizacion));
                    this.login(this.urbanizacion); 
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error cargando los datos de la urbanización', error);
                    this.loading = false;
                });
        },
        goToRegister() {
            const urbanizacion = JSON.parse(localStorage.getItem('urbanizacion'));
            if (urbanizacion) {
                this.$router.push({ name: 'register', params: { id: urbanizacion.id } });
            } else {
                console.error('No se encontró la urbanización en localStorage');
            }
        },
        goToOwnersList() {
            const urbanizacion = JSON.parse(localStorage.getItem('urbanizacion'));
            if (urbanizacion) {
                this.$router.push({ name: 'propietarios', params: { id: urbanizacion.id } });
            } else {
                console.error('No se encontró la urbanización en localStorage');
            }
        },
        goToEmployesList() {
            const urbanizacion = JSON.parse(localStorage.getItem('urbanizacion'));
            if (urbanizacion) {
                this.$router.push({ name: 'empleados', params: { id: urbanizacion.id } });
            } else {
                console.error('No se encontró la urbanización en localStorage');
            }
        },
        goToRolesList() {
            const urbanizacion = JSON.parse(localStorage.getItem('urbanizacion'));
            if (urbanizacion) {
                this.$router.push({ name: 'roles', params: { id: urbanizacion.id } });
            } else {
                console.error('No se encontró la urbanización en localStorage');
            }
        },
        goToPermissionsList(){
            const urbanizacion = JSON.parse(localStorage.getItem('urbanizacion'));
            if (urbanizacion) {
                this.$router.push({ name: 'permissions', params: { id: urbanizacion.id } });
            } else {
                console.error('No se encontró la urbanización en localStorage');
            }

        },
        goToRegisterUrbanization() {
            this.$router.push({ name: 'add-urbanizacion' });
        },
        goToCountryList() {
            this.$router.push({ name: 'list-country' });
        },
        goToCityList(){
            this.$router.push({ name: 'list-city' });

        },
        goToUrbanizationsList(){
            this.$router.push({ name: 'list-urbanization' });
        },

    }
};
</script>

<style scoped>
.rounded-btn {
    border-radius: 25px;
    border: 2px solid;
    background-color: transparent;
}

.admin-border {
    border-color: #3f51b5;
    color: #3f51b5;
}

.owner-border {
    border-color: #ff5722;
    color: #ff5722;
}

.employee-border {
    border-color: #1a7b82;
    color: #1a7b82;
}

.role-border{
    border-color: #b5623f;
    color: #b5623f;
}
.permission-border{
    border-color: #943fb5;
    color: #943fb5;

}
.services-border{
    border-color: #0b8349;
    color: #0b8349;
}

</style>