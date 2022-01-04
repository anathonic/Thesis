<template >
         <div class="d-flex" id="wrapper">
        <Sidebar/>
            <div id="page-content-wrapper">
        <Admin-nav/>
                <div class="container-fluid">
                    <h1 class="m-4">Składniki</h1>
<table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Składnik</th>
      <th scope="col">Status</th>
      <th scope="col">Edytuj</th>
      <th scope="col">Usuń</th>
    </tr>
  </thead>
  <tbody>
    <tr
    v-for="ingredient in ingredients"
    :key="ingredient.IngId"
    >
    <th class="pt-3" scope="row">{{ ingredient.IngId}}</th>
    <td class="pt-3">{{ ingredient.IngName }}</td>
    <td class="pt-3">{{ ingredient.Status }}</td>
    <td>
    <img src="../../../src/assets/mycollection/png/others/edit.png" class="img-fluid mt-2 ms-2" alt="Responsive image" style="width:32px">
    </td>
    <td>
    <img src="../../../src/assets/mycollection/png/others/trash.png" class="img-fluid mt-2 ms-2" alt="Responsive image" style="width:32px">

    </td>
    </tr>
  </tbody>
</table>

                </div>
            </div>
        </div> 
</template>

<script>
import axios from 'axios'
import AdminNav from '../../components/admin/AdminNav.vue'
import Sidebar from '../../components/admin/Sidebar.vue'
export default {
  components: { Sidebar, AdminNav },
    name: 'Ingredients',
    data () {
        return {
            ingredients: [],
            url: window.location.origin
        }
    },
    
    methods: {
        getIng() {
            axios.get('ingredients').then(response => {
                if(response.status >= 200 && response.status < 300){
                    this.ingredients = response.data.data
                }
                console.log(response.data);
            })
        },
    },
    mounted () {
        this.getIng()
        }
    }

</script>

<style>
#page-content-wrapper {
    width: 100%;
}
</style>