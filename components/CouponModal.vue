<template>
  <div id="couponId" >
    <transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <slot name="body">
                <div class="title-row">
                  <img class="close-icon" src="../assets/pc/modal-close.png" @click="$emit('close')" />
                </div>
                <div class="parent-block">
                  <div class="each-left">
                    <p class="coupon-type">優惠券類型</p>
                    <p class="free-shipping-coupon">免運券</p>
                  </div>
                </div>
                <div class="inputpc-row">
                  <div class="coupon-block">
                    <p class="coupon-type">生效時間</p>
                    <!-- <input v-model="effectiveTime" type="text" class="coupon-code" onfocus="this.placeholder=''" placeholder="" /> -->
                    <el-date-picker
                      v-model="effectiveTime"
                      type="datetime"
                      placeholder="">
                    </el-date-picker>
                  </div>
                  <p class="sign-css">~</p>
                  <div class="coupon-block">
                    <p class="coupon-type">失效時間</p>
                    <!-- <input v-model="expiredTime" type="text" class="expired-time" onfocus="this.placeholder=''" placeholder="" /> -->
                    <el-date-picker
                      v-model="expiredTime"
                      type="datetime"
                      placeholder="">
                    </el-date-picker>
                  </div>
                </div>
                <div class="inputm-row">
                  <div class="coupon-block">
                    <p class="coupon-type">生效時間</p>
                    <el-date-picker
                      v-model="effectiveTime"
                      type="datetime"
                      placeholder="">
                    </el-date-picker>
                  </div>
                  <div class="coupon-block">
                    <p class="coupon-type">失效時間</p>
                    <el-date-picker
                      v-model="expiredTime"
                      type="datetime"
                      placeholder="">
                    </el-date-picker>
                  </div>
                </div>
                <div class="input1-row">
                  <div class="coupon-block">
                    <p class="coupon-type">最低消費</p>
                    <input v-model="minimumConsumption" type="text" class="mini-code" onfocus="this.placeholder=''" placeholder="0" />
                  </div>
                </div>
                <div class="parent-block">
                  <div class="each-left">
                    <p class="coupon-type">優惠內容</p>
                    <p class="free-shipping-coupon">免運費</p>
                  </div>
                </div>
                <div class="bottom-div">
                  <div class="m-bottom" @click="closePopup">
                    <span>儲存並新增</span>
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
  props: ["show"],
  data() {
    return {
      effectiveTime: '',
      expiredTime: '',
      minimumConsumption: 0,
      isCheck: [false, false],
    }
  },
  created() {
  },
  methods: {
    closePopup() {
      this.$emit('selectData', 'hi')
      this.$emit('close');
    }
  }
}
</script>
<style lang="scss">
.el-date-picker {
  width: 250px !important;
}
.el-date-picker .el-picker-panel__content {
  width: 227px !important;
}
.el-picker-panel__content {
  margin-top: 0;
}
.el-date-picker__header {
  margin: 5px 12px;
}
.el-date-table th, .el-date-table td, .el-date-table td div {
  height: 20px;
  line-height: 20px;
}
.el-date-table td span {
  width: 14px;
  height: 14px;
  line-height: 14px;
}
#couponId {
  .modal-mask {
    position: fixed;
    z-index: 100;
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
    width: 841px;
    width: 600px;
    height: 625px;
    margin: 0px auto;
    padding: 20px 30px;
    box-shadow: 0px 4px 4px rgba(33, 66, 116, 0.25);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;

    background: #191A21;
    border-radius: 12px;
    position: relative;
    @media screen and (max-width: 768px) {
      width: 100%;
      margin: auto;
    }
  }
  
  .modal-body {
    padding: 0;
    height: 100%;
    width: 80%;
    margin: auto;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
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
.title-row {
  display: flex;
  justify-content: flex-end;
  .close-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
.parent-block {
  @media screen and (max-width: 768px) {
    width: 60%;
    margin: auto;
  }
  .each-left {
    margin-bottom: 2rem;
  }
}
.inputpc-row, .inputm-row, .input1-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  .coupon-block {
    @media screen and (max-width: 768px) {
      margin-bottom: 1rem;
      width: 100%;
    }
    .coupon-code, .expired-time, .mini-code {
      font-weight: 400;
      font-size: 14px;
      color: #FFF;
      border: none;
      padding-left: 10px;
      padding-right: 10px;
      margin: auto;
  
      width: 196px;
      height: 30px;
      min-height: 30px;
      background: #343449;
      border-radius: 6px;
    }
    .mini-code {
      text-align: right;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
    .coupon-code:focus, .expired-time:focus, .mini-code:focus {
      outline: none;
    }
    .coupon-code::placeholder, .expired-time::placeholder, .mini-code::placeholder {
      font-weight: 400;
      font-size: 14px;
      color: #FFF;
    }
  }
  .sign-css {
    font-weight: 400;
    font-size: 16px;
    color: #FFF;
    margin-top: 25px;
    margin-bottom: 0;
  }
}
.inputpc-row {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.inputm-row {
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 60%;
    margin: auto;
  }
}
.input1-row {
  @media screen and (max-width: 768px) {
    width: 60%;
    margin: 2rem auto auto;
  }
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
    width: 200px;
    height: 40px;
    font-weight: 400;
    font-size: 1rem;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    z-index: 999;
    margin: auto;
    cursor: pointer;
  }
}

.coupon-type, .free-shipping-coupon {
  font-weight: 400;
  font-size: 16px;
  color: #808080;
  margin-bottom: 5px;
}
.free-shipping-coupon {
  color: #FFF;
  padding-left: 5px;
}

</style>