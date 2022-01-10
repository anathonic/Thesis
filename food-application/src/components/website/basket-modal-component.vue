<template>
    <div class="modal" v-if="showModal">
        <div v-if="showModal" class="modal-content">
            <div class="modal-header bg-light">
                <slot name="header"><h4>Twoje zamówienie</h4></slot>
                <button class="btn btn-secondary" @click="closeModal">Zamknij</button>
            </div>
            <hr class="basketHr">
            <div class="modal-body">
                <slot name="body"></slot>
                <div class="table-responsive border border-info rounded p-3 mt-4">
                    <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Nr</th>
                        <th scope="col">Danie</th>
                        <th scope="col">Cena</th>
                        <th scope="col">Usuń</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(order, index) in orderData"
                        :key="order.Id"
                        >
                        <td class="pt-3">{{ index+1 }}</td>
                        <td class="pt-3">{{ order.Name }}</td>
                        <td class="pt-3">{{ order.Price }} PLN</td>
                        <td>
                            <button class="button-remove-from-basket" @click="$emit('delete-row', index, order.Price)">
                                <img src="../../../src/assets/mycollection/png/others/remove.png" class="img-fluid mt-0 ms-2" alt="Responsive image" style="width:32px">
                            </button>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <span>Wartość: </span><span class="fw-bold">{{totalPrice}}</span><span class="fw-bold"> PLN</span>
                </div>
            </div>
            <div class="modal-body modal-body-2">
                <div class="border border-info rounded p-3 mt-4">
                    <div class="row mb-3">
                        <div class="col">
                            <label for="inputEmail">Email</label>
                            <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="Podaj email">
                        </div>
                        <div class="col">
                            <label for="inputPhoneNumber">Numer telefonu</label>
                            <input v-model="phone" type="tel" class="form-control" id="inputPhoneNumber" placeholder="Podaj numer telefonu dla dostawcy">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label for="inputName">Imię i naziwsko</label>
                            <input v-model="userName" type="text" class="form-control" id="inputName" placeholder="Podaj imię oraz nazwisko">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label for="inputAdres">Adres</label>
                            <input v-model="address" type="text" class="form-control" id="inputAdres" placeholder="Podaj ulicę oraz nr domu">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label for="inputPostal">Kod pocztowy</label>
                            <input v-model="postal" type="text" class="form-control" id="inputPostal" placeholder="Podaj kod pocztowy">
                        </div>
                        <div class="col">
                            <label for="inputCity">Miejscowość</label>
                            <input v-model="city" type="text" class="form-control" id="inputCity" placeholder="Podaj nazwę miejscowości">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <input type="checkbox" class="form-check-input" id="checkbox">
                            <label class="form-check-label" style="padding-left: 6px;" for="checkbox">Akceptuję regulamin oraz politykę prywatności.</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-success border border-success rounded m-3" v-show="alert">
                <p class="text-light text-center m-0 p-2">Dziękujemy! Twoje zamówienie zostało złożone.</p>
            </div>

            <hr class="basketHr">
            <div class="modal-footer bg-light">
                <button class="btn btn-info" @click="sendOrder">Zamów</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
  export default {
    name: 'basketModal',
    props: {
        showModal: Boolean,
        orderData: {
            type: Array,
            default: () => { return []; }
        },
        totalPrice: {
            default: () => { return; }
        }
    },
    data(){
        return {
            email: '',
            phone: '',
            userName: '',
            address: '',
            postal: '',
            city: '',
            alert: false,
        }
    },
    methods: {
        closeModal() {
            this.$emit('clicked');
        },
        showAlert() {
            this.alert = true;
            setTimeout( () => this.alert = false, 5000);
            setTimeout( () => this.$router.push({ path: '/'}), 6500);
        },
        sendOrder() {
            let currentDate = new Date(Date.now());
            //obcięcie znaczników strefy czasowej z formatu daty żeby format zgadzał się z DB
            let startDate = new Date(currentDate).toJSON().slice(0, 19).replace('T', ' ');
            //opóźnienie by pokazać róznice w dacie zamówienia oraz dacie finalizacji zamówienia (ze względu na to że enddate w DB not null)
            let endDate = new Date(currentDate.getTime() + 30 * 60000).toJSON().slice(0, 19).replace('T', ' ');

            axios.post('order?OrderNo='+this.stringGen()+'&User='+this.email+'&Phone='+this.phone+'&Name='+this.userName+'&Address='+this.address+
            '&Postal='+this.postal+'&City='+this.city+'&Details='+JSON.stringify(this.orderData)+'&OrderPrice='+this.totalPrice+
            '&OrderDate='+startDate+'&EndDate='+endDate+'').then(response => {
                if(response.status >= 200 && response.status < 300){
                    console.log(response.data);
                    console.log("success");
                    this.showAlert();
                }
                console.log(response.data);
            })
        },
        stringGen(){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var x = 8;
            for (var i = 0; i < x; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },
    },
  };
</script>
<style scoped>
    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        max-width: 100%;
        height: 600px;
        max-height: 100%;
        background: #FFFFFF;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
    }
    .basketHr{
      background-color: transparent;
    }
    .button-remove-from-basket{
        all: unset;
        cursor: pointer;
    }
</style>