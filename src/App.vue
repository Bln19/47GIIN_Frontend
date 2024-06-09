<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <i class="fas fa-house"></i>
        {{ urbanizacion ? urbanizacion.nombre : 'GESTIONA' }}
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link :to="'/login'" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated && urbanizacion">
            <router-link :to="`/urbanization/${urbanizacion.id}`" class="nav-link">La Urbanización</router-link>
          </li>
          <!-- <li class="nav-item" v-if="isAuthenticated && role === 'administrador'">
            <router-link :to="'/register'" class="nav-link">Registrar Usuario</router-link>
          </li> -->
          <li class="nav-item" v-if="isAuthenticated">
            <a class="nav-link" @click="handleLogout">Logout</a>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link :to="'/contact'" class="nav-link">Contacto</router-link>
          </li>
          <li class="nav-item"  v-if="isAuthenticated && urbanizacion">
            <router-link :to="homeRoute" class="nav-link">Home</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'urbanizacion', 'role']),
    homeRoute() {
      return this.isAuthenticated ? `/dashboard/${this.urbanizacion.id}` : '/';
    }
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'home' });
    }
  },
  // watch: {
  //   '$route'() {
  //     this.isAuthenticated = this.$store.getters.isAuthenticated;
  //     this.urbanizacion = this.$store.getters.urbanizacion;
  //     this.role = this.$store.getters.role;
  //   }
  // }
};
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.navbar.bg-danger {
  background-color: #e53935 !important;
  z-index: 1050;
}

.navbar-dark .navbar-brand,
.navbar-dark .navbar-nav .nav-link {
  color: white !important;
}

.navbar-brand .fas {
  margin-right: 5px;
}
.navbar-brand {
  margin-left: 40px;
}
.navbar-nav {
  margin-right: 40px;
  font-size: 1.1rem;
}
.nav-link {
  margin-right: 20px;
}
</style>
