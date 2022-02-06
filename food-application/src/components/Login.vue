<template>
 <div id="login">
 <Nav/>
   <form @submit.prevent="submit"> 
        <div class="container mt-2">
            <div id="box" class="form pt-4 border-0 rounded-4 shadow-lg overflow-hidden">
                <div class="text-center">
                <img src="../../src/assets/mycollection/png/user/user-7.png" class="mb-2">
                </div>
      <h3>Zaloguj się</h3>
<div class="form-group">
    <label>Email</label>
    <input v-model="data.email" type="email" class="form-control" placeholder="Email" required>
</div>
<div class="form-group">
    <label>Hasło</label>
    <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>
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
import {reactive} from 'vue';
import {useRouter} from "vue-router";
import Nav from './website/Nav.vue';

export default {
  components: { Nav },
  name: "Login",
  setup() {
    const data = reactive({
      email: '',
      password: ''
    });
    const router = useRouter();

    const submit = async () => {
      //await fetch('http://127.0.0.1:8000/api/login', {
      await fetch('http://192.168.1.12:8000/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data)
      });

      await router.push('/dashboard');
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