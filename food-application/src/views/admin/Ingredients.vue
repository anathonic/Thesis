<template >
            <div id="page-content-wrapper">
        <Admin-nav/>
                <div class="container-fluid">
                    <h1 class="text-center mt-5">Składniki</h1>
<table class="d-flex flex-column align-items-center table">
  <tbody>
    <thead>
    <tr>
      <th class="el" scope="col"><p>ID</p></th>
      <th class="el" scope="col"><p>Składnik</p></th>
      <th class="el" scope="col"><p>Status</p></th>
      <th class="el" scope="col"><p>Edytuj</p></th>
      <th class="el" scope="col"><p>Usuń</p></th>
    </tr>
  </thead>
    <tr
    v-for="ingredient in ingredients"
    :key="ingredient.IngId"
    >
    <th class="pt-3">{{ ingredient.IngId}}</th>
    <td class="pt-3">{{ ingredient.IngName }}</td>
    <td class="pt-3">{{ ingredient.StatusName }}</td>
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
</template>

<script>
import axios from 'axios'
import AdminNav from '../../components/admin/AdminNav.vue'
export default {
  components: { AdminNav },
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
h1{
font-family: 'DM Sans', sans-serif;
}
th.el p {
color:black;
font-weight: bold;

}
#page-content-wrapper {
    width: 100%;
}
</style>