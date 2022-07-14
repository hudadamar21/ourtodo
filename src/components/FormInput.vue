<template>
  <form 
    @submit.prevent="onSubmit" 
    class="bg-white p-4 rounded flex items-center justify-between w-full gap-2"
  >
    <div class="flex-grow">
      <input 
        type="text" 
        v-model="inputNewTodo" 
        :class="[
          'block flex-grow border-b-2 w-full text-lg font-medium text-gray-600 border-gray-200 px-2 pb-0.5 focus:outline-none transition duration-200',
          inputError ? 'border-red-500/60' : 'focus:border-primary-100/60'
        ]"
        placeholder="add new task"
      />
      <small class="block text-xs text-gray-400 mt-2">{{ dateNow }}</small>
    </div>
    <button 
      type="submit" 
      class="bg-primary-100 hover:bg-primary-200 shadow text-white rounded px-3 py-1 mr-3 ml-4"
    >
      Save
    </button>
  </form>
</template>

<script>
import { ref } from "vue";

import formatDate from "../utils/formatDate";

export default {
  emits: ['savetodo'],
  setup(props, { emit }){

    const dateNow = ref(formatDate(new Date()))

    const inputNewTodo = ref('')

    const inputError = ref(false)

    const onSubmit = () => {
      if(inputNewTodo.value) {
        emit('savetodo', inputNewTodo.value)
        inputNewTodo.value = ''
      } else {
        inputError.value = true
        setTimeout(() => {
          inputError.value = false
        }, 1000);
      }
    }

    return {
      inputNewTodo,
      inputError,
      onSubmit,
      dateNow
    }
  }
}
</script>

<style>

</style>