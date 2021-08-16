<template>
  <div id="app">

    <div class="container">
<nav class="navbar navbar-light bg-light">
  <span class="navbar-brand mb-0 h1">Blood Presure Loger</span>
</nav>


<MainApp/>

    </div>
    
    
  </div>
</template>

<script>
import MainApp from './components/MainApp.vue'

export default {
  name: 'App',
  components: {
    MainApp
  }
}
</script>

<style>

</style>
