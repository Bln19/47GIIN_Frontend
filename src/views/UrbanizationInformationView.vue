<template>
   <v-app style="height: 100vh;">
      <v-main>
         <v-container fluid>
            <v-row justify="center">
               <v-col cols="12" md="8">
                  <v-card class="elevation-12 rounded-lg">
                     <v-card-text class="pa-5 mb-5">
                        <h2 class="text-center mb-10 black--text font-weight-light">INFORMACIÓN DE LA URBANIZACIÓN</h2>
                        <v-list>
                           <v-list-item two-line>
                              <v-list-item-content>
                                 <v-list-item-title>Nombre: {{ urbanizacion.nombre }}</v-list-item-title>
                                 <v-list-item-subtitle>Dirección: {{ urbanizacion.direccion }}</v-list-item-subtitle>
                                 <v-list-item-subtitle>CIF: {{ urbanizacion.cif }}</v-list-item-subtitle>
                                 <v-list-item-subtitle>Código Postal: {{ urbanizacion.cod_postal }}</v-list-item-subtitle>
                                 <v-list-item-subtitle>ID Ciudad: {{ urbanizacion.id_ciudad }}</v-list-item-subtitle>
                                 <v-list-item-subtitle v-if="urbanizacion.url_logo">Logo: <img :src="urbanizacion.url_logo" alt="Logo de la Urbanización" /></v-list-item-subtitle>
                              </v-list-item-content>
                           </v-list-item>
                        </v-list>
                        <v-row justify="center">
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
   name: 'UrbanizationInformationView',
   data() {
      return {
         urbanizacion: {}
      };
   },
   created() {
      this.fetchUrbanizacion();
   },
   methods: {
      async fetchUrbanizacion() {
         const id = this.$route.params.id;
         try {
            const response = await api.get(`/urbanizacion/${id}`);
            this.urbanizacion = response.data;
         } catch (error) {
            console.error('Error cargando los datos de la urbanización', error);
         }
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

.list-item {
   margin-bottom: 2rem;
}

.small-btn {
   min-width: 100px;
}
</style>
