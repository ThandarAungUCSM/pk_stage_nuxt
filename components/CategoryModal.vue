<template>
  <div id="categoryId" >
    <transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <slot name="body">
                <div class="cate-right-block">
                  <div class="right-close">
                    <img src="../assets/pc/modal-close.png" class="closecate-img" @click="closeBlock">
                  </div>
                  <div>
                    <div class="input-cate">
                      <p class="cate-name">新分類名稱</p>
                      <el-input v-model="cateName" placeholder="" class="search-css"></el-input>
                    </div>
                    <p class="cate-btn">完成</p>
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
      cateName: '',
    }
  },
  created() {
  },
  methods: {
    closeBlock() {
      this.$emit('settingData', 'hi')
      this.$emit('close');
    }
  }
}
</script>
<style lang="scss">
#categoryId {
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(0px);
    display: table;
    transition: opacity 0.3s ease;
  }
  
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .modal-container {
    width: 500px;
    height: 315px;
    margin: 0px auto;
    padding: 0;
    // box-shadow: 0px 4px 4px rgba(33, 66, 116, 0.25);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;

    // background: #191A21;
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

#categoryId {
  .el-input__inner {
    width: 100% !important;
  }
}
</style>
<style lang="scss" scoped>
.cate-right-block {
  background: #191A21;
  border-radius: 12px;
  padding: 1rem;
  .right-close {
    text-align: right;
  }
  .input-cate {
    width: 80%;
    margin: 56px auto 65px;
    .cate-name {
      font-weight: 400;
      font-size: 16px;
      color: #808080;
    }
  }
  .cate-btn {
    background: linear-gradient(90deg, #7161EF 0%, #3C27DC 100%);
    border-radius: 12px;
    width: 200px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 0;
    margin: auto;
    text-align: center;
  }
  .closecate-img {
    width: 20px;
    height: 19px;
  }
}
</style>