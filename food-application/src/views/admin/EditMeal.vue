<template>
         <div class="d-flex" id="wrapper">
        <Sidebar/>
            <div id="page-content-wrapper">
        <Admin-nav/>
        <div class="container">
            <form
            ref="form"
            lazy-validation
            >
      <h3>Edycja</h3>
  <div class="form-group">
  <label>Nazwa</label>
  <input v-model="Name" name="Name" class="form-control"  placeholder=""/>
</div>
<div class="form-group">
    <label>Cena</label>
    <input v-model="Price" name="Price" class="form-control" placeholder=""/>
</div>
<!-- <fieldset>
<div>
  <h5 class="mt-3">Status</h5>
  <div class="text-center d-flex justify-content-between">
  <label>
    <input type="radio" class="radio" value="1" name="Status" v-model="Status" />Aktywny</label>
  <label>
    <input type="radio" class="radio" value="0" name="Status" v-model="Status" />Nieaktywny</label>
</div>
</div>
</fieldset> -->
        <div class="merge d-flex justify-content-center flex-column">
      <button v-on:click="submitForm()" class="btn btn-dark shadow-sm btn-block btn-lg mt-2">Modyfikuj</button>
  </div>
             </form>
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
  props: ['meal'],
  data: function (){
    return {
      Name: this.Name,
      Price: this.Price
    }
  },
  methods: {
    submitForm(){
            const FormData = require("form-data");
            const formData = new FormData();  
            this.Name && formData.append('Name', this.Name);
            this.Price && formData.append('Price', this.Price);
      axios.post('update/meal/'+this.meal.Id, formData).then(response => {
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