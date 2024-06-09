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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px; 
  background: url('~@/assets/logo.png') no-repeat center center;
  background-size: contain;
  z-index: 1000;
}
</style>
