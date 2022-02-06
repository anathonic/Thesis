<template>
    <div>
        <Admin-nav/>
        <div class="row d-flex justify-content-center">
            <div class="col-sm-6">
                <div class="card m-3 shadow-lg">
                    <div class="card-header">
                        <h1>Edytuj składnik</h1>
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="saveIngredients">
                            <div class="form-floating mb-3">
                                <input type="text" id="IngName" class="form-control" name="IngName" v-model="ingredient.IngName">
                                <label for="IngName">Nazwa składnika</label>
                            </div>
                            <div class="form-floating mb-3">
                                <select class="form-select" id="Status" v-model="ingredient.Status">
                                    <option value="">-- Wybierz --</option>
                                    <option value="1">Aktywny</option>
                                    <option value="0">Nieaktywny</option>
                                    <option value="2">Brak na stanie</option>
                                </select>
                                <label for="Status">Status</label>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="submit" class="btn btn-dark">Zapisz</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

import {onMounted} from "vue";
import useIngredients from "../../composables/ingredients.js";
import AdminNav from "../../components/admin/AdminNav.vue"
export default{
    props: {
        IngId: {
            required: true,
            type: String
        }
    },
    components: {AdminNav},
    setup(props) {
        const { errors, getThisIng, updateIng, ingredient} = useIngredients()

        onMounted(getThisIng(props.IngId))

        const saveIngredients = async () => {
            await updateIng(props.IngId)
        }

        return {
            ingredient,
            errors,
            saveIngredients
        }
    }

}

</script>
