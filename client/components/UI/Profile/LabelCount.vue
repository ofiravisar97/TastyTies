<template>
    <div class="text-lg flex flex-col items-center justify-center">
       <p>{{ label }}</p>
       <p><strong>{{ count }}</strong></p>
    </div>
</template>

<script lang="ts" setup>
const {label,count} = defineProps(['label','count'])
</script>