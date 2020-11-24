<template>
    <div class="container d-flex justify-content-center mt-5">
        <div class="card w-50">
            <div class="card-body text-center">
                <h1 class="mb-4">Todo app</h1>

                <todo-input @todo-added="addTodo"></todo-input>

                <todo-progress
                    v-if="todos.length"
                    :progress="progress"
                    :progress-class="progressClass"
                    class="my-3"
                ></todo-progress>

                <todo-list
                    :todos="todos"
                    @todo-completion="completeTodo"
                    @remove-todo="removeTodo"
                    @mark-all-as="markAllAs"
                    @delete-all="deleteAll"
                ></todo-list>
            </div>
        </div>
    </div>
</template>

<script>
import TodoInput from "./TodoInput.vue";
import TodoProgress from "./TodoProgress.vue";
import TodoList from "./TodoList.vue";

import useTodo from "@/use/useTodo.js";

export default {
    components: {
        "todo-input": TodoInput,
        "todo-list": TodoList,
        "todo-progress": TodoProgress,
    },

    setup: function() {
        const {
            todos,
            addTodo,
            completeTodo,
            removeTodo,
            markAllAs,
            deleteAll,
            totalCompletedTodos,
            progress,
            progressClass
        } = useTodo();

        return {
            todos,
            addTodo,
            completeTodo,
            removeTodo,
            markAllAs,
            deleteAll,
            totalCompletedTodos,
            progress,
            progressClass
        };
    },
};
</script>
