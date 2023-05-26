<template>
  <div id="convertId" >
    <transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <slot name="body">
                <div class="parent-block">
                  <div>
                    <p class="redemption-no">兌換編號 651615615</p>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">狀態</p>
                    <!-- 處理中 -->
                    <p class="free-shipping-coupon">{{sendData.state}}</p>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">建立時間</p>
                    <!-- 2024-01-26 18:59 -->
                    <p class="free-shipping-coupon">{{sendData.exchangeCreation}}</p>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">商品數量</p>
                    <p class="free-shipping-coupon">{{sendData.noofProduct}}</p>
                  </div>
                  <div class="each-row1">
                    <p class="coupon-type">兌換內容</p>
                    <div>
                      <p class="free-shipping-coupon1">商品名稱</p>
                      <p class="free-shipping-coupon1">x5</p>
                      <p class="free-shipping-coupon1">商品名稱 </p>
                      <p class="free-shipping-coupon">x2 </p>
                    </div>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">運費</p>
                    <p class="free-shipping-coupon">60</p>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">小計</p>
                    <p class="free-shipping-coupon">{{sendData.exchangeTotal}}</p>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">使用優惠券</p>
                    <p class="free-shipping-coupon">免運券</p>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">合計</p>
                    <p class="free-shipping-coupon">{{sendData.exchangeTotal}}</p>
                  </div>
                </div>
                <div class="bottom-div">
                  <div class="m-bottom" @click="closePopup">
                    <span>確認</span>
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: ["show", "sendData"],
  data() {
    return {
      effectiveTime: '',
      expiredTime: '',
      minimumConsumption: 0,
      isCheck: [false, false]
    }
  },
  created() {
    alert(JSON.stringify(this.sendData))
  },
  methods: {
    closePopup() {
      this.$emit('settingData', 'hi')
      this.$emit('close');
    }
  }
}
</script>
<style lang="scss">
#convertId {
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    display: table;
    transition: opacity 0.3s ease;
  }
  
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .modal-container {
    width: 500px;
    height: 666px;
    margin: 0px auto;
    padding: 2rem 3.5rem 24px;
    box-shadow: 0px 4px 4px rgba(33, 66, 116, 0.25);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;

    background: #191A21;
    border-radius: 12px;
    position: relative;
    @media screen and (max-width: 768px) {
      width: 100%;
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;
    }
  }
  
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  
  .modal-body {
    padding: 0;
    height: 100%;
  }
  
  .modal-default-button {
    float: right;
  }
  
  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */
  
  .modal-enter {
    opacity: 0;
  }
  
  .modal-leave-active {
    opacity: 0;
  }
  
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

</style>
<style lang="scss" scoped>
.parent-block {
  .redemption-no {
    font-weight: 700;
    font-size: 16px;
    color: #FFF;
    text-align: center;
  }
  .each-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .each-row1 {
    display: flex;
    margin-bottom: 1rem;
  }
}
.coupon-type, .free-shipping-coupon, .free-shipping-coupon1 {
  font-weight: 400;
  font-size: 20px;
  color: #808080;
  margin-bottom: 0;
  width: 30%;
}
.free-shipping-coupon {
  color: #FFF;
  padding-left: 5px;
  width: 70%;
}
.free-shipping-coupon1 {
  color: #FFF;
  padding-left: 5px;
  width: 100%;
  margin-bottom: 1rem;
}
.bottom-div {
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 0;
  z-index: 999;
  width: 100%;
  .m-bottom {
    background: linear-gradient(90deg, #7161EF 0%, #3C27DC 100%);
    border-radius: 12px;
    width: 180px;
    height: 40px;
    font-weight: 400;
    font-size: 20px;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>