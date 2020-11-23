<template>
    <div class="d-flex">
        <input type="text" placeholder="Your new todo" class="form-control mr-2" v-model="todoText" />
        <button class="btn btn-primary" @click="add" :disabled="disabled">Add</button>
    </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
    emits: ["todoAdded"],

    setup: function(_, { emit }) {
        const todoText = ref("");

        const disabled = computed(() => {
            const value = todoText.value.trim();
            return value.length === 0 || value.length > 40;
        });

        function add() {
            if (todoText.value.trim().length === 0) {
                return;
            }

            emit("todoAdded", {
                id: Math.random().toString(36).substring(7),
                text: todoText.value,
                completed: false,
                createdAt: Date.now(),
            });

            todoText.value = "";
        }

        return {
            todoText,
            disabled,
            add,
        };
    },
};
</script>
