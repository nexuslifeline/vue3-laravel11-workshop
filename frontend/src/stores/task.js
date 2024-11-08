import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/api/apiClient'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch all tasks from API
  const fetchTasks = async () => {
    loading.value = true
    try {
      const response = await api.get('/tasks')
      tasks.value = response.data.data // assumes Laravel API resource format
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Add a new task via API
  const addTask = async (task) => {
    try {
      const response = await api.post('/tasks', task)
      tasks.value.push(response.data.data) // assumes Laravel API resource format
    } catch (err) {
      error.value = err.message
    }
  }

  // Update task status via API
  const toggleTask = async (id) => {
    try {
      const task = tasks.value.find((t) => t.id === id)
      if (task) {
        const response = await api.patch(`/tasks/${id}`, { completed: !task.completed })
        task.completed = response.data.data.completed
      }
    } catch (err) {
      error.value = err.message
    }
  }

  // Update task via API
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await api.patch(`/tasks/${id}`, updatedTask)
      const taskIndex = tasks.value.findIndex((t) => t.id === id)
      if (taskIndex !== -1) {
        tasks.value[taskIndex] = response.data.data
      }
    } catch (err) {
      error.value = err.message
    }
  }

  // Delete task via API
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      tasks.value = tasks.value.filter((t) => t.id !== id)
    } catch (err) {
      error.value = err.message
    }
  }

  return { tasks, loading, error, fetchTasks, addTask, toggleTask, updateTask, deleteTask }
})
