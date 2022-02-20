<template>
<div id="account">
  <User-nav/>
            <div class="row d-flex justify-content-center mt-5" id="dashstyle">
                <div class="mt-5 col-md-3 col-sm-6 col-xs-12">
                    <div class="account">
                        <div class="text-center">
                         <img src="../../../src/assets/mycollection/png/others/avatar.png" class="img-fluid" alt="Responsive image">
                         </div>
                         <div class="mt-3 text-center d-flex flex-column align-items-center">
    <p>Nazwa uzytkownika: {{user_name}}</p>
    <p>Adres e-mail: {{ user_email }}</p>
    <p>Jesteś z nami od: {{ user_created }}</p>
    </div>
                    </div>
                </div>
            <div class="mt-5 col-md-5 col-sm-6 col-xs-12">
                <h1 class="text-center">Zamówienia</h1>
                                <div class="feature-content d-flex align-items-center">
                                    <div class="text-center m-3">

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
      } catch (e) {
        await store.dispatch('setAuth', false);
      }
    });

    return {
      message,
      user_name,
      user_id,
      user_email,
      user_created
    }
  }
}
</script>
<style>
.account{
font-family: 'DM Sans', sans-serif;
}
</style>
