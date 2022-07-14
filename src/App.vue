<template>
  <div class="bg-gray-200 min-h-screen flex flex-col items-center py-10">
  	<h1 class="text-6xl font-bold text-primary-100 mb-10">
      Our Todo
    </h1>
    <div class="w-[95%] md:w-[80%] grid grid-cols-1 md:grid-cols-2 gap-10">
      <div class="col-span-1">

        <!-- form input add new task -->
        <FormInput @savetodo="saveTodo" />

        <div class="h-0.5 w-full bg-gray-100 mt-3"></div>

        <!-- todo list -->
        <ul class="flex flex-col gap-3 my-3">
          <h1 v-if="todoInProgress.length === 0" class="text-center text-gray-400">
            tidak ada todo yang harus dilakukan
          </h1>
          <template v-else v-for="todo of todoInProgress" :key="todo.id">
            <TodoInProgress
              :todo="todo"
              :todoEditId="todoEditId"
              @edit="editTodo"
              @update="updateTodo"
              @delete="deleteTodo"
              @complete="completeTodo"
              @canceledit="todoEditId = null"
            />
          </template>
        </ul>
        
      </div>

      <!-- completed task -->
      <div class="col-span-1">
        <div class="bg-white rounded overflow-hidden shadow-lg">
          <h1 class="bg-primary-100 text-white py-1 font-semibold text-lg text-center">
            Completed Task
          </h1>
          <ul class="flex flex-col divide-y p-3">
            <h1 v-if="todoCompleted.length === 0" class="text-center text-gray-500">
              tidak ada todo yang selesai
            </h1>
            <template v-else v-for="todo of todoCompleted" :key="todo.id">
              <TodoCompleted
                :todo="todo"
                @revert="revertTodo"
              />
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { v4 as uuidv4 } from 'uuid';

import todo_dummy from "./data/todo_dummy";

import TodoInProgress from "./components/TodoInProgress.vue";
import TodoCompleted from "./components/TodoCompleted.vue";
import FormInput from './components/FormInput.vue';

export default {
  components: {
    TodoInProgress,
    TodoCompleted,
    FormInput,
  },
  setup(){
    
    const todos = ref(todo_dummy)

    const todoEditId = ref(null)

    const todoInProgress = computed(() => todos.value.filter(todo => !todo.isComplete))

    const todoCompleted = computed(() => todos.value.filter(todo => todo.isComplete)) 

    const saveTodo = (title) => {
      const newTodo = {
        id: uuidv4(),
        title,
        date: new Date()
      }
      todos.value = [ newTodo, ...todos.value ]
    }

    const editTodo = (todo_id) => {
      todoEditId.value = todo_id
    }

    const updateTodo = ({todo_id, newTitle}) => {
      console.log(newTitle)
      todos.value = todos.value.map(todo => {
        return todo.id === todo_id 
          ? { ...todo, title: newTitle, date: new Date() } 
          : todo
      })
      todoEditId.value = null
    }
    
    const deleteTodo = (todo_id) => {
      todos.value = todos.value.filter(todo => todo.id !== todo_id)
    }

    const completeTodo = (todo_id) => {
      updateIsComplete(todo_id, true)
    }

    const revertTodo = (todo_id) => {
      updateIsComplete(todo_id, false)
    }

    const updateIsComplete = (todo_id, value) => {
      todos.value = todos.value.map(todo => {
        return todo.id === todo_id 
          ? { ...todo, isComplete: value } 
          : todo
      })
    }

    return {
      todoEditId,
      todoInProgress,
      todoCompleted,

      saveTodo,
      editTodo,
      updateTodo,
      deleteTodo,
      completeTodo,
      revertTodo
    }
  }
}
</script>

<style>
</style>
