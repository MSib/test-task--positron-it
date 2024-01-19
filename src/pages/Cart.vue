<script setup>
import { useStore } from 'vuex'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import Slider from '../components/Slider.vue'
import QuantityProductsWithText from '../components/QuantityProductsWithText.vue'
import BreadcrumbsMock from '../mocks/Breadcrumbs'
import CartProductsMock from '../mocks/CartProducts'
import SlidesMock from '../mocks/SlidesMock'

const store = useStore()

store.commit('initCart', CartProductsMock)

const removeFromCart = (item) => {
  store.commit('removeFromCart', item)
}

function sendOrder() {
  store.dispatch('sendOrder', '123')
}
</script>

<template>
  <Breadcrumbs :links="BreadcrumbsMock" />
  <h1 class="sr-only">Корзина</h1>
  <form v-if="store.getters.isNotEmptyCart" class="cart" action="">
    <div class="cart__header header-cart">
      <h2 class="header-cart__title">Ваша корзина</h2>
      <p class="header-cart__product-count">
        <QuantityProductsWithText />
      </p>
      <button
        @click="store.commit('clearCart')"
        class="header-cart__clear-cart"
        type="button"
      >
        Очистить корзину
      </button>
    </div>

    <div class="cart__products products-cart">
      <ul class="products-cart__list">
        <li
          v-for="item in store.state.cartProducts"
          :key="item.id"
          class="products-cart__item itemCart"
        >
          <div class="itemCart__wrap">
            <figure class="itemCart__thumbnail thumbnail-itemCart">
              <img
                class="thumbnail-itemCart__image"
                :src="item.image.url"
                :alt="item.image.alt"
                width="100"
              />
            </figure>
            <div class="itemCart__info info-itemCart">
              <p class="info-itemCart__title">{{ item.title }}</p>
              <p
                class="info-itemCart__description"
                v-html="item.description"
              ></p>
              <p class="info-itemCart__article">Артикул: {{ item.article }}</p>
            </div>

            <div class="itemCart__quantity quantity-itemCart">
              <div
                class="quantity-itemCart__wrap"
                :class="{
                  'quantity-itemCart__wrap--extend': item.quantity > 1,
                }"
              >
                <button
                  @click="store.commit('decrementProductsPiece', item)"
                  class="quantity-itemCart__decrement"
                  :disabled="item.quantity === 0"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="1"
                      d="M 1,5 L9,5"
                    />
                  </svg>
                </button>
                <p class="quantity-itemCart__select">{{ item.quantity }}</p>
                <button
                  @click="store.commit('incrementProductsPiece', item)"
                  class="quantity-itemCart__increment"
                  :disabled="item.quantity === item.inStock"
                  :title="item.quantity === item.inStock ? 'Больше нету' : ''"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="1"
                      d="M 1,5 L9,5 M 5,1 L5,9"
                    />
                  </svg>
                </button>
              </div>
              <p class="quantity-itemCart__unit-price" v-if="item.quantity > 1">
                {{ item.price.toLocaleString() }} ₽/шт.
              </p>
            </div>
            <div class="itemCart__total total-itemCart">
              <p class="total-itemCart__price">
                {{ (item.price * item.quantity).toLocaleString() }} ₽
              </p>
            </div>
          </div>
          <div class="itemCart__remove remove-itemCart">
            <button
              @click="removeFromCart(item)"
              class="remove-itemCart__button"
              type="button"
              aria-label="Удалить из корзины"
              title="Удалить из корзины"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                <path
                  stroke="currentColor"
                  stroke-width="1.5"
                  d="M 1,1 L13,13 M 13,1 L1,13"
                />
              </svg>
            </button>
          </div>
        </li>
      </ul>

      <div class="products-cart__installation-service installationService">
        <div class="installationService__approval">
          <input
            @change="store.commit('toggleInstallation', item)"
            class="installationService__approval-input sr-only"
            type="checkbox"
            name="installation"
            id="installation"
          />
          <label
            for="installation"
            class="installationService__approval-iconChecked"
          ></label>
          <label
            for="installation"
            class="installationService__approval-iconUnchecked"
          ></label>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="installationService__icon"
          aria-hidden="true"
        >
          <path
            d="M23.693 28.61a5.157 5.157 0 0 1-5.15-5.151 5.177 5.177 0 0 1 3.185-4.763 5.157 5.157 0 0 1 7.118 4.763 5.157 5.157 0 0 1-5.153 5.151Zm-1.602-8.818a4.016 4.016 0 0 0-2.074 2.106 3.954 3.954 0 0 0-.321 1.56 4.002 4.002 0 0 0 3.997 3.998 4.002 4.002 0 0 0 3.998-3.997 4.002 4.002 0 0 0-5.6-3.667ZM6.541 11.456c-.29 0-.584-.024-.877-.072-2.223-.366-3.965-2.192-4.237-4.44a5.188 5.188 0 0 1 .129-1.946.577.577 0 0 1 .966-.262l2.15 2.15h1.826l.788-.788V4.27L5.24 2.224a.577.577 0 0 1 .294-.973 5.157 5.157 0 0 1 5.752 7.06 5.212 5.212 0 0 1-2.78 2.758 5.112 5.112 0 0 1-1.965.387Zm1.788-.937h.006-.006ZM2.543 6.39a3.981 3.981 0 0 0 3.309 3.856 4.03 4.03 0 0 0 2.29-.274 4.049 4.049 0 0 0 2.08-2.107 4.003 4.003 0 0 0-3.244-5.532l1.293 1.292a.577.577 0 0 1 .17.408v2.305c0 .152-.062.3-.17.407L7.145 7.871a.577.577 0 0 1-.408.169H4.433c-.153 0-.3-.061-.408-.17L2.543 6.39Z"
          />
          <path
            d="M21.902 19.82a.574.574 0 0 1-.408-.17l-3.41-3.415a.577.577 0 0 1 .817-.816l3.41 3.416a.577.577 0 0 1-.409.984ZM14.171 12.089a.575.575 0 0 1-.408-.17L10.348 8.5a.577.577 0 1 1 .816-.816l3.415 3.421a.577.577 0 0 1-.408.985ZM11.748 14.517a.575.575 0 0 1-.407-.169l-3.422-3.42a.577.577 0 1 1 .816-.816l3.421 3.42a.577.577 0 0 1-.408.985ZM19.485 22.254a.575.575 0 0 1-.408-.169l-3.421-3.421a.577.577 0 1 1 .816-.816l3.42 3.421a.577.577 0 0 1-.407.985ZM24.854 26.045h-2.321a.577.577 0 0 1-.5-.288l-1.16-2.01a.578.578 0 0 1 0-.577l1.16-2.01a.577.577 0 0 1 .5-.29h2.32c.207 0 .397.11.5.29l1.161 2.01a.578.578 0 0 1 0 .577l-1.16 2.01a.577.577 0 0 1-.5.288Zm-1.988-1.153h1.655l.827-1.434-.827-1.433h-1.655l-.828 1.433.828 1.434Z"
          />
          <path
            d="M14.362 20.223c-.34 0-.68-.129-.939-.388l-3.258-3.252a1.344 1.344 0 0 1-.005-1.875L22.63 2.236a3.573 3.573 0 0 1 5.04 0l.085.081a3.57 3.57 0 0 1 .012 5.05L15.3 19.836a1.323 1.323 0 0 1-.938.388ZM25.148 2.351c-.617 0-1.233.235-1.702.702L10.978 15.521a.18.18 0 0 0 .005.249l3.256 3.25a.172.172 0 0 0 .245 0L26.952 6.551c.454-.455.705-1.06.705-1.704 0-.644-.25-1.249-.705-1.703l-.086-.08a2.422 2.422 0 0 0-1.718-.714ZM3.245 28.846a.576.576 0 0 1-.408-.169l-1.512-1.512a.577.577 0 0 1-.084-.71l1.945-3.172a1.354 1.354 0 0 1 1.978-.364c.077.06.119.096.157.135l1.454 1.454c.03.03.06.062.087.096l.177.218a1.352 1.352 0 0 1-.34 2.006l-3.153 1.933a.575.575 0 0 1-.301.085Zm-.783-2.175.869.869 2.765-1.695a.195.195 0 0 0 .091-.136.196.196 0 0 0-.042-.158l-.186-.227-1.454-1.454-.046-.038a.2.2 0 0 0-.157-.037.195.195 0 0 0-.133.091l-1.707 2.785Z"
          />
          <path
            d="M4.647 23.772a.577.577 0 0 1-.408-.985l6.476-6.475a.577.577 0 1 1 .816.816l-6.476 6.475a.575.575 0 0 1-.408.17ZM6.805 25.93a.577.577 0 0 1-.408-.985l6.476-6.474a.577.577 0 1 1 .816.816l-6.476 6.475a.575.575 0 0 1-.408.169ZM14.36 16.218a.577.577 0 0 1-.408-.985L24.745 4.44a.577.577 0 1 1 .816.816L14.768 16.049a.575.575 0 0 1-.408.169Z"
          />
        </svg>
        <dl class="installationService__text-wrap">
          <dt class="installationService__title">Установка</dt>
          <dd class="installationService__description">
            Отметьте, если Вам необходима консультация профессионала по монтажу
            выбранных товаров.
          </dd>
        </dl>
      </div>
    </div>

    <div class="cart__summary summary-cart">
      <div class="summary-cart__wrap">
        <p class="summary-cart__title">Итого</p>
        <dl class="summary-cart__info-list">
          <dt class="summary-cart__info-label">Сумма заказа</dt>
          <dd class="summary-cart__info-value">
            {{ store.getters.sumTotal.toLocaleString() }} ₽
          </dd>
        </dl>

        <dl class="summary-cart__info-list">
          <dt class="summary-cart__info-label">Количество</dt>
          <dd class="summary-cart__info-value">
            {{ store.getters.totalProductsPiece }} шт
          </dd>
        </dl>

        <dl class="summary-cart__info-list">
          <dt class="summary-cart__info-label">Установка</dt>
          <dd class="summary-cart__info-value">
            {{ store.state.installation ? 'Да' : 'Нет' }}
          </dd>
        </dl>

        <dl class="summary-cart__info-list summary-cart__info-list--summary">
          <dt class="summary-cart__info-label summary-cart__info-label">
            Стоимость товаров
          </dt>
          <dd class="summary-cart__info-value summary-cart__info-value">
            {{ store.getters.sumTotal.toLocaleString() }} ₽
          </dd>
        </dl>
        <div class="summary-cart__action-list">
          <button
            @click="sendOrder()"
            class="summary-cart__checkout"
            :class="{ 'summary-cart__checkout--spinner': store.state.spinner }"
            :disabled="
              store.getters.totalProductsPiece <= 0 || store.state.spinner
            "
            type="button"
          >
            Оформить заказ
            <span
              v-if="store.state.spinner"
              class="summary-cart__checkout-spinner"
              >🌀</span
            >
          </button>
          <button
            class="summary-cart__buy-in-one-click"
            :disabled="store.getters.totalProductsPiece <= 0"
            type="button"
          >
            Купить в 1 клик
          </button>
        </div>
      </div>
    </div>
  </form>

  <p v-else class="empty-cart">В корзине пусто</p>

  <Slider :data="SlidesMock" />
