<template>
    <div class="container d-flex justify-content-center mt-5">
        <div class="card w-50">
            <div class="card-body text-center">
                <h1 class="mb-4">Todo app</h1>

                <todo-input @todo-added="handleTodoAdded"></todo-input>

                <todo-progress
                    v-if="todos.length"
                    :total="todos.length"
                    :completed="totalCompletedTodos"
                    class="my-3"
                ></todo-progress>

                <todo-list
                    :todos="todos"
                    @todo-completion="handleTodoCompletion"
                    @remove-todo="handleRemoveTodo"
                    @mark-all-as="handleMarkAllAs"
                    @delete-all="handleDeleteAll"
                ></todo-list>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from "vue";

import TodoInput from "./TodoInput.vue";
import TodoList from "./TodoList.vue";
import TodoProgress from "./TodoProgress.vue";

export default {
    components: {
        "todo-input": TodoInput,
        "todo-list": TodoList,
        "todo-progress": TodoProgress,
    },

    setup: function() {
        const todos = ref([]);

        function handleTodoAdded(newTodo) {
            todos.value.push(newTodo);
        }

        function handleTodoCompletion(data) {
            const { todoId, completed } = data;
            const todoIndex = todos.value.findIndex((todo) => todo.id === todoId);
            const todo = todos.value[todoIndex];
            todo.completed = completed;
            todos.value.splice(todoIndex, 1, todo);
        }

        function handleRemoveTodo(todoId) {
            const todoIndex = todos.value.findIndex((todo) => todo.id === todoId);
            todos.value.splice(todoIndex, 1);
        }

        function handleMarkAllAs(value) {
            const completed = value === "completed" ? true : false;
            todos.value.map((todo) => (todo.completed = completed));
        }

        function handleDeleteAll() {
            todos.value = [];
        }

        const totalCompletedTodos = computed(() => {
            return todos.value.filter((todo) => todo.completed === true).length;
        });

        return {
            todos,
            handleTodoAdded,
            handleTodoCompletion,
            handleRemoveTodo,
            handleMarkAllAs,
            handleDeleteAll,
            totalCompletedTodos,
        };
    },
};
</script>
