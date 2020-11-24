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
