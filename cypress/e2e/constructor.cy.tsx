import * as orderInfo from '../fixtures/order.json';
import * as authTokens from '../fixtures/token.json';

const elements = {
  bun: '[data-cy=bun]',
  main: '[data-cy=main]',
  sauce: '[data-cy=sauce]',
  addButton: '.common_button',
  constructorBunTop: '[data-cy=constructor-bun-top]',
  constructorBunBottom: '[data-cy=constructor-bun-bottom]',
  constructorMain: '[data-cy=constructor-main]',
  constructorSauce: '[data-cy=constructor-sauce]',
  modal: '[data-cy=modal]',
  modalCloseButton: '[data-cy=modal-close-button]',
  modalOverlay: '[data-cy=modal-overlay]',
  orderButton: '[data-cy=order-button]',
  orderNumber: '[data-cy=order-number]'
};

describe('Интеграционные тесты для страницы конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('GET', 'api/auth/tokens', {
      fixture: 'token.json'
    });
    cy.setCookie('accessToken', authTokens.accessToken);
    localStorage.setItem('refreshToken', authTokens.refreshToken);
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.visit('http://localhost:4000/');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('Добавление булки', () => {
      cy.get(elements.bun)
        .first()
        .within(() => {
          cy.get(elements.addButton).click();
        });

      cy.get(elements.constructorBunTop).should('exist');
      cy.get(elements.constructorBunBottom).should('exist');
    });

    it('Добавление начинки', () => {
      cy.get(elements.main)
        .first()
        .within(() => {
          cy.get(elements.addButton).click();
        });
      cy.get(elements.constructorMain).should('exist');
    });

    it('Добавление соуса', () => {
      cy.get(elements.sauce)
        .first()
        .within(() => {
          cy.get(elements.addButton).click();
        });
      cy.get(elements.constructorSauce).should('exist');
    });
  });

  describe('Тестирование работы модальных окон', () => {
    it('Открытие модального окна ингредиента', () => {
      cy.get(elements.bun).first().click();
      cy.get(elements.modal).should('exist');
    });

    it('Закрытие модального окна по крестику', () => {
      cy.get(elements.bun).first().click();
      cy.get(elements.modalCloseButton).click();
      cy.get(elements.modal).should('not.exist');
    });

    it('Закрытие модального окна по оверлею', () => {
      cy.get(elements.bun).first().click();
      cy.get(elements.modalOverlay).click({ force: true });
      cy.get(elements.modal).should('not.exist');
    });
  });

  describe('Тестирование создания заказа', () => {
    it('Создание заказа', () => {
      cy.get(elements.bun)
        .first()
        .within(() => {
          cy.get(elements.addButton).click();
        });

      cy.get(elements.main)
        .first()
        .within(() => {
          cy.get(elements.addButton).click();
        });

      cy.get(elements.sauce)
        .first()
        .within(() => {
          cy.get(elements.addButton).click();
        });

      cy.get(elements.constructorBunTop).should('exist');
      cy.get(elements.constructorBunBottom).should('exist');
      cy.get(elements.constructorMain).should('exist');

      cy.get(elements.orderButton).click();

      cy.get(elements.modal).should('be.visible');
      cy.get(elements.orderNumber).should('contain', orderInfo.order.number);
      cy.get(elements.modalCloseButton).click();
      cy.get(elements.modal).should('not.exist');

      cy.get(elements.constructorBunTop).should('not.exist');
      cy.get(elements.constructorBunBottom).should('not.exist');
      cy.get(elements.constructorMain).should('not.exist');
    });

    afterEach(() => {
      cy.clearAllCookies();
      localStorage.removeItem('refreshToken');
    });
  });
});
