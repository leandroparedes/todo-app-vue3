describe("My First Test", () => {
    it("Add a todo", () => {
        cy.visit("http://localhost:8080/");

        const todos = [
            "todo 1",
            "todo 2",
            "todo 3",
        ];

        cy.get("input#todo-title").type(`${todos[0]} {enter}`);
        cy.get("input#todo-title").type(`${todos[1]} {enter}`);
        cy.get("input#todo-title").type(`${todos[2]} {enter}`);

        let incompleted = todos.length;

        cy.get("ul#todos-list>li").each(($el, index, $list) => {
            const el = cy.wrap($el);

            el.contains(todos[index]);

            el.contains("Complete").click();
        });
    });
});
