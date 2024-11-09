<template>
  <div class="max-w-lg w-full bg-white rounded-lg shadow-lg overflow-hidden border-zinc-200 m-4">
    <div class="px-6 py-4 bg-gray-200">
      <h2 class="text-2xl font-semibold text-center flex items-center justify-center">
        To-Do List
      </h2>
    </div>

    <div>
      <NoTasksPlaceholder v-if="!loading && !error && tasks.length === 0" />

      <Loading v-if="loading" />
      <Error v-if="error" :message="error" />

      <TaskList
        v-if="!loading && !error && tasks.length > 0"
        :tasks="tasks"
        @toggleTask="toggleTask"
        @deleteTask="deleteTask"
      />
    </div>

    <NewTaskInput v-model="newTask" @addTask="addNewTask" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useTaskStore } from '@/stores/task'
import Loading from '@/components/Loading.vue'
import Error from '@/components/Error.vue'
import TaskList from '@/components/TaskList.vue'
import NewTaskInput from '@/components/NewTaskInput.vue'
import NoTasksPlaceholder from '@/components/NoTasksPlaceholder.vue'

const taskStore = useTaskStore()
const { tasks, loading, error, fetchTasks, addTask, toggleTask, deleteTask } = taskStore

const newTask = ref('')

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