</template>

<style>
.cart {
  margin-block: 30px;
  display: grid;
  grid-template-columns: 1fr minmax(240px, max-content);
  grid-template-areas:
    'ch .'
    'cp cs';
  gap: 35px 55px;
}

@media (max-width: 1024px) {
  .cart {
    grid-template-columns: 1fr;
    align-items: start;
    grid-template-areas:
      'ch'
      'cp'
      'cs';
  }
}

.cart__header {
  grid-area: ch;
}

.cart__products {
  grid-area: cp;
}

.cart__summary {
  grid-area: cs;
}

/* Header Cart */
.header-cart {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px 22px;
}

@media (max-width: 768px) {
  .header-cart {
    justify-content: center;
    gap: 10px;
  }
}

.header-cart__title {
  margin: 0;
  font-weight: 700;
  font-size: 44px;
  line-height: 120%;
}

@media (max-width: 768px) {
  .header-cart__title {
    width: 100%;
    text-align: center;
  }
}

.header-cart__product-count {
  margin: 0;
  margin-right: auto;
  color: var(--c-middle-text);
  font-size: 18px;
  line-height: 145%;
}

.header-cart__clear-cart {
  padding: 0;
  background-color: transparent;
  border: none;
  color: var(--c-middle-text);
  font-size: 14px;
  line-height: 150%;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
}

