<template>
  <div id="orderManagerId" >
    <transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container" :style="((sendData.state === '結束') || (sendData.state === '已拒絕')) ? 'width: 627px' : ''">
            <div class="modal-body">
              <slot name="body">
                <div class="parent-block">
                  <div>
                    <p class="redemption-no">兌換編號 {{sendData.redemptionNo}}</p>
                  </div>
                  <div class="eachrow">
                    <div class="leftcol">
                      <div class="each-row">
                        <p class="coupon-type">狀態</p>
                        <p v-if="(sendData.state === '待處理')" class="free-shipping1-coupon">{{sendData.state}}</p>
                        <p v-else-if="sendData.state === '已出貨'" class="free-shipping5-coupon">{{sendData.state}}</p>
                        <p v-else-if="sendData.state === '已取消'" class="free-shipping4-coupon">{{sendData.state}}</p>
                      </div>
                      <div class="each-row">
                        <p class="coupon-type">會員帳號</p>
                        <p class="free-shipping2-coupon">{{sendData.memberAccount}}</p>
                      </div>
                      <div class="each-row">
                        <p class="coupon-type">建立時間</p>
                        <p class="free-shipping2-coupon">{{sendData.orderCreateDate}}</p>
                      </div>
                      <div class="each-row">
                        <p class="coupon-type">商品數量</p>
                        <p class="free-shipping2-coupon">5</p>
                      </div>
                      <div class="each1-row">
                        <p class="coupon-type">兌換內容</p>
                        <div class="free-shipping-coupon">
                          <p class="free-shipping-coupon">商品名稱</p>
                          <p class="free-shipping-coupon">x5</p>
                          <p class="free-shipping-coupon">商品名稱 </p>
                          <p class="free-shipping2-coupon">x2 </p>
                        </div>
                      </div>
                      <div class="each-row">
                        <p class="coupon-type">運費</p>
                        <p class="free-shipping2-coupon">60</p>
                      </div>
                      <div class="each-row">
                        <p class="coupon-type">小計</p>
                        <p class="free-shipping2-coupon">1,060</p>
                      </div>
                      <div class="each-row">
                        <p class="coupon-type">使用優惠券</p>
                        <p class="free-shipping2-coupon">免運券</p>
                      </div>
                      <div class="each-row">
                        <p class="coupon-type">合計</p>
                        <p class="free-shipping2-coupon">1,000</p>
                      </div>
                    </div>
                    <div class="rightcol">
                      <div>
                        <div class="each-row">
                          <p class="rightcoupon">收件人</p>
                          <p class="free-shipping2-coupon">王某</p>
                        </div>
                        <div class="each-row">
                          <p class="rightcoupon">聯繫方式</p>
                          <p class="free-shipping2-coupon">0966788887</p>
                        </div>
                        <div class="each-row">
                          <p class="rightcoupon">收件地址</p>
                          <p class="free-shipping2-coupon">台北市信義區信義路一段9號</p>
                        </div>
                        <div class="each5-row">
                          <p class="rightcoupon">物流單號</p>
                          <el-input v-if="sendData.state === '待處理'" v-model="shipmentNo" type="text" placeholder="" class="shipnocss"></el-input>
                          <p v-else-if="sendData.state === '已出貨'" class="shipnop">2020220</p>
                          <p v-else-if="sendData.state === '已取消'" class="shipnop">2020220</p>
                        </div>
                      </div>
                      <div v-if="sendData.state === '已取消'">
                        <div class="each-row">
                          <p class="rightcoupon pink-css">收件人</p>
                          <p class="free-shipping2-coupon">2024-02-02 14:59:26</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="(sendData.state === '待處理')" class="each-row2">
                    <p class="viaRefund">已取消</p>

                    <p v-if="btnactive === true" class="viaRefund3" @click="showFunc">已出貨</p>
                    <p v-else class="viaRefund2">已出貨</p>

                    <p class="viaRefund1" @click="closePopup">關閉</p>
                  </div>
                  <div v-else-if="(sendData.state === '已出貨')" class="each-row2">
                    <p class="viaRefund4">無人取貨</p>
                    <p class="viaRefund5" @click="closePopup">關閉</p>
                  </div>
                  <div v-else class="each-row3">
                    <p class="viaRefund1" @click="closePopup">關閉</p>
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
      isCheck: [false, false],
      textarea1: '',
      textarea2: '',
      textarea3: '',
      textarea4: '',
      conditionChoice: false,
      tograndChild: {},
      shipmentNo: '',
      btnactive: false
    }
  },
  watch: {
    shipmentNo() {
      if(this.shipmentNo !== '') {
        this.btnactive = true
      }
    }
  },
  created() {
    // alert(JSON.stringify(this.sendData))
    if(this.tograndChild) {
      this.tograndChild = this.sendData
    }
  },
  methods: {
    closePopup() {
      document.body.classList.remove('tofix');
      this.$emit('close');
    },
    showFunc() {
      // this.$emit('close', 'newRefundPopup');
    }
  }
}
</script>
<style lang="scss">
#orderManagerId {
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
    width: 820px;
    height: 709px;
    margin: 0px auto;
    padding: 1rem 1rem 35px 3rem;
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
  .el-input__inner {
    width: 152px;
    height: 32px;
    background: #34344C;
    border-radius: 6px;
    border: 1px solid #34344C;
    color: #FFF;
    font-weight: 400;
    font-size: 20px;
  }
}

