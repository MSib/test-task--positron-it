<script setup>
import { useStore } from 'vuex'
import numDecline from '../utils/numDecline'

const store = useStore()

// [nominative, genitiveSingular, genitivePlural]
const productDesignation = ['товар', 'товара', 'товаров']

function quantityProductsWithText() {
  const qty = store.getters.quantityProducts
  const noun = numDecline(store.getters.quantityProducts, ...productDesignation)
  return `${qty} ${noun}`
}
</script>
<template>
  {{ quantityProductsWithText() }}
</template>
