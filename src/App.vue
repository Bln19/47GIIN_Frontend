<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <i class="fas fa-house"></i>
        GESTIONA
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link :to="'/login'" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Registro</a>
          </li>
          <li class="nav-item">
            <router-link :to="'/contact'" class="nav-link">Contacto</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/'" class="nav-link">Home</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view></router-view>

</template>

<script>


export default {
  components: {
    // LoginForm
  }
};
</script>
<style>
/* Estilos existentes */
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