.header-cart__clear-cart:hover {
  color: var(--c-text);
}

@media (max-width: 768px) {
  .header-cart__clear-cart {
    margin-left: initial;
  }
}

/* Products Cart */
.products-cart__list {
  margin: 0;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
  list-style: none;
}

.products-cart__item {
  padding-bottom: 20px;
}

.products-cart__item:not(:last-child) {
  border-bottom: 1px solid var(--color-gray-400);
}

.itemCart {
  display: flex;
  gap: 35px;
}

@media (max-width: 1200px) {
  .itemCart {
    gap: 20px;
  }
}

.itemCart__wrap {
  flex-grow: 1;
  display: grid;
  grid-template-columns: min-content 1fr 31% min-content;
  grid-template-areas: 'icf ici icq ict';
  align-items: center;
  gap: 20px;
}

@media (max-width: 1200px) {
  .itemCart__wrap {
    grid-template-columns: min-content min-content min-content 1fr;
    grid-template-areas:
      'icf ici ici ici'
      ' .  icq ict  .';
  }
}

@media (max-width: 1024px) {
  .itemCart__wrap {
    grid-template-columns: min-content 1fr min-content min-content;
    grid-template-areas: 'icf ici icq ict';
  }
}

@media (max-width: 768px) {
  .itemCart__wrap {
    grid-template-columns: min-content min-content min-content 1fr;
    grid-template-areas:
      'icf ici ici ici'
      'icq icq ict ict';
  }
}

