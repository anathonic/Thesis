<template>
 <div id="register">
   <Nav/>
   <form @submit.prevent="submit"> 
        <div class="container mt-5">
            <div id="box" class="form pt-4 border-0 rounded-4 shadow-lg overflow-hidden">
                    <div class="text-center">
                <img src="../../src/assets/mycollection/png/user/user-7.png" class="mb-2">
                </div>  
      <h3>Zarejestruj się</h3>
  <div class="form-group">
  <label>Imię</label>
  <input v-model="data.name" class="form-control" placeholder="Name" required>
</div>
<div class="form-group">
    <label>Email</label>
    <input v-model="data.email" type="email" class="form-control" placeholder="Email" required>
</div>
<div class="form-group">
    <label>Hasło</label>
    <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>
</div>
<!-- <div class="form-group">
    <label>Potwierdź hasło</label>
    <input type="password" class="form-control" v-model="password_confirm" placeholder="Potwierdź hasło"/>
</div> -->
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
import {reactive} from 'vue';
import {useRouter} from "vue-router";
import Nav from './website/Nav.vue';

export default {
  components: { Nav },
  name: "Register",
  setup() {
    const data = reactive({
      name: '',
      email: '',
      password: ''
    });
    const router = useRouter();
    const submit = async () => {
      await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      await router.push('/login');
    }

    return {
      data,
      submit
    }
  }
}
</script>

<style>

</style>