</style>
<style lang="scss" scoped>
.parent-block {
  .redemption-no {
    font-weight: 700;
    font-size: 16px;
    color: #E9E9E9;
    text-align: center;
    margin-bottom: 30px;
  }
  .eachrow {
    display: flex;
    justify-content: space-between;
    .leftcol {
      width: 45%;
    }
    .rightcol {
      width: 52%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .each5-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    margin-top: 74px;
  }
  .each-row, .each-row2, .each-row3 {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .each-row2, .each-row3 {
    justify-content: center;
    margin-top: 78px;
    margin-bottom: 0;
  }
  .each-row1 {
    margin-bottom: 10px;
  }
  .each1-row {
    display: flex;
    margin-bottom: 3px;
  }
  .viaRefund, .viaRefund1, .viaRefund2, .viaRefund3, .viaRefund4, .viaRefund5 {
    color: #FFF;
    background: linear-gradient(90deg, #EF61AE 0%, #DC2727 100%);

    font-weight: 700;
    font-size: 20px;
    border-radius: 12px;
    width: 154px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    cursor: pointer;
    margin-left: 16px;
    margin-right: 16px;
  }
  .viaRefund1 {
    background: linear-gradient(90deg, #7161EF 0%, #3C27DC 100%);
  }
  .viaRefund2 {
    color: #6A6A6A;
    background: linear-gradient(90deg, #DBDBDB 0%, #696969 100%);
  }
  .viaRefund3 {
    background: linear-gradient(90deg, #61EFCD 0%, #77DC27 100%);
  }
  .viaRefund4 {
    font-weight: 400;
  }
  .viaRefund5 {
    font-weight: 400;
    background: linear-gradient(90deg, #7161EF 0%, #3C27DC 100%);
  }
}
.coupon-type, .rightcoupon, .coupon1-type, .free-shipping-coupon, .free-shipping1-coupon, .free-shipping2-coupon, .free-shipping4-coupon, .free-shipping5-coupon {
  font-weight: 400;
  font-size: 20px;
  color: #808080;
  margin-bottom: 0;
  width: 40%;
}
.rightcoupon {
  width: 30%;
}
.shipnocss {
  width: 58%;
}
.shipnop {
  font-size: 20px;
  color: #FFF;
  margin-bottom: 0;
}
.coupon1-type {
  margin-bottom: 5px;
}
.free-shipping-coupon {
  color: #E9E9E9;
  width: 68%;
  margin-bottom: 10px;
}
.free-shipping1-coupon {
  color: #FFA451;
  width: 68%;
}
.free-shipping2-coupon {
  color: #E9E9E9;
  width: 68%;
}
.free-shipping4-coupon {
  color: #F35A90;
  width: 68%;
}
.pink-css {
  color: #F35A90 !important;
}
.free-shipping5-coupon {
  color: #35E818;
  width: 68%;
}
.row-div1 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
} 
</style>