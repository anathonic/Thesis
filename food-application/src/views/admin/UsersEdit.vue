<template>
    <div>
        <Admin-nav/>
        <div class="row d-flex justify-content-center">
            <div class="col-sm-6">
                <div class="card m-3 shadow-lg">
                    <div class="card-header">
                        <h1>Edytuj uzytkownika</h1>
                    </div>
                    <div class="card-body">
                        <form v-on:submit.prevent="saveUsers">
                            <div class="form-floating mb-3">
                                <input type="text" id="Name" class="form-control" name="Name" v-model="user.name">
                                <label for="Name">Imie i nazwisko</label>
                            </div>
                                                        <div class="form-floating mb-3">
                                <input type="text" id="password" class="form-control" name="password" v-model="user.password">
                                <label for="Name">Imie i nazwisko</label>
                            </div>
                          <div class="form-group">
                            <label>Rola</label>
                            <select class="form-select" v-model="user.role" >
                            <option value="2">Admin</option>
                            <option value="3">Chef</option>
                            <option value="1">User</option>
                            </select>
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
import useUsers from "../../composables/Users.js";
import AdminNav from "../../components/admin/AdminNav.vue"
export default{
    props: {
        UserId: {
            required: true,
            type: String
        }
    },
    
    components: {AdminNav},

    setup(props) {
        const { errors, getThisUser, updateUser, user} = useUsers()
console.log(props.UserId);
        onMounted(getThisUser(props.UserId))

        const saveUsers = async () => {
            await updateUser(props.UserId)
        }

        return {
            user,
            errors,
            saveUsers
        }
    }

}

</script>
