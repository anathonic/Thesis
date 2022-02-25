import { ref } from 'vue';
import axios from 'axios';

export default function useOrders() {
    const Orders = ref([])

    const getOrders = async () =>{
        let res = await axios.get('/orders');
        Orders.value = res.data.data;
    }

    return {
        getOrders,
        Orders
    }
}