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
        <div v-else-if="activeMenu !== '' && activeMenu === 'accounting'" id="accountingId">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                對帳資料
              </p>
              <div class="date-picker-css">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="開始時間">
                </el-date-picker>
                <p class="symbol-css">~</p>
                <el-date-picker
                  v-model="value2"
                  type="date"
                  placeholder="結束時間">
                </el-date-picker>
                <div>
                  <p class="btn-css">查詢</p>
                </div>
              </div>
              <div>
                <el-table
                  :data="showData"
                  style="width: 94%">
                  <el-table-column
                    prop="exchangeCreationTime"
                    label="兌換建立時間"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="exchangeNumber"
                    label="兌換編號"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="exchangeSubtotal"
                    label="兌換小計(PK)">
                  </el-table-column>
                  <el-table-column
                    prop="typeofCoupon"
                    label="優惠券種類">
                  </el-table-column>
                  <el-table-column
                    prop="discountPoint"
                    label="優惠點數(PK)">
                  </el-table-column>
                  <el-table-column
                    prop="gameName"
                    label="扣除遊戲名稱">
                  </el-table-column>
                  <el-table-column
                    prop="gameCurrency"
                    label="扣除遊戲幣">
                  </el-table-column>
                  <el-table-column
                    prop="totalConversion"
                    label="兌換合計(PK)">
                  </el-table-column>
                </el-table>
              </div>
              <div id="selectId" class="pagi-block">
                <p class="pagi-text1">顯示{{total_page}}頁 每頁顯示</p>
                <el-select v-model="page_size" placeholder="Select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <p class="pagi-text2">項記錄</p>
                <el-pagination
                  background
                  :page-size="page_size"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="tableData.length"
                  @current-change="handleCurrentChange">
                </el-pagination>
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
      opensidebar: false,
      activeMenu: 'accounting',
      value1: '',
      value2: '',
      page_size: 12,
      total_page: 0,
      currentPage: 1,
      pagiCalculate: 0,
      showData: null,
      currentPage1: 5,
      options: [{
        value: '12',
        label: '12'
      }, {
        value: '10',
        label: '10'
      }, {
        value: '7',
        label: '7'
      }, {
        value: '5',
        label: '5'
      }, {
        value: '4',
        label: '4'
      }],
      tableData: [{
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '12213213213',
        exchangeSubtotal: '100,000',
        typeofCoupon: '免運券',
        discountPoint: '1,520',
        gameName: '遊戲名稱1',
        gameCurrency: '1,532,132',
        totalConversion: '98,480'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '2',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '3',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '4',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '5',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '6',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '7',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '8',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '9',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '10',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '11',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '12',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '13',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '14',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }, {
        exchangeCreationTime: '2024-01-26 18:59:59',
        exchangeNumber: '65465516133',
        exchangeSubtotal: '100,000',
        typeofCoupon: '無',
        discountPoint: '15',
        gameName: '遊戲名稱2',
        gameCurrency: '600,000',
        totalConversion: '100,000'
      }],
      clonelist: []
    }
  },
  computed: {
  },
  watch: {
    page_size() {
      this.page_size = +this.page_size;
      this.pagiCalculate = 0;
      this.showItem()
    }
  },
  created() {
    this.showItem()
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
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.showItem()
    },
    showItem() {
      this.total_page = Math.ceil(this.tableData.length/this.page_size);
      this.showData = []
      for(let i = this.pagiCalculate; i < this.tableData.length; i++) {
        if(this.showData.length < this.page_size){
          this.showData.push(this.tableData[i])
          this.pagiCalculate++
        }
      }
      if(this.tableData.length === this.pagiCalculate) {
        this.pagiCalculate = 0;
      }

      // const temp = (this.currentPage - 1) * this.page_size;
      // // const temp2 = this.currentPage * this.page_size;
      // this.clonelist = [...this.tableData]
      // const result = this.clonelist.splice(temp, this.page_size)
       
      // this.showData = result
    }
  }
}
</script>

