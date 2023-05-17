const state = () => {
  return {
    quantity: null,
    cartLists: [
      // {name: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒1", imagePath: require("../assets/mobile/newArrival.png"),  max: 5, quantity: 2, price: "99999", originalPrice: "99,999", bid: 1},
      // {name: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒1", imagePath: require("../assets/mobile/newArrival.png"),  max: 5, quantity: 3, price: "99999", originalPrice: "99,999", bid: 2},
      // {name: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒1", imagePath: require("../assets/mobile/newArrival.png"),  max: 5, quantity: 1, price: "99999", originalPrice: "99,999", bid: 3},
      // {name: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒1", imagePath: require("../assets/mobile/newArrival.png"),  max: 5, quantity: 2, price: "99999", originalPrice: "99,999", bid: 4},
      
    ]
  };
};

const actions = {
  // member-tracking
  // addProductToCart({ state, commit }, product) {
  //   if (product != null) {
  //     const cartItem = state.cartLists.find(item => item.bid === product.bid);
  //     if(!cartItem) {
  //       commit("pushProductToCart", product);
  //     } 
  //   }
  // },

  // productDetail
  addProductToCart({ state, commit }, product) {
    if (product != null) {
      const temp = JSON.parse(product)
      const cartItem = state.cartLists.find(item => item.bid === temp.bid);
      if(!cartItem) {
        commit("pushProductToCart", temp);
      } else {
        commit("incrementProductQuantity", temp);
      }
    }
  },
  setCartQty({ commit }, data) {
    commit("SET_QTY", data);
  },
  setCartList({ commit }, data) {
    commit("SET_CART_LIST", data);
  },
  removeProductFromCart({ state, commit }, bid) {
    console.log("[Action] removeProductFromCart() bid=", bid);
    if (bid != null) {
      const cartItem = state.cartLists.find(item => item.bid === bid);
      if (cartItem) {
        commit("popProductFromCart", cartItem);
      }
    }
  },

  incProductQty({ state, commit }, product) {
    console.log("[Action] incProductQty() product.name=", product.name);
    if (product != null) {
      const cartItem = state.cartLists.find(item => item.bid === product.bid);
      console.log("cartItem.name=", cartItem.name);
      if (cartItem) {
        commit("incrementProductQuantity", product);
      }
    }
  },
  decProductQty({ state, commit }, product) {
    console.log("[Action] decProductQty() product.name=", product.name);
    if (product != null) {
      const cartItem = state.cartLists.find(item => item.bid === product.bid);
      console.log("cartItem.name=", cartItem.name);
      if (cartItem) {
        commit("decrementProductQuantity", product);
      }
    }
  }

};

const mutations = {
  // member-tracking
  // pushProductToCart(state, product) {
  //   state.cartLists.push({
  //     data: product,
  //     quantity: state.quantity+1,
  //   });
  //   state.quantity+=1
  // },

  // productDetail
  pushProductToCart(state, product) {
    state.cartLists.push( product );
    state.quantity+=1
  },
  "SET_QTY"(state, data) {
    state.quantity = data;
  },
  "SET_CART_LIST"(state, data) {
    state.cartLists = data;
  },
  incrementProductQuantity(state, product) {
    console.log("cart incrementProductQuantity(product.name=", product.name, ")");
    const cartItem = state.cartLists.find(item => item.bid === product.bid);
    cartItem.quantity++;
  },
  decrementProductQuantity(state, product) {
    console.log("cart decrementItemQuantity(product.name=", product.name, ")");
    const cartItem = state.cartLists.find(item => item.bid === product.bid);
    if (cartItem.quantity > 1) cartItem.quantity--;
  },
  popProductFromCart(state, item) {
    console.log("cart popProductFromCart(item=", item, ")");
    const index = state.cartLists.indexOf(item);
    console.log("cart popProductFromCart(index=", index, ")");
    if (index > -1) state.cartLists.splice(index, 1);
  },
};

const getters = {
  cartProducts: state => {
    return state.cartLists;
  },
  cartTotalPrice: (state, getters) => {
    // if(groupItems) {
    //   return groupItems.reduce((total, product) => {
    //     if (product != null && product.data != null) return total + product.data.price * product.quantity;
    //   }, 0);
    // } else return 0;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true, 
};
