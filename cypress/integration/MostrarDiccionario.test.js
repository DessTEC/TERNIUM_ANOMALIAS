describe("Mostrar diccionario de parámetros", () => {

    it("Se muestra una tabla por cada variable", () => {
        cy.visit("http://localhost:3000/dashboard/consultar/6286e684ff046a8e535c2fd3");
        cy.get('a[class="w-3/4"]').first().click();
        cy.wait(5000);

        cy.get('a').contains("Diccionario").click()
        cy.wait(5000);

        cy.get(".tablaDict").should('have.length', 3);
        

    })
})