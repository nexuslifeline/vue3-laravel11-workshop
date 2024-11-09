<template>
  <div class="max-w-lg w-full bg-white rounded-lg shadow-lg overflow-hidden border-zinc-200 m-4">
    <div class="px-6 py-4 bg-gray-200">
      <h2 class="text-2xl font-semibold text-center flex items-center justify-center">
        To-Do List
      </h2>
    </div>

    <Notification
      v-if="notification.message"
      :title="notification.title"
      :message="notification.message"
      :type="notification.type"
      :duration="notification.duration"
    />

    <div>
      <Loading v-if="loading" />
      <TaskList
        v-if="!loading && tasks.length > 0"
        :tasks="tasks"
        @toggleTask="toggleTask"
        @deleteTask="deleteTask"
      />
      <NoTasksPlaceholder v-if="!loading && tasks.length === 0" />
    </div>

    <NewTaskInput v-model="newTask" @addTask="addNewTask" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useTaskStore } from '@/stores/task'
import Loading from '@/components/Loading.vue'
import TaskList from '@/components/TaskList.vue'
import NewTaskInput from '@/components/NewTaskInput.vue'
import NoTasksPlaceholder from '@/components/NoTasksPlaceholder.vue'
import Notification from '@/components/Notification.vue'

const taskStore = useTaskStore()
const { tasks, loading, error, fetchTasks, addTask, toggleTask, deleteTask } = taskStore

const newTask = ref('')
const notification = ref({ message: '', type: '', duration: 5000 })

onMounted(() => {
  fetchTasks()
})

const addNewTask = async () => {
  try {
    notification.value = {}
    await addTask({ title: newTask.value, status: 'pending' })
    newTask.value = ''
    notification.value = {
      title: 'Success!',
      message: 'Task added successfully!',
      type: 'success',
    }
  } catch (err) {
    notification.value = {
      title: 'Error!',
      message: err.message || 'Failed to add task',
      type: 'error',
    }
  }
}
</script>
