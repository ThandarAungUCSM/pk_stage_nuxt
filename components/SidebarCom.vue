<template>
  <div class="when-component">
    <div v-if="opensidebar" class="sidebar-open" >
      <div class="img-row">
        <img src="../assets/pc/sidebar-close.png" class="clse-img" @click="sidebarFunc">
        <img src="../assets/pc/sidebar-logout.png" class="logout-img">
      </div>
      <div>
        <div class="pk-admin">
          <p class="pk-title">PK 管理後台 Admin</p>
        </div>
        <div class="each-pk">
          <p class="each-title">平台管理</p>
          <div class="each-row">
            <img src="../assets/pc/close-dollar.png" class="sideopen-img">
            <span class="dollar-text">幣值比率管理</span>
          </div>
          <div class="each-row">
            <img src="../assets/pc/close-manager.png" class="sideopen-img">
            <span class="dollar-text">橫幅廣告設定</span>
          </div>
          <div class="each-row">
            <img src="../assets/pc/close-cart.png" class="sideopen-img">
            <span class="dollar-text">上架商品管理</span>
          </div>
          <div class="each-row">
            <img src="../assets/pc/close-coupon.png" class="sideopen-img">
            <span class="dollar-text">優惠券設定</span>
          </div>
        </div>
        <div class="each-pk">
          <p class="each-title">會員管理</p>
          <div class="each-row">
            <img src="../assets/pc/close-info.png" class="sideopen-img">
            <span class="dollar-text">會員資料與連動遊戲</span>
          </div>
          <div class="each-row">
            <img src="../assets/pc/close-receipt.png" class="sideopen-img">
            <span class="dollar-text">會員兌換記錄查詢</span>
          </div>
          <div class="each-row">
            <img src="../assets/pc/close-vector.png" class="sideopen-img">
            <span class="dollar-text">會員退貨審核管理</span>
          </div>
          <div class="each-row">
            <img src="../assets/pc/close-document.png" class="sideopen-img">
            <span class="dollar-text">對帳資料</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="sidebar-close" >
      <img src="../assets/pc/sidebar-menu.png" class="menu-img" @click="sidebarFunc">
      <div class="img-column">
        <img src="../assets/pc/close-dollar.png" class="sideclose-img" >
        <img src="../assets/pc/close-manager.png" class="sideclose-img" >
        <img src="../assets/pc/close-cart.png" class="sideclose-img" >
        <img src="../assets/pc/close-coupon.png" class="sideclose-img" >
        <img src="../assets/pc/close-info.png" class="sideclose-img" >
        <img src="../assets/pc/close-receipt.png" class="sideclose-img" >
        <img src="../assets/pc/close-vector.png" class="sideclose-img" >
        <img src="../assets/pc/close-document.png" class="sideclose-img" >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexPage',
  // props: ['opensidebar'],
  props: {
    opensidebar: Boolean
  },
  data() {
    return {
      sidebarcondition: true
    }
  },
  methods: {
    sidebarFunc() {
      this.sidebarcondition = !this.sidebarcondition;
      this.$emit("sidebarFunc", this.sidebarcondition)
    }
  }
}
</script>
<style lang="scss" scoped>
.when-component {
  background: #191A21;
  height: 100vh;
  z-index: 10;
}
.sidebar-open {
  width: 319px;
  border-radius: 0 24px 24px 0;
  padding: 0 1rem 0 44px;
  .img-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 36px;
    margin-bottom: 100px;
    padding: 0;
    .clse-img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
    .logout-img {
      width: 24px;
      height: 24px;
    }
  }
  .pk-admin {
    .pk-title {
      font-weight: 700;
      font-size: 1rem;
      color: #7161EF;
      margin-bottom: 0;
    }
  }
  .each-pk {
    margin-top: 2rem;
    .each-title {
      font-weight: 400;
      font-size: 16px;
      color: #FFF;
    }
    .each-row {
      display: flex;
      align-items: center;
      margin-bottom: 1.3rem;
      .sideopen-img {
        width: 24px;
        height: 24px;
        margin-right: 1rem;
      }
      .dollar-text {
        font-weight: 500;
        font-size: 20px;
        color: #06A2FF;
      }
    }
  }
}
.sidebar-close {
  width: 109px;
  text-align: center;
  padding-top: 36px;
  .menu-img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .img-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 120px;
    .sideclose-img {
      width: 24px;
      height: 24px;

      margin-bottom: 2rem;
    }
  }
}
</style>