@media (max-width: 425px) {
  .itemCart__wrap {
    grid-template-columns: 1fr;
    grid-template-areas:
      'icf'
      'ici'
      'icq'
      'ict';
    justify-items: center;
    text-align: center;
  }
}

.itemCart__thumbnail {
  grid-area: icf;
  width: min-content;
}

.thumbnail-itemCart {
  margin: 0 10px 0 15px;
}

.thumbnail-itemCart__image {
  display: block;
}

.itemCart__info {
  grid-area: ici;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-itemCart__title {
  margin: 0;
  font-size: 16px;
  line-height: 145%;
  font-weight: 600;
}

.info-itemCart__description {
  margin: 0;
  color: var(--color-black-300);
  font-size: 12px;
  line-height: 150%;
}

.info-itemCart__article {
  margin: 0;
  color: var(--c-middle-text);
  font-size: 14px;
  line-height: 150%;
}

.itemCart__quantity {
  grid-area: icq;
  margin: 0 auto;
}

.quantity-itemCart__wrap {
  display: flex;
  justify-content: center;
  gap: 2px;
}

.quantity-itemCart__wrap--extend {
  margin-top: 30px;
}

.quantity-itemCart__decrement,
.quantity-itemCart__select,
.quantity-itemCart__increment {
  border: none;
  background-color: var(--c-medium-bg);
  box-sizing: border-box;
  text-align: center;
}

.quantity-itemCart__decrement,
.quantity-itemCart__increment {
  min-width: 32px;
  color: var(--c-dark-text);
  transition: box-shadow 0.1s, transform 0.1s;
  cursor: pointer;
}

.quantity-itemCart__decrement {
  border-radius: 4px 0 0 4px;
}

.quantity-itemCart__increment {
  border-radius: 0 4px 4px 0;
}

.quantity-itemCart__select {
  margin: 0;
  padding: 6px 10px;
  min-width: 34px;
  font-size: 14px;
  line-height: 150%;
}

.quantity-itemCart__decrement:disabled,
.quantity-itemCart__increment:disabled {
  color: var(--c-light-text);
  cursor: not-allowed;
}

.quantity-itemCart__decrement:not(:disabled):hover,
.quantity-itemCart__decrement:focus-visible,
.quantity-itemCart__increment:not(:disabled):hover,
.quantity-itemCart__increment:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--c-middle-text);
}

