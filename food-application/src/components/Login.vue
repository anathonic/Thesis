<template>
 <div id="login">
     <Nav/>
   <form class="" @submit.prevent="handleSubmit"> 
        <div class="container">
            <div id="box" class="form pt-4 border-0 rounded-4 shadow-lg overflow-hidden">
                <div class="text-center">
                <img src="../../src/assets/mycollection/png/user/user-7.png" class="mb-2">
                </div>
      <h3>Zaloguj się</h3>
<div class="form-group">
    <label>Email</label>
    <input type="email" class="form-control" v-model="email" placeholder="Email"/>
</div>
<div class="form-group">
    <label>Hasło</label>
    <input type="password" class="form-control" v-model="password" placeholder="Hasło"/>
</div>
    <p class="mt-2">Nie masz jeszcze konta? <a style="color: #000000;" href="./register">Zarejestruj się</a>.</p>
              <div class="merge d-flex justify-content-center flex-column">
      <button class="btn btn-light shadow-sm btn-block btn-lg mb-4">Zaloguj się</button>
            </div>
             </div>
             </div>
        </form>
  </div>
  
</template>

<script>
import axios from 'axios'
import Nav from './Nav.vue';
export default {
  components: { Nav },
    name:'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async handleSubmit(){
            const response = await axios.post('login', {
                email: this.email,
                password: this.password
            });
            
            console.log(response);
        }
    }
}
</script>

<style>


</style>