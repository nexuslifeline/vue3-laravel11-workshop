<template>
  <div
    v-if="visible"
    :class="[
      'fixed top-4 left-1/2 transform -translate-x-1/2 max-w-md w-full z-50 text-center py-4 px-6 rounded-lg shadow-lg transition-opacity duration-300 border-l-4 flex items-start',
      typeClasses[type] || 'bg-gray-200 text-black border-gray-400',
    ]"
    role="alert"
  >
    <!-- Title and Close Button -->
    <div class="w-full flex justify-between items-start">
      <div>
        <h3 class="text-lg font-semibold mb-1 text-left">{{ title }}</h3>
        <p class="text-sm text-left">{{ message }}</p>
      </div>
      <button @click="visible = false" class="text-lg ml-4 font-bold">&times;</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Notification',
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info',
  },
  duration: {
    type: Number,
    default: 5000, // Default to 5 seconds
  },
})

const visible = ref(true)

const typeClasses = computed(() => ({
  error: 'bg-red-600 text-white border-red-600',
  success: 'bg-green-600 text-white border-green-600',
  warning: 'bg-yellow-600 text-white border-yellow-600',
  info: 'bg-blue-600 text-white border-blue-600',
}))

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      visible.value = false
    }, props.duration)
  }
})

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      visible.value = true
      setTimeout(() => {
        visible.value = false
      }, props.duration)
    }
  },
)
</script>
