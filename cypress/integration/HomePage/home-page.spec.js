describe('home page functional testing', () => {
    before(() => {
        cy.visit('http://localhost:3000/');
    });

    beforeEach(function () {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.intercept('POST', 'api/orders', {fixture: 'order.json'});
    });

    it('should be loading home page', function () {
        cy.contains('Соберите бургер');
    });

    it('testing d`n`d functional', function () {
        cy.get('[alt^="Флюоресцентная булка R2-D3"]').as('bun');
        cy.get('[alt^="Мясо бессмертных моллюсков Protostomia"]').as('ingredient1');
        cy.get('[alt^="Соус Spicy-X"]').as('ingredient2');
        cy.get('[class^=BurgerConstructor_burgerConstructor__]').as('dropArea');

        cy.get('@bun').trigger('dragstart');
        cy.get('@dropArea').trigger('drop');
        cy.get('@dropArea').contains('Флюоресцентная булка R2-D3');

        cy.get('@ingredient1').trigger('dragstart');
        cy.get('@dropArea').trigger('drop');
        cy.get('@dropArea').contains('Мясо бессмертных моллюсков Protostomia');

        cy.get('@ingredient2').trigger('dragstart');
        cy.get('@dropArea').trigger('drop');
        cy.get('@dropArea').contains('Соус Spicy-X');
    });

    it('should be removed ingredient from constructor', function () {
        cy.get('.constructor-element__action').eq(2).click();
        cy.get('[class^=BurgerConstructor_list__]').should('have.length', 1);
    });

    it('should be open modal window', function () {
        cy.get('[alt^="Сыр с астероидной плесенью"]').as('ingredient');

        cy.get('@ingredient').click();
        cy.get('[class^=Modal_modal__]').contains('Детали ингредиента');
        cy.get('[class^=Modal_modal__]').contains('Сыр с астероидной плесенью');
    });

    it('should be close modal window', function () {
        cy.get('[class^=Modal_closeIcon__]').click();

        cy.get('[class^=Modal_modal__]').should('not.exist');
    });

    it('should be send order', function () {
        cy.get('.button_type_primary').click();

        cy.get('[class^=CheckDetail_title__]').contains('39977');
    });

    it('should be close order modal window', function () {
        cy.get('[class^=Modal_closeIcon__]').click();

        cy.get('[class^=Modal_modal__]').should('not.exist');
    });
});