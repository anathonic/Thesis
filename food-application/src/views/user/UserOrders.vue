<template>
<div id="userOrders">
<User-nav/>
<div style="margin-bottom: 50px; margin-top: 50px">
    <h3>Twoje zamówienia</h3>
</div>
<div style="width: 85vw; margin: auto">
    <div
    v-for="order in orders"
    :key="order.OrderId"
    >
      <table class="table table-sm">
      <tbody>    
      <tr style="display:flex; justify-content: space-between; background-color: aliceblue; padding:8px">
       <p style="font-size: 14px; font-weight: bold; margin-bottom: 5px">Nr. {{order.OrderId}}</p>
       <p style="font-size: 14px; font-weight: normal; margin-bottom: 5px">{{order.OrderDate}}</p>   
       <p style="font-size: 14px; font-weight: normal; margin-bottom: 5px">Cena: {{order.OrderPrice}} PLN</p>
       <p style="font-size: 14px; font-weight: normal; margin-bottom: 5px">Status: <b>{{order.StatusName}}</b></p>      
       </tr>
       <div class=".bg-light" style="display: flex; padding-left: 8px">
            <div style="display: flex; flex-direction: row"
                v-for="index in order.Details.length"
                :key="index"
                >
                <p style="font-size: 14px; margin-bottom: 5px;">{{order.Details[index-1].Name}}</p>
            </div>
        </div>
      </tbody>
</table>
    </div>
</div>
<p style="display:none">{{user_id}}</p>
</div>
</template>

<script>
import axios from 'axios';
import UserNav from '../../components/user/UserNav.vue';
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
export default {
  components: {UserNav},
    name: 'UserOrders',
    data () {
        return {
            orders: [],
            timer: ""
        }
    },
    created(){
        this.getOrders();
        this.timer = setInterval(this.getOrders, 1500);
    },
    methods: {
         async getOrders() {
            axios.get('userOrder/' + this.user_id).then(response => {
                if(response.status >= 200 && response.status < 300){
                    this.orders = response.data.data
                }
           })
        },
        cancelAutoUpdate(){
            clearInterval(this.timer);
        }
    },
    beforeUnmount(){
        this.cancelAutoUpdate();
    },
     setup() {
        const store = useStore();
        const user_id = ref();
    
    onMounted(async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });
        const content = await response.json();
        user_id.value = `${content.id} `;
        await store.dispatch('setAuth', true);
      } catch (e) {
        await store.dispatch('setAuth', false);
      }
      
    });

    return {
      user_id,
    }
  },
    mounted () {
        this.getOrders();
        }
    }
</script>

<style scoped>
</style>