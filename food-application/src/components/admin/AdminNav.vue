<template>
<nav class="m-1 navbar navbar-expand-lg navbar-light bg-white border-bottom">
    <div class="container-fluid">
        <router-link to="/panel">
        <img src="../../../src/assets/mycollection/png/others/menu.png" class="img-fluid p-2 " alt="Responsive image">
        </router-link>
        <div class="text-center m-3">
         <a class="navbar-brand" href="/panel">Admin Panel </a>
           <p>{{message}}</p>
           </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mt-4 mt-lg-0">
                <li class="nav-item active"><a class="nav-link" href="/meals">Dania</a></li>
                <li class="nav-item active"><a class="nav-link" href="/ingredients">Składniki</a></li>
                <li class="nav-item active"><a class="nav-link" href="/categories">Kategorie</a></li>
                <li class="nav-item active"><a class="nav-link" href="/adminmenu">Menu</a></li>
                <li class="nav-item active"><a class="nav-link" href="/kitchen">Kuchnia</a></li>
                <li class="nav-item active"><a class="nav-link" href="/orders">Zamówienia</a></li>
                              <li class="nav-item active"><a class="nav-link" href="/payments">Płatności</a></li>
                <li class="nav-item active"><a class="nav-link" href="/usersmanagement">Ustawienia</a></li>
                <li class="nav-item active"><p @click="logout"  class="nav-link"  href=""> Wyloguj</p></li>
            </ul>
        </div>
    </div>
</nav>  
</template>

<script>
import {computed} from 'vue';
import {useStore} from "vuex";
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";

export default {
  name: "AdminNav",
  methods: {
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
        const respone = await fetch('http://localhost:8000/api/user',{
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });
        const content =await respone.json();
        message.value = `Zalogowano jako ${content.name}`;
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

<style>

.mess {
  margin-top: 10px;
  margin-left: 20px;
}
.container-fluid{
font-family: 'DM Sans', sans-serif;
}
.navbar-brand{
 font-weight: bold;
}
</style>