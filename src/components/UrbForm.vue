<template>
    <div v-if="loading">
        Cargando datos...
    </div>
    <div v-else>
        <h1>Urbanización: {{ urbanizacionLocal.nombre }}</h1>
        <p>CIF: {{ urbanizacionLocal.cif }}</p>
        <p>Dirección: {{ urbanizacionLocal.direccion }}</p>
        <p>Código Postal: {{ urbanizacionLocal.cod_postal }}</p>
        <img :src="urbanizacionLocal.url_logo" alt="Logo de la Urbanización" />
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        urbanizacion: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    data() {
        return {
            loading: true,
            urbanizacionLocal: {}
        };
    },
    mounted() {
        if (this.urbanizacion && Object.keys(this.urbanizacion).length > 0) {
            this.urbanizacionLocal = { ...this.urbanizacion };
            this.loading = false;
        } else {
            axios.get('http://localhost:4000/urbanizacion')
                .then(response => {
                    this.urbanizacionLocal = response.data;
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error cargando los datos de la urbanización', error);
                    this.loading = false;
                });
        }
    }
};
</script>

<style scoped></style>