<style lang="scss">
#accountingId {
  .el-table {
    background: #191A21;
    border-radius: 12px;
    padding: 3rem 1rem 2rem 1rem;
    margin: 29px auto 34px;
  }
  .el-table tr {
    background: #191A21;
  }
  .el-table th.el-table__cell {
    background: #191A21;
    border-bottom: 1px solid #191A21;
  }
  .el-table th.el-table__cell:hover {
    background: #191A21;
    border-bottom: 1px solid #191A21;
  }
  .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
    border-bottom: 1px solid #191A21;
    padding: 0;
  }
  .el-table::before {
    background-color: #191A21;
  }
  .el-table thead {
    font-weight: 400 !important;
    font-size: 16px;
    color: #808080;
  }
  // .el-table .cell {
  //   font-weight: 400;
  //   font-size: 1rem;
  //   color: #FFF;
  // }
  .el-table td.el-table__cell div {
    font-weight: 400;
    font-size: 1rem;
    color: #FFF;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background: #191A21 !important;
  }
  .el-date-editor.el-input {
    width: 186px;
    height: 30px;
    line-height: 30px;
  }
  .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
  .el-input__prefix {
    display: none;
    left: 0;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 27px;
    background: #34344C;
    border-radius: 10px;
    border: 1px solid #34344C;
    font-weight: 400;
    font-size: 16px;
    color: #CECECE;
  }
  .el-icon-arrow-left:before, .el-icon-arrow-right:before {
    font-size: 32px;
    color: #FFF;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev {
    background-color: #132234;
    margin: 0 23px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #00A0FF;
    color: #191A21;
    font-weight: 600;
    font-size: 20px;

    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-pagination.is-background .el-pager li {
    font-weight: 600;
    font-size: 20px;
    color: #00A0FF;
    background: #191A21;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0;
  }
  .el-pager {
    display: flex;
    align-items: center;
    // justify-content: center;
  }
  .el-pagination {
    display: flex;
    align-items: center;
  }
  #selectId {

    .el-select>.el-input {
      background: #191A21;
      border: 1px solid #00A0FF;
      border-radius: 12px;
    }
    .el-input--suffix .el-input__inner {
      background: #191A21;
      border: 1px solid #00A0FF;
      border-radius: 12px;

      font-weight: 400;
      font-size: 16px;
      color: #FFF;

      display: flex;
      align-items: center;

      width: 70px;
    }
    .el-input__icon {
      line-height: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
.content-css {
  background: #132235 !important;
  min-height: 100vh;
  .content-block {
    display: flex;
    position: relative;
    .whole-content {
      width: 100%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0%); 

      background: #132235;
    }
    .rightall-content {
      margin: 32px auto 0;
      .test-text {
        font-weight: 700;
        font-size: 24px;
        color: #FFF;
        margin-left: 63px;
      }
      .date-picker-css {
        margin-left: 63px;
        display: flex;
        align-items: center;
        .symbol-css {
          font-weight: 400;
          font-size: 16px;
          color: #CECECE;

          margin-bottom: 0;
          padding: 0 1rem;
        }
        .btn-css {
          width: 100px;
          height: 30px;
          border: 1px solid #00A0FF;
          border-radius: 12px;
          font-weight: 400;
          font-size: 16px;
          color: #00A0FF;
          text-align: center;
          margin-bottom: 0;
          margin-left: 1rem;
        }
      }
      .pagi-block {
        display: flex;
        align-items: center;
        padding-left: 40px;
        margin-bottom: 99px;
        .pagi-text1, .pagi-text2 {
          font-weight: 400;
          font-size: 16px;
          color: #06A2FF;
          margin-bottom: 0;
        }
        .pagi-text1 {
          margin-right: 5px;
        }
        .pagi-text2 {
          margin-left: 5px;
        }
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
