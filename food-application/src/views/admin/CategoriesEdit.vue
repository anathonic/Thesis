<template>
    <div>
        <Admin-nav/>
        <div class="row d-flex justify-content-center">
            <div class="col-sm-6">
                <div class="card m-3 shadow-lg">
                    <div class="card-header">
                        <h1>Edytuj kategorie</h1>
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="saveCategory">
                            <div class="form-floating mb-3">
                                <input type="text" id="Name" class="form-control" name="Name" v-model="category.Name">
                                <label for="Name">Nazwa kategorii</label>
                            </div>
                             <div class="form-floating mb-3">
                                <select class="form-select" id="Status" v-model="category.Stat">
                                    <option value="">-- Wybierz --</option>
                                    <option value="1">Aktywny</option>
                                    <option value="0">Nieaktywny</option>
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
import useCategories from "../../composables/Categories.js";
import AdminNav from "../../components/admin/AdminNav.vue"
export default{
    props: {
        CategoryId: {
            required: true,
            type: String
        }
    },
    components: {AdminNav},
    setup(props) {
        const { errors, getThisCategory, updateCategories, category} = useCategories()

        onMounted(getThisCategory(props.CategoryId))

        const saveCategory = async () => {
            await updateCategories(props.CategoryId)
        }

        return {
            category,
            errors,
            saveCategory
        }
    }

}

</script>
