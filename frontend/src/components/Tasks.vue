<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-semibold text-center mb-6">To-Do List</h1>
    <!-- Loading State -->
    <div v-if="loading" class="text-center text-blue-500">Loading...</div>
    <!-- Error State -->
    <div v-if="error" class="text-center text-red-500">Error: {{ error }}</div>
    <!-- Task List -->
    <ul class="space-y-4" v-if="!loading && !error">
      <li v-for="task in tasks" :key="task.id" class="flex items-center justify-between">
        <span
          :class="{
            'line-through text-gray-400': task.status === 'completed',
            'text-black': !task.status === 'completed',
          }"
          class="text-lg flex-1"
        >
          {{ task.title }}
        </span>
        <div class="flex space-x-2">
          <button
            @click="toggleTask(task.id)"
            class="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {{ task.status === 'completed' ? 'Undo' : 'Complete' }}
          </button>
          <button
            @click="deleteTask(task.id)"
            class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
    <!-- New Task Input -->
    <div class="mt-6 flex items-center">
      <input
        v-model="newTask"
        class="p-3 border border-gray-300 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Add a new task"
        type="text"
      />
      <button
        @click="addNewTask"
        class="px-6 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Add Task
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
const { tasks, loading, error, fetchTasks, addTask, toggleTask, deleteTask } = taskStore

const newTask = ref('')

// Fetch tasks when the component is mounted
onMounted(() => {
  fetchTasks()
})

const addNewTask = () => {
  if (newTask.value.trim()) {
    addTask({ title: newTask.value, status: 'pending' })
    newTask.value = ''
  }
}
</script>

<style scoped>
/* Add additional custom styling if needed */
</style>
