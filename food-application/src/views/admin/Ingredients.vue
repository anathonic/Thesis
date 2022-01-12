<template >
            <div id="page-content-wrapper">
        <Admin-nav/>
                <div class="container-fluid">
        <div class="text-center d-flex justify-content-between align-items-center">
        <h1 class="text-center">Składniki</h1>

        <a class="btn btn-dark m-4" role="button" data-bs-toggle="modal" data-bs-target="#AddIngModal">Dodaj nowy</a>           
        </div>
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
    <img  src="../../../src/assets/mycollection/png/others/edit.png" class="img-fluid mt-2 ms-2" alt="Responsive image" style="width:32px"
    v-on:click="() => $router.push({name: 'Ingredients.edit', params: {IngId: ingredient.IngId}})"
    >
    </td>
    <td>
    <img v-on:click="deleteIng(ingredient.IngId)" src="../../../src/assets/mycollection/png/others/trash.png" class="img-fluid mt-2 ms-2" alt="Responsive image" style="width:32px">

    </td>
    </tr>
  </tbody>
</table>
<div class="modal fade" id="AddIngModal" tabindex="-1" aria-labelledby="AddIngModallabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form @submit.stop.prevent="saveIng">
                            <div class="modal-header">
                                <h5 class="modal-title" id="AddIngModallabel">Dodanie składnika</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" v-model="form.IngName" id="name" placeholder="Nazwa">
                                    <label for="name">Nazwa</label>
                                </div>
                            </div>
                            <div class="modal-footer">
                              <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Dodaj</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

                </div>
            </div>
</template>

<script>

import AdminNav from '../../components/admin/AdminNav.vue'
import useIngredients from "../../composables/ingredients.js";
import { onMounted, reactive } from "vue";
export default {
  components: { AdminNav },
       setup() {
            const { ingredients, ingredient, getIng, destroyIng, errors, storeIng } = useIngredients()

            onMounted(getIng)
        
            const form = reactive({
                IngName: '',
            })

            const saveIng = async () => {
                await storeIng({...form});
                await getIng();
            }

            const deleteIng = async (IngId) => {
                if(!window.confirm('Czy napewno usunąć ten składnik?')){
                    return
                }

                await destroyIng(IngId);
                await getIng();
            }

            onMounted(getIng)

            return {
                ingredients,
                deleteIng,
                form,
                errors,
                saveIng,
                ingredient,
            }
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