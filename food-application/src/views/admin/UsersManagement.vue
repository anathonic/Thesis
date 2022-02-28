<template>
  <div id="management">
      <Admin-nav/>
      <div class="column">
        <div class="text-end">
     <div class="mt-5 d-flex-column justify-content-end" >
       <router-link to="/UserCreate">
      <button class="mb-3 btn btn-dark">Dodaj użytkownika</button>
      </router-link>
      <p>Liczba użytkowników: {{ users.length }} </p>
      </div>
      </div>
      <div class="d-flex-column">
    <h2>Użytkownicy</h2>
<div class="input-group">
  <div class="form-outline">
  <input type="search" class="form-control rounded" placeholder="Szukaj" aria-label="search" aria-describedby="search-addon"  v-model="searchQuery" />
</div>
</div>
</div>

<div>
<p class="mt-3" v-if="searchQuery != ''">Liczba rekordów spełniających zapytanie: {{ searchedUsers.length }} </p>
</div>

<table class="table">
  
   <thead>
     <tr>
       <th scope="col">ID</th>
       <th scope="col">Imię i Nazwisko</th>
       <th scope="col">E-mail</th>
       <th scope="col">Rola</th>
       <th scope="col">Dołączono</th>
       <!-- <th scope="col">Edytuj</th> -->
       <th scope="col">Usuń</th>
     </tr>
   </thead>
   <tbody>
     <tr
     v-for="user in searchedUsers"
     :key="user.id"
     >
     <th class="pt-3" scope="row">{{ user.id }}</th>
     <td class="pt-3">{{ user.name }}</td>
     <td class="pt-3">{{ user.email }}</td>
     <td class="pt-3">{{ user.role[0].name}}</td>
     <td class="pt-3">{{ user.created_at.split("").slice(0, 10).join("") }}</td>
     <!-- <td>
     <img src="../../../src/assets/mycollection/png/others/edit.png" class="img-fluid mt-2 ms-2" alt="Responsive image" style="width:1.5vw"
      v-on:click="() => $router.push({name: 'Users.edit', params: {UserId: user.id}})">
     </td> -->
     <td>
     <img v-on:click="deleteUser(user.id)" src="../../../src/assets/mycollection/png/others/trash.png" class="img-fluid mt-2 ms-2" alt="Responsive image" style="width:1.5vw">

     </td>
     </tr>
   </tbody>
 </table>
 </div>
      </div>
  
</template>

<script>

import { computed, onMounted, reactive, ref } from "vue";
import useUsers from "../../composables/Users.js";
import AdminNav from '../../components/admin/AdminNav.vue'
export default {
  components: { AdminNav },
         setup() {
           
           const searchQuery = ref("");
          const { user, users, getUsers, storeUsers, destroyUser, errors } = useUsers()
            onMounted(getUsers)
            const form = reactive({
                Name: '',
            })
            const saveUsers = async () => {
                await storeUsers({...form});
                await getUsers();
            }
 
          const searchedUsers = computed(()=> {
            return users.value.filter((user)=>{
              return(
                user.email.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 || user.role[0].name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 || user.email.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 
              );
            });
          });



            const deleteUser = async (UserId) => {
                if(!window.confirm('Czy napewno usunąć ten składnik?')){
                    return
                }

                await destroyUser(UserId);
                await getUsers();
            }

            onMounted(getUsers)

            return {
                searchQuery,
                searchedUsers,
                deleteUser,
                saveUsers,
                form,
                errors,
                users,
                user,
            }
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