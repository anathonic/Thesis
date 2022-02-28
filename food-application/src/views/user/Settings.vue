<template>
<div id="setting">
<User-nav/>
    <div class="container mt-0" id="dashstyle">
      <div class="row">
        <div class="col-md-8 order-md-1">
          <h2 class="text-center mb-3">Ustawienia</h2>
          <form class="needs-validation was-validated" novalidate="">
            <div class="mb-3">
              <label for="email">Imię i nazwisko</label>
                <input type="text" class="form-control" id="name" :placeholder="user_name">
            </div>

            <div class="mb-3">
              <label for="email">E-mail</label>
              <input type="email" class="form-control" id="email" :placeholder="user_email">
              <div class="invalid-feedback">
                Proszę wprowadź poprawny adres e-mail.
              </div>
            </div>
            <div class="mb-3">
              <label for="address">Adres <span class="text-muted">(Opcjonalnie)</span></label>
              <input v-model="user_address" type="text" class="form-control" id="address" required="" placeholder="">
              <div class="invalid-feedback">
                  Adres nie został wprowadzony.
                </div>
            </div>
            <div class="mb-3">
              <label for="city">Miejscowość <span class="text-muted">(Opcjonalnie)</span></label>
              <input v-model="user_city" type="text" class="form-control" id="city" required="" placeholder="">
              <div class="invalid-feedback">
                  Miejscowość nie została wprowadzony.
                </div>
            </div>


            <div class="row">
                <div class="d-flex">
              <div class="col-md-6 mb-2 p-1">
                <label for="cc-name">Kod pocztowy</label>
                <input v-model="user_postalCode" type="text" class="form-control" id="zip" placeholder="" required="">
                <small class="text-muted"><span class="text-muted">(Opcjonalnie)</span></small>
                <div class="invalid-feedback">
                  Kod pocztowy nie został wprowadzony.
                </div>
              </div>
              <div class="col-md-6 mb-2 p-1">
                <label for="cc-number">Numer telefonu</label>
                <input v-model="user_phone" type="text" class="form-control" id="cc-number" placeholder="" required="">
               <small class="text-muted"><span class="text-muted">(Opcjonalnie)</span></small>
                <div class="invalid-feedback">
                  Numer telefonu nie został wprowadzony.
                </div>
              </div>
              </div>
            </div>
          </form>
          <div class="text-center">
            <button class="mt-1 btn btn-dark btn-lg btn-block" @click="changeAddress">Zatwierdź dane</button>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
import UserNav from '../../components/user/UserNav.vue';
export default {
  components: { UserNav },
  name: "Settings",
  methods: {
  changeAddress(){
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
    }
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
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });
        const content = await response.json();
        message.value = `Zalogowano pomyślnie!`;
        user_name.value = `${content.name} `;
        user_id.value = `${content.id} `;
        user_email.value = `${content.email} `;
        await store.dispatch('setAuth', true);

        const responseAddresses = await fetch('http://localhost:8000/api/address/' + user_id.value, {
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
}
</script>
<style>
.container{
font-family: 'DM Sans', sans-serif;
}
</style>