<template>
  <div id="reset">
<Nav/>
   <form @submit.prevent="handleSubmit"> 
        <div class="container mt-5">
            <div id="box" class="form pt-4 border-0 rounded-4 shadow-lg overflow-hidden">
                <div class="text-center">
                <img src="../../assets/mycollection/png/user/user-7.png" class="mb-2">
                </div>
      <h3>Podaj nowe hasło</h3>
<div class="form-group">
    <label>Hasło</label>
    <input v-model="password" type="password" class="form-control" placeholder="Password" required>
</div>
<div class="form-group">
    <label>Potwierdź hasło</label>
    <input v-model="password_confirm" type="password" class="form-control" placeholder="Password Confirm" required>
</div>
              <div class="merge d-flex justify-content-center flex-column">
      <div class="text-center">
      <button style="width:120px;" class="mt-4 btn btn-light shadow-sm btn-block btn-lg mb-4">Zatwierdź</button>
           </div>
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
    name: 'Reset',
    data(){
        return {
            password: '',
            password_confirm: ''
        }
    },
    methods: {
        
        async handleSubmit() {
            
            const response = await axios.post('reset', {
                password: this.password,
                password_confirm: this.password_confirm,
                token: this.$route.params.token
            });
            
            console.log(response);
            this.$router.push("/login");
        }
    }
}
</script>

<style>

</style>