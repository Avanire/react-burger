describe('home page functional testing', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
    });

    it('should be loading home page', function () {
        cy.contains('Соберите бургер');
    });

    it('testing d`n`d functional', function () {
        cy.get('[data-ingredient="60d3b41abdacab0026a733c6"]').as('bun');
        cy.get('[data-ingredient="60d3b41abdacab0026a733cb"]').as('ingredient1');
        cy.get('[data-ingredient="60d3b41abdacab0026a733cd"]').as('ingredient2');
        cy.get('[class^=BurgerConstructor_burgerConstructor__]').as('dropArea');

        cy.get('@bun').trigger('dragstart');
        cy.get('@dropArea').trigger('drop');

        cy.get('@ingredient1').trigger('dragstart');
        cy.get('@dropArea').trigger('drop');

        cy.get('@ingredient2').trigger('dragstart');
        cy.get('@dropArea').trigger('drop');
    });

    it('should be removed ingredient from constructor', function () {
        cy.get('.constructor-element__action').eq(2).click();
        cy.get('[class^=BurgerConstructor_list__]').should('have.length', 1);
    });

    it('should be open modal window', function () {
        cy.get('[data-ingredient="60d3b41abdacab0026a733d1"]').as('ingredient');

        cy.get('@ingredient').click();
        cy.contains('Детали ингредиента');
    });

    it('should be close modal window', function () {
        cy.get('[class^=Modal_closeIcon__]').click();

        cy.get('[class^=Modal_modal__]').should('not.exist');
    });

    it('should be send order', function () {
        cy.get('.button_type_primary').click();

        cy.get('[class^=CheckDetail_title__]');
    });

    it('should be close order modal window', function () {
        cy.get('[class^=Modal_closeIcon__]').click();

        cy.get('[class^=Modal_modal__]').should('not.exist');
    });
});