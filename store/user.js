const state = () => {
  return {
    loginState: false,
    loginData: {name: 'firefly', password: '123456'},
    profile: {name: '王大明', mobile: '0966-330-678', birthDay: '1990/02/18', email: 'example@gmail.com', cityName: '新北市', district: '三重區', genderCode: 'other', street: '光復南路三段156巷24號'},
  };
};

const actions = {
  updateLogin({ state, commit }, logindata) {
    if (logindata != null) {
      commit("loginMutate", logindata);
    }
  },
  setUserProfile({ commit }, data) {
    console.log("setUserProfile(data=", data, ")");
    commit("SET_USER_PROFILE", data);
  },
  updatePassword({ commit }, data) {
    commit("UPDATE_PASSWORD", data)
  }
};

const mutations = {
  loginMutate(state, logindata) {
    state.loginState = logindata
  },
  "SET_USER_PROFILE"(state, data) {
    state.profile = data;
  },
  "UPDATE_NAME"(state, value) {
    state.profile.name = value;
  },
  "UPDATE_MOBILE"(state, value) {
    state.profile.mobile = value;
  },
  "UPDATE_BIRTHDAY"(state, value) {
    state.profile.birthDay = value;
    console.log("state.profile.birthDay=", state.profile.birthDay);
  },
  "UPDATE_EMAIL"(state, value) {
    state.profile.email = value;
  },
  "UPDATE_CITY_NAME"(state, value) {
    state.profile.cityName = value;
  },
  "UPDATE_DISTRICT"(state, value) {
    state.profile.district = value;
  },
  
  "UPDATE_GENDER"(state, value) {
    state.profile.genderCode = value;
  },
  "UPDATE_STREET"(state, value) {
    state.profile.street = value;
  },
  "UPDATE_PASSWORD"(state, value) {
    state.loginData.password = value
  }
};

const getters = {
  userLogin: state => {
    return state.loginState;
  },
  storeProfile(state) {
    return state.profile;
  },
  userNamePassword(state) {
    return state.loginData;
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true, 
};
