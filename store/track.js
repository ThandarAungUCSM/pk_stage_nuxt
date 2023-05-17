const state = () => {
  return {
    trackingLists: [
      // {title: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒", imagePath: require("../assets/mobile/newArrival1.png"), price: "$99,999", originalPrice: "99,999", bid: 1},
      // {title: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒", imagePath: require("../assets/mobile/newArrival1.png"), price: "$99,999", originalPrice: "99,999", bid: 2},
      // {title: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒", imagePath: require("../assets/mobile/newArrival1.png"), price: "$99,999", originalPrice: "99,999", bid: 3},
      // {title: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒", imagePath: require("../assets/mobile/newArrival1.png"), price: "$99,999", originalPrice: "99,999", bid: 4},
      // {title: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒", imagePath: require("../assets/mobile/newArrival1.png"), price: "$99,999", originalPrice: "99,999", bid: 5},
      // {title: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒", imagePath: require("../assets/mobile/newArrival1.png"), price: "$99,999", originalPrice: "99,999", bid: 6},
      // {title: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒", imagePath: require("../assets/mobile/newArrival1.png"), price: "$99,999", originalPrice: "99,999", bid: 7},
      // {title: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒", imagePath: require("../assets/mobile/newArrival1.png"), price: "$99,999", originalPrice: "99,999", bid: 8},
      // {title: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒", imagePath: require("../assets/mobile/newArrival1.png"), price: "$99,999", originalPrice: "99,999", bid: 9},
      // {title: "山丘藍台灣藍莓 5盒裝單盒淨重 100公克 ×5 盒", imagePath: require("../assets/mobile/newArrival1.png"), price: "$99,999", originalPrice: "99,999", bid: 10}
    ]
  };
}

const actions = {
  removeProductFromTracking({state, commit}, bid) {
    console.log("[Action] removeProductFromTracking() bid=", bid);
    if(bid != null) {
      const trackItem = state.trackingLists.find(item => item.bid === bid);
      if(trackItem) {
        commit("removeThatProduct", trackItem);
      }
    }
  }
}

const mutations = {
  removeThatProduct(state, item) {
    console.log("tracking popProductFromCart(item=", item, ")");
    const index = state.trackingLists.indexOf(item);
    console.log("tracking popProductFromCart(index=", index, ")");
    if(index > -1) state.trackingLists.splice(index, 1);
  }
}

export default {
  state,
  actions,
  mutations
}