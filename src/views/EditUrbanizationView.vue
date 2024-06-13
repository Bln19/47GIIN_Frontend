<template>
   <v-app style="height: 100vh;">
      <v-main>
         <v-container fluid class="transparent-container">
            <v-row justify="center">
               <v-col cols="12" md="6">
                  <v-card class="elevation-12 rounded-lg transparent-card">
                     <v-card-text class="pa-5 mb-5">
                        <h2 class="text-center mb-10 black--text font-weight-light">EDITAR URBANIZACIÓN</h2>
                        <v-form @submit.prevent="updateUrbanizacion">
                           <v-text-field v-model="urbanizacion.nombre" label="Nombre" outlined></v-text-field>
                           <v-text-field v-model="urbanizacion.cif" label="CIF" outlined></v-text-field>
                           <v-text-field v-model="urbanizacion.direccion" label="Dirección" outlined></v-text-field>
                           <v-text-field v-model="urbanizacion.cod_postal" label="Código Postal" outlined></v-text-field>
                           
                           <v-row>
                              <v-col>
                                 <v-select 
                                    v-model="urbanizacion.id_ciudad" 
                                    :items="ciudades" 
                                    label="Nombre de la Ciudad" 
                                    outlined 
                                    item-title="nombre" 
                                    item-value="id_ciudad" 
                                    placeholder="Selecciona una ciudad">
                                 </v-select>
                              </v-col>
                              <v-col cols="auto">
                                 <v-btn color="teal darken-4" small icon class="rounded-square" @click="goToAddCity">
                                    <v-icon>mdi-plus</v-icon>
                                 </v-btn>
                              </v-col>
                           </v-row>

                           <v-text-field v-model="urbanizacion.url_logo" label="URL Logo" outlined></v-text-field>
                           
                           <v-row justify="center">
                              <v-col cols="8" md="4">
                                 <v-btn type="submit" color="primary" rounded large block>Guardar</v-btn>
                              </v-col>
                              <v-col cols="8" md="4">
                                 <v-btn color="secondary" rounded large block @click="goBack">Volver</v-btn>
                              </v-col>
                           </v-row>
                        </v-form>
                        <v-alert v-if="error" type="error" dense>{{ error }}</v-alert>
                        <v-alert v-if="success" type="success" dense>{{ success }}</v-alert>
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
         urbanizacion: {
            nombre: '',
            cif: '',
            direccion: '',
            cod_postal: '',
            id_ciudad: '',
            url_logo: ''
         },
         ciudades: [],
         success: null,
         error: null
      };
   },
   async created() {
      await this.fetchCiudades();
      this.fetchUrbanizacion();
   },
   methods: {
      async fetchUrbanizacion() {
         const { id } = this.$route.params;
         try {
            const response = await api.get(`/urbanizacion/${id}`);
            this.urbanizacion = response.data;
         } catch (error) {
            console.error('Error cargando los datos de la urbanización', error);
            this.error = 'Error cargando los datos de la urbanización';
         }
      },
      async fetchCiudades() {
         try {
            const response = await api.get('/ciudades');
            this.ciudades = response.data;
         } catch (error) {
            console.error('Error al obtener la lista de ciudades:', error);
            this.error = 'Error al obtener la lista de ciudades.';
         }
      },
      async updateUrbanizacion() {
         const { id } = this.$route.params;
         try {
            const response = await api.put(`/urbanizacion/${id}`, this.urbanizacion);
            if (response.data.success) {
               this.success = 'Urbanización actualizada exitosamente';
            } else {
               this.error = response.data.error || 'Error al actualizar urbanización';
            }
         } catch (error) {
            console.error('Error en la solicitud', error);
            this.error = 'Error en la solicitud: ' + error.message;
         }
      },
      goBack() {
         this.$router.go(-1);
      },
      goToAddCity() {
         this.$router.push({ name: 'add-city' });
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
</style>
