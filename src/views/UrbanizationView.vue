<template>
    <v-app style="height: 100vh;">
        <v-main>
            <v-container fluid class="transparent-container">
                <v-row justify="center">
                    <v-col cols="12" md="6">
                        <v-card class="elevation-12 rounded-lg transparent-card">
                            <v-card-title class="text-h5 text-center pa-5 mb-5">Detalles de la Urbanización</v-card-title>
                            <v-card-text>
                                <p><strong>Nombre:</strong> {{ urbanizacion.nombre }}</p>
                                <p><strong>CIF:</strong> {{ urbanizacion.cif }}</p>
                                <p><strong>Dirección:</strong> {{ urbanizacion.direccion }}</p>
                                <p><strong>Código Postal:</strong> {{ urbanizacion.cod_postal }}</p>
                                <img :src="urbanizacion.url_logo" alt="Logo de la Urbanización" class="logo" />
                                <v-row justify="center">
                                    <v-col cols="8" md="4">
                                        <v-btn color="secondary" rounded large block @click="goBack" class="mt-4">Volver</v-btn>
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
export default {
    data() {
        return {
            urbanizacion: {}
        };
    },
    created() {
        this.urbanizacion = JSON.parse(localStorage.getItem('urbanizacion')) || {};
    },
    methods: {
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

.logo {
    display: block;
    margin: 20px auto;
    max-width: 100%;
}
</style>
