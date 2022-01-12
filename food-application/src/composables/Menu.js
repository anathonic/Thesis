import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default function useMenu() {
    const Menu = ref([])
    const errors = ref('')
    const router = useRouter()

    const getMenu = async () =>{
        let res = await axios.get('http://localhost:8000/api/menu');
        Menu.value = res.data.data;
    }

    const updateMenu = async (data) => {
        errors.value = ''
        try {
            await axios.post('http://localhost:8000/api/menu/add', data)
            await router.push({name: 'menu.index'})
        } catch (e) {
            if (e.response.status === 422) {
               errors.value = e.response.data.errors
            }
        }
    }

    return {
        getMenu,
        Menu,
        updateMenu,
        errors
    }
}