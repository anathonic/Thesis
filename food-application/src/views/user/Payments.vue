<template>
<div id="payments">
    <div class="grid-container mt-5" id="dashstyle">
        <div class="row payments-row">
            <p class="h3">Dziękujemy za złożenie zamówienia :)</p>
            <p class="h6">Wybierz metodę płatności w celu sfinalizowania transakcji.</p>
        </div>
        <div class="row payments-row">
        <div class="col-md-2 payments-col" @click="pay()">
            <a class="nav-link" href="/dashboard">
            <img src="../../../src/assets/mycollection/png/payment/przelewy24.png" class="img-fluid" alt="Responsive image">
            <div class="text-center">
            <p>Przelewy24</p>
            </div>
            </a>
            </div>
        <div class="col-md-2 payments-col" @click="pay()">
            <a class="nav-link" href="/dashboard">
            <img src="../../../src/assets/mycollection/png/payment/paypal.jpg" class="img-fluid" alt="Responsive image">   
            <div class="text-center">
            <p>PayPal</p>
            </div>
            </a>
        </div>
            <div class="col-md-2 payments-col" @click="pay()">
            <a class="nav-link" href="/dashboard">
            <img src="../../../src/assets/mycollection/png/payment/blik.png" class="img-fluid" alt="Responsive image">
             <div class="text-center">
            <p>Blik</p>
            </div>
            </a>
        </div>
</div>
</div>
<p style="display:none">{{user_id}}</p>
</div>
</template>

<script>
import axios from 'axios';
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
export default {
components: { },
  name: 'Payments',
  data(){
    return{
      timer: "",
      orderId: "",
    }
  },
  created(){
    this.getOrder();
    this.timer = setInterval(this.getOrder, 500);
  },
  methods: {
      async getOrder() {
        axios.get('lastOrderForUser/' + this.user_id).then(response => {
          if(response.status >= 200 && response.status < 300){
            this.orderId = response.data
          }
      })
  },
  cancelAutoUpdate(){
      clearInterval(this.timer);
  },
  pay(){
    sessionStorage.clear();
    axios.post('orderPayment/' + this.orderId);
  },
  imgPush() {
    return this.$router.push('/');
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
}
</script>

<style>
#payments{
    margin-top: 10vw;
}
.row.payments-row{
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 60px;
}
.col-md-2.payments-col{
    font-family: 'DM Sans', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-style: solid;
    border-width: 2px;
    border-color: #222222;
    flex: 0 0 25%;
    border-radius: 14px;
    margin: 3vw;
    color: black;
    width: 20%!important;
    max-width: 50%;
    cursor: pointer;
    filter: opacity(50%);
}
@media only screen and (max-width: 700px) {
  .col-md-2.payments-col{
    flex: 0 0 80%;
  }
}
.col-md-2.payments-col:hover{
    filter: opacity(100%);
}
.col-md-2.payments-col img{
    padding: 1vw;
    margin: 20px;
    max-width: 100%;
    max-height: 200px;
}
</style>