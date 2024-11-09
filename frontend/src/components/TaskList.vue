<template>
  <ul class="space-y-4">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="toggleTask(task.id)"
      @delete="deleteTask(task.id)"
    />
  </ul>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: Array,
})

const emit = defineEmits(['toggleTask', 'deleteTask'])
const toggleTask = (id) => emit('toggleTask', id)
const deleteTask = (id) => emit('deleteTask', id)
</script>
