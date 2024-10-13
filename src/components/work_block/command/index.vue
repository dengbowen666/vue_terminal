<template>
    <div class="command">
        <span class="user">
            dbw</span>
        @<span class="host">term.dbw2004.top</span>:<span class="cwd">{{ cwd }}
        </span>$ <input class="command_input" type="text" v-model="command_name" @keyup.enter="execute_command(command_name)
            " @blur="show_caret = false" @focus="show_caret = true" :disabled="disabled" @input=" changeWidth()"
            ref="input" />

        <span class="caret" v-show="show_caret"></span>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from "vue";
const command_name = ref("")
import pubsub from 'pubsub-js';
import { useStore } from "../../../store";
const { cwd } = useStore()
// 故意不响应式，这样命令在改变当前cwd时不会影响之前cwd的渲染

const disabled = ref(false)
const show_caret = ref(true)
const execute_command = (command_name: string) => {
    // block_list.value.push({ command_name: command_name.value })

    pubsub.publish("command", command_name)

    disabled.value = true
}

onMounted(() => {
    // 光标移动到输入框
    // const inputs = document.querySelectorAll(".command_input");

    // const input = inputs[inputs.length - 1];
    if (input.value) {
        input.value.focus();
    }




})
const input = ref(null)
// 创建一个 ref 对象
// 用ref来获取input的dom元素
function mydebounce(time: number = 11) {
    let timer = null

    return function () {
        show_caret.value = false
        if (input.value) {
            input.value.style.width = input.value.value.length + "ch";
        }
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            show_caret.value = true
        }, time)
    }



}
const changeWidth = mydebounce()







</script>

<style scoped>
.command {
    display: flex;
    height: 30px;
    align-items: center;
    width: fit-content;
}

.command_input {
    margin-left: 10px;
    position: relative;
    border: none;
    outline: none;
    font-size: 1em;
    width: 10px;
    background-color: transparent;
    color: #E0E0E0;
    /* 平滑过渡效果 */
    caret-color: transparent;

}


.caret {

    height: 50%;
    width: 8px;
    /* 设置光标宽度 */
    background-color: #E0E0E0;
    animation: blink 1.5s steps(1) infinite;
    /* 设置动画，使光标更慢地闪烁 */
    margin-left: 0;
    display: inline-block;
    vertical-align: bottom;
}

.command_input:disabled .caret {
    display: none;
}


/* 定义闪烁动画 */
@keyframes blink {

    from,
    to {
        visibility: hidden;
    }

    50% {
        visibility: visible;
    }
}
</style>