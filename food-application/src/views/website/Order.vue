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
                            <span class="order-amount">({{productsAmount}})</span>
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
                            <button class="button-add-to-basket" @click="addToBasket(meal.Name, meal.Price)">
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
    <basketModal :total-price="this.totalPrice" :order-data="this.orderData" v-if="showModal" :showModal=showModal @clicked="onChildClick" v-on:delete-row="deleteThisRow"></basketModal>
</div>
</div>
</template>

<script>
import basketModal from '../../components/website/basket-modal-component.vue';
import axios from 'axios'
import UserNav from '../../components/user/UserNav.vue';
export default {
  components: {basketModal, UserNav},
    name: 'Order',
    data () {
        return {
            meals: [],
            url: window.location.origin,
            showModal: false,
            orderData: [],
            productsAmount: 0,
            totalPrice: 0.00
        }
    },
    methods: {
        getMeals() {
            axios.get('meals').then(response => {
                if(response.status >= 200 && response.status < 300){
                    this.meals = response.data.data
                }
                console.log(response.data);
            })
        },
        addToBasket(MealName, MealPrice) {
            this.orderData.push({
                Name: MealName,
                Price: MealPrice
            })
            //eslint-disable-next-line
            this.totalPrice += parseFloat(MealPrice.replace(/[^\d\.]/g, ""));
            this.totalPrice = Number((this.totalPrice).toFixed(2));
            this.productsAmount += 1;
            console.log(MealName, MealPrice, this.totalPrice);
        },
        deleteThisRow(index, positionPrice) {
            this.orderData.splice(index, 1);
            this.productsAmount -= 1;
            //eslint-disable-next-line
            this.totalPrice -= parseFloat(positionPrice.replace(/[^\d\.]/g, ""));
            this.totalPrice = Number((this.totalPrice).toFixed(2));
        },
        openModal() {
            this.showModal = true;
            document.getElementById("Order").style.filter = "blur(2px)";
            document.getElementById("navbar").style.filter = "blur(2px)";
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