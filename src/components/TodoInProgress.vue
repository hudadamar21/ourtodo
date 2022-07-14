<template>
  <li class="group bg-white rounded overflow-hidden flex justify-between items-center shadow">
    
    <!-- todo content -->
    <div class="flex cursor-default flex-grow ">
      <div :class="[
        'grid grid-rows-2 transition-all duration-200',
        todoIsEdited ? 'w-8' : 'w-0'
      ]">
        <button
          @click="updateTodo"
          class="button-editmode bg-primary-100 hover:bg-primary-200"
        >
          <IconChecklist/>
        </button>
        <button
          @click="cancelEdit"
          class="button-editmode bg-red-500 hover:bg-red-600"
        >
          <IconCross/>
        </button>
      </div>
      <div class="p-3 px-4 w-full">
        <input
          @keyup.enter="updateTodo"
          :ref="el => elInputTitle = el"
          :class="[
            `block font-medium w-full text-lg border-b-2 py-1 border-transparent text-gray-700 focus:outline-none transition duration-200 bg-transparent`,
            todoIsEdited && 'pl-2 border-gray-300 bg-gray-100',
            inputError ? 'border-red-500/50' : 'focus:border-primary-100/60'
          ]"
          :value="todo.title"
          :disabled="todoEditId !== todo.id"
        />
        <small class="text-gray-400">
          {{ formatDate(todo.date) }}
        </small>
      </div>
    </div>

    <!-- todo options -->
    <div class="flex items-center justify-center gap-1 pr-4">
      <!-- button edit -->
      <ButtonOption 
        name="edit" 
        class="hover:bg-yellow-500" 
        @click="editTodo"
      />
      <ButtonOption 
        name="delete" 
        class="hover:bg-red-500"
        @click="deleteTodo"
      />
      <ButtonOption 
        name="complete" 
        class="hover:bg-primary-100"
        @click="completeTodo"
      />
    </div>

  </li>
</template>

<script>
import { ref, watch, nextTick, computed } from "vue";

import ButtonOption from "./ButtonOption.vue";
import IconChecklist from './Icons/IconChecklist.vue';
import IconCross from './Icons/IconCross.vue';

import formatDate from "../utils/formatDate";

export default {
  components: {
    ButtonOption,
    IconCross,
    IconChecklist
  }, 
  props: {
    todo: {
      type: Object,
      required: true
    },
    todoEditId: {
      type: String,
      requried: true
    }
  },
  setup(props, {emit}){

    const elInputTitle = ref(null)

    const inputError = ref(false)

    const todoIsEdited = computed(() => props.todoEditId === props.todo.id)

    watch(() => props.todoEditId, (newval) => {
      if(newval === props.todo.id) {
        nextTick(() => elInputTitle.value.focus())
      }
    })

    const editTodo = () => {
      emit('edit', todoIsEdited.value ? null : props.todo.id)
      console.log(elInputTitle.value)
    }

    const deleteTodo = () => {
      const confirmDelete = window.confirm(`apakah anda yakin ingin menghapus todo '${props.todo.title}' ?`)

      if(confirmDelete) {
        emit('delete', props.todo.id)
      }
    }

    const completeTodo = () => {
      emit('complete', props.todo.id)
    }

    const updateTodo = () => {
      const inputValue = elInputTitle.value.value
      if(!inputValue) {
        inputError.value = true

        setTimeout(() => {
          inputError.value = false
        }, 1500);

      } else {
        emit('update', { todo_id: props.todo.id, newTitle: inputValue })
      }
    }

    const cancelEdit = () => {
      emit('canceledit', null)
    }

    return {
      formatDate,

      elInputTitle,
      inputError,
      todoIsEdited,

      editTodo,
      deleteTodo,
      completeTodo,
      updateTodo,
      cancelEdit
    }
    
  }
}
</script>

<style>
  .button-editmode {
    @apply row-span-1 grid place-items-center text-white transition-all duration-200 overflow-hidden;
  }
</style>