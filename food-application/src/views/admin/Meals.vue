<template v-slot:default>
            <div id="page-content-wrapper">
        <Admin-nav/>
                <div class="container-fluid">
        <div class="text-center d-flex justify-content-between align-items-center">
        <h1 class="text-center">Dania</h1>
        <a class="btn btn-dark m-4" href="./addmeal" role="button">Dodaj nowe</a>           
        </div>
<table class="d-flex flex-column align-items-center table">
  <tbody>
      <thead >
    <tr>
      <th class="el" scope="col"><p>ID</p></th>
      <th class="el" scope="col"><p>Danie</p></th>
      <th class="el" scope="col"><p>Cena</p></th>
      <th class="el" scope="col"><p>Status</p></th>
      <th class="el" scope="col"><p>Edytuj</p></th>
      <th class="el" scope="col"><p>Usuń</p></th>
    </tr>
  </thead>
    <tr 
    v-for="meal in meals"
    :key="meal.MealId"
    >
    <th class="pt-3">{{ meal.MealId}}</th>
    <td class="price pt-3">{{ meal.Name }}</td>
    <td class="pt-3">{{ meal.Price}}zł</td>
    <td class="pt-3">{{ meal.StatusName }}</td>
    <td>
    <img
     src="../../../src/assets/mycollection/png/others/edit.png"
     class="img-fluid mt-2 ms-2" alt="Responsive image"
     style="width:32px"
     v-on:click="() => $router.push({name: 'EditMeal', params: {meal}})"
     />
    </td>
    <td>
    <img v-on:click="deleteMeal(meal.Id)" src="../../../src/assets/mycollection/png/others/trash.png" class="img-fluid mt-2 ms-2" alt="Responsive image" style="width:32px">
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
    name: 'Meals',
    data () {
        return {
            meals: [],
            url: window.location.origin
        }
    },
    
    methods: {
        getMeals() {
            axios.get('meals').then(response => {
                if(response.status >= 200 && response.status < 300){
                    this.meals = response.data.data
                }
            })
        },
              deleteMeal(Id){
          axios.get('delete/meal/'+Id).then(response => {
            if(response.status >= 200 && response.status < 300){
                    alert('Danie usunięto pomyślnie')
                    this.getMeals()
          }
        })
        }
    },
    mounted () {
        this.getMeals()
        }
    }

</script>

<style>
th.el p {
margin-left: 1vw;
color:black;
font-weight: bold;
}

#page-content-wrapper {
    width: 100%;
}
</style>