<template>
  <div id="menu">
      <Nav/>
      <div class="m-5 text-center">
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
    <div  v-if="meal.CategoryName === 'Przystawki'">
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
    <div v-if="meal.CategoryName === 'Dania główne'">
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
    <div v-if="meal.CategoryName === 'Zestawy'">
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
    <div v-if="meal.CategoryName === 'Desery'">
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
    <div v-if="meal.CategoryName === 'Napoje'">
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