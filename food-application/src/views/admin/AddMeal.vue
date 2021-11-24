<template>
         <div class="d-flex" id="wrapper">
        <Sidebar/>
            <div id="page-content-wrapper">
        <Admin-nav/>
        <div class="container">
            <div class="form">
      <h3>Dodaj Danie</h3>
  <div class="form-group">
  <label>Nazwa</label>
  <input type="text" class="form-control" v-model="Name" placeholder=""/>
</div>
<div class="form-group">
    <label>Cena</label>
    <input type="text" class="form-control" v-model="Price" placeholder=""/>
</div>
        <div class="merge d-flex justify-content-center flex-column">
      <button v-on:click="submitForm()" class="btn btn-dark shadow-sm btn-block btn-lg mt-2">Dodaj</button>
  </div>
             </div>
             </div>
                </div>
            </div>
  
</template>

<script>
import axios from 'axios'
import AdminNav from '../../components/admin/AdminNav.vue';
import Sidebar from '../../components/admin/Sidebar.vue';
export default {
  components: { AdminNav, Sidebar },
  data: function(){
    return {
      Name: "",
      Price: ""
    };
  },
  methods: {
    submitForm(){
            const FormData = require("form-data");
            const formData = new FormData();
            formData.append('Name', this.Name);
            formData.append('Price', this.Price);
      axios.post('add/meal/', formData).then(response => {
        if(response.status >= 200 && response.status < 300) {
          this.$router.push('meals')
      }
    })
  }
  }
};
</script>

<style>

</style>