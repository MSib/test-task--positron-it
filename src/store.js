import { createStore } from 'vuex'

const state = {
  url: 'http://localhost:3030',
  cartProducts: [],
  installation: false,
  spinner: false,
  modal: null,
}

const mutations = {
  addToCart(state, payload) {
    if (!state.cartProducts.find((item) => item.id === payload.id)) {
      state.cartProducts.push(payload)
    }
  },

  removeFromCart(state, product) {
    state.cartProducts.splice(state.cartProducts.indexOf(product), 1)
  },

  initCart(state, products) {
    state.cartProducts = products
  },

  clearCart(state) {
    state.cartProducts = []
  },

  incrementProductsPiece(state, product) {
    if (product.quantity < product.inStock) {
      product.quantity++
    }
  },

  decrementProductsPiece(state, product) {
    if (product.quantity > 0) {
      product.quantity--
    }
  },

  toggleInstallation(state) {
    state.installation = !state.installation
  },

  closeModal(state) {
    state.modal = null
  },
}

const actions = {
  sendOrder(ctx) {
    const order = {
      items: ctx.state.cartProducts.reduce(
        (acc, item) =>
          item.quantity > 0
            ? [
                ...acc,
                {
                  id: item.id,
                  quantity: item.quantity,
                },
              ]
            : [...acc],
        []
      ),
      installation: ctx.state.installation,
      fakeError: null, // null | 403 | 404 | 500 | 502 | 503 | 504
    }

    ctx.state.spinner = true
    fetch(ctx.state.url, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          ctx.state.modal = {
            message: data.message,
            error: data.error,
          }
        } else {
          ctx.state.modal = {
            message: data.message,
            error: false,
          }
        }
      })
      .catch((error) => {
        console.log(error)
        ctx.state.modal = {
          message:
            'Произошла неизвестная ошибка. Повторите оформление заказа',
          error: true,
        }
      })
      .finally(() => {
        ctx.state.spinner = false
      })
  },
}

const getters = {
  isNotEmptyCart(state) {
    return state.cartProducts.length > 0
  },

  quantityProducts(state) {
    return state.cartProducts.length
  },

  totalProductsPiece(state) {
    return state.cartProducts.reduce((acc, item) => acc + item.quantity, 0)
  },

  sumTotal(state) {
    return state.cartProducts.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  },
}

export default createStore({
  state,
  getters,
  actions,
  mutations,
})
