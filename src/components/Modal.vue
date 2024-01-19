<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const escKeyCode = 27
const closeBtn = ref(null)

function close() {
  store.commit('closeModal')
}

function onClose(e) {
  if (e.keyCode === escKeyCode) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onClose)
  closeBtn.value.focus()
})

onUnmounted(() => {
  document.removeEventListener('keydown', onClose)
})
</script>

<template>
  <div @click.self="close()" class="modal">
    <div class="modal__wrapper">
      <button
        @click="close()"
        ref="closeBtn"
        class="modal__close-btn"
        type="button"
      >
        ❌
      </button>
      <p
        :class="{ 'modal__content--error': store.state.modal.error }"
        class="modal__content"
      >
        {{ store.state.modal.message }}
      </p>
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  inset: 0;
  display: flex;
  padding: 10px;
  place-items: center;
  place-content: center;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal__wrapper {
  position: relative;
  padding: 40px 20px 20px;
  min-width: 240px;
  min-height: 70px;
  max-width: 400px;
  max-height: 88vh;
  border-radius: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
  background-color: var(--c-bg);
  overflow: hidden;
}

.modal__close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  display: inline-block;
  width: 21px;
  height: 21px;
  font-size: 20px;
  line-height: 100%;
  background-color: var(--c-bg);
  border: none;
  border-radius: 4px;
  box-sizing: content-box;
  z-index: 1;
}

.modal__close-btn:hover,
.modal__close-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--c-middle-text);
}

.modal__close-btn:active {
  box-shadow: 0 0 0 2px var(--c-middle-text),
    inset 1px 1px 2px var(--c-middle-text);
  transform: translate(1px, 1px);
  transition: box-shadow 0.02s, transform 0.02s;
}

.modal__content {
  position: relative;
  margin: 10px;
  max-height: 80vh;
  font-size: 20px;
  line-height: 145%;
  text-align: center;
  overflow: auto;
}

.modal__content--error {
  color: tomato;
}
</style>
