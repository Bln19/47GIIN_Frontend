<template>
  <div class="background-logo-container"></div>
  <div class="home-background">
  </div>
</template>

<style scoped>
.home-background {
  height: 100vh;
  background: url('~@/assets/background_2.jpg') no-repeat center center fixed;
  background-size: cover;
}
.background-logo-container {
  position: fixed;
  top: 50%; /* Centrado vertical */
  left: 50%; /* Centrado horizontal */
  transform: translate(-50%, -50%);
  width: 600px; /* O el tamaño que prefieras para el logo */
  height: 600px; /* O el tamaño que prefieras para el logo */
  background: url('~@/assets/logo.png') no-repeat center center;
  background-size: contain; /* Mantiene la relación de aspecto sin recortar */
  z-index: 1000; /* Asegura que el logo esté sobre la mayoría de los otros elementos */
}
</style>
