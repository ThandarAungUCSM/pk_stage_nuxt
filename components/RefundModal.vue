<template>
  <div id="refundId" >
    <transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container" :style="((sendData.state === '結束') || (sendData.state === '已拒絕')) ? 'width: 627px' : ''">
            <div class="modal-body">
              <slot name="body">
                <div class="parent-block">
                  <div>
                    <p class="redemption-no">審核管理</p>
                  </div>
                  <div :class="(sendData.state === '結束') || (sendData.state === '已拒絕') ? 'each1-row' : 'each-row'">
                    <p class="coupon-type">狀態</p>
                    <p v-if="(sendData.state === '等待審核')" class="free-shipping1-coupon">{{sendData.state}}</p>
                    <p v-else-if="sendData.state === '等待取件'" class="free-shipping5-coupon">{{sendData.state}}</p>
                    <p v-else-if="sendData.state === '結束'" class="free-shipping2-coupon">{{sendData.state}}</p>
                    <p v-else class="free-shipping4-coupon">{{sendData.state}}</p>
                  </div>
                  <div :class="(sendData.state === '結束') || (sendData.state === '已拒絕') ? 'each1-row' : 'each-row'">
                    <p class="coupon-type">兌換編號</p>
                    <p class="free-shipping2-coupon">bdfsbsbdbndgn</p>
                  </div>
                  <div :class="(sendData.state === '結束') || (sendData.state === '已拒絕') ? 'each1-row' : 'each-row'">
                    <p class="coupon-type">申請時間</p>
                    <p class="free-shipping2-coupon">2024-01-26 18:59:59</p>
                  </div>
                  <div :class="(sendData.state === '結束') || (sendData.state === '已拒絕') ? 'each1-row' : 'each-row'">
                    <p class="coupon-type">會員帳號</p>
                    <p class="free-shipping2-coupon">uukk8877</p>
                  </div>
                  <div :class="(sendData.state === '結束') || (sendData.state === '已拒絕') ? 'each1-row' : 'each-row'">
                    <p class="coupon-type">配送業者</p>
                    <p class="free-shipping2-coupon">黑貓宅急便</p>
                  </div>
                  <div :class="(sendData.state === '結束') || (sendData.state === '已拒絕') ? 'each1-row' : 'each-row'">
                    <p class="coupon-type">運送單號</p>
                    <p class="free-shipping3-coupon">126565232141</p>
                  </div>
                  <div :class="(sendData.state === '結束') || (sendData.state === '已拒絕') ? 'each1-row' : 'each-row'">
                    <p class="coupon-type">是否收到貨</p>
                    <p class="free-shipping1-coupon">{{sendData.receiveGoods}}</p>
                  </div>
                  <div :class="(sendData.state === '結束') || (sendData.state === '已拒絕') ? 'each1-row' : 'each-row'">
                    <p class="coupon-type">退貨數量</p>
                    <p class="free-shipping2-coupon">3</p>
                  </div>
                  <div :class="(sendData.state === '結束') || (sendData.state === '已拒絕') ? 'each1-row' : 'each-row'">
                    <p class="coupon-type">退款合計</p>
                    <p class="free-shipping2-coupon">500,000</p>
                  </div>
                  <div :class="(sendData.state === '結束') || (sendData.state === '已拒絕') ? 'each1-row' : 'each-row'">
                    <p class="coupon-type">退貨/退款方案</p>
                    <p v-if="!conditionChoice" class="free-shipping2-coupon">退貨後退款</p>
                    <p v-else class="free-shipping2-coupon">審核後退款</p>
                  </div>
                  <div class="each-row1">
                    <p class="coupon1-type">退貨原因</p>
                    <el-input
                      v-if="sendData.state === '等待審核' && !conditionChoice"
                      v-model="textarea5"
                      type="textarea"
                      :rows="2"
                      placeholder="收到貨物保存期限過期"
                      >
                    </el-input>
                    <el-input 
                      v-else-if="sendData.state === '等待審核'"
                      v-model="textarea1"
                      type="textarea"
                      :rows="2"
                      placeholder="一直沒有收到貨"
                      >
                    </el-input>
                    <el-input
                      v-else-if="sendData.state === '等待取件'"
                      v-model="textarea4"
                      type="textarea"
                      :rows="2"
                      placeholder="收到貨物保存期限過期"
                      >
                    </el-input>
                    <el-input
                      v-else-if="sendData.state === '結束'"
                      v-model="textarea2"
                      type="textarea"
                      :rows="2"
                      placeholder="貨物有破損"
                      >
                    </el-input>
                    <el-input
                      v-else-if="sendData.state === '已拒絕'"
                      v-model="textarea3"
                      type="textarea"
                      :rows="2"
                      placeholder="貨物有破損"
                      >
                    </el-input>
                  </div>
                  <div v-if="(sendData.state === '結束') || (sendData.state === '已拒絕')">
                    <div class="each1-row">
                      <p class="coupon-type">取件方式</p>
                      <p class="free-shipping2-coupon">黑貓宅急便</p>
                    </div>
                    <div class="each1-row">
                      <p class="coupon-type">取件人</p>
                      <p class="free-shipping2-coupon">王大明</p>
                    </div>
                    <div class="each1-row">
                      <p class="coupon-type">取件人電話</p>
                      <p class="free-shipping2-coupon">0912345678</p>
                    </div>
                    <div class="each1-row">
                      <p class="coupon-type">取件時間</p>
                      <p class="free-shipping2-coupon">2024/05/16 15:31</p>
                    </div>
                    <div class="each1-row">
                      <p class="coupon-type">取件地址</p>
                      <p class="free-shipping2-coupon">新北市三重區光復南路156巷24號</p>
                    </div>
                  </div>
                  <div class="each-row1">
                    <p class="coupon1-type">退貨品項</p>
                    <div>
                      <div class="row-div1">
                        <p class="free-shipping1-coupon">商品名稱</p>
                        <p class="free-shipping-coupon">x2</p>
                      </div>
                      <div class="row-div1">
                        <p class="free-shipping1-coupon">商品名稱</p>
                        <p class="free-shipping-coupon">x1</p>
                      </div>
                    </div>
                  </div>
                  <!-- <div v-if="(sendData.state === '等待審核') || (sendData.state === '等待取件')" class="each-row1">
                    <p v-if="(sendData.state === '等待審核') && !conditionChoice" class="viaRefund">進入取貨程序</p>
                    <p v-else-if="sendData.state === '等待審核'" class="viaRefund">通過退款</p>
                    <p v-else-if="sendData.state === '等待取件'" class="viaRefund">取件完成，通過退款</p>
                  </div> -->
                  <div v-if="(sendData.state === '等待審核') || (sendData.state === '等待取件')" class="each-row2">
                    <p v-if="(sendData.state === '等待審核') && !conditionChoice" class="viaRefund">進入取貨程序</p>
                    <p v-else-if="sendData.state === '等待審核'" class="viaRefund">通過退款</p>
                    <p v-else-if="sendData.state === '等待取件'" class="viaRefund">取件完成，通過退款</p>

                    <p class="viaRefund" @click="showFunc">拒絕</p>
                    <p class="viaRefund1" @click="closePopup">關閉</p>
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
      tograndChild: {}
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
      this.$emit('close', 'newRefundPopup');
    }
  }
}
</script>
<style lang="scss">
#refundId {
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
    width: 741px;
    height: 730px;
    margin: 0px auto;
    padding: 1rem 3.5rem 1rem;
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
  .redemption-no {
    font-weight: 700;
    font-size: 16px;
    color: #E9E9E9;
    text-align: center;
    margin-bottom: 8px;
  }
  .each-row, .each-row2, .each-row3 {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  .each-row2 {
    justify-content: space-between;
    margin-top: 78px;
  }
  .each-row3 {
    justify-content: center;
    margin-bottom: 0;
  }
  .each-row1 {
    margin-bottom: 8px;
  }
  .each1-row {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }
  .viaRefund, .viaRefund1 {
    font-weight: 400;
    font-size: 16px;
    color: #FFF;
    border: 1px solid #FF8A65;
    border-radius: 12px;
    width: 200px;
    width: 170px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    cursor: pointer;
  }
  .viaRefund1 {
    border: 1px solid #06A2FF;
  }
}
.coupon-type, .coupon1-type, .free-shipping-coupon, .free-shipping1-coupon, .free-shipping2-coupon, .free-shipping3-coupon, .free-shipping4-coupon, .free-shipping5-coupon {
  font-weight: 400;
  font-size: 16px;
  color: #808080;
  margin-bottom: 0;
  width: 30%;
}
.coupon1-type {
  margin-bottom: 5px;
}
.free-shipping-coupon {
  color: #FF8A65;
  text-align: right;
}
.free-shipping1-coupon {
  color: #FF8A65;
}
.free-shipping2-coupon {
  color: #E9E9E9;
  width: 68%;
}
.free-shipping3-coupon {
  color: #06A2FF;
}
.free-shipping4-coupon {
  color: #F35A90;
}
.free-shipping5-coupon {
  color: #FFF965;
}
.row-div1 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
} 
</style>