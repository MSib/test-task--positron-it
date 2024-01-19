<script setup>
import { useStore } from 'vuex'
import QuantityProductsWithText from '../components/QuantityProductsWithText.vue'
const store = useStore()
</script>

<template>
  <header class="header">
    <div class="header__cart cart-header">
      <div class="cart-header__icon" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="26"
          fill="currentColor"
        >
          <path
            d="m9.07 18.034.071-.144.935-1.903.027-.056h.062l15.525-.028c.477 0 .886-.34.97-.811L9.07 18.034Zm0 0h18.771a1.006 1.006 0 0 1 1.006 1c0 .555-.452 1.004-1.003 1.004h-3.74l.119.16a3.109 3.109 0 0 1-2.482 4.975 3.109 3.109 0 0 1-3.107-3.107c0-.674.219-1.33.624-1.868l.12-.16h-5.434l.12.16a3.109 3.109 0 0 1-2.482 4.975 3.109 3.109 0 0 1-3.107-3.107c0-.674.218-1.33.624-1.868l.12-.16H7.056a1 1 0 0 1-.895-.552.992.992 0 0 1 .085-1.045l.005-.008 2.337-3.815.021-.034-.008-.039-1.816-8.79-.737-3.507-.017-.08H2.016a1.003 1.003 0 0 1 0-2.006h4.828c.471 0 .887.336.983.796l.169.794.017.079h.08l19.75.066a.993.993 0 0 1 .755.355.986.986 0 0 1 .213.805l-2.15 12.035-17.59 2.942ZM8.554 3.806H8.43l.025.12 2.097 9.954.017.08h.081l14.135-.026h.083l.015-.082 1.762-9.869.021-.117h-.119l-17.994-.06Zm1.94 18.26a1.09 1.09 0 0 0 1.857.769 1.088 1.088 0 1 0-1.856-.77Zm10.16 0a1.09 1.09 0 0 0 1.857.769 1.088 1.088 0 1 0-1.857-.77Z"
          />
        </svg>
      </div>

      <p class="cart-header__title">Ваша корзина</p>
      <p v-if="store.getters.isNotEmptyCart" class="cart-header__count">
        <QuantityProductsWithText />
      </p>
      <p v-else class="cart-header__is-empty">Пусто</p>
      <p v-if="store.getters.isNotEmptyCart" class="cart-header__total-price">
        {{ store.getters.sumTotal.toLocaleString() }} ₽
      </p>
    </div>
  </header>
</template>

<style>
.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.header__cart {
  margin-left: auto;
  padding: 18px 0;
}

.cart-header {
  position: relative;
  padding-left: 50px;
}

.cart-header__icon {
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  display: flex;
  place-items: center;
  color: var(--c-accent);
}

.cart-header__title,
.cart-header__count,
.cart-header__is-empty,
.cart-header__total-price {
  margin: 0;
}

.cart-header__count,
.cart-header__total-price {
  font-size: 12px;
  line-height: 145%;
}

.cart-header__title {
  font-size: 14px;
  line-height: 125%;
}

.cart-header__count {
  color: var(--c-middle-text);
}

.cart-header__is-empty {
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 145%;
  color: var(--c-middle-text);
  text-align: center;
}
</style>
