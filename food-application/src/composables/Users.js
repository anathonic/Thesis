
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default function useUsers() {
    const user = ref([])
    const users = ref([])
    const router = useRouter()
    const errors = ref('')

    const getUsers = async () =>{
        let res = await axios.get('http://localhost:8000/api/users');
        users.value = res.data.data;
    }

    const getThisUser = async (UserId) =>{
        let res = await axios.get('http://localhost:8000/api/users/' + UserId);
        user.value = res.data.data;
    }
    const storeUser = async (data) => {

        errors.value = ''
        try {
            await axios.post('http://localhost:8000/api/users/', data)
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const updateUser = async (UserId) => {
        errors.value = ''
        try {
            await axios.put('http://localhost:8000/api/users/' + UserId, user.value)
            await router.push({name: 'UsersManagement'})
        } catch (e) {
            if (e.response.status === 422) {
               errors.value = e.response.data.errors
            }
        }
    }

    const destroyUser = async (UserId) => {
        await axios.delete('http://localhost:8000/api/users/' + UserId);
    }

    return {
        users,
        user,
        storeUser,
        getUsers,
        getThisUser,
        destroyUser,
        updateUser,
        errors
    }
}