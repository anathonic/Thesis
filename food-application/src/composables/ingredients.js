
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default function useIngredients() {
    const ingredient = ref([])
    const ingredients = ref([])
    const router = useRouter()
    const errors = ref('')

    const getIng = async () =>{
        let res = await axios.get('http://localhost:8000/api/ingredients');
        ingredients.value = res.data.data;
    }

    const getThisIng = async (IngId) =>{
        let res = await axios.get('http://localhost:8000/api/ingredients/' + IngId);
        ingredient.value = res.data.data;
    }

    const storeIng = async (data) => {

        errors.value = ''
        try {
            await axios.post('http://localhost:8000/api/ingredients/', data)
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const updateIng = async (IngId) => {
        errors.value = ''
        try {
            await axios.put('http://localhost:8000/api/ingredients/' + IngId, ingredient.value)
            await router.push({name: 'Ingredients.index'})
        } catch (e) {
            if (e.response.status === 422) {
               errors.value = e.response.data.errors
            }
        }
    }

    const destroyIng = async (IngId) => {
        await axios.delete('http://localhost:8000/api/ingredients/' + IngId);
    }

    return {
        ingredients,
        ingredient,
        getIng,
        destroyIng,
        storeIng,
        updateIng,
        errors,
        getThisIng
    }
}