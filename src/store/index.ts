import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useStore = defineStore(
    'main', () => {




        
        const block_list = ref([
            { name: '0',id:Math.random().toString(36).substr(2, 9) ,ct:'',cwd:'~'}, 
        ])



        const cwd= ref('~')
        return {
            block_list
            ,cwd
        }
    }
)