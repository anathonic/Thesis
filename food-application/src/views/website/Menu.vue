<template>
  <div id="menu">
      <Nav/>
      <div class="mt-4 text-center">
       <img src="../../../src/assets/mycollection/png/others/onigiri.png" class="img-fluid" alt="Responsive image">
        <h1>Menu</h1>
      </div>
      <table class="d-flex flex-column align-items-center table">
    <tbody>
      <hr class="line mb-3">
      <h3>Przystawki</h3>
        <hr class="line mb-3">

    <tr 
    v-for="meal in meals"
    :key="meal.Id"
    
    >
    <div  v-if="meal.CategoryName === 'Przystawki' && meal.StatusName != 'Nieaktywny'">
      <div class="d-flex justify-content-between">
<div class="column">
    <td >{{ meal.Name }}</td>
</div>
<div class="column">
    <td >{{ meal.Price}}zł</td>
</div>
    </div>
</div>
    </tr>
    
  <hr class="line mb-3">
      <h3>Dania główne</h3>
        <hr class="line mb-3">
    <tr 
    v-for="meal in meals"
    :key="meal.Id"
    >
    <div v-if="meal.CategoryName === 'Dania główne' && meal.StatusName != 'Nieaktywny'">
      <div class="d-flex justify-content-between">
<div class="column">
    <td >{{ meal.Name }}</td>
</div>
<div class="column">
    <td >{{ meal.Price}}zł</td>
</div>
    </div>
</div>
    </tr>
  <hr class="line mb-3">
      <h3>Zestawy</h3>
        <hr class="line mb-3">
    <tr 
    v-for="meal in meals"
    :key="meal.Id"
    >
    <div v-if="meal.CategoryName === 'Zestawy' && meal.StatusName != 'Nieaktywny'">
        <div class="d-flex justify-content-between">
<div class="column">
    <td >{{ meal.Name }}</td>
</div>
<div class="column">
    <td >{{ meal.Price}}zł</td>
</div>
</div>
    </div>
    </tr>
      <hr class="line mb-3">
      <h3>Zupy</h3>
        <hr class="line mb-3">
    <tr 
    v-for="meal in meals"
    :key="meal.Id"
    >
    <div v-if="meal.CategoryName === 'Zupy' && meal.StatusName != 'Nieaktywny'">
        <div class="d-flex justify-content-between">
<div class="column">
    <td >{{ meal.Name }}</td>
</div>
<div class="column">
    <td >{{ meal.Price}}zł</td>
</div>
</div>
    </div>
    </tr>
    <hr class="line mb-3">
      <h3>Desery</h3>
        <hr class="line mb-3">
    <tr 
    v-for="meal in meals"
    :key="meal.Id"
    >
    <div v-if="meal.CategoryName === 'Desery' && meal.StatusName != 'Nieaktywny'">
        <div class="d-flex justify-content-between">
<div class="column">
    <td >{{ meal.Name }}</td>
</div>
<div class="column">
    <td >{{ meal.Price}}zł</td>
</div>
</div>
    </div>
    </tr>
  <hr class="line mb-3">
      <h3>Napoje</h3>
        <hr class="line mb-3">
    <tr 
    v-for="meal in meals"
    :key="meal.Id"
    >
    <div v-if="meal.CategoryName === 'Napoje' && meal.StatusName != 'Nieaktywny'">
        <div class="d-flex justify-content-between">
<div class="column">
    <td >{{ meal.Name }}</td>
</div>
<div class="column">
    <td >{{ meal.Price}}zł</td>
</div>
</div>
    </div>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>

import useMeals from "../../composables/Meals.js"
import { onMounted, reactive } from "vue"
import Nav from '../../components/website/Nav.vue'
export default {
     components: { Nav },

 setup() {
            const { meals, getMeals, getThisMeal, meal, errors } = useMeals()

            const form = reactive({
                Name: '',
                Status: '',
                Price: '',
            })

            onMounted(getMeals)

            onMounted(getMeals)
            return {
              getThisMeal,
                meal,
                meals,
                errors,
                form
            }
        }
    }

</script>

<style>

.line {
  width: 40vw;
  margin: auto;
  border: 0.2vw solid black;
}
</style>