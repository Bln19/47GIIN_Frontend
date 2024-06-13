<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid class="transparent-container">
                <v-row justify="center">
                    <v-col cols="12" md="8">
                        <v-card class="elevation-12 rounded-lg transparent-card">
                            <v-card-text class="pa-5 mb-5">
                                <h2 class="text-center mb-10 black--text font-weight-light">LISTADO DE TODOS LOS ROLES</h2>
                                <v-list>
                                    <v-list-item v-for="(rol, index) in roles" :key="rol.id_rol" :class="['list-item', { 'alt-row': index % 2 === 1 }]" two-line>
                                        <v-row class="d-flex align-center" style="width: 100%;">
                                            <v-col cols="8">
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ rol.nombre }}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-col>
                                            <v-col cols="4" class="d-flex justify-end">
                                                <v-btn color="blue" rounded class="mr-2 small-btn" @click="viewPermisos(rol.id_rol)">Ver Permisos</v-btn>
                                                <v-btn color="amber" rounded class="mr-2 small-btn" @click="editRol(rol.id_rol)">Editar</v-btn>
                                                <v-btn color="red" rounded class="ml-2 small-btn" @click="deleteRol(rol.id_rol)">Eliminar</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-list-item>
                                </v-list>
                                <v-row justify="center">
                                    <v-col cols="1" md="3" class="text-center">
                                        <v-btn :color="buttonColor" rounded block class="mb-2 small-btn" @click="addRol" @mouseover="changeColor" @mouseleave="revertColor">Añadir Rol</v-btn>
                                    </v-col>
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
            roles: [],
            buttonColor: 'primary'
        };
    },
    created() {
        this.fetchRoles();
    },
    methods: {
        async fetchRoles() {
            try {
                const response = await api.get('/roles/all');
                this.roles = response.data;
            } catch (error) {
                console.error('Error cargando los roles', error);
            }
        },
        async deleteRol(id) {
            if (confirm("¿Estás seguro de que deseas eliminar este rol?")) {
                try {
                    const response = await api.delete(`/roles/${id}`);
                    this.roles = this.roles.filter(rol => rol.id_rol !== id);
                    alert(response.data.success);
                } catch (error) {
                    console.error('Error eliminando el rol', error);
                    alert('Error eliminando el rol');
                }
            }
        },
        editRol(id) {
            this.$router.push({ name: 'edit-rol', params: { id } });
        },
        viewPermisos(id) {
            this.$router.push({ name: 'permissions-role', params: { id } });
        },
        addRol() {
            this.$router.push({ name: 'add-rol' });
        },
        goBack() {
            this.$router.go(-1);
        },
        changeColor() {
            this.buttonColor = "red darken-3 ";
        },
        revertColor() {
            this.buttonColor = "teal darken-4";
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
