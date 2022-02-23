<template v-slot:default>
            <div id="page-content-wrapper">
        <Admin-nav/>
                <div class="container-fluid">
        <div class="text-center d-flex justify-content-between align-items-center">
        <h1 class="text-center">Dania</h1>

        <a class="btn btn-dark m-4" role="button" data-bs-toggle="modal" data-bs-target="#AddMealModal">Dodaj nowe</a>           
        </div>
<table class="d-flex flex-column align-items-center table">
  <tbody>
      <thead >
    <tr>
      <th class="el" scope="col"><p>ID</p></th>
      <th class="el" scope="col"><p>Nazwa</p></th>
      <th class="el" scope="col"><p>Edytuj</p></th>
      <th class="el" scope="col"><p>Usuń</p></th>
    </tr>
  </thead>
    <tr 
    v-for="category in categories"
    :key="category.id"
    >
    <th class="pt-3">{{ category.id }}</th>
    <td class="price pt-3">{{ category.Name }}</td>


    <td>
    <img
     src="../../../src/assets/mycollection/png/others/edit.png"
     class="img-fluid mt-2 ms-2" alt="Responsive image"
     style="width:32px"
     v-on:click="() => $router.push({name: 'categories.edit', params: {CategoryId: category.id}})"
     />
    </td>
    <td>
    <img v-on:click="deleteCategory(category.id)" src="../../../src/assets/mycollection/png/others/trash.png" class="img-fluid mt-2 ms-2" alt="Responsive image" style="width:32px">
    </td>
    </tr>

  </tbody>
</table>
           <div class="modal fade" id="AddMealModal" tabindex="-1" aria-labelledby="AddMealModallabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <form @submit.stop.prevent="saveCategory">
                            <div class="modal-header">
                                <h5 class="modal-title" id="AddMealModallabel">Dodanie składnika</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" v-model="form.Name" id="Name" placeholder="Nazwa">
                                    <label for="Name">Nazwa</label>
                                </div>
                            </div>
                            <div class="modal-footer">
                              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" >Dodaj</button>
                            </div>
                        </form>
                    </div>
                </div>
           </div>
                </div>
            </div>
</template>


<script>
import axios from 'axios'
import useCategories from "../../composables/Categories.js"
import AdminNav from "../../components/admin/AdminNav.vue"

import { onMounted, reactive } from "vue"


   export default {
     components: {AdminNav},
        setup() {
            const { categories, getCategories, getThisCategory, category, storeCategory, errors } = useCategories()

            const form = reactive({
                Id: '',
                Name: '',
            })

            onMounted(getCategories)
            const saveCategory = async () => {
                await storeCategory({...form});
                await getCategories();
            }

            const deleteCategory = async (CategoryId) => {
                if(!window.confirm('Czy napewno usunąć tą pozycję?')){
                    return
                }
                
                await axios.delete('/category/' + CategoryId);
                await getCategories();
            }
            onMounted(getCategories)
            return {
              getThisCategory,
                category,
                categories,
                errors,
                deleteCategory,
                saveCategory,
                form
            }
        }
    }

</script>

<style>

</style>