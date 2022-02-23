
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default function useCategories() {
    const category = ref([])
    const categories = ref([])
    const router = useRouter()
    const errors = ref('')

    const getCategories = async () =>{
        let res = await axios.get('http://localhost:8000/api/category');
        categories.value = res.data.data;
    }

    const getThisCategory = async (CategoryId) =>{
        let res = await axios.get('http://localhost:8000/api/category/' + CategoryId);
        category.value = res.data.data;
    }
    const storeCategory = async (data) => {

        errors.value = ''
        try {
            await axios.post('http://localhost:8000/api/category/', data)
        } catch (e) {
            console.log(data.value)
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const updateCategories = async (CategoryId) => {
        errors.value = ''
        try {
            await axios.put('http://localhost:8000/api/category/' + CategoryId, category.value)
            await router.push({name: 'Categories'})
        } catch (e) {
            console.log(category.value)
            if (e.response.status === 422) {
               errors.value = e.response.data.errors
            }
        }
    }

    const destroyCategory = async (CategoryId) => {
        await axios.delete('http://localhost:8000/api/category/' + CategoryId);
    }

    return {
        categories,
        category,
        storeCategory,
        getCategories,
        getThisCategory,
        destroyCategory,
        updateCategories,
        errors
    }
}