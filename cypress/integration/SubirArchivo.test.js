describe("Pruebas de la pantalla de carga", () => {
    it("Se renderiza correctamente", () => {
        cy.visit("/dashboard/subir");
        cy.get(".containerArchivos").should('have.length', 1)
    })

    it("Se rechaza subir un archivo diferente a csv", () => {
        cy.visit("/dashboard/subir");
        const fixtureFile = 'logo.png';
        cy.get('input[type="file"]').attachFile(fixtureFile);
        cy.get("#configurar").click()
        cy.get("#modal").should('not.have.class', "hidden");
        cy.screenshot();
    })

    it("Se rechaza subir un archivo csv vacío", () => {
        cy.visit("/dashboard/subir");
        const fixtureFile = 'empty.csv';
        cy.get('input[type="file"]').attachFile(fixtureFile);
        cy.get("#configurar").click()
        cy.get("#modal").should('not.have.class', "hidden");
        cy.screenshot();
    })

    it("Se permite subir un archivo csv", () => {
        cy.visit("/dashboard/subir");
        const fixtureFile = 'inputCat.csv';
        cy.get('input[type="file"]').attachFile(fixtureFile);
        cy.get("#configurar").click()
        cy.wait(10000)
        cy.url().should('eq', 'http://localhost:3000/dashboard/subir/parametros')
        cy.screenshot();
    })
})