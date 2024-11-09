import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import api from '@/api/apiClient'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = reactive([])
  const loading = ref(false)
  const error = ref(null)

  // Fetch all tasks from API
  const fetchTasks = async () => {
    loading.value = true
    try {
      const response = await api.get('/tasks')
      tasks.length = 0 // Clear the array while keeping reactivity
      tasks.push(...response.data.data) // Add new items to the reactive array
    } catch (err) {
      error.value = err.message
      throw new Error(err?.response?.data?.message || err?.message || 'Something went wrong')
    } finally {
      loading.value = false
    }
  }

  // Add a new task via API
  const addTask = async (task) => {
    try {
      const response = await api.post('/tasks', task)
      tasks.push(response.data.data) // Adds new task to reactive array
    } catch (err) {
      error.value = err.message
      console.log('err', err)
      throw new Error(err?.response?.data?.message || err?.message || 'Something went wrong')
    }
  }

  // Toggle task status via API
  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id)
      if (task) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed'
        await api.patch(`/tasks/${id}`, { status: newStatus })
        task.status = newStatus // Update status directly in reactive array
      }
    } catch (err) {
      error.value = err.message
      throw new Error(err?.response?.data?.message || err?.message || 'Something went wrong')
    }
  }

  // Update task via API
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await api.patch(`/tasks/${id}`, updatedTask)
      const taskIndex = tasks.findIndex((t) => t.id === id)
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1, response.data.data) // Replace the updated task in place
      }
    } catch (err) {
      error.value = err.message
      throw new Error(err?.response?.data?.message || err?.message || 'Something went wrong')
    }
  }

  // Delete task via API
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      const taskIndex = tasks.findIndex((t) => t.id === id)
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1) // Remove the task in place
      }
    } catch (err) {
      error.value = err.message
      throw new Error(err?.response?.data?.message || err?.message || 'Something went wrong')
    }
  }

  return { tasks, loading, error, fetchTasks, addTask, toggleTask, updateTask, deleteTask }
})
