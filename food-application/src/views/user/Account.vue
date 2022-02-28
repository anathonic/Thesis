<template>
<div id="account">
  <User-nav/>
            <div class="row d-flex justify-content-center mt-5" id="dashstyle">
                <div class="mt-5 col-md-3 col-sm-6 col-xs-12">
                    <div class="account">
                        <div class="text-center">
                         <img src="../../../src/assets/mycollection/png/new/user128.png" class="img-fluid" alt="Responsive image">
                         </div>
                         <div class="mt-3 text-center d-flex flex-column align-items-center">
    <p>Nazwa uzytkownika: {{user_name}}</p>
    <p>Adres e-mail: {{ user_email }}</p>
    <p>Jesteś z nami od: {{ user_created }}</p>
    <p>Ulica: {{user_address}}</p>
    <p>Kod pocztowy i miasto: {{ user_postalCode }} {{user_city}}</p>
    <p>Twój numer telefonu: {{ user_phone }}</p>
    </div>
                    </div>
                </div>
    </div>
    </div>
</template>

<script>
import moment from 'moment'
import {onMounted, ref} from 'vue';
import {useStore} from "vuex";
import UserNav from '../../components/user/UserNav.vue';
export default {
  components: { UserNav },
  name: "Home",

  setup() {
    const message = ref('You are not logged in!');
    const store = useStore();
    const user_name = ref();
    const user_id = ref();
    const user_email = ref();
    const user_created = ref();
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
        user_created.value = `${content.created_at} `.split("").slice(0, 10).join("");
        user_created.value = moment(user_created.value).locale('pl').format('D MMMM YYYY');
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
      user_created,
      user_address,
      user_postalCode,
      user_city,
      user_phone,
    }
  }
}
</script>
<style>
.account{
font-family: 'DM Sans', sans-serif;
}
</style>
