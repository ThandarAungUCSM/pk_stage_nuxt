<template>
  <div id="settingId" >
    <transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <slot name="body">
                <div class="parent-block">
                  <div class="each-row">
                    <p class="coupon-type">優惠券類型</p>
                    <p class="free-shipping-coupon">免運券</p>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">狀態</p>
                    <p v-if="sendData && sendData.state === '即將上線'" class="yellow-css free-shipping-coupon">{{sendData.state}}</p>
                    <p v-if="sendData && sendData.state === '失效'" class="pink-css free-shipping-coupon">{{sendData.state}}</p>
                    <p v-if="sendData && sendData.state === '上線中'" class="green-css free-shipping-coupon">{{sendData.state}}</p>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">生效時間</p>
                    <p class="free-shipping-coupon">2023-02-02 15:30</p>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">失效時間</p>
                    <p class="free-shipping-coupon">2023-03-02 00:00</p>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">最低消費</p>
                    <p class="free-shipping-coupon">5,000</p>
                  </div>
                  <div class="each-row">
                    <p class="coupon-type">優惠內容</p>
                    <p class="free-shipping-coupon">免運費</p>
                  </div>
                  <div class="note-div">
                    <p class="note-css">停用此優惠券後，優惠券將失效</p>
                  </div>
                </div>
                <div class="bottom-div">
                  <div class="m-pink-bottom" @click="closePopup">
                    <span>確認停用</span>
                  </div>
                  <div class="m-bottom" @click="closePopup">
                    <span>取消</span>
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
    }
  },
  created() {
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
#settingId {
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
    height: 530px;
    margin: 0px auto;
    padding: 2rem 3.5rem;
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
  .each-row {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .note-div {
    margin-top: 3rem;
    .note-css {
      font-weight: 400;
      font-size: 20px;
      color: #F35A90;
      margin-bottom: 0;
    }
  }
}
.coupon-type, .free-shipping-coupon {
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
.pink-css {
  color: #F35A90;
}
.green-css {
  color: #2BDE73;
}
.yellow-css {
  color: #D7DF7B;
}
.bottom-div {
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: absolute;
  bottom: 0;
  z-index: 999;
  width: 100%;
  .m-bottom, .m-pink-bottom {
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
  .m-pink-bottom {
    background: linear-gradient(90deg, #C261EF 0%, #DC2727 100%);
    font-weight: 700;
  }
}
</style>