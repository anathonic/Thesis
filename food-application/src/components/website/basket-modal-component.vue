<template>
    <div class="modal" id="modal" v-if="showModal">
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
                            <button class="button-remove-from-basket" @click="dialogShow(index, order.Price)">
                                <img src="../../../src/assets/mycollection/png/others/remove.png" class="img-fluid mt-0 ms-2" alt="Responsive image" style="width:32px">
                            </button>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                    <span>Wartość: </span><span class="fw-bold">{{this.totalPrice}}</span><span class="fw-bold"> PLN</span>
                </div>
            </div>
            <div class="modal-body modal-body-2 needs-validation was-validated" novalidate="">
                <div class="border border-info rounded p-3 mt-4">
                    <div class="row mb-3">
                        <div class="col">
                            <label for="inputEmail">Email</label>
                            <input v-model="user_email" type="email" class="form-control" id="inputEmail" required="" placeholder="Podaj email">
                            <div class="invalid-feedback">
                                Email nie został wprowadzony.
                            </div>
                        </div>
                        <div class="col">
                            <label for="inputPhoneNumber">Numer telefonu</label>
                            <input v-model="user_phone" type="tel" class="form-control" id="inputPhoneNumber" required="" placeholder="Podaj numer telefonu dla dostawcy">
                            <div class="invalid-feedback">
                                Nr. telefonu nie został wprowadzony.
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label for="inputName">Imię i naziwsko</label>
                            <input v-model="user_name" type="text" class="form-control" id="inputName" required="" placeholder="Podaj imię oraz nazwisko">
                            <div class="invalid-feedback">
                                Imię nie zostało wporwadzone.
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label for="inputAdres">Adres</label>
                            <input v-model="user_address" type="text" class="form-control" id="inputAdres" required="" placeholder="Podaj ulicę oraz nr domu">
                            <div class="invalid-feedback">
                                Adres nie został wprowadzony.
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col">
                            <label for="inputPostal">Kod pocztowy</label>
                            <input v-model="user_postalCode" type="text" class="form-control" id="inputPostal" required="" placeholder="Podaj kod pocztowy">
                            <div class="invalid-feedback">
                                Kod pocztowy nie został wprowadzony.
                            </div>
                        </div>
                        <div class="col">
                            <label for="inputCity">Miejscowość</label>
                            <input v-model="user_city" type="text" class="form-control" id="inputCity" required="" placeholder="Podaj nazwę miejscowości">
                            <div class="invalid-feedback">
                                Miejscowość nie została wprowadzona.
                            </div>
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
            <hr class="basketHr">
                <div id="errorAlert" style="display: none" class="alert alert-danger" role="alert">Wypełnij poprawnie wszystkie pola.</div>
                <div id="successAlert" style="display: none" class="alert alert-success" role="alert">Zamówienie złożone! Zostaniesz przekierowany na stronę z płatnościami.</div>
            <div class="modal-footer bg-light">
                <button class="btn btn-info" @click="sendOrder">Zamów</button>
            </div>
        </div>
<!-- Modal Delete Dialog -->
        <div class="modal-background" id="modalDialog" tabindex="-1" role="dialog" v-if="deleteDialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Usuń produkt</h5>
            </div>
            <div class="modal-body">
                <p style="margin-bottom: 0px">Czy na pewno chcesz usunąć produkt z koszyka?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" @click="$emit('delete-row', this.deleteIndex, this.deletePrice), this.deleteDialog=false">Tak</button>
                <button type="button" class="btn btn-danger" @click="dialogHide">Nie</button>
            </div>
            </div>
        </div>
        </div>
<!-- Modal Delete Dialog -->
    </div>
</template>
<script>
import axios from 'axios';
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
  export default {
    name: 'basketModal',
    props: {
        showModal: Boolean,
        orderData: {
            type: Array,
            default: () => { return []; }
        },
        totalPrice: {default: () => {return this.totalPrice}}
    },
    data(){
        return {
            deleteDialog: false,
            deleteIndex: "",
            deletePrice: "",
        }
    },
    methods: {
        dialogShow(index, price){
            this.deleteIndex = index;
            this.deletePrice = price;
            this.deleteDialog=true;
            },
        dialogHide(){this.deleteDialog=false;},
        MealsQuantityById() {
        var filtered = {}
        for (let i in this.orderData) {
            let key = this.orderData[i].MealId
            filtered[key] = {
            MealId: key,
            Quantity: filtered[key] && filtered[key].Quantity ? filtered[key].Quantity + 1 : 1
            }
        }
        return Object.values(filtered)
        },
        closeModal() {
            this.$emit('clicked');
        },
        sendOrder() {
            if(this.user_address == "" || this.user_postalCode == "" || this.user_city == "" ||
            this.user_phone == "" || this.user_name == "" || this.user_email == ""){
                document.getElementById("errorAlert").style = "display: block!important";
            }else{
            document.getElementById("successAlert").style = "display: block!important";
            setTimeout(() => {
            axios.post('order', {
                OrderPrice: this.totalPrice,
                UserId: this.user_id,
                meals: this.MealsQuantityById()
            }).then(response => {
                if(response.status >= 200 && response.status < 300){
                    console.log(response.data);
                    console.log("success");
                }
                console.log(response.data);
            })
            axios.post('update/address/' + this.user_id, {
                Address: this.user_address,
                PostalCode: this.user_postalCode,
                City: this.user_city,
                PhoneNumber: this.user_phone,
            }).then(response => {
                if(response.status >= 200 && response.status < 300){
                    console.log(response.data);
                    console.log("success");
                }
                console.log(response.data);
            })
            this.$router.push('/payments');
            }, 4000);
            }
        },
    },
      setup() {
        const message = ref('You are not logged in!');
        const store = useStore();
        const user_name = ref();
        const user_id = ref();
        const user_email = ref();
        const user_address = ref();
        const user_postalCode = ref();
        const user_city = ref();
        const user_phone = ref();
    
    onMounted(async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });
        const content = await response.json();
        message.value = `Zalogowano pomyślnie!`;
        user_name.value = `${content.name} `;
        user_id.value = `${content.id} `;
        user_email.value = `${content.email} `;
        await store.dispatch('setAuth', true);

        const responseAddresses = await fetch('http://127.0.0.1:8000/api/address/' + user_id.value, {
        headers: {'Content-Type': 'application/json'}
        });
        const contentAddresses = await responseAddresses.json();
        const cont = await Object(contentAddresses.data[0]);
        user_address.value = `${cont.Address} `;
        user_postalCode.value = `${cont.PostalCode} `;
        user_city.value = `${cont.City} `;
        user_phone.value = `${cont.PhoneNumber} `;
      } catch (e) {
        await store.dispatch('setAuth', false);
      }
      
    });

    return {
      message,
      user_name,
      user_id,
      user_email,
      user_address,
      user_postalCode,
      user_city,
      user_phone,
    }
  }
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
    .modal-background{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: transparent;
    }
    .modal-dialog{
        margin-top: 30%!important;
    }
</style>