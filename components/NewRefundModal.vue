<template>
  <div id="refundNewId" >
    <transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <slot name="body">
                <div class="parent-block">
                  <div>
                    <p class="redemption-no">拒絕退款原因</p>
                  </div>
                  <div class="each1-row">
                    <p class="coupon-type">兌換編號</p>
                    <p class="free-shipping2-coupon">bdfsbsbdbndgn</p>
                  </div>
                  <div class="each2-row">
                    <p class="refund-box">買家未完成退貨</p>
                    <p class="refund-box">商品經核實已送達指定地址</p>
                    <p class="refund-box">商品仍在配送中</p>
                    <p class="refund-box">退貨原因不符規則</p>
                    <p class="refund-box">退貨取件資訊有誤</p>
                  </div>
                  <div class="each-row2">
                    <p class="viaRefund" @click="showFunc">拒絕退款</p>
                    <p class="viaRefund1" @click="closePopup">取消</p>
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
    // alert(JSON.stringify(this.sendData))
  },
  methods: {
    closePopup() {
      this.$emit('settingData', 'hi')
      this.$emit('close');
    },
    showFunc() {
      // this.$emit('close');
    }
  }
}
</script>
<style lang="scss">
#refundNewId {
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    max-height: 100vh;
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
    height: 650px;
    margin: 0px auto;
    padding: 1rem 3.5rem 45px;
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
  .el-textarea__inner {
    background: #111217;
    border-radius: 12px;
    border: 1px solid #111217;
    height: 129px;
    height: 90px;
    font-weight: 400;
    font-size: 16px;
    color: #E9E9E0;
  }
}

</style>
<style lang="scss" scoped>
.parent-block {
  position: relative;
  height: 100%;
  .redemption-no {
    font-weight: 700;
    font-size: 16px;
    color: #E9E9E9;
    text-align: center;
    margin-bottom: 48px;
    @media screen and (max-width: 768px) {
      padding-top: 30px;
    }
  }
  .each-row2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0px;
    bottom: 0;
    position: absolute;
    width: 100%;
    @media screen and (max-width: 768px) {
      justify-content: space-evenly;
    }
  }
  .each1-row {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: auto auto 48px;
    @media screen and (max-width: 768px) {
      width: 70%;
    }
  }
  .each2-row {
    width: 90%;
    margin: auto auto 48px;
  }
  .refund-box {
    font-weight: 400;
    font-size: 20px;
    color: #FFF;
    border: 1px solid #FF8A65;
    border-radius: 12px;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
  }
  .viaRefund, .viaRefund1 {
    font-weight: 400;
    font-size: 20px;
    color: #FFF;
    border-radius: 12px;
    width: 200px;
    width: 170px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    cursor: pointer;
    background: linear-gradient(90deg, #E461EF 0%, #DC2727 100%);
    @media screen and (max-width: 768px) {
      width: 148px;
    }
  }
  .viaRefund1 {
    background: linear-gradient(90deg, #7161EF 0%, #3C27DC 100%);
  }
}
.coupon-type, .free-shipping2-coupon {
  font-weight: 400;
  font-size: 16px;
  color: #808080;
  margin-bottom: 0;
  width: 30%;
  @media screen and (max-width: 768px) {
    width: 45%;
  }
}
.free-shipping2-coupon {
  color: #E9E9E9;
  width: 68%;
}
</style>