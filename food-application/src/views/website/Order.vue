<template>
<div id="orde">
<User-nav/>
<div class="container-fluid px-5 my-5">
    <div class="container" id="Order">
        <div class="order-container">
            <br>
            <div class="panel-heading">
                <div class="order-row">
                    <div class="order-col">
                        <h3 class="panel-title">Złóż zamówienie</h3>
                    </div>
                    <div class="order-col basket">
                        <button class="basket-summary" @click="openModal">
                            <img src="../../../src/assets/mycollection/png/others/picnic-basket.png" class="img-fluid mt-0 ms-0" alt="Responsive image" style="width:32px">
                            <span class="order-amount">({{$store.state.productsAmount}})</span>
                        </button>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="panel-body">
                <div class="table-responsive">
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Danie</th>
                        <th scope="col">Opis</th>
                        <th scope="col">Cena</th>
                        <th scope="col">Dodaj</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="meal in meals"
                        :key="meal.MealId"
                        >
                        <td class="pt-3">{{ meal.Name }}</td>
                        <td class="pt-3">{{ meal.Description }}</td>
                        <td class="pt-3" style="currency">{{ meal.Price }}<span> PLN</span></td>
                        <td>
                            <button class="button-add-to-basket" @click="addToBasket(meal.Name, meal.Price, meal.MealId)">
                                <img src="../../../src/assets/mycollection/png/others/add-to-basket.png" class="img-fluid mt-0 ms-2" alt="Responsive image" style="width:32px">
                            </button>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <basketModal :totalPrice="$store.state.totalPrice" :order-data="this.orderData" v-if="showModal" :showModal=showModal @clicked="onChildClick" v-on:delete-row="deleteThisRow"></basketModal>
</div>
</div>
</template>

<script>
import basketModal from '../../components/website/basket-modal-component.vue';
import axios from 'axios'
import UserNav from '../../components/user/UserNav.vue';
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
const $store = new Vuex.Store({
        plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
  state: {
    productsAmount: 0,
    orderData: [],
    totalPrice: 0.00
  },
  mutations: {
    increment (state) {
        state.productsAmount++
    },
    decrement (state) {
        state.productsAmount--
    },
    add (state, {Name: MealName, Price: MealPrice, MealId: MealId}) {
        state.orderData.push({
            Name: MealName,
            Price: MealPrice,
            MealId: MealId
        })
    },
    delete (state, index) {
        state.orderData.splice(index, 0);
    }
  }
})
export default {
  components: {basketModal, UserNav},
    name: 'Order',
    data () {
        return {
            meals: [],
            url: window.location.origin,
            showModal: false,
            orderData: [],
            $store: $store,
        }
    },
    methods: {
        getMeals() {
            axios.get('menu/category/0').then(response => {
                if(response.status >= 200 && response.status < 300){
                    this.meals = response.data.data
                }
                console.log(response.data);
            })
        },
        addToBasket(MealName, MealPrice, MealId) {
            $store.commit('add', {Name: MealName, Price: MealPrice, MealId: MealId});
            //eslint-disable-next-line
            $store.state.totalPrice += parseFloat(MealPrice.replace(/[^\d\.]/g, ""));
            $store.state.totalPrice = Number(($store.state.totalPrice).toFixed(2));
            $store.commit('increment');
        },
        deleteThisRow(index, positionPrice) {
            //eslint-disable-next-line
            $store.state.totalPrice -= parseFloat(positionPrice.replace(/[^\d\.]/g, ""));
            $store.state.totalPrice = Number(($store.state.totalPrice).toFixed(2));
            this.orderData.splice(index, 1);
            $store.commit('decrement');
            $store.commit('delete', index);
        },
        openModal() {
            this.showModal = true;
            document.getElementById("Order").style.filter = "blur(2px) grayscale(1)";
            document.getElementById("navbar").style.filter = "blur(2px) grayscale(1)";
            this.orderData = $store.state.orderData;
            console.log($store.state.orderData)
        },
        onChildClick () {
            this.showModal = false;
            document.getElementById("Order").style.filter = "none";
            document.getElementById("navbar").style.filter = "none";
        },
    },
    mounted () {
        this.getMeals()
        }
    }
</script>

<style scoped>
.order-container{
    width: 100%;
}
.panel-heading{
    text-align: center;
}
.order-row{
    display: inline-flex;
}
.order-amount{
    font-weight: bold;
    margin-left: 4px;
    color: #9f9f9f;
}
.order-row .order-col:nth-child(2){
    margin-left: 8px;
}
.button-add-to-basket, .basket-summary{
    all: unset;
    cursor: pointer;
}
</style>