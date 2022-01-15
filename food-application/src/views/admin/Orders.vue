<template>
  <div id="orders">
      <Admin-nav/>
      <div class="container d-flex flex-column align-items-center">
          <div class="text-center">
              <h2>Zamówienia</h2>
          </div>
          <tbody>
              <tr 
    v-for="order in orders"
    :key="order.Details"
    >
<vue-collapsible-panel-group>
    <vue-collapsible-panel :expanded="false">
        <template #title>
    <div class="d-flex flex-column text-center">
    <td class="pt-3">Zamówienie numer: {{ order.OrderNo }} </td>
    <td class="pt-3"><h5>{{ order.OrderDate }}</h5> </td>
    </div>
        </template>
        <template #content>
    <div class="d-flex flex-column">
        <h5>Szczegóły zamówienia:</h5>
    <td class="pt-3" >Dania: {{ order.Details }}</td>
    <td class="pt-3">Imię i nazwisko: {{ order.Name }}</td>
    <td class="pt-3">Ulica: {{ order.Address }}</td>
    <td class="pt-3">Kod pocztowy: {{ order.Postal }}</td>
    <td class="pt-3">Miasto: {{ order.City }}</td>
    <td class="pt-3">Telefon: {{ order.Phone }}</td>
    <td class="pt-3">e-mail: {{ order.User }}</td>
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
import axios from 'axios'
import AdminNav from '../../components/admin/AdminNav.vue'
export default {
  components: { AdminNav },
      data () {
        return {
            orders: [],
            url: window.location.origin
        }
    },
    methods: {
        getOrders() {
            axios.get('orders').then(response => {
                if(response.status >= 200 && response.status < 300){
                    this.orders = response.data.data
                }
                console.log(response.data);
            })
        },
    },
       mounted () {
        this.getOrders()
        }  

}
</script>

<style>

</style>