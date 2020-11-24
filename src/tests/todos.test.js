const useTodo = require("../use/useTodo").default;

describe("Creating and deleting todos", () => {
    test("add todo", () => {
        const { todos, addTodo } = useTodo();

        addTodo({
            id: "todo-id-1",
            text: "todo text 1",
            createdAt: Date.now(),
        });

        expect(todos.value.length).toBe(1);

        addTodo({
            id: "todo-id-2",
            text: "todo text 2",
            createdAt: Date.now(),
        });

        expect(todos.value.length).toBe(2);
    });

    test("remove todo", () => {
        const { todos, removeTodo } = useTodo();

        todos.value = [
            {
                id: "todo-id-1",
                text: "todo text 1",
                createdAt: Date.now(),
            },
        ];

        expect(todos.value.length).toBe(1);

        removeTodo("todo-id-1");

        expect(todos.value.length).toBe(0);
    });

    test("remove ALL todos", () => {
        const { todos, deleteAll } = useTodo();

        todos.value = [
            {
                id: "todo-id-1",
                text: "todo text 1",
                createdAt: Date.now(),
            },
            {
                id: "todo-id-2",
                text: "todo text 2",
                createdAt: Date.now(),
            },
        ];

        expect(todos.value.length).toBe(2);

        deleteAll();

        expect(todos.value.length).toBe(0);
    });
});

describe("Changing the todo status", () => {
    test("mark todo as completed", () => {
        const { todos, completeTodo } = useTodo();

        todos.value = [
            {
                id: "todo-id-1",
                text: "todo text 1",
                completed: false,
                createdAt: Date.now(),
            },
        ];

        const todo = todos.value[0];

        expect(todo.completed).toBe(false);

        completeTodo({
            todoId: todo.id,
            completed: true,
        });

        expect(todo.completed).toBe(true);
    });

    test("mark todo as incompleted", () => {
        const { todos, completeTodo } = useTodo();

        todos.value = [
            {
                id: "todo-id-1",
                text: "todo text 1",
                completed: true,
                createdAt: Date.now(),
            },
        ];

        const todo = todos.value[0];

        expect(todo.completed).toBe(true);

        completeTodo({
            todoId: todo.id,
            completed: false,
        });

        expect(todo.completed).toBe(false);
    });

    test("mark all todos as completed", () => {
        const { todos, markAllAs } = useTodo();

        todos.value = [
            {
                id: "todo-id-1",
                text: "todo text 1",
                completed: false,
                createdAt: Date.now(),
            },
            {
                id: "todo-id-2",
                text: "todo text 2",
                completed: false,
                createdAt: Date.now(),
            },
        ];

        todos.value.forEach((todo) => expect(todo.completed).toBe(false));

        markAllAs("completed");

        todos.value.forEach((todo) => expect(todo.completed).toBe(true));
    });

    test("mark all todos as incompleted", () => {
        const { todos, markAllAs } = useTodo();

        todos.value = [
            {
                id: "todo-id-1",
                text: "todo text 1",
                completed: true,
                createdAt: Date.now(),
            },
            {
                id: "todo-id-2",
                text: "todo text 2",
                completed: true,
                createdAt: Date.now(),
            },
        ];

        todos.value.forEach((todo) => expect(todo.completed).toBe(true));

        markAllAs("incompleted");

        todos.value.forEach((todo) => expect(todo.completed).toBe(false));
    });

    test("Completed todos total is accurate", () => {
        const { todos, totalCompletedTodos } = useTodo();

        todos.value = [
            {
                id: "todo-id-1",
                text: "todo text 1",
                completed: true,
                createdAt: Date.now(),
            },
            {
                id: "todo-id-2",
                text: "todo text 2",
                completed: true,
                createdAt: Date.now(),
            },
            {
                id: "todo-id-2",
                text: "todo text 2",
                completed: false,
                createdAt: Date.now(),
            },
        ];

        expect(totalCompletedTodos.value).toBe(2);
    });
});

describe("Todo progress", () => {
    test("Progress percentage is calculated correctly", () => {
        const { todos, progress } = useTodo();

        todos.value = [
            {
                id: "todo-id-1",
                text: "todo text 1",
                completed: true,
                createdAt: Date.now(),
            },
            {
                id: "todo-id-2",
                text: "todo text 2",
                completed: false,
                createdAt: Date.now(),
            },
        ];

        expect(progress.value).toBe(50);

        todos.value.push({
            id: "todo-id-3",
            text: "todo text 3",
            completed: false,
            createdAt: Date.now(),
        });

        expect(progress.value).toBe(33);
    });

    test("Progress bar color class is calculated correctly", () => {
        const { todos, progressClass } = useTodo();

        todos.value = [
            {
                id: "some-id",
                text: "todo text",
                completed: true,
                createdAt: Date.now(),
            },
        ];

        expect(progressClass.value).toBe("bg-success");

        todos.value.push({
            id: "some-id",
            text: "todo-text",
            completed: false,
            createdAt: Date.now(),
        });

        expect(progressClass.value).toBe("bg-warning");

        for (let i = 0; i < 3; i++) {
            todos.value.push({
                id: "some-id",
                text: "todo-text",
                completed: false,
                createdAt: Date.now(),
            });
        }

        expect(progressClass.value).toBe("bg-danger");
    });
});

test("Failing test", () => {
    expect(1).toBe(1);
});
