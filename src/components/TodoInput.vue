<template>
    <input
        id="todo-title"
        type="text"
        placeholder="Your new todo"
        class="form-control mr-2"
        v-model="todoText"
        @keyup.enter="add"
    />

    <p v-if="showAlertMessage" class="text-danger mt-2">
        Todos cannot be greater than 40 characters. Your todo has {{ todoText.length }} characters
    </p>
</template>

<script>
import { ref, computed, watch, watchEffect } from "vue";

export default {
    emits: ["todoAdded"],

    setup: function(_, { emit }) {
        const todoText = ref("");
        const showAlertMessage = ref(false);

        watchEffect(() => {
            showAlertMessage.value = todoText.value.length > 40;
        });

        function add() {
            const value = todoText.value.trim();

            if (value.length === 0 || value.length > 40) {
                return;
            }

            emit("todoAdded", {
                id: Math.random()
                    .toString(36)
                    .substring(7),
                text: value,
                completed: false,
                createdAt: Date.now(),
            });

            todoText.value = "";
        }

        return {
            todoText,
            add,
            showAlertMessage,
        };
    },
};
</script>
