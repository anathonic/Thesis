
<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light mb-4" id="navbar">
    <div class="container-fluid">
        <div class="mt-3 mx-4" id="hi_user">
          <p>{{message}}</p>
        </div>
        <router-link to="/dashboard">
        <img src="../../../src/assets/mycollection/png/others/menu.png" class="img-fluid mx-2" alt="Responsive image">
        </router-link>
      <!-- <button
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
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Zaloguj się</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Zarejestruj się</router-link>
          </li>
        </ul>

        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="auth">
          <li class="nav-item">
            <a href="/order" class="nav-link">Menu</a> 
          </li>
          <li class="nav-item">
            <a href="/cart" class="nav-link">Koszyk</a> 
          </li>
          <li class="nav-item">
            <a href="/account" class="nav-link">Konto</a> 
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout">Wyloguj się</a> 
          </li>
        </ul>

      </div> -->
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
        const respone = await fetch('http://localhost:8000/api/user',{
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
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });
      await router.push('/login');
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
