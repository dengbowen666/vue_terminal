import { resolve } from 'path';
import {ref} from 'vue'
export const usePrintWord = () => { 
    async function  interPrintWord(word: string,result: any) {
        const letters = word.split('');
       
        letters.forEach((letter, index) => {

            setTimeout(() => {
                result.value += `${letter}`;
            }, (index + 1) * 100);
            
        })
       return new Promise((resolve) => {
            setTimeout(() => {
                resolve(result.value);
            }, (letters.length) * 100+500);
       })
        
    }
    async function immediatePrintWord(word: string, result: any) {
        return new Promise((resolve) => {
            result.value = word;
            setTimeout(() => {
                
                resolve(result.value);
            },500)
        })


      
    }

    return {
        interPrintWord, immediatePrintWord
}

}
