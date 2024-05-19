<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="text-h5">Registrar Nuevo Usuario</v-card-title>
                    <v-card-text>
                        <v-form ref="form">
                            <v-text-field v-model="user.username" label="Nombre de Usuario" required
                                :rules="[rules.required]"></v-text-field>
                            <v-text-field v-model="user.password" label="Contraseña" type="password" required
                                :rules="[rules.required]"></v-text-field>
                            <v-select v-model="user.role" :items="roles" label="Selecciona Rol" required
                                :rules="[rules.required]"></v-select>
                            <v-btn @click="registerUser" color="primary">Registrar</v-btn>
                        </v-form>
                        <v-alert v-if="error" type="error">{{ error }}</v-alert>
                        <v-alert v-if="success" type="success">{{ success }}</v-alert>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import api from '../services/api';

export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
                role: ''
            },
            roles: ['propietario', 'empleado'],
            error: null,
            success: null,
            rules: {
                required: value => !!value || 'Este campo es requerido'
            }
        };
    },
    methods: {
        registerUser() {
            this.error = null;
            this.success = null;
            if (this.$refs.form.validate()) {
                const urbanization = JSON.parse(localStorage.getItem('urbanization'));
                const requestData = {
                    urbanization_id: urbanization.id,
                    contrasena: this.user.password,
                    username: this.user.username,
                    rol: this.user.role
                };
                
                api.post('/register', requestData)
                    .then(response => {
                        if (response.data.success) {
                            this.success = 'Usuario registrado exitosamente';
                            this.user.username = '';
                            this.user.password = '';
                            this.user.role = '';
                        } else {
                            this.error = response.data.error || 'Error al registrar usuario';
                        }
                    })
                    .catch(error => {
                        this.error = 'Error en la solicitud: ' + error.message;
                    });
            }
        }
    }
};
</script>
