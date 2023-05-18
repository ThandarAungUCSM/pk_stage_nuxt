<template>
  <div>
    <!-- @checkAuth="checkAuth" -->
    <!-- page="prodDetail" // sidebar bugs -->
    <!-- <Header /> -->

    <div class="content-css">
      <div class="content-block">
        <SidebarCom :opensidebar="opensidebar" @sidebarFunc="sidebarFunc" />
        <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
          <div class="page-content" >
            
          </div>
        </div>
      </div>
    </div>

    <!-- <Footer /> -->
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css"; 
export default {
  name: 'IndexPage',
  data() {
    return {
      userLogin: false,
      opensidebar: true
    }
  },
  computed: {
  },
  methods: {
    checkAuth(auth) {
      this.userLogin = auth
    },
    sidebarFunc(val) {
      this.opensidebar = val;
    }
  }
}
</script>

<style lang="scss">

</style>
<style lang="scss" scoped>
.content-css {
  height: 100vh;
  min-height: 100vh ;
  background: #132235;
  .content-block {
    display: flex;
    position: relative;
    .whole-content {
      width: 100%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0%); 
    }
    .page-content {
      background: #7161EF;
      border-radius: 36px;
      width: 40%;
      height: 261px;
      margin: 32px auto 0;
    }
    .opentrue {
      padding-left: 20%; // after open sidebar
    }
    .openfalse {
      padding-left: 109px;
    }
  }
}
</style>
