<template>
    <div class="container d-flex justify-content-center mt-5">
        <div class="card w-50">
            <div class="card-body text-center">
                <h1 class="mb-4">Todo app</h1>

                <todo-input @todo-added="handleTodoAdded"></todo-input>

                <div v-if="todos.length" class="progress mt-4">
                    <div
                        class="progress-bar"
                        role="progressbar"
                        :aria-valuenow="progress"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        :style="`width: ${progress}%;`"
                        :class="progressClass"
                    >
                        {{ progress }}%
                    </div>
                </div>

                <div class="mt-4">
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
    </div>
</template>

<script>
import { computed, ref } from "vue";
import TodoInput from "./TodoInput.vue";
import TodoList from "./TodoList.vue";

export default {
    components: {
        "todo-input": TodoInput,
        "todo-list": TodoList,
    },

    setup: function() {
        const todos = ref([]);

        const progress = computed(() => {
            const total = todos.value.length;
            const completed = todos.value.filter((todo) => todo.completed === true).length;
            const progress = (completed * 100) / total || 0;

            return Math.round(progress);
        });

        const progressClass = computed(() => {
            if (progress.value >= 0 && progress.value <= 30) {
                return "bg-danger";
            } else if (progress.value > 30 && progress.value <= 60) {
                return "bg-warning";
            } else {
                return "bg-success";
            }
        });

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

        return {
            todos,
            progress,
            progressClass,
            handleTodoAdded,
            handleTodoCompletion,
            handleRemoveTodo,
            handleMarkAllAs,
            handleDeleteAll,
        };
    },
};
</script>
