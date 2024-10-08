<template>
    <div  v-html="ct">
    
    </div>
</template>

<script setup lang="ts">
import { defineProps  ,toRefs} from "vue";
const props = defineProps(['ct'])
const { ct } = toRefs(props)

</script>

<style scoped>

</style>