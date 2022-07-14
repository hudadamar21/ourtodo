<template>
  <li class="bg-white rounded p-3 flex justify-between items-center group">
    <div class="flex transition duration-200">
      <button 
        @click="$emit('revert', todo.id)"
        class="text-gray-500 items-stretch hover:text-primary-100 w-0 group-hover:w-8 transition-all duration-200 overflow-hidden">
        <IconArrowLeft/>
      </button>
      <div class="pl-1 transition cursor-default">
        <h1 class="font-medium text-lg text-gray-700">
          {{ todo.title }}
        </h1>
        <small class="text-gray-400">
          {{ formatDate(todo.date) }}
        </small>
      </div>
    </div>
    <div class="text-primary-100">
      <IconChecklistCircle/>
    </div>
  </li>
</template>

<script>
import IconArrowLeft from './Icons/IconArrowLeft.vue';
import IconChecklistCircle from './Icons/IconChecklistCircle.vue';

import formatDate from "../utils/formatDate";

export default {
  components: {
    IconArrowLeft,
    IconChecklistCircle
  },
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  setup(){
    return {
      formatDate
    }
  }
}
</script>

<style>

</style>