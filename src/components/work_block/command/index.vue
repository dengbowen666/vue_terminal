<template>
    <div>
        <span class="user">
            dbw</span>
        @<span class="host">dbw2004.com</span>:<span class="cwd">cwd{{ cwd }}
        </span>$ <input class="command_input" type="text" v-model="command_name" @keyup.enter="execute_command(command_name) "
            :disabled="disabled" />
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue";
const command_name = ref("")
import pubsub from 'pubsub-js';

const disabled = ref(false)
const execute_command = (command_name:string) => {
    // block_list.value.push({ command_name: command_name.value })

    pubsub.publish("command", command_name)

    disabled.value = "true"
}
onMounted(() => {
    // 光标移动到输入框
    const inputs = document.querySelectorAll(".command_input");
const input= inputs[inputs.length - 1];
    input.focus(); 
    
    
  


})
</script>

<style scoped>
.command_input {
    position: relative;
    border: none;
    outline: none;
    font-size: 1em;
    background-color: transparent;
    color: #E0E0E0;
    /* 让宽度随着里面一行字的宽度变化
    */
    width: fit-content;

}

</style>