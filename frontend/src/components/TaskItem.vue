<template>
  <li class="flex items-center justify-between py-2 px-6 border-b border-zinc-100">
    <span
      :class="{
        'line-through text-gray-400': task.status === 'completed',
        'text-black': task.status !== 'completed',
      }"
      class="text-md flex-1"
    >
      {{ task.title }}
    </span>
    <div class="flex space-x-2">
      <button
        @click="$emit('toggle')"
        class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none size-10 flex items-center justify-center"
        title="Toggle Status"
      >
        <IconUndo v-if="task.status === 'completed'" />
        <IconCheck v-else />
      </button>

      <button
        @click="$emit('delete')"
        class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none size-10 flex items-center justify-center"
        title="Delete Task"
      >
        <IconDelete />
      </button>
    </div>
  </li>
</template>

<script setup>
import IconUndo from '@/components/icons/IconUndo.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconDelete from '@/components/icons/IconDelete.vue'

defineProps({
  task: Object,
})
</script>
