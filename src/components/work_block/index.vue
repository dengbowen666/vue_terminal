<template>
    <div>
        <command></command>
        <content :ct="ct"></content>
    </div>
</template>

<script setup lang="ts">
import { defineProps,toRefs } from 'vue'
import command from './command/index.vue'
import content from './content/index.vue'

const props = defineProps(['ct'])
const { ct } = toRefs(props)


</script>

<style scoped></style>