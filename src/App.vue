<script setup>
import Header from './layouts/Header.vue'
import CartPage from './pages/Cart.vue'
import Modal from './components/Modal.vue'
import { useStore } from 'vuex'

const store = useStore()
</script>

<template>
  <Header :inert="store.state.modal !== null" />
  <main :inert="store.state.modal !== null">
    <CartPage />
  </main>

  <teleport v-if="store.state.modal" to="#modal">
    <Modal />
  </teleport>
</template>
