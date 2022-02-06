<template>
  <div id="management">
      <Admin-nav/>
      <div class="column">
     <div class="mt-5 d-flex justify-content-end" >
       <router-link to="/UserCreate">
      <button class="mb-3 btn btn-dark">Dodaj uzytkownika</button>
      </router-link>
      </div>
    <h2>Uzytkownicy</h2>
<table class="table">
  
   <thead>
     <tr>
       <th scope="col">ID</th>
       <th scope="col">Imię i Nazwisko</th>
       <th scope="col">E-mail</th>
       <th scope="col">Rola</th>
       <th scope="col">Dołączono</th>
       <th scope="col">Edytuj</th>
       <th scope="col">Usuń</th>
     </tr>
   </thead>
   <tbody>
     <tr
     v-for="user in users"
     :key="user.id"
     >
     <th class="pt-3" scope="row">{{ user.id }}</th>
     <td class="pt-3">{{ user.name }}</td>
     <td class="pt-3">{{ user.email }}</td>
     <td class="pt-3">{{ user.role[0].name }}</td>
     <td class="pt-3">{{ user.created_at.split("").slice(0, 10).join("") }}</td>
     <td>
     <img src="../../../src/assets/mycollection/png/others/edit.png" class="img-fluid mt-2 ms-2" alt="Responsive image" style="width:1.5vw">
     </td>
     <td>
     <img src="../../../src/assets/mycollection/png/others/trash.png" class="img-fluid mt-2 ms-2" alt="Responsive image" style="width:1.5vw">

     </td>
     </tr>
   </tbody>
 </table>
 </div>
      </div>
  
</template>

<script>
import axios from 'axios'

import AdminNav from '../../components/admin/AdminNav.vue'
export default {
  components: { AdminNav },
data () {
         return {
             users: [],
             
             url: window.location.origin
         }
     },
     
     methods: {
         getUsers() {
             axios.get('users').then(response => {
                 if(response.status >= 200 && response.status < 300){
                     this.users = response.data.data
                 }
                 console.log(response.data);    
             })
         },
     },
     mounted () {
        this.user_created,
         this.getUsers()
         }
     }
</script>

<style>
.column {
margin-left: 10vw;
margin-right: 10vw;
}
table {
  font-size: 1vw;
}
</style>