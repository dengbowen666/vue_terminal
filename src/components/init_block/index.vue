<template>
    <div>
        <p> {{ versionWord }}{{ loginWord }}</p>
        <p> {{ usernameKey }}{{ Username }}</p>
        <p> {{ passwordKey }}{{ Password }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import { onMounted, ref } from 'vue'
import { useUser } from '../../hook/useUser.ts'
const { user } = useUser();
const { username, password } = user;
const emit = defineEmits(['isInit']);
import { usePrintWord } from '../../hook/usePrintWord.ts'
const { interPrintWord, immediatePrintWord } = usePrintWord();


function eventemit() {
    emit('isInit', param);
}
const usernameKey = ref(``)
const passwordKey = ref(``)
const Username = ref(``)
const Password = ref(``)
const versionWord = ref(``)
const loginWord = ref(``)
const param = true;
onMounted(async () => {
    await immediatePrintWord(`vue_terminal 1.0 `, versionWord)
    await interPrintWord(`$ login`, loginWord)
    await immediatePrintWord(`Username:`, usernameKey)
    await interPrintWord(username, Username)
    await immediatePrintWord(`Password:`, passwordKey)
    await interPrintWord(password, Password)
    eventemit()


    // .then((res) => {
    //     interPrintWord(password, Password).then((res) => {
    //         eventemit()
    //     })
    // })

}







);
</script>

<style scoped></style>