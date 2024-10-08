<template>
  <div class="jsterm">
    <work_block v-for="(item, index) in block_list" :key="item.id"
      :ct="index < block_list.length - 1 ? block_list[index + 1].ct : null"></work_block>
    <!-- 不要越界了，判断一下 -->
  </div>
</template>

<script setup lang="ts">
import work_block from './components/work_block/index.vue'

import pubsub from 'pubsub-js';

import { onMounted, ref } from 'vue';
const { block_list } = storeToRefs(useStore())



pubsub.subscribe('command', (msg, data) => {
  console.log(msg, data)



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

}
const block = ref({
  name: '', id: '', ct: ''
})
import Commands from './hook/useCommands'
const { COMMANDS } = Commands()
const excute = (command_name: string) => {

  block.value = {
    name: command_name, id: Math.random().toString(36).substr(2, 9), ct: ''
  }
  switch (command_name) {
    case Command.ls:
      block.value.ct = "ls"
      break;
    case Command.cd:

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
    // 如果都不匹配
    default:
      block.value.ct = " command not found"
  }
  block_list.value.push(block.value)




}




import { storeToRefs } from 'pinia';
import { useStore } from './store/index'

</script>

<style scoped></style>