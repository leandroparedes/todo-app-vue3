import { ref, computed } from "vue";

export default function useTodo() {
    const todos = ref([]);

    function addTodo(newTodo) {
        todos.value.push(newTodo);
    }

    function completeTodo(data) {
        const { todoId, completed } = data;
        const todoIndex = todos.value.findIndex((todo) => todo.id === todoId);
        const todo = todos.value[todoIndex];
        todo.completed = completed;
        todos.value.splice(todoIndex, 1, todo);
    }

    function removeTodo(todoId) {
        const todoIndex = todos.value.findIndex((todo) => todo.id === todoId);
        todos.value.splice(todoIndex, 1);
    }

    function markAllAs(value) {
        const completed = value === "completed" ? true : false;
        todos.value.map((todo) => (todo.completed = completed));
    }

    function deleteAll() {
        todos.value = [];
    }

    const totalCompletedTodos = computed(() => {
        return todos.value.filter((todo) => todo.completed === true).length;
    });

    return {
        todos,
        addTodo,
        completeTodo,
        removeTodo,
        markAllAs,
        deleteAll,
        totalCompletedTodos,
    };
}
