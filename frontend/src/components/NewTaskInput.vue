<template>
  <div class="mt-6 flex items-center bg-gray-200 px-6 py-5 gap-3">
    <input
      v-model="localTask"
      class="border px-3 py-2 border-gray-300 text-md rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Add a new task"
      type="text"
    />
    <button
      @click="handleAddTask"
      class="w-[150px] px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Create
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const localTask = ref('')
defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue', 'addTask'])

watch(localTask, (newValue) => {
  emit('update:modelValue', newValue)
})

const handleAddTask = () => {
  if (localTask.value.trim()) {
    emit('addTask')
    localTask.value = ''
  }
}
</script>
