<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid class="transparent-container">
                <v-row justify="center">
                    <v-col cols="12" md="8">
                        <v-card class="elevation-12 rounded-lg transparent-card">
                            <v-card-text class="pa-5 mb-5">
                                <h2 class="text-center mb-10 black--text font-weight-light">LISTADO DE ROLES</h2>
                                <v-list>
                                    <v-list-item 
                                        v-for="(role, index) in roles" 
                                        :key="role.id_rol" 
                                        :class="['list-item', {'alt-row': index % 2 === 1}]"
                                        two-line
                                    >
                                        <v-row class="d-flex align-center" style="width: 100%;">
                                            <v-col cols="12">
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ index + 1 }}. {{ role.nombre }}</v-list-item-title>
                                                    <v-list-item-subtitle>Id: {{ role.id_rol }}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-col>
                                        </v-row>
                                    </v-list-item>
                                </v-list>
                                <v-row justify="center">
                                    <v-col cols="8" md="4">
                                        <v-btn :color="buttonColor" rounded large block @click="goToAddRole" @mouseover="changeColor" @mouseleave="revertColor" class="mb-2">Añadir Rol</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row justify="center">
                                    <v-col cols="8" md="4">
                                        <v-btn color="secondary" rounded large block @click="goBack" class="mb-2">Volver</v-btn>
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
            buttonColor: 'red darken-3',
            success: null,
            error: null
        };
    },
    created() {
        this.fetchRoles();
    },
    methods: {
        async fetchRoles() {
            try {
                const response = await api.get('/roles');
                this.roles = response.data;
            } catch (error) {
                console.error('Error cargando los datos de los roles', error);
            }
        },
        async goToAddRole() {
            const urbanizacion = JSON.parse(localStorage.getItem('urbanizacion'));
            if (urbanizacion) {
                this.$router.push({ name: 'add-role', params: { id: urbanizacion.id } });
            } else {
                console.error('No se encontró la urbanización en localStorage');
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
    margin-bottom: 2rem; /* Añadir un margen inferior para el espacio */
}
</style>
