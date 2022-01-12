
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default function useIngredients() {
    const mealsIngredients = ref([])
    const router = useRouter()
    const errors = ref('')

    const getMealsIngredients = async (MealId) =>{
        let res = await axios.get('http://localhost:8000/api/mealsIngredients/' + MealId);
        mealsIngredients.value = res.data.data;
    }

    const storeMealsIngredients = async (data) => {
        errors.value = ''
        try {
            await axios.post('http://localhost:8000/api/mealsIngredients/store', data)
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const destroyMealsIngredients = async (MealIngId) => {
        await axios.delete('http://localhost:8000/api/mealsIngredients/' + MealIngId + '/delete');
    }

    return {
        mealsIngredients,
        getMealsIngredients,
        storeMealsIngredients,
        destroyMealsIngredients,
        errors,
    }
}