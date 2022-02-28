<template>
<div id="menu">
<Nav/>
  <div class="card-body table-responsive m-5" :style="{display: isActive ? 'block' : 'none'}">
  <div class="text-center mt-5">
    <h1>Menu</h1>
  </div>
  <tbody>
    <tr
    v-for="category in categories"
    :key="category.Name"
    >
      <table class="table table-sm">
      <thead>    
      <tr v-if="category.Stat === 1 ">
       <th scope="col"  style="font-size: 18px; font-weight: bold;">{{category.Name}}</th>             
       </tr>
       </thead>
 <tbody>
 <tr
    v-for="meal in meals"
    :key="meal.CategoryName"
    >
       <td v-if="meal.Category == category.id && meal.StatusName === 'Aktywny' && category.Stat === 1 "> 
      <div style="font-size: 14px; font-weight: bold;">
       {{ meal.Name }}
       <div class="text-end">
       {{ meal.Price}}PLN
       </div>
      </div>
     {{ meal.Description }}
     </td>
    </tr>
</tbody>
</table>
    </tr>
  </tbody>
  </div>
  </div>  
</template>

<script>
    import Nav from "../../components/website/Nav.vue"
    import useMeals from "../../composables/Meals.js"
    import { onMounted, reactive, ref} from "vue"
    import axios from 'axios'
    export default {
        components: { Nav },
        data(){
          return{
              categories: []
          }  
        },
        setup() {
            
            const { meals, getMeals } = useMeals()

            const isActive = ref(true);
            
            const form = reactive({
                MealId: []
            })

            onMounted(getMeals)

            return {
                meals,
                isActive,
                form,
            }
        },
        methods: {
        getCategories() {
            axios.get('category').then(response => {
                if(response.status >= 200 && response.status < 300){
                    this.categories = response.data.data
                }
                console.log(response.data);
            })
        },
    },
    mounted () {
        this.getCategories()
        }
    }
</script>

