import faker from 'faker'

describe('Sale test', () => {
    it('Add Sale', () => {
        cy.intercept('/inventory').as('getInventory')
        cy.intercept('/sale').as('filterSale')
        cy.intercept({
            method: 'PUT',
            url: 'sale/orderables/0'
        }).as('addSale')
        cy.login()
        cy.visit('/Sales')
        cy.wait('@getInventory')
        cy.wait('@filterSale')
        cy.get('button').contains('Create Sale').click()
        cy.get('[data-cy="sale-form-description"]').type(faker.random.words())
        cy.get('[data-cy="sale-form-client-name"]').type(faker.name.findName())
        cy.get('[data-cy="sale-form-payment-type"]').click()
        cy.get('[class="ant-select-item-option-content"]').contains('Visa').click({force: true})
        cy.get('[data-cy="sale-form-card-number"]').type(faker.random.number({min: 1111111111111111, max: 1111111111111111}).toString())
        cy.get('[data-cy="sale-form-card-name"]').type(faker.name.findName())
        cy.get('[class="ant-select ant-select-single ant-select-show-arrow ant-select-show-search"]').click()
        cy.get('[class="rc-virtual-list"]').eq(1).children('.rc-virtual-list-holder').children('div').children('.rc-virtual-list-holder-inner').children('div').first().click()
        cy.get('button').contains('OK').click()
        cy.wait(['@addSale', '@filterSale'])
    })
})