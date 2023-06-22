<template>
<div>
  <div class="login-css">
    <div class="login-child">
      <p class="welcome-back">PK 後台</p>

      <input v-model="userName" placeholder="帳號：" class="accountCss1" onfocus="this.placeholder=''" />
      <input v-model="userPwd" placeholder="密碼：" type="password" class="accountCss2" onfocus="this.placeholder=''" />

      <div class="btn-div">
        <div class="register-btn" @click="loginProcess">登入</div>
        <p class="version-css">ver1.0.0</p>
      </div>
    </div>
    <div class="store-owner-block">
      <p class="txt-store" @click="currencyFunc('currencyManager')">Admin</p>
      <p class="txt1-store" @click="storeOwnerFunc('')">Store owner</p>
    </div>
  </div>
  <Footer :page="pName" />
</div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'MyLogin',
  data() {
    return{
      userName: '',
      userPwd: '',
      pName: 'login'
    }
  },
  computed: {
    ...mapGetters('user', {
      userdata: 'userNamePassword'
    })
  },
  methods: {
    ...mapActions("user", ["updateLogin"]),
    loginProcess() {
      if(this.userName === this.userdata.name && this.userPwd === this.userdata.password) {
        // alert('Success !!')
        this.updateLogin(true);
        this.$router.push('/')
      }
    },
    currencyFunc(val) {
      this.$router.push({ name: "index", query: { item: val} });
    },
    storeOwnerFunc() {
      this.$router.push({ name: "storeOwner", query: { item: 'storeowner'} });
    }
  }
}
</script>

<style lang="scss" scoped>
.login-css {
  min-height: 100vh;
  max-height: 100vh;
  background-image: url('../assets/pc/login-bg.png');
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; 
  position: relative;
  @media screen and (max-width: 768px) {
    
  }
  .login-child {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;

    width: 50%;
    margin: 0 auto;
    background: rgba(25, 26, 33, 0.7);
    border-radius: 12px;
    
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    padding-top: 76px;
    @media screen and (max-width: 768px) {
      display: none;

      width: 90%;
      margin: -5px auto 0;
    }
  }
  .store-owner-block {
    position: absolute;
    right: 65px;
    bottom: 43px;
    text-align: right;
    .txt-store, .txt1-store {
      font-weight: 400;
      font-size: 16px;
      color: #FFF;
      cursor: pointer;
    }
    .txt1-store {
      margin-bottom: 0;
    }
  }
  .welcome-back {
    font-weight: 400;
    font-size: 20px;
    color: #DFDFDF;
    margin-bottom: 60px;
  }
  .accountCss1, .accountCss2 {
    font-weight: 400;
    font-size: 20px;
    color: #DFDFDF;

    background: rgba(81, 82, 91, 0.5);
    border-radius: 12px;

    border: none;
    width: 45%;

    height: 53px;
    min-height: 53px;
    padding-left: 25px;
    margin: 0 auto;
  }
  .accountCss1:focus, .accountCss2:focus {
    outline: none;
  }
  .accountCss1::placeholder, .accountCss2::placeholder {
    font-weight: 400;
    font-size: 20px;
    color: #DFDFDF;
  }
  .accountCss2 {
    margin-top: 60px;
    margin-bottom: 96px;
  }
  .btn-div {
    width: 45%;
    margin: 0 auto;
    text-align: center;
    .register-btn {
      font-weight: 400;
      font-size: 20px;
      color: #FFF;

      background: linear-gradient(90deg, #7161EF 0%, #452FF4 100%);
      border-radius: 12px;
      height: 64px;
      cursor: pointer;

      display: flex;
      justify-content: center;
      align-items: center;
      width: 72%;
      margin: 0 auto;
    }
    .version-css {
      font-weight: 400;
      font-size: 12px;
      color: #FFF;
      margin-top: 28px;
    }
  }
}
</style>