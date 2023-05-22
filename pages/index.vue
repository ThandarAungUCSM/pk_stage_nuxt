<template>
  <div>
    <!-- @checkAuth="checkAuth" -->
    <!-- page="prodDetail" // sidebar bugs -->
    <!-- <Header /> -->

    <div class="content-css">
      <div class="content-block">
        <SidebarCom :opensidebar="opensidebar" @sidebarFunc="sidebarFunc" @activeTab="activeTab" />
        <div v-if="activeMenu !== '' && activeMenu === 'currencyManager'">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                Currency Manager Page
              </p>
            </div>
          </div>
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'bannerAdvertise'">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                Banner Advertise Manager Page
              </p>
            </div>
          </div>
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'categoryProduct'">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                Category Product Manager Page
              </p>
            </div>
          </div>
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'couponManager'">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                Coupon Manager Page
              </p>
            </div>
          </div>
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'membershipManager'">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                Membership Manager Page
              </p>
            </div>
          </div>
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'convertHistory'">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                Convert History Manager Page
              </p>
            </div>
          </div>
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'refundHistory'">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                Refund History Page
              </p>
            </div>
          </div>
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'accounting'">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                對帳資料
              </p>
              <div>
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="Date"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="Name"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="Address">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
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
      opensidebar: true,
      activeMenu: '',
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }]
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
    },
    activeTab(val) {
      this.activeMenu = val
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
    .rightall-content {
      margin: 32px auto 0;
      .test-text {
        font-weight: 700;
        font-size: 24px;
        color: #FFF;
      }
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
      padding-left: 319px;
    }
    .openfalse {
      padding-left: 109px;
    }
  }
}
</style>
