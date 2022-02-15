
<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light mb-4" id="navbar">
    <div class="container-fluid">
           <router-link to="/">
        <img src="../../../src/assets/mycollection/png/food/food-13.png" class="img-fluid mb-3" alt="Responsive image">
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
                   <li class="nav-item active"><a class="nav-link" href="/cart">Koszyk</a></li>
                    <li class="nav-item active"><a class="nav-link" href="/orders">Twoje zamówienia</a></li>
                     <li class="nav-item active"><a class="nav-link" href="/settings">Ustawienia</a></li>
                   <li class="nav-item active"><p @click="logout"  class="nav-link"  href=""> Wyloguj</p></li>
            </ul>

      </div>
    </div>
  </nav>
</template>
<script>
import {computed} from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {onMounted, ref} from 'vue';

export default {
  name: "Nav",
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
        const respone = await fetch('http://127.0.0.1:8000/api/user',{
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
      await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });
      localStorage.setItem('jwt', null)
      localStorage.setItem('role', null)
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
</style>
