import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useStore = defineStore(
    'main', () => {





        const block_list = ref([
            { name: '0',id:Math.random().toString(36).substr(2, 9) ,ct:''}, 
        ])
        return {
            block_list
        }
    }
)