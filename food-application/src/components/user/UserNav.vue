
<template>
<div id="userwrapper">
  <nav class="navbar navbar-expand-md navbar-light bg-light mb-4" id="navbar">
    <div class="container-fluid">
           <router-link to="/">
        <img src="../../../src/assets/mycollection/png/user/user-3.png" class="img-fluid mb-3" alt="Responsive image">
     </router-link> 
           <!-- <form class="d-flex m-2 ">
         <a class="btn btn-outline-dark shadow-sm btn-lg ms-3" href="./login" role="button">Zamów online</a>
        </form> -->
        <div class="mt-3 mx-4" id="hi_user">
          <p>{{message}}</p>
        </div>
        
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="mt-2 collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav ms-auto mt-4 mt-lg-0 p-2">
                <li class="nav-item active"><a class="nav-link" href="/dashboard">Panel główny</a></li>
                 <li class="nav-item active"><a class="nav-link" href="/account">Konto</a></li>
                  <li class="nav-item active"><a class="nav-link" href="/order">Zamów online</a></li>
                   <li class="nav-item active"><a class="nav-link" @click="openModal">Koszyk</a></li>
                    <li class="nav-item active"><a class="nav-link" href="/orders">Twoje zamówienia</a></li>
                     <li class="nav-item active"><a class="nav-link" href="/settings">Ustawienia</a></li>
                   <li class="nav-item active"><p @click="logout"  class="nav-link"  href=""> Wyloguj</p></li>
            </ul>

      </div>
    </div>
  </nav>
  <basketModal :totalPrice="this.totalPrice" :order-data="this.orderData" v-if="showModal" :showModal=showModal @clicked="onChildClick" v-on:delete-row="deleteThisRow"></basketModal>
</div>
</template>
<script>
import basketModal from '../website/basket-modal-component.vue'
import Order from '../../views/website/Order.vue'
import {computed} from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {onMounted, ref} from 'vue';

export default {
  components: {basketModal},
  data(){
    return{
      showModal: false,
      totalPrice: Order.data().$store.state.totalPrice,
      orderData: Order.data().$store.state.orderData,
    }
  },
  name: "Nav",
  methods: {
  imgPush() {
    return this.$router.push('/');
  },
  openModal(){
    this.showModal = true;
    this.totalPrice = Order.data().$store.state.totalPrice;
      document.getElementById("navbar").style.filter = "blur(2px) grayscale(1)";
      document.getElementById("dashstyle").style.filter = "blur(2px) grayscale(1)";
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
      document.getElementById("navbar").style.filter = "none";
      document.getElementById("dashstyle").style.filter = "none";
  },
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const message = ref('Nie jesteś zalogowany!');
    const auth = computed(() => store.state.authenticated)
    onMounted(async () =>{
      try {
        const respone = 
        //await fetch('http://127.0.0.1:8000/api/user'
        await fetch('http://localhost:8000/api/user',{
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });
        const content =await respone.json();
        message.value = `Cześć ${content.name}!`;
        await store.dispatch('setAuth', true);
      } catch (e) {
        await store.dispatch('setAuth', false);
      }
    });
    const logout = async () => {
      //await fetch('http://127.0.0.1:8000/api/logout'
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });
      localStorage.setItem('jwt', null)
      localStorage.setItem('role', null)
      sessionStorage.clear()
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
<style scoped>
#hi_user{
 font-size: 20px;
 font-weight: bold;
}

.nav-link{
  cursor: pointer;
}
</style>
