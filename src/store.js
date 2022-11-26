import { createStore } from 'vuex'

const state = {
  url: 'http://localhost',
  cartProducts: [],
  installation: false,
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
}

const actions = {
  sendOrder(ctx) {
    const arr = ctx.state.cartProducts.reduce(
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
    )
    const order = {
      items: arr,
      installation: ctx.state.installation,
    }

    fetch(ctx.state.url, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
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
