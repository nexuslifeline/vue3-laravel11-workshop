<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">To-Do List</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <span :class="{ 'line-through': task.completed }">{{ task.title }}</span>
        <button @click="toggleTask(task.id)">Toggle Complete</button>
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
    <input v-model="newTask" placeholder="Add a new task" />
    <button @click="addNewTask">Add Task</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
const { tasks, addTask, toggleTask, deleteTask } = taskStore

const newTask = ref('')

const addNewTask = () => {
  if (newTask.value.trim()) {
    addTask({ title: newTask.value })
    newTask.value = ''
  }
}
</script>
