<template>
  <div :class="opensidebar ? 'when1-component' : 'when-component'">
    <div v-if="opensidebar" class="sidebar-open" >
      <div class="img-row">
        <img src="../assets/pc/sidebar-close.png" class="clse-img" @click="sidebarFunc">
        <el-button class="pc-css" type="text" @click="open">
          <img src="../assets/pc/sidebar-logout.png" class="logout-img">
        </el-button>
        <el-button class="mobile-css" type="text" @click="mobileopen">
          <img src="../assets/pc/sidebar-logout.png" class="logout-img">
        </el-button>
      </div>
      <div v-if="activedata === 'admin'">
        <div class="for-pc">
          <div class="pk-admin">
            <p class="pk-title">PK 管理後台 Admin</p>
          </div>
          <div class="each-pk">
            <p class="each-title">平台管理</p>
            <div class="each-row" @click="gotoPage('currencyManager')">
              <img src="../assets/pc/close-dollar.png" class="sideopen-img">
              <span class="dollar-text">幣值比率管理</span>
            </div>
            <div class="each-row" @click="gotoPage('bannerAdvertise')">
              <img src="../assets/pc/close-manager.png" class="sideopen-img">
              <span class="dollar-text">橫幅廣告設定</span>
            </div>
            <div class="each-row" @click="gotoPage('categoryProduct')">
              <img src="../assets/pc/close-cart.png" class="sideopen-img">
              <span class="dollar-text">上架商品管理</span>
            </div>
            <div class="each-row" @click="gotoPage('couponManager')">
              <img src="../assets/pc/close-coupon.png" class="sideopen-img">
              <span class="dollar-text">優惠券設定</span>
            </div>
          </div>
          <div class="each-pk">
            <p class="each-title">會員管理</p>
            <div class="each-row" @click="gotoPage('membershipManager')">
              <img src="../assets/pc/close-info.png" class="sideopen-img">
              <span class="dollar-text">會員資料與連動遊戲</span>
            </div>
            <div class="each-row" @click="gotoPage('convertHistory')">
              <img src="../assets/pc/close-receipt.png" class="sideopen-img">
              <span class="dollar-text">會員兌換記錄查詢</span>
            </div>
            <div class="each-row" @click="gotoPage('refundHistory')">
              <img src="../assets/pc/close-vector.png" class="sideopen-img">
              <span class="dollar-text">會員退貨審核管理</span>
            </div>
            <div class="each-row" @click="gotoPage('accounting')">
              <img src="../assets/pc/close-document.png" class="sideopen-img">
              <span class="dollar-text">對帳資料</span>
            </div>
          </div>
        </div>
        <div class="for-mobile">
          <div class="pk-admin">
            <p class="pk-title">PK 管理後台 Admin</p>
          </div>
          <div class="each-pk">
            <p class="each-title">平台管理</p>
            <div class="each-row" @click="gotomPage('currencyManager')">
              <img src="../assets/pc/close-dollar.png" class="sideopen-img">
              <span class="dollar-text">幣值比率管理</span>
            </div>
            <div class="each-row" @click="gotomPage('bannerAdvertise')">
              <img src="../assets/pc/close-manager.png" class="sideopen-img">
              <span class="dollar-text">橫幅廣告設定</span>
            </div>
            <div class="each-row" @click="gotomPage('categoryProduct')">
              <img src="../assets/pc/close-cart.png" class="sideopen-img">
              <span class="dollar-text">上架商品管理</span>
            </div>
            <div class="each-row" @click="gotomPage('couponManager')">
              <img src="../assets/pc/close-coupon.png" class="sideopen-img">
              <span class="dollar-text">優惠券設定</span>
            </div>
          </div>
          <div class="each-pk">
            <p class="each-title">會員管理</p>
            <div class="each-row" @click="gotomPage('membershipManager')">
              <img src="../assets/pc/close-info.png" class="sideopen-img">
              <span class="dollar-text">會員資料與連動遊戲</span>
            </div>
            <div class="each-row" @click="gotomPage('convertHistory')">
              <img src="../assets/pc/close-receipt.png" class="sideopen-img">
              <span class="dollar-text">會員兌換記錄查詢</span>
            </div>
            <div class="each-row" @click="gotomPage('refundHistory')">
              <img src="../assets/pc/close-vector.png" class="sideopen-img">
              <span class="dollar-text">會員退貨審核管理</span>
            </div>
            <div class="each-row" @click="gotomPage('accounting')">
              <img src="../assets/pc/close-document.png" class="sideopen-img">
              <span class="dollar-text">對帳資料</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="activedata === 'storeOwner'">
        <div class="for-pc">
          <div class="pk-admin">
            <p class="pk-title">PK 管理後台 Store Owner</p>
          </div>
          <div class="each-pk">
            <p class="each-title">商品管理</p>
            <div class="each-row" @click="gotoPage('categoryProduct')">
              <img src="../assets/pc/close-cart.png" class="sideopen-img">
              <span class="dollar-text">上架商品管理</span>
            </div>
          </div>
          <div class="each-pk">
            <p class="each-title">兌換管理</p>
            <div class="each-row" @click="gotoPage('orderManager')">
              <img src="../assets/pc/delisystem.png" class="deli-img">
              <span class="dollar-text">訂單&出貨管理</span>
            </div>
            <div class="each-row" @click="gotoPage('refundHistory')">
              <img src="../assets/pc/close-vector.png" class="sideopen-img">
              <span class="dollar-text">會員退貨申請</span>
            </div>
          </div>
        </div>
        <div class="for-mobile">
          <div class="pk-admin">
            <p class="pk-title">PK 管理後台 Store Owner</p>
          </div>
          <div class="each-pk">
            <p class="each-title">商品管理</p>
            <div class="each-row" @click="gotomPage('categoryProduct')">
              <img src="../assets/pc/close-cart.png" class="sideopen-img">
              <span class="dollar-text">上架商品管理</span>
            </div>
          </div>
          <div class="each-pk">
            <p class="each-title">兌換管理</p>
            <div class="each-row" @click="gotomPage('orderManager')">
              <img src="../assets/pc/delisystem.png" class="deli-img">
              <span class="dollar-text">訂單&出貨管理</span>
            </div>
            <div class="each-row" @click="gotomPage('refundHistory')">
              <img src="../assets/pc/close-vector.png" class="sideopen-img">
              <span class="dollar-text">會員退貨申請</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="sidebar-close" >
      <img src="../assets/pc/sidebar-menu.png" class="menu-img" @click="sidebarFunc">
      <div v-if="activedata === 'admin'">
        <div class="img-column">
          <div v-if="isActive !== '' && isActive === 'currencyManager'" class="activeMenu">
            <img src="../assets/pc/close-dollar.png" class="sideOpacity-img">
            <div class="border-css"></div>
          </div>
          <div v-else class="noactive">
            <img src="../assets/pc/close-dollar.png" class="sideclose-img" @click="gotoPage('currencyManager')">
          </div>

          <div v-if="isActive !== '' && isActive === 'bannerAdvertise'" class="activeMenu">
            <img src="../assets/pc/close-manager.png" class="sideOpacity-img">
            <div class="border-css"></div>
          </div>
          <div v-else class="noactive">
            <img src="../assets/pc/close-manager.png" class="sideclose-img" @click="gotoPage('bannerAdvertise')">
          </div>

          <div v-if="isActive !== '' && isActive === 'categoryProduct'" class="activeMenu">
            <img src="../assets/pc/close-cart.png" class="sideOpacity-img">
            <div class="border-css"></div>
          </div>
          <div v-else class="noactive">
            <img src="../assets/pc/close-cart.png" class="sideclose-img" @click="gotoPage('categoryProduct')">
          </div>

          <div v-if="isActive !== '' && isActive === 'couponManager'" class="activeMenu">
            <img src="../assets/pc/close-coupon.png" class="sideOpacity-img">
            <div class="border-css"></div>
          </div>
          <div v-else class="noactive">
            <img src="../assets/pc/close-coupon.png" class="sideclose-img" @click="gotoPage('couponManager')">
          </div>

          <div v-if="isActive !== '' && isActive === 'membershipManager'" class="activeMenu">
            <img src="../assets/pc/close-info.png" class="sideOpacity-img">
            <div class="border-css"></div>
          </div>
          <div v-else class="noactive">
            <img src="../assets/pc/close-info.png" class="sideclose-img" @click="gotoPage('membershipManager')">
          </div>

          <div v-if="isActive !== '' && isActive === 'convertHistory'" class="activeMenu">
            <img src="../assets/pc/close-receipt.png" class="sideOpacity-img">
            <div class="border-css"></div>
          </div>
          <div v-else class="noactive">
            <img src="../assets/pc/close-receipt.png" class="sideclose-img" @click="gotoPage('convertHistory')">
          </div>

          <div v-if="isActive !== '' && isActive === 'refundHistory'" class="activeMenu">
            <img src="../assets/pc/close-vector.png" class="sideOpacity-img">
            <div class="border-css"></div>
          </div>
          <div v-else class="noactive">
            <img src="../assets/pc/close-vector.png" class="sideclose-img" @click="gotoPage('refundHistory')">
          </div>

          <div v-if="isActive !== '' && isActive === 'accounting'" class="activeMenu">
            <img src="../assets/pc/close-document.png" class="sideOpacity-img">
            <div class="border-css"></div>
          </div>
          <div v-else class="noactive">
            <img src="../assets/pc/close-document.png" class="sideclose-img" @click="gotoPage('accounting')">
          </div>
        </div>
      </div>
      <div v-else-if="activedata === 'storeOwner'">
        <div class="img-column">
          <div v-if="isActive !== '' && isActive === 'categoryProduct'" class="activeMenu">
            <img src="../assets/pc/close-cart.png" class="sideOpacity-img">
            <div class="border-css"></div>
          </div>
          <div v-else class="noactive">
            <img src="../assets/pc/close-cart.png" class="sideclose-img" @click="gotoPage('categoryProduct')">
          </div>

          <div v-if="isActive !== '' && isActive === 'orderManager'" class="activeMenu">
            <img src="../assets/pc/delisystem.png" class="sideOpacity-img">
            <div class="border-css"></div>
          </div>
          <div v-else class="noactive">
            <img src="../assets/pc/delisystem.png" class="sideclose-deli" @click="gotoPage('orderManager')">
          </div>

          <div v-if="isActive !== '' && isActive === 'refundHistory'" class="activeMenu">
            <img src="../assets/pc/close-vector.png" class="sideOpacity-img">
            <div class="border-css"></div>
          </div>
          <div v-else class="noactive">
            <img src="../assets/pc/close-vector.png" class="sideclose-img" @click="gotoPage('refundHistory')">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexPage',
  props: ['opensidebar', 'activedata'],
  data() {
    return {
      sidebarcondition: false,
      isActive: ''
    }
  },
  methods: {
    sidebarFunc() {
      // this.sidebarcondition = !this.sidebarcondition;
      this.sidebarcondition = !this.opensidebar;
      // alert('hi ' + this.opensidebar)
      this.$emit("sidebarFunc", this.sidebarcondition)
    },
    gotoPage(val) {
      this.isActive = val
      this.$emit('activeTab', val)
      // this.$router.push(val)
    }, 
    gotomPage(val) {
      this.isActive = val
      this.$emit('activemTab', val)
    }, 
    open() {
      this.$confirm('確定要登出嗎？', 'Warning', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'Logout completed'
        });
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Logout canceled'
        });
      });
    },
    mobileopen() {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.when-component, .when1-component {
  background: #191A21;
  height: 100vh;
  z-index: 10;

  min-height: 100vh;
  max-height: 100vh;
  position: fixed;
}
.when-component {
  @media screen and (max-width: 768px) {
    background: transparent;
    z-index: 11;
  }
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
    @media screen and (max-width: 768px) {
      margin-top: 5px;
      margin-bottom: 71px;
    }
    .clse-img {
      width: 24px;
      height: 24px;
      cursor: pointer;
      @media screen and (max-width: 768px) {
        visibility: hidden;
      }
    }
    .pc-css {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    .mobile-css {
      display: none;
      @media screen and (max-width: 768px) {
        display: block;
      }
    }
    .logout-img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
  .for-pc {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .for-mobile {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
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
      @media screen and (max-width: 768px) {
        margin-bottom: 10px;
      }
    }
    .each-row {
      display: flex;
      align-items: center;
      margin-bottom: 1.3rem;
      cursor: pointer;
      @media screen and (max-width: 768px) {
        margin-bottom: 1rem;
      }
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
      .deli-img {
        width: 30px;
        height: 24px;
        margin-right: 10px;
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
    @media screen and (max-width: 768px) {
      display: none;
    }
    .activeMenu, .noactive {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 36px;
      margin-bottom: 2rem;
    }
    .activeMenu {
      position: relative;
      background: rgba(47, 49, 62, 0.5);
    }
    .border-css {
      background: #00A0FF;
      border-radius: 23px;
      width: 7px;
      height: 36px;
      position: absolute;
      right: 0;
    }
    .sideclose-img, .sideOpacity-img {
      width: 24px;
      height: 24px;
    }
    .sideclose-deli {
      width: 30px;
      height: 24px;
    }
    .sideOpacity-img {
      opacity: 0.5;
    }
  }
}
</style>