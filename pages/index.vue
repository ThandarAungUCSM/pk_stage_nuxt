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
        <div v-else-if="activeMenu !== '' && activeMenu === 'couponManager'" id="couponManagerId">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="coupon-text">
                優惠券管理 
              </p>
              <div class="manager-css">
                <div class="btn-div" @click="showModal = true">
                  <img src="../assets/pc/plus.png" class="plus-img">
                  <p class="manager-btn">新增優惠券</p>
                </div>
              </div>
              <div>
                <el-table
                  :data="showCouponData"
                  style="width: 94%">
                  <el-table-column
                    prop="couponCreationTime"
                    label="優惠券建立日期"
                    width="170">
                  </el-table-column>
                  <el-table-column
                    prop="offerType"
                    label="優惠類型"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="lowConsumption"
                    label="低消(pk)"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="startPeriod"
                    label="開始期限"
                    width="170">
                  </el-table-column>
                  <el-table-column
                    prop="deadline"
                    label="截止期限"
                    width="170">
                  </el-table-column>
                  <el-table-column
                    prop="offerContent"
                    label="優惠內容">
                  </el-table-column>
                  <el-table-column
                    prop="state"
                    label="狀態">
                    <template slot-scope="props">
                      <span v-if="props.row.state == '即將上線'" class="orange-css">{{ props.row.state }}</span>
                      <span v-if="props.row.state == '失效'" class="pink-css">{{ props.row.state }}</span>
                      <span v-if="props.row.state == '上線中'" class="green-css">{{ props.row.state }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="停用">
                    <template slot-scope="props">
                      <div @click="settingModal(props.row)"><img src="../assets/pc/setting.png" class="setting-img"></div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div id="selectId" class="pagi-block">
                <p class="pagi-text1">顯示{{coupon_tot_page}}頁 每頁顯示</p>
                <el-select v-model="coupon_size" placeholder="Select">
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
                  :page-size="coupon_size"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="couponData.length"
                  @current-change="handleCouponCurrentChange">
                </el-pagination>
              </div>
            </div>
          </div>
          <couponModal v-if="showModal" :show="showModal" @close="showModal = false" @selectData="selectData" />
          <settingModal v-if="showSettingModal" :show="showSettingModal" @close="showSettingModal = false" @settingData="settingData" />
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'membershipManager'" id="managerId">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="equal-text">
                會員資料查詢
              </p>
              <div class="manager-css">
                <el-input v-model="searchInput" placeholder="請輸入會員帳號" class="search-css"></el-input>
                <div @click="afterSearch">
                  <p class="btn-css">查詢</p>
                </div>
              </div>

              <div v-if="showSearch" class="" >
                <p class="basic-info1">基本資料</p>
                <div class="each-black-block">
                  <div class="head-div">
                    <p class="head-css">帳號</p>
                    <p class="head-css">會員姓名</p>
                    <p class="head-css">性別</p>
                    <p class="head-css">生日</p>
                    <p class="head-css">手機</p>
                    <p class="long-headcss">EMAIL</p>
                    <p class="long-headcss">註冊時間</p>
                  </div>
                  <div class="td-div">
                    <p class="td-css">uukk5566</p>
                    <p class="td-css">麥克</p>
                    <p class="td-css">男生</p>
                    <p class="td-css">1987-06-24</p>
                    <p class="td-css">09-12345678</p>
                    <p class="long-tdcss">example@gmail.com</p>
                    <p class="long-tdcss">2024-01-26 18:59:59</p>
                  </div>
                  <div class="head-div">
                    <p class="head1-css">地址</p>
                    <p class="head2-css">連動遊戲數量</p>
                    <p class="head2-css">總計持有PK幣</p>
                    <p class="head2-css">狀態</p>
                  </div>
                  <div class="td-div">
                    <p class="td1-css">新北市五股區中正路一段187號</p>
                    <p class="td2-css">3</p>
                    <p class="td2-css">66,600</p>
                    <p class="td2-css">正常</p>
                  </div>
                </div>

                <p class="basic-info2">已連動的遊戲</p>
                <div class="each-black-block">
                  <div class="head-div">
                    <p class="head-css">遊戲名稱</p>
                    <p class="head-css">持有遊戲幣</p>
                    <p class="head-css">等值PK幣</p>
                    <p class="headl-css">連動時間</p>
                    <p class="head-css">狀態</p>
                  </div>
                  <div class="td-div">
                    <p class="td-css">遊戲A</p>
                    <p class="td-css">500,000</p>
                    <p class="td-css">250</p>
                    <p class="tdl-css">2024.02.02,13:25</p>
                    <p class="td-css">連動中</p>
                  </div>
                  <div class="td-div">
                    <p class="td-css">遊戲B</p>
                    <p class="td-css">250,000</p>
                    <p class="td-css">190</p>
                    <p class="tdl-css">2024.02.02,13:25</p>
                    <p class="td-css">連動中</p>
                  </div>
                  <div class="td-div">
                    <p class="td-css">遊戲C</p>
                    <p class="td-css">1,000</p>
                    <p class="td-css">2</p>
                    <p class="tdl-css">2024.02.02,13:25</p>
                    <p class="tdcolor-css">取消連動 2024.02.02,13:25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'convertHistory'" id="convertHistoryId">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="convertHistory-text">
                會員兌換記錄
              </p>
              <div class="manager-css">
                <el-input v-model="searchInput" placeholder="請輸入會員帳號/兌換編號" class="search-css1"></el-input>
                <div @click="afterSearch">
                  <p class="btn-css">查詢</p>
                </div>
              </div>

              <div>
                <el-table
                  :data="showConvertHistoryData"
                  style="width: 94%">
                  <el-table-column
                    prop="memberAccount"
                    label="會員帳號"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="redemptionNumber"
                    label="兌換編號"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="exchangeCreation"
                    label="兌換建立時間"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="redemptionContent"
                    label="兌換內容"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="noofProduct"
                    label="商品數量"
                    width="85">
                    <template slot-scope="props">
                      <p class="no-css">{{ props.row.noofProduct }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="exchangeTotal"
                    label="兌換合計"
                    width="110">
                    <template slot-scope="props">
                      <p class="no-css">{{ props.row.exchangeTotal }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="state"
                    label="狀態"
                    width="90">
                    <template slot-scope="props">
                      <span v-if="props.row.state == '已完成'" class="white-css">{{ props.row.state }}</span>
                      <span v-else-if="props.row.state == '處理中'" class="green-css">{{ props.row.state }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="view"
                    label="檢視">
                    <template slot-scope="props">
                      <div @click="historyDataModal(props.row)">
                        <span class="blue-css">查看</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div id="selectId" class="pagi-block">
                <p class="pagi-text1">顯示{{convert_tot_page}}頁 每頁顯示</p>
                <el-select v-model="convert_size" placeholder="Select">
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
                  :page-size="convert_size"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="convertData.length"
                  @current-change="handleConvertCurrentChange">
                </el-pagination>
              </div>
            </div>
          </div>
          <convertModal v-if="showConvertModal" :show="showConvertModal" :send-data="sendData" @close="showConvertModal = false" @convertModalData="convertModalData" />
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
          <!-- <div class="page-content" >
            
          </div> -->
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
      value1: '',
      value2: '',
      page_size: 12,
      coupon_size: 12,
      convert_size: 12,
      total_page: 0,
      coupon_tot_page: 0,
      convert_tot_page: 0,
      currentPage: 1,
      currentCouponPage: 1,
      currentConvertPage: 1,
      pagiCalculate: 0,
      showData: null,
      showCouponData: null,
      showConvertHistoryData: null,
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
      clonelist: [],
      searchInput: '',
      showSearch: false,
      couponData: [{
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '失效'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '失效'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '上線中'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }, {
        couponCreationTime: '2024-01-26 18:59',
        offerType: '免運券',
        lowConsumption: '50,000',
        startPeriod: '2024.03.18,00:00',
        deadline: '2024.04.18,23:59',
        offerContent: '免運費',
        state: '即將上線'
      }],
      convertData: [{
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '5',
        exchangeTotal: '1,000',
        state: '處理中',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'berointgrty,954',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }, {
        memberAccount: 'berointgrty,954',
        redemptionNumber: 'sdvrn454bfdln33',
        exchangeCreation: '2024-01-26 18:59',
        redemptionContent: '商品名稱商品名稱...',
        noofProduct: '1',
        exchangeTotal: '100,000',
        state: '已完成',
        view: '查看'
      }],
      showModal: false,
      showSettingModal: false,
      showConvertModal: false,
      sendData: {}
    }
  },
  computed: {
  },
  watch: {
    page_size() {
      this.page_size = +this.page_size;
      this.pagiCalculate = 0;
      this.showItem()
    },
    coupon_size() {
      this.coupon_size = +this.coupon_size;
      this.pagiCalculate = 0;
      this.showCouponItem()
    },
    convert_size() {
      this.convert_size = +this.convert_size;
      this.pagiCalculate = 0;
      this.showConvertHistoryItem()
    }
  },
  created() {
    this.showItem()
    this.showCouponItem()
    this.showConvertHistoryItem()
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
    handleCouponCurrentChange(val) {
      this.currentCouponPage = val
      this.showCouponItem()
    },
    handleConvertCurrentChange(val) {
      this.currentConvertPage = val
      this.showConvertHistoryItem()
    },
    showItem() {
      this.total_page = Math.ceil(this.tableData.length/this.page_size);
      this.showData = []
      // for(let i = this.pagiCalculate; i < this.tableData.length; i++) {
      //   if(this.showData.length < this.page_size){
      //     this.showData.push(this.tableData[i])
      //     this.pagiCalculate++
      //   }
      // }
      // if(this.tableData.length === this.pagiCalculate) {
      //   this.pagiCalculate = 0;
      // }

      const temp = (this.currentPage - 1) * this.page_size;
      // const temp2 = this.currentPage * this.page_size;
      this.clonelist = [...this.tableData]
      const result = this.clonelist.splice(temp, this.page_size)
       
      this.showData = result
    },
    showCouponItem() {
      this.coupon_tot_page = Math.ceil(this.couponData.length/this.coupon_size);
      this.showCouponData = []
      const temp = (this.currentCouponPage - 1) * this.coupon_size;
      this.clonelist = [...this.couponData]
      const result = this.clonelist.splice(temp, this.coupon_size)
       
      this.showCouponData = result
    },
    showConvertHistoryItem() {
      this.convert_tot_page = Math.ceil(this.convertData.length/this.convert_size);
      this.showConvertHistoryData = []
      const temp = (this.currentConvertPage - 1) * this.convert_size;
      this.clonelist = [...this.convertData]
      const result = this.clonelist.splice(temp, this.convert_size)
       
      this.showConvertHistoryData = result
    },
    afterSearch() {
      this.showSearch = true
    },
    selectData(val) {
      console.log(val)
    },
    settingData(val) {
      console.log(val)
    },
    convertModalData(val) {
      console.log(val)
    },
    settingModal(val) {
      console.log(JSON.stringify(val))
      this.showSettingModal = true
    },
    historyDataModal(val) {
      this.sendData = val
      this.showConvertModal = true
    }
  }
}
</script>

<style lang="scss">
#managerId {
  .el-input__inner {
    width: 220px;
    height: 30px;
    background: #34344C;
    border-radius: 10px;
    border: 1px solid #34344C;
  }
}
#convertHistoryId {
  .el-input__inner {
    width: 349px;
    height: 30px;
    background: #34344C;
    border-radius: 10px;
    border: 1px solid #34344C;
  }
  .el-table th.el-table_1_column_5>.cell, .el-table th.el-table_1_column_6>.cell {
    text-align: right;
  }
  .el-table th.el-table_1_column_7>.cell, .el-table td.el-table_1_column_7>.cell {
    text-align: center;
  }
}
#accountingId, #couponManagerId, #convertHistoryId {
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

    // text-align: center; //coupon
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
#convertHistoryId {
  .el-table td.el-table__cell div {
    color: #E4E4E4;
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
      .test-text, .equal-text, .coupon-text, .convertHistory-text {
        font-weight: 700;
        font-size: 24px;
        color: #FFF;
        margin-left: 63px;
      }
      .equal-text {
        margin-bottom: 120px;
      }
      .coupon-text {
        margin-bottom: 100px;
      }
      .convertHistory-text {
        margin-bottom: 60px;
      }
      .basic-info1, .basic-info2 {
        font-weight: 400;
        font-size: 16px;
        color: #808080;
        margin-top: 60px;
        margin-left: 75px;
      }
      .basic-info2 {
        margin-top: 1rem;
      }
      .each-black-block {
        width: 100%;
        max-width: 1184px;
        background: #191A21;
        border-radius: 6px;
        margin-left: 63px;
        padding: 1rem 45px;
        .head-div {
          display: flex;
          // justify-content: space-between;
          .head-css, .long-headcss, .head1-css, .head2-css, .headl-css {
            font-weight: 400;
            font-size: 16px;
            color: #808080;
            width: 13%;
          }
          .long-headcss {
            width: 17.5%;
          }
          .head1-css {
            width: 26%;
          }
          .head2-css {
            width: 13%;
          }
          .headl-css {
            width: 15%;
          }
        }
        .td-div {
          display: flex;
          // justify-content: space-between;
          .td-css, .long-tdcss, .td1-css, .td2-css, .tdl-css {
            font-weight: 400;
            font-size: 16px;
            color: #FFF;
            word-break: break-all;
            width: 13%;
          }
          .long-tdcss {
            width: 17.5%;
          }
          .td1-css {
            width: 26%;
          }
          .td2-css {
            width: 13%;
          }
          .tdl-css  {
            width: 15%;
          }
          .tdcolor-css {
            color: #F35A90;
          }
        }
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
      }
      .pagi-block {
        display: flex;
        align-items: center;
        // padding-left: 40px;
        margin-left: 56px;
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
      .manager-css {
        margin-left: 63px;
        display: flex;
        align-items: center;
        .search-css, .search-css1 {
          font-weight: 400;
          font-size: 16px;
          color: #CECECE;

          width: 220px;
        }
        .search-css1 {
          width: 349px;
        }
      }
      .orange-css, .pink-css, .green-css, .white-css, .blue-css {
        font-weight: 400;
        font-size: 16px;
        color: #D7DF7B;
      }
      .pink-css {
        color: #F35A90;
      }
      .green-css {
        color: #2BDE73;
      }
      .white-css {
        color: #E4E4E4;
      }
      .blue-css {
        color: #00A0FF;
        cursor: pointer;
      }
      .no-css {
        text-align: right;
        margin-bottom: 0;
      }
      .btn-css {
        width: 100px;
        height: 30px;
        border: 1px solid #00A0FF;
        border-radius: 12px;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        margin-bottom: 0;
        margin-left: 1rem;
        cursor: pointer;

        color: #00A0FF;
      }
      .btn-div {
        width: 140px;
        height: 36px;
        border: 1px solid #00A0FF;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        .manager-btn {
          font-weight: 400;
          font-size: 16px;
          text-align: center;
          margin-bottom: 0;
          margin-left: 5px;
          cursor: pointer;
  
          color: #FFF;
          background: #132235;
        }
        .plus-img {
          width: 12px;
          height: 12px;
        }
      }
    }
    .setting-img {
      width: 18px;
      height: 18px;
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
