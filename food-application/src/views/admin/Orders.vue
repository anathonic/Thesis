<template>
  <div id="orders">
      <Admin-nav/>
      <div class="container d-flex flex-column align-items-center">
          <div class="text-center mt-0 mb-2">
              <h2>Zamówienia</h2>
          </div>
          <div class="text-center">
          <div class="input-group">
  <div class="form-outline mb-5">
  <input type="search" class="form-control rounded" placeholder="Nr zamówienia" aria-label="Search" aria-describedby="search-addon"  v-model="searchQuery" />
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
     <tr 
     
v-for="Detail in Order.Details" v-bind:key="Detail"
    >
    <td class="p-3"> {{Detail.Quantity}} x {{Detail.Name}}</td>
     </tr>
         <h4>Suma całkowita:</h4>
    <td class="p-3"> {{Order.OrderPrice }} PLN</td>
     <tr 
v-for="user in users" v-bind:key="user.id"
    >
    <div class="text-start" v-if="user.id === Order.UserId && Order.OrderType == '3' ">
    <h4>Użytkownik:</h4>
    <td class="p-3">ID: {{ user.id }} </td>
    <td class="p-3">Imię i nazwisko: {{ user.name }} </td>
    <td class="p-3">Email: {{ user.email }}</td>
    </div>
    
     </tr>
     <tr 
v-for="address in addresses" v-bind:key="address.UserId"
    >
    <div class="text-start" v-if="address.UserId === Order.UserId && Order.OrderType == '3' ">
    <h4>Dowóz na adres:</h4>
    <td class="p-3">Ulica: {{ address.Address }} </td>
    <td class="p-3">Kod pocztowy: {{ address.PostalCode }}</td>
    <td class="p-3">Miasto: {{ address.City }}</td>
    <h4>Numer telefonu:</h4>
    <td class="p-3">{{ address.PhoneNumber }}</td>
    </div>
    
     </tr>
    </div>
        </template>
      
    </vue-collapsible-panel>
</vue-collapsible-panel-group>
<!-- <h4 class="mt-3">Zakończono:</h4>
<div class="p-3" v-if="Order.EndDate != null ">
<td> {{Order.EndDate}} </td>
</div>
<div class="p-3" v-if="Order.EndDate == null ">
<td> Zamówienie w trakcie realizacji </td>
</div> -->
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
import axios from 'axios'
    export default {
components: {AdminNav },
    data () {
        return {
            addresses: [],
            url: window.location.origin
        }
    },
    methods: {
        getAddresses (){
    axios.get('addresses').then(response => {
            if(response.status >= 200 && response.status < 300){
                console.log('yes')
                this.addresses = response.data.data;
                console.log(this.addresses);
          }
        })
        }
    },
    mounted (){
        this.getAddresses()
    },
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