.quantity-itemCart__decrement:not(:disabled):active,
.quantity-itemCart__increment:not(:disabled):active {
  box-shadow: 0 0 0 2px var(--c-middle-text),
    inset 1px 1px 2px var(--c-middle-text);
  transform: translate(1px, 1px);
  transition: box-shadow 0.02s, transform 0.02s;
}

.quantity-itemCart__unit-price {
  margin: 12px 0 0;
  font-size: 12px;
  line-height: 145%;
  text-align: center;
}

.itemCart__total {
  grid-area: ict;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  line-height: 145%;
  font-weight: 500;
}

.total-itemCart__price {
  margin: 0;
  margin-right: auto;
  width: max-content;
  min-width: 70px;
  text-align: right;
}

.itemCart__remove {
  align-self: start;
  line-height: 0;
}

.remove-itemCart__button {
  margin: -8px;
  padding: 8px;
  line-height: 0;
  color: inherit;
  background-color: inherit;
  border: none;
  border-radius: 4px;
  transition: box-shadow 0.1s, transform 0.1s;
  cursor: pointer;
}

.remove-itemCart__button:hover,
.remove-itemCart__button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--c-middle-text);
}

.remove-itemCart__button:active {
  box-shadow: 0 0 0 2px var(--c-middle-text),
    inset 1px 1px 2px var(--c-middle-text);
  transform: translate(1px, 1px);
  transition: box-shadow 0.02s, transform 0.02s;
}

.products-cart__installation-service {
  background-color: var(--c-medium-bg);
  border-radius: 5px;
}

