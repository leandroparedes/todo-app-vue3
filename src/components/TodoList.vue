<template>
    <p v-if="todos.length === 0" class="text-muted mt-4">There are no todos</p>

    <template v-else>
        <div class="d-flex justify-content-end mb-3">
            <button class="btn btn-sm btn-outline-success mr-2" @click="markAllAs('completed')">
                Mark all as completed
            </button>
            <button class="btn btn-sm btn-outline-warning mr-2" @click="markAllAs('incompleted')">
                Mark all as incompleted
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteAll">Delete all</button>
        </div>

        <ul class="list-group">
            <li
                class="list-group-item d-flex justify-content-between align-items-center"
                v-for="todo in todos"
                :key="todo.id"
                :class="{ completed: todo.completed === true }"
            >
                {{ todo.text }}

                <div>
                    <button
                        v-if="todo.completed"
                        class="btn btn-sm btn-warning mr-2"
                        @click="incomplete(todo.id)"
                    >
                        Incomplete
                    </button>
                    <button v-else class="btn btn-sm btn-success mr-2" @click="complete(todo.id)">
                        Complete
                    </button>
                    <button class="btn btn-sm btn-danger" @click="remove(todo.id)">Delete</button>
                </div>
            </li>
        </ul>
    </template>
</template>

<script>
export default {
    props: {
        todos: Array,
    },

    emits: ["todoCompletion", "removeTodo", "markAllAs", "deleteAll"],

    setup(_, { emit }) {
        function incomplete(todoId) {
            emit("todoCompletion", {
                todoId: todoId,
                completed: false,
            });
        }

        function complete(todoId) {
            emit("todoCompletion", {
                todoId: todoId,
                completed: true,
            });
        }

        function remove(todoId) {
            emit("removeTodo", todoId);
        }

        function markAllAs(value) {
            emit("markAllAs", value);
        }

        function deleteAll() {
            emit("deleteAll");
        }

        return {
            incomplete,
            complete,
            remove,
            markAllAs,
            deleteAll,
        };
    },
};
</script>

<style scoped>
.completed {
    opacity: .4;
}
.completed:hover {
    opacity: 1;
}
</style>
