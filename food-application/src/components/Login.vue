<template>
 <div id="login">
 <Nav/>
   <form @submit.prevent="submit"> 
        <div class="container mt-5">
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
        <div class="form-group">
          <div v-if="message" class="alert alert-danger text-center mt-3" role="alert">{{message}}</div>
        </div>
    <p class="mt-2">Nie masz jeszcze konta? <a style="color: #000000;" href="./register">Zarejestruj się</a>.</p>
    <div class="text-end">
    <p class="mt-2" style="font-size: 14px;">Zapomniałeś hasła? <a style="color: #000000;" href="./reset">Zresetuj hasło</a>.</p>
          </div>
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
import { ref } from 'vue';
import Nav from './website/Nav.vue';

export default {
  components: { Nav },
  name: "Login",
  setup() {
    const message = ref();
    const data = reactive({
      email: '',
      password: ''
    });
    const router = useRouter();
    const submit = async () => {
      //await fetch('http://127.0.0.1:8000/api/login', {
      //await fetch('http://192.168.1.12:8000/api/login', {
      await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data)
      }).then(async response => {
      const data = await response.json();
      let name = data.role[0].name;
      localStorage.setItem('user',JSON.stringify(data.user))
      localStorage.setItem('jwt',data.token)
      localStorage.setItem('role',data.role[0].name)
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
         message.value = error;
        return Promise.reject(error);
      }
            if (localStorage.getItem('jwt') != null) {
              if(name == 'admin'){
                router.push('/panel')
              }else{
                router.push('/dashboard')
              }
            
           }
      
    });

    }
    return {
      message,
      data,
      submit
    }
  }
}
</script>

<style>


</style>