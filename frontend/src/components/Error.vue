<template>
  <div class="text-center text-red-500">Error: {{ message }}</div>
</template>

<script setup>
defineProps({
  message: String,
})
</script>
