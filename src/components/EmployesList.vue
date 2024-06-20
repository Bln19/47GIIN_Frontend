<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid class="transparent-container">
                <v-row justify="center">
                    <v-col cols="12" md="8">
                        <v-card class="elevation-12 rounded-lg transparent-card">
                            <v-card-text class="pa-5 mb-5">
                                <v-row>
                                    <v-col cols="9">
                                        <h2 class="text-center mb-10 black--text font-weight-light">LISTADO DE EMPLEADOS</h2>
                                    </v-col>
                                    <v-col cols="3" class="d-flex justify-end">
                                        <v-btn color="secondary" rounded large block @click="generateReport">Generar Reporte</v-btn>
                                    </v-col>
                                </v-row>
                                <v-list>
                                    <v-list-item 
                                        v-for="(empleado, index) in empleados" 
                                        :key="empleado.id_perfilUsuario" 
                                        :class="['list-item', {'alt-row': index % 2 === 1}]"
                                        two-line
                                    >
                                        <v-row class="d-flex align-center" style="width: 100%;">
                                            <v-col cols="9">
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ index + 1 }}. {{ empleado.nombre }} {{ empleado.apellidos }}</v-list-item-title>
                                                    <v-list-item-subtitle>Id: {{ empleado.id_perfilUsuario }}</v-list-item-subtitle>
                                                    <v-list-item-subtitle>{{ empleado.telefono }} - {{ empleado.email }}</v-list-item-subtitle>
                                                    <v-list-item-subtitle>Usuario: {{ empleado.username }}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-col>
                                            <v-col cols="2" class="d-flex justify-end">
                                                <v-btn color="amber" rounded large block @click="editEmpleado(empleado.id_perfilUsuario)">Editar</v-btn>
                                                <v-btn color="red" rounded large block class="ml-2" @click="deleteEmpleado(empleado.id_perfilUsuario)">Eliminar</v-btn>                                    
                                            </v-col>
                                        </v-row>
                                    </v-list-item>
                                </v-list>
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
            empleados: []
        };
    },
    created() {
        this.fetchEmpleados();
    },
    methods: {
        async fetchEmpleados() {
            try {
                const response = await api.get('/empleados');
                this.empleados = response.data;
            } catch (error) {
                console.error('Error cargando los datos de los empleados', error);
            }
        },
        async deleteEmpleado(id) {
            if (confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
                try {
                    await api.delete(`/empleados/${id}`);
                    this.empleados = this.empleados.filter(empleado => empleado.id_perfilUsuario !== id);
                } catch (error) {
                    console.error('Error eliminando el empleado', error);
                }
            }
        },
        editEmpleado(id) {
            this.$router.push({ name: 'edit-empleado', params: { id } });
        },
        goBack() {
            this.$router.go(-1); 
        },
        async generateReport() {
            try {
                const response = await api.get(`/report/empleados/pdf`, { responseType: 'blob' });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'empleados_reporte.pdf');
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.error('Error generando el reporte', error);
                alert('Error generando el reporte');
            }
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
</style>
