<template>
 <div id="register">
     <Nav/>
   <form class="" @submit.prevent="handleSubmit"> 
        <div class="container">
            <div id="box" class="form pt-4 border-0 rounded-4 shadow-lg overflow-hidden">
                    <div class="text-center">
                <img src="../../src/assets/mycollection/png/user/user-7.png" class="mb-2">
                </div>  
      <h3>Zarejestruj się</h3>
  <div class="form-group">
  <label>Imię</label>
  <input type="text" class="form-control" v-model="first_name" placeholder="Imię"/>
</div>
<div class="form-group">
    <label>Nazwisko</label>
    <input type="text" class="form-control" v-model="last_name" placeholder="Nazwisko"/>
</div>
<div class="form-group">
    <label>Email</label>
    <input type="email" class="form-control" v-model="email" placeholder="Email"/>
</div>
<div class="form-group">
    <label>Hasło</label>
    <input type="password" class="form-control" v-model="password" placeholder="Hasło"/>
</div>
<div class="form-group">
    <label>Potwierdź hasło</label>
    <input type="password" class="form-control" v-model="password_confirm" placeholder="Potwierdź hasło"/>
</div>
        <div class="merge d-flex justify-content-center flex-column">
      <button class="btn btn-light shadow-sm btn-block btn-lg mt-2">Zarejestruj się</button>
             <p class="mt-2 mb-1">Tworząc konto, wyrażasz zgodę na nasze  <br><a style="color: #000000;" href="#">Warunki i Prywatności</a>.</p>
          <p>Posiadasz juz konto? <a style="color: #000000;" href="./login">Zaloguj się</a>.</p>
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
    name: 'SignUp',
    data(){
      return {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: ''
      }
    },
    methods: {
      async handleSubmit (){
        await axios.post('register', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          password_confirm: this.password_confirm
        });
        this.$router.push('/login');
      }
   }
}
</script>

<style>

</style>