.installationService {
  padding: 25px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.installationService__approval {
  line-height: 0;
  color: var(--c-middle-text);
}

.installationService__approval-iconChecked,
.installationService__approval-iconUnchecked {
  display: none;
  width: 20px;
  height: 20px;
  border: 1px solid var(--c-middle-text);
  box-shadow: inset 2px 2px 1px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  box-sizing: border-box;
  cursor: pointer;
}

.installationService__approval-input:checked
  ~ .installationService__approval-iconChecked {
  display: block;
  padding: 4px;
  background-clip: content-box;
  background-color: currentColor;
}

.installationService__approval-input:not(:checked)
  ~ .installationService__approval-iconUnchecked {
  display: block;
}

.installationService__approval-input:focus-visible
  ~ .installationService__approval-iconChecked,
.installationService__approval-input:focus-visible
  ~ .installationService__approval-iconUnchecked {
  box-shadow: inset 2px 2px 1px rgba(0, 0, 0, 0.08),
    0 0 0 3px var(--c-medium-bg), 0 0 0 6px currentColor;
}

.installationService__icon {
  padding: 10px;
  flex-shrink: 0;
  background-color: var(--c-bg);
  border-radius: 4px;
  color: var(--c-accent);
}

.installationService__text-wrap {
  margin: 0;
}

.installationService__title {
  margin-bottom: 4px;
  font-size: 16px;
  line-height: 145%;
  font-weight: 600;
}

.installationService__description {
  font-size: 14px;
  line-height: 150%;
  color: var(--c-middle-text);
  margin-left: 0;
}

.cart__summary {
  justify-self: center;
}

/* Summary Cart */
.summary-cart {
  min-width: 425px;
}

@media (max-width: 1440px) {
  .summary-cart {
    min-width: 29vw;
  }
}

@media (max-width: 1200px) {
  .summary-cart {
    min-width: 280px;
  }
}

@media (max-width: 425px) {
  .summary-cart {
    width: 100%;
  }
}

.summary-cart__wrap {
  position: sticky;
  top: 20px;
  padding: 35px 30px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  border-radius: 5px;
  background-color: var(--c-medium-bg);
}

@media (max-width: 425px) {
  .summary-cart__wrap {
    padding: 25px 20px;
  }
}

.summary-cart__title {
  margin: 0;
  margin-bottom: 15px;
  font-size: 24px;
  line-height: 120%;
  font-weight: 600;
}

.summary-cart__info-list {
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  column-gap: 20px;
}

@media (max-width: 768px) {
  .summary-cart__info-list {
    flex-wrap: wrap;
    row-gap: 4px;
  }
}

.summary-cart__info-label {
  font-size: 16px;
  line-height: 145%;
  font-weight: 500;
}

.summary-cart__info-value {
  margin-left: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 145%;
  text-align: right;
}

@media (max-width: 425px) {
  .summary-cart__info-value {
    padding-left: 30px;
  }
}

.summary-cart__info-list--summary {
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid var(--color-gray-300);
}

.summary-cart__info-list--summary .summary-cart__info-label,
.summary-cart__info-list--summary .summary-cart__info-value {
  margin-top: -5px;
}

.summary-cart__info-list--summary .summary-cart__info-label {
  font-size: 18px;
  font-weight: 600;
}

.summary-cart__info-list--summary .summary-cart__info-value {
  font-size: 26px;
  line-height: 130%;
  font-weight: 700;
  letter-spacing: 0.1px;
}

.summary-cart__action-list {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.summary-cart__checkout,
.summary-cart__buy-in-one-click {
  padding: 14px 40px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid var(--c-accent);
  outline: none;
  font-size: 18px;
  line-height: 145%;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 425px) {
  .summary-cart__checkout,
  .summary-cart__buy-in-one-click {
    padding: 14px 20px;
  }
}

.summary-cart__checkout {
  color: var(--c-bg);
  background-color: var(--c-accent);
}

.summary-cart__checkout:disabled,
.summary-cart__buy-in-one-click:disabled {
  --c-accent: var(--color-gray-300);
  cursor: not-allowed;
}

.summary-cart__checkout:not(:disabled):active {
  color: var(--c-accent);
  background-color: var(--c-bg);
}

.summary-cart__checkout:not(:disabled):hover,
.summary-cart__checkout:focus-visible,
.summary-cart__buy-in-one-click:not(:disabled):hover,
.summary-cart__buy-in-one-click:focus-visible {
  box-shadow: 0px 0px 0px 3px var(--c-medium-bg),
    0px 0px 0px 6px var(--c-accent);
}

.summary-cart__checkout--spinner:disabled {
  cursor: progress;
}

.summary-cart__checkout-spinner {
  display: inline-block;
  margin-left: 10px;
  animation-duration: 0.8s;
  animation-name: spinner;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spinner {
  from {
    transform: scale(1, -1) rotate(0deg);
  }

  to {
    transform: scale(1, -1) rotate(-360deg);
  }
}

.summary-cart__buy-in-one-click {
  color: var(--c-accent);
  background-color: var(--c-bg);
}

.summary-cart__buy-in-one-click:not(:disabled):active {
  color: var(--c-bg);
  background-color: var(--c-accent);
}

.empty-cart {
  font-size: 24px;
}
</style>
