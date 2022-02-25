<template>
  <div id="orders">
      <Admin-nav/>
      <div class="container d-flex flex-column align-items-center">
          <div class="text-center mt-0 mb-2">
              <h2>Zamówienia</h2>
          </div>
          <div class="text-center">
          <div class="input-group">
  <div class="form-outline">
  <input type="search" class="form-control rounded" placeholder="Szukaj" aria-label="Search" aria-describedby="search-addon"  v-model="searchQuery" />
</div>
</div>
</div>
          <tbody>
              <tr 
v-for="Order in searchedOrders" v-bind:key="Order.OrderId"
    >
<vue-collapsible-panel-group>
    <vue-collapsible-panel :expanded="false">
        <template #title>
    <div class="d-flex flex-column text-start">
    <td class="pt-3"><h5>Zamówienie nr: {{ Order.OrderNo }} | Data złożenia: {{ Order.OrderDate }}</h5> 
    </td>
    <td class="pt-3"><h5>Status zamówienia: {{ Order.Status }}</h5> </td>
    </div>
        </template>
        <template #content>
    <div class="d-flex flex-column">
        <h5>Szczegóły zamówienia:</h5>
    <td class="pt-3" >Typ: {{ Order.OrderTypeName}}</td>
    <td class="pt-3">Cena: {{ Order.OrderPrice }}</td>
    <td class="pt-3">Zakończono: {{ Order.EndDate}}</td>
    <td class="pt-3">Id użytkownika: {{ Order.UserId }}</td>
     <tr 
v-for="user in users" v-bind:key="user.id"
    >
    <div v-if="user.id === Order.UserId">
    <td class="pt-3">Imie: {{ user.name }}</td>
    <td class="pt-3">Email: {{ user.email }}</td>
    </div>
     </tr>
    </div>
        </template>
      
    </vue-collapsible-panel>
</vue-collapsible-panel-group>
              </tr>
              </tbody>
      </div>
  </div>
      
</template>

<script>
import AdminNav from '../../components/admin/AdminNav.vue'
import useOrders from '../../composables/Orders.js'
import useUsers from "../../composables/Users.js"
import { onMounted, ref, computed } from "vue";
    
    export default {
components: {AdminNav },

        setup() {
           const searchQuery = ref("");
            const { user, users, getUsers} = useUsers()
            const { getOrders, Orders } = useOrders()
            onMounted(getUsers)
            onMounted(getOrders)


          const searchedOrders = computed(()=> {
            return Orders.value.filter((Order)=>{
              return(
                Order.OrderNo.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1
              );
            });
          });

            return {
                searchQuery,
                searchedOrders,
                Orders,
                users,
                user
            }
        }
    }
</script>

<style>

</style>