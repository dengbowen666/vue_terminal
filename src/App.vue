<template>
  <div class="jsterm">
    <init_block @isInit="isInit = $event"></init_block>
    <work_block v-if="isInit" v-for="(item, index) in block_list" :key="item.id"
      :ct="index < block_list.length - 1 ? block_list[index + 1].ct : null"
      
      
      ></work_block>
    <!-- 不要越界了，判断一下 -->
  </div>
</template>

<script setup lang="ts">
import work_block from './components/work_block/index.vue'
import init_block from './components/init_block/index.vue'
import { storeToRefs } from 'pinia';
import { useStore } from './store/index'
import pubsub from 'pubsub-js';

import { onMounted, ref } from 'vue';
const { block_list} = storeToRefs(useStore())


const isInit = ref(false)

pubsub.subscribe('command', (msg, data) => {
  console.log(msg, data)

// 传过来命令 可能是ls cd pwd clear help exit cat  或者是 cd directory_name

  excute(data)
})

enum Command {
  ls = "ls",
  cd = "cd",
  pwd = "pwd",
  clear = "clear",
  help = "help",
  exit = "exit",
  cat = "cat",
  gimp = "gimp",
  curl= "curl",
}
const block = ref({
  name: '', id: '', ct: '',cwd:''
})


import Commands from './hook/useCommands'
const { COMMANDS } = Commands()

function parseCommand(input) {
  // 使用空格分割输入字符串
  const parts = input.trim().split(' ');

  // 第一个元素是命令
  const command = parts[0];

  // 如果有参数，剩余的部分是参数
  const args = parts.length>1?  parts.slice(1).join('') : ''

  return { command, args };
}
const excute = (command_name: string) => {
  const { command, args } = parseCommand(command_name)
  block.value = {
    name: command, id: Math.random().toString(36).substr(2, 9), ct: '', cwd: block_list.value[block_list.value.length - 1].cwd
    // 默认是上一次的cwd
  }
  switch (command) {
    case Command.ls:
      block.value.ct = COMMANDS.ls()
      break;
    case Command.cd:
      block.value.ct = COMMANDS.cd(args) 
    block.value.cwd = COMMANDS.cwd()
      break;
    case Command.pwd:

      break;
    case Command.clear:
      COMMANDS.clear()
      break;
    case Command.help:
      console.log('执行一次');

      block.value.ct = COMMANDS.help()

      break;
    case Command.gimp:
      block.value.ct = COMMANDS.gimp(args)

      break;
    case Command.cat:
      block.value.ct = COMMANDS.cat(args)

      break
    case Command.curl:
       COMMANDS.curl(args)
      break

    // 如果都不匹配
    default:
      block.value.ct = " command not found"
  }
  block_list.value.push(block.value)




}
// app挂载的时候先进行初始化，加载配置文件，读取用户名密码以及我已经有的命令，读取文件系统等等
const init = () => {
  
}






</script>

<style scoped></style>