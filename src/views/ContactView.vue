<template>
  <div class="contact-container">
    <div class="contact-section">
      <h4 class="header-title">CONTACTA CON NOSOTROS</h4>
      <h6>Para poder registrarte en la plataforma contacta a través de:</h6>
      <ul>
        <li class="info-item">
          <div class="label"><strong><i class="fas fa-envelope"></i>Email</strong></div>
          <div class="content">info@gestiona.com</div>
        </li>
        <li class="info-item">
          <div class="label"><strong><i class="fas fa-phone"></i>Teléfono</strong></div>
          <div class="content">+034 962 28 55</div>
        </li>
        <li class="info-item">
          <div class="label"><strong><i class="fas fa-map-marker-alt"></i>Dirección</strong></div>
          <div class="content">Calle Universidad 1, Valencia (España)</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactView"
 
}
</script>

<style scoped>
.contact-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('~@/assets/background_2.jpg') no-repeat center center fixed;
  background-size: cover;
  color: #333;
  padding: 20px;
}

.contact-section {
  width: 80%;
  max-width: 600px;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 40px;
  box-shadow: 0 0 10px rgba(229, 57, 53, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;

}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.label {
  flex: 1;
  align-items: center;
  margin-right: 20px;

}

.content {
  flex: 2; 
  text-align: justify; 
  
}
.fas{
  margin-right: 20px;
  color:#037764;
}
.header-title{
  background-color: #037764;
  color: white;
  padding: 10px 20px;
  border-radius: 40px;
  text-align: center;
  margin-bottom: 20px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
