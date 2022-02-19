<template>
<div id="create">
    <admin-nav/>
    <div class="container mt-5">
            <div id="box" class="form pt-4 border-0 rounded-4 shadow-lg overflow-hidden">
      <form @submit.prevent="submit"> 
              <div class="text-center">
        <h2>Nowy użytkownik</h2>
      </div>
         <div class="form-group">
  <label>Imię</label>
  <input v-model="data.name" class="form-control" placeholder="Name" required>
</div>
<div class="form-group">
    <label>E-mail</label>
    <input v-model="data.email" type="email" class="form-control" placeholder="Email" required>
</div>
<div class="form-group">
    <label>Hasło</label>
    <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>
</div>

<div class="form-group">
    <label>Rola</label>
<select class="form-select" v-model="data.role">
 <option value="2">Admin</option>
<option value="3">Chef</option>
 <option value="1">User</option>
</select>
 </div>
 <div class="text-center">
 <button class="btn btn-dark shadow-sm btn-block mt-2">Stwórz</button>
  </div>
        </form>
            </div>
    </div>
</div>
</template>


<script>
import {reactive} from 'vue';
import {useRouter} from "vue-router";
import AdminNav from '../../components/admin/AdminNav.vue'
export default {
  components: { AdminNav },
    name: 'UserCreate',
    setup() {
    const data = reactive({
      name: '',
      email: '',
      password: '',
      role: '',
    });
        const router = useRouter();
    const submit = async () => {
      await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
       await router.push('/usersmanagement');
    }

    return {
      data,
      submit
    }
  }
}
</script>

<style>

</style>