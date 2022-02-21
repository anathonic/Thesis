<template>
<div id="dashboard">
    <User-nav/>
    <div class="grid-container mt-5" id="dashstyle">
    <div class="row">
    <div class="col-md-2">
        <router-link to="/account">
        <img src="../../../src/assets/mycollection/png/user/user-8.png" class="img-fluid" alt="Responsive image">
        </router-link>
        <div class="text-center">
        <p>Konto</p>
        </div>
        </div>
    <div class="col-md-2">
        <router-link to="/order">
<img src="../../../src/assets/mycollection/png/food/food-6.png" class="img-fluid" alt="Responsive image">
        </router-link>     
        <div class="text-center">
        <p>Zamów online</p>
        </div>
    </div>
        <div class="col-md-2">
          <button style="border: none; background: none;" @click="openModal">
<img src="../../../src/assets/mycollection/png/others/shopping-basket-1.png" class="img-fluid" alt="Responsive image">
       <div class="text-center">
        <p>Koszyk</p>
        </div>
          </button>
    </div>
    <div class="col-md-2">
        <img src="../../../src/assets/mycollection/png/delivery/scooter-1.png" class="img-fluid" alt="Responsive image">
        <div class="text-center">
        <p>Twoje Zamówienia</p>
        </div>
    </div>
    <div class="col-md-2">
        <router-link to="/settings">
        <img src="../../../src/assets/mycollection/png/others/settings-1.png" class="img-fluid" alt="Responsive image">
        </router-link>
        <div class="text-center">
        <p>Ustawienia</p>
        </div>
    </div>
    <div class="col-md-2">
        <img @click="logout" src="../../../src/assets/mycollection/png/others/neko.png" class="img-fluid" alt="Responsive image">
        <div class="text-center">
        <p>Wyloguj się</p>
        </div>
    </div>
</div>
</div>
<basketModal :totalPrice="this.totalPrice" :order-data="this.orderData" v-if="showModal" :showModal=showModal @clicked="onChildClick" v-on:delete-row="deleteThisRow"></basketModal>
</div>
</template>

<script>
import basketModal from '../../components/website/basket-modal-component.vue'
import Order from '../website/Order.vue'
import UserNav from '../../components/user/UserNav.vue'
import {computed} from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {onMounted, ref} from 'vue';
export default {
components: { UserNav, basketModal},
  name: 'Dashboard',
  data(){
    return{
      showModal: false,
      totalPrice: Order.data().$store.state.totalPrice,
      orderData: Order.data().$store.state.orderData,
    }
  },
  methods: {
  openModal(){
    this.showModal = true;
      document.getElementById("dashstyle").style.filter = "blur(2px) grayscale(1)";
      document.getElementById("userwrapper").style.filter = "blur(2px) grayscale(1)";
  },
  deleteThisRow(index, positionPrice){
    //eslint-disable-next-line
    Order.data().$store.state.totalPrice -= parseFloat(positionPrice.replace(/[^\d\.]/g, ""));
    Order.data().$store.state.totalPrice = Number((Order.data().$store.state.totalPrice).toFixed(2));
    this.orderData.splice(index, 1);
    Order.data().$store.commit('decrement');
    Order.data().$store.commit('delete', index);
    this.totalPrice = Order.data().$store.state.totalPrice;
    },
  onChildClick(){
    this.showModal = false;
      document.getElementById("dashstyle").style.filter = "none";
      document.getElementById("userwrapper").style.filter = "none";
  },
  imgPush() {
    return this.$router.push('/');
  }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const message = ref('Nie jesteś zalogowany!');
    const auth = computed(() => store.state.authenticated)
    
    onMounted(async () =>{
      try {
        const respone = await fetch('http://127.0.0.1:8000/api/user',{
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
        const content =await respone.json();
        message.value = `Cześć ${content.name}!`;
        await store.dispatch('setAuth', true);
      } catch (e) {
        await store.dispatch('setAuth', false);
      }
    });
    const logout = async () => {
      await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });
      localStorage.setItem('jwt', null)
      localStorage.setItem('role', null)
      await router.push('/');
    }
    return {
      message,
      auth,
      logout
    }
  }
}
</script>

<style>

.row{
 display: flex;
 justify-content: center;

}
.col-md-2 {
    font-family: 'DM Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-style: solid;
    border-width: 2px;
    border-color: #222222;
    flex: 0 0 33.333333%;
    border-radius: 14px;
    margin: 5vw;
    color: black;
    opacity: 50%;
    cursor: pointer;
}

.col-md-2:hover{
  opacity: 100%;
}

.col-md-2 img{
    padding: 1vw;
    margin: 20px;
}
</style>