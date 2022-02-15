<template>
    <div>
        <div class="row mx-1 mt-3">
            <div class="col-md-4 mb-3">
                <div class="card shadow-lg px-0 mx-0">
                    <div class="card-header">
                        <h1>Edytuj posiłek</h1>
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="saveMeal">
                            <div class="form-floating mb-3">
                                <input type="text" id="Name" class="form-control" name="Name" v-model="meal.Name">
                                <label for="Name">Nazwa</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" id="Price" class="form-control" name="Price" v-model="meal.Price">
                                <label for="Price">Cena</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select class="form-select" id="Status" v-model="meal.Status">
                                    <option value="">-- Wybierz --</option>
                                    <option value="1">Aktywny</option>
                                    <option value="0">Nieaktywny</option>
                                    <option value="2">Brak na stanie</option>
                                </select>
                                <label for="Status">Status</label>
                            </div>
                             <div class="form-floating mb-3">
                                <select class="form-select" id="Category" v-model="meal.Category">
                                    <option value="">-- Wybierz --</option>
                                    <option value="1">Dania główne</option>
                                    <option value="2">Przystawki</option>
                                    <option value="3">Napoje</option>
                                    <option value="4">Zupy</option>
                                    <option value="5">Zestawy</option>
                                    <option value="6">Desery</option>
                                </select>
                                <label for="Status">Kategoria</label>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="submit" class="btn btn-dark">Zapisz</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card shadow-lg px-0 mx-0">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md">
                                <h1 class="dasplay-6">Lista składników</h1>
                            </div>
                        </div>
                    </div>
                    <div class="card-body table-responsive">
                        <table class="table table-striped table-hover table-sm mb-0">
                            <thead>    
                                <tr>
                                    <th scope="col">Składnik</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="mealIngredient in mealsIngredients" v-bind:key="mealIngredient" for="belongsTo">
                                    <td>
                                        {{ mealIngredient.IngName }}
                                    </td>
                                    <td class=" d-flex justify-content-end pe-2">
                                        <button class="btn btn-sm p-0" @click="deleteMealIngredient(mealIngredient.MealIngId)"><i class="fa fa-minus"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="col d-flex justify-content-end p-0">
                            <button type="button" class="btn btn-dark" data-bs-toggle="collapse" data-bs-target="#AddIngForm">+<i class="fa fa-plus"></i></button>
                    
                    </div>
                        <div class="collapse" id="AddIngForm">
                            <form v-on:change="saveOnChange" method="post">
                                <div class="form-floating">
                                    <select v-model="form.IngId" class="form-select" id="floatingSelect">
                                        <option value="" selected>--wybierz--</option>
                                        <option v-for="ingredient in ingredients" v-bind:key="ingredient.IngId">
                                            {{ingredient.IngName}}
                                        </option>
                                    </select>
                                    <label for="floatingSelect">Dodaj skłdanik</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { onMounted, reactive } from "vue"
import useMeals from "../../composables/Meals.js";
import useIngredients from "../../composables/ingredients";
import useMealsIngredients from "../../composables/MealsIngredients";

export default{
    props: {
        MealId: {
            required: true,
            type: String
        }
    },
  
    setup(props) {
        const { getThisMeal, updateMeal, meal, errors } = useMeals()
        const { getIng, ingredients } = useIngredients()
        const { getMealsIngredients, mealsIngredients, storeMealsIngredients, destroyMealsIngredients } = useMealsIngredients()

        const form = reactive({
            IngId: '',
            MealId: props.MealId,
        })

        onMounted(getIng)
        onMounted(getMealsIngredients(props.MealId))
        onMounted(getThisMeal(props.MealId))

        const saveMeal = async () => {
            await updateMeal(props.MealId)
        }

        const saveOnChange = async () => {
            await storeMealsIngredients({...form})
            await getMealsIngredients(props.MealId)
            form.IngId = '';
        }

        const deleteMealIngredient = async (MealIngId) => {
            await destroyMealsIngredients(MealIngId)
            await getMealsIngredients(props.MealId)
        }
        
        return {
            meal,
            errors,
            saveMeal,
            ingredients,
            mealsIngredients,
            saveOnChange,
            deleteMealIngredient,
            form
        }
    }
}

</script>