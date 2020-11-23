<template>
    <todo-app></todo-app>
</template>

<script>
import TodoApp from "@/components/TodoApp.vue";

export default {
    name: "App",

    components: {
        "todo-app": TodoApp,
    },
};
</script>