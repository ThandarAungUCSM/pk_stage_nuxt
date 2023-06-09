<template>
  <div>
    <!-- @checkAuth="checkAuth" -->
    <!-- page="prodDetail" // sidebar bugs -->
    <!-- <Header /> -->

    <div class="content-css">
      <div class="content-block">
        <SidebarCom :opensidebar="opensidebar" @sidebarFunc="sidebarFunc" @activeTab="activeTab" />
        <div v-if="activeMenu !== '' && activeMenu === 'currencyManager'" id="currencyManagerId">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="equal-text">
                遊戲幣值比率
              </p>
              <div class="row-css">
                <div class="left-content">
                  <el-table
                    :data="currencyData"
                    style="width: 85%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                      prop="gameName"
                      label="遊戲名稱"
                      width="190">
                    </el-table-column>
                    <el-table-column
                      prop="currency"
                      label="幣別"
                      width="190">
                      <template slot-scope="props">
                        <span class="">PK/{{ props.row.currency }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="use"
                      label="採用"
                      width="190">
                      <template slot-scope="props">
                        <span v-if="props.row.state && props.row.state === 'pause'" class="">{{ props.row.use }}(停用)</span>
                        <span v-else class="">{{ props.row.use }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="edit"
                      label="編輯"
                      width="132">
                      <template slot-scope="props">
                        <div @click="editBlock(props.row, props.$index)"><img src="../assets/pc/btn-edit.png" class="edit-img"></div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div id="rightId" class="right-content" :class="(eachcondition && (eachcondition === 'disabled' || eachcondition === 'active')) ? 'showcss' : 'hidecss'">
                  <div class="right-div">
                    <div class="right-close">
                      <img src="../assets/pc/modal-close.png" class="close-img" @click="closeBlock">
                    </div>
                    <div class="block-css">
                      <p class="name-lable">遊戲名稱</p>
                      <el-input v-model="editName" placeholder="楓之谷" class="name-css"></el-input>
                    </div>
                    <div class="block-css">
                      <p class="name-lable">幣別</p>
                      <el-input v-model="editCurrency" placeholder="楓幣" class="name-css"></el-input>
                    </div>
                    <div class="block-css">
                      <p class="name1-lable">採用</p>
                      <div v-if="!priceEdit" class="manager1-css">
                        <p v-if="editData.state && editData.state === 'pause'" class="price-css">{{editData.use}}(停用)</p>
                        <p v-else class="price-css">{{editData.use}}</p>
                        <div v-if="!(editData.state)" @click="updateFunc">
                          <p class="price-btn">修改</p>
                        </div>
                      </div>
                      <div v-else class="manager2-css">
                        <el-input v-model="editPrice" pattern="[0-9]{4} [0-9]{3} [0-9]{3}" oninput="this.value = this.value.replace(/[^0-9.]/g, ''); this.value = this.value.replace(/(\..*)\./g, '$1');" placeholder="楓幣" onfocus="this.placeholder=''" class="name1-css"></el-input>
                        <div class="price-btn" @click="exitEditMode(1)">完成</div>
                      </div>
                    </div>
                    <div class="red-block">
                      <p v-if="eachcondition === 'active'" class="disabled-btn">停用</p>
                      <p v-else-if="eachcondition === 'disabled'"  class="disabled-btn">解除停用</p>
                      <p class="removed-btn">從官網移除</p>
                    </div>
                    <div class="btn-block">
                      <p class="store-btn" @click="closeBlock">儲存</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'bannerAdvertise'">
          <div class="whole1-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <div v-if="!showAds1" class="row-content">
                <div class="left-block">
                  <p class="equal-text">
                    橫幅廣告管理
                  </p>
                  <div class="manager-css">
                    <div class="advertise-btn" @click="toShow">
                      <img src="../assets/pc/plus.png" class="plus-img">
                      <p class="manager-btn">新增</p>
                    </div>
                  </div>
                  <div class="pad-left">
                    <p class="advert-count">商城廣告(0/10)</p>
                    <p class="advert1-count">遊戲廣告(0/10)</p>
                  </div>
                </div>

                <div id="adsId" class="center-block" :style="showCenter === true ? 'visibility: visible;' : 'visibility: hidden;'">
                  <div class="first-row">
                    <img src="../assets/pc/modal-close.png" class="close-ads" style="visibility: hidden;">
                    <div class="btn-ads">
                      <p :class="adsTab === 1 ? 'mall-ads' : 'game-ads'" @click="activeAdsTab(1)">商城廣告</p>
                      <p :class="adsTab === 2 ? 'mall-ads' : 'game-ads'" @click="activeAdsTab(2)">遊戲廣告</p>
                    </div>
                    <img src="../assets/pc/modal-close.png" class="close-ads" @click="toHide">
                  </div>
                  <div v-show="adsTab === 1" class="">
                    <div class="sec-row">
                      <el-upload
                        :on-change="handleChange"
                        action="#"
                        list-type="picture-card"
                        :auto-upload="false"
                        >
                          <img v-if="imgUpload === ''" src="../assets/pc/img-img.png" class="img-icon">
                      </el-upload>
                    </div>
                    <div class="third-row">

                      <div class="block-css">
                        <p class="name-lable">廣告生效時間</p>
                        <!-- <el-input v-model="liveTime" placeholder="楓之谷" class="name-css"></el-input> -->
                        <el-date-picker
                          v-model="liveTime"
                          type="datetime"
                          placeholder="">
                        </el-date-picker>
                      </div>
                      <div class="block-css">
                        <p class="name-lable">廣告失效時間</p>
                        <!-- <el-input v-model="expireTime" placeholder="楓幣" class="name-css"></el-input> -->
                        <el-date-picker
                          v-model="expireTime"
                          type="datetime"
                          placeholder="">
                        </el-date-picker>
                      </div>
                    </div>
                  </div>
                  <div v-show="adsTab === 2" class="">
                    <div class="sec1-row">
                      <el-upload
                        :on-change="handle1Change"
                        action="#"
                        list-type="picture-card"
                        :auto-upload="false"
                        >
                          <img v-if="img1Upload === ''" src="../assets/pc/img-img.png" class="img-icon">
                      </el-upload>
                    </div>
                    <div class="third1-row">

                      <div class="block-css">
                        <p class="name-lable">廣告生效時間</p>
                        <!-- <el-input v-model="live1Time" placeholder="楓之谷" class="name-css"></el-input> -->
                        <el-date-picker
                          v-model="live1Time"
                          type="datetime"
                          placeholder="">
                        </el-date-picker>
                      </div>
                      <div class="block-css">
                        <p class="name-lable">廣告失效時間</p>
                        <!-- <el-input v-model="expire1Time" placeholder="楓幣" class="name-css"></el-input> -->
                        <el-date-picker
                          v-model="expire1Time"
                          type="datetime"
                          placeholder="">
                        </el-date-picker>
                      </div>
                    </div>
                  </div>
                  <div class="ads-btn" @click="showAdvertise(1)">完成</div>
                </div>
              </div>
              <div v-else-if="!deleteItem" class="row-content">
                <div class="left-block">
                  <p class="equal-text">
                    橫幅廣告管理
                  </p>
                  <div class="manager-css">
                    <div class="advertise-btn1" @click="toShow">
                      <img src="../assets/pc/plus.png" class="plus-img">
                      <p class="manager-btn">新增</p>
                    </div>
                    <div class="advertise-btn" @click="toDeleteBtn">
                      <img src="../assets/pc/trash.png" class="trash-img">
                      <p class="manager-btn">移除</p>
                    </div>
                  </div>
                  <div class="banner-block2">
                    <p class="advert-count">商城廣告(2/10)</p>
                    <div>
                      <div class="each-row">
                        <div class="each-block">
                          <p class="status-condition1">online</p>
                          <img src="../assets/pc/fake-banner1.png" class="fake-img">
                          <p class="date-time">2023 / 02 /01 18:00~2023 / 03 /01 00:00</p>
                        </div>
                        <div class="each-block">
                          <p class="status-condition2">已排程</p>
                          <img src="../assets/pc/fake-banner1.png" class="fake-img">
                          <p class="date-time">2023 / 02 /01 18:00~2023 / 03 /01 00:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="banner-block1">
                    <p class="advert2-count">遊戲廣告(2/10)</p>
                    <div>
                      <div class="each-row">
                        <div class="each-block">
                          <p class="status-condition1">online</p>
                          <img src="../assets/pc/fake-banner2.png" class="fake1-img">
                          <p class="date1-time">2023 / 02 /01 18:00~2023 / 03 /01 00:00</p>
                        </div>
                        <div class="each-block">
                          <p class="status-condition1">online</p>
                          <img src="../assets/pc/fake-banner2.png" class="fake1-img">
                          <p class="date1-time">2023 / 02 /01 18:00~2023 / 03 /01 00:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="deleteItem" class="row-content">
                <div class="left-block">
                  <p class="equal-text">
                    橫幅廣告管理
                  </p>
                  <div class="manager-css">
                    <div class="advertise-btn1" @click="toShow">
                      <img src="../assets/pc/plus.png" class="plus-img">
                      <p class="manager-btn">新增</p>
                    </div>
                    <div class="advertise-btn" :class="deleteItem ? 'activeDelete' : ''" @click="toDeleteBtn">
                      <img src="../assets/pc/trash.png" class="trash-img">
                      <p class="manager-btn">移除</p>
                    </div>
                  </div>
                  <div class="banner-block2">
                    <p class="advert-count">商城廣告(2/10)</p>
                    <div>
                      <div class="each-row">
                        <div class="each-block">
                          <p class="status-condition1">online</p>
                          <img src="../assets/pc/fake-banner1.png" class="fake-img">
                          <img src="../assets/pc/remove-img.png" class="remove-img" @click="toDelete()">
                          <p class="date-time">2023 / 02 /01 18:00~2023 / 03 /01 00:00</p>
                        </div>
                        <div class="each-block">
                          <p class="status-condition2">已排程</p>
                          <img src="../assets/pc/fake-banner1.png" class="fake-img">
                          <img src="../assets/pc/remove-img.png" class="remove-img" @click="toDelete()">
                          <p class="date-time">2023 / 02 /01 18:00~2023 / 03 /01 00:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="banner-block1">
                    <p class="advert2-count">遊戲廣告(2/10)</p>
                    <div>
                      <div class="each-row">
                        <div class="each-block">
                          <p class="status-condition1">online</p>
                          <img src="../assets/pc/fake-banner2.png" class="fake1-img">
                          <img src="../assets/pc/remove-img.png" class="remove-img" @click="toDelete()">
                          <p class="date1-time">2023 / 02 /01 18:00~2023 / 03 /01 00:00</p>
                        </div>
                        <div class="each-block">
                          <p class="status-condition1">online</p>
                          <img src="../assets/pc/fake-banner2.png" class="fake1-img">
                          <img src="../assets/pc/remove-img.png" class="remove-img" @click="toDelete()">
                          <p class="date1-time">2023 / 02 /01 18:00~2023 / 03 /01 00:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                      <span v-if="props.row.state == '即將上線'" class="yellow-css">{{ props.row.state }}</span>
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
          <settingModal v-if="showSettingModal" :show="showSettingModal" :send-data="eachSetting" @close="showSettingModal = false" @settingData="settingData" />
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
        <div v-else-if="activeMenu !== '' && activeMenu === 'refundHistory'" id="refundHistoryId">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                退貨審核管理
              </p>
              <div class="manager-css">
                <el-input v-model="searchInput" placeholder="請輸入會員帳號/兌換編號" class="search-css1"></el-input>
                <div @click="afterSearch">
                  <p class="btn-css">查詢</p>
                </div>
              </div>
              <div id="childConHisId" class="date-picker1-css">
                <el-date-picker
                  v-model="value3"
                  type="date"
                  placeholder="開始時間">
                </el-date-picker>
                <p class="symbol-css">~</p>
                <el-date-picker
                  v-model="value4"
                  type="date"
                  placeholder="結束時間">
                </el-date-picker>
              </div>
              <div class="btnNtable">
                <div class="btn-block">
                  <p class="active-btn all-css">全部</p>
                  <p class="noactvie-btn all-css">等待審核</p>
                  <p class="noactvie-btn all-css">結束</p>
                  <p class="noactvie-btn all-css">已拒絕</p>
                  <p class="noactvie-btn all-css">等待取件</p>
                </div>
                <el-table
                  :data="showRefundData"
                  style="width: 100%">
                  <el-table-column
                    prop="redemptionNo"
                    label="兌換編號"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="returnAppTime"
                    label="退貨申請時間"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="memberAccout"
                    label="會員帳號"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="returnItem"
                    label="退貨品項"
                    width="170">
                  </el-table-column>
                  <el-table-column
                    prop="returnQty"
                    label="退貨數量"
                    width="90">
                  </el-table-column>
                  <el-table-column
                    prop="receiveGoods"
                    label="是否收貨"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="requestRefund"
                    label="申請退款"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="trackingNo"
                    label="運送單號"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="state"
                    label="狀態"
                    width="120">
                    <template slot-scope="props">
                      <div @click="refundDataModal(props.row)">
                        <span v-if="props.row.state === '等待審核'" class="orange-css">{{props.row.state}}</span>
                        <span v-else-if="props.row.state === '等待取件'" class="orange-css">{{props.row.state}}</span>
                        <span v-else-if="props.row.state === '結束'" class="white-css">{{props.row.state}}</span>
                        <span v-else-if="props.row.state === '已拒絕'" class="pink-css">{{props.row.state}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="detailInformation"
                    label="詳細資料"
                    width="120">
                    <template slot-scope="props">
                      <div @click="refundDataModal(props.row)">
                        <span class="blue-css">開啟</span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div id="selectId" class="pagi-block">
                <p class="pagi-text1">顯示{{refund_tot_page}}頁 每頁顯示</p>
                <el-select v-model="refund_size" placeholder="Select">
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
                  :page-size="refund_size"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="refundData.length"
                  @current-change="handleRefundChange">
                </el-pagination>
              </div>
              <refundModal v-if="showRefundModal" :show="showRefundModal" :send-data="sendData" @close="openRefund" />
              <newRefundModal v-if="showNewRefundModal" :show="showNewRefundModal" :send-data="tograndChild" @close="showNewRefundModal = false" />
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
      value3: '',
      value4: '',
      page_size: 20,
      coupon_size: 20,
      convert_size: 20,
      refund_size: 20,
      total_page: 0,
      refund_tot_page: 0,
      coupon_tot_page: 0,
      convert_tot_page: 0,
      currentPage: 1,
      currentCouponPage: 1,
      currentConvertPage: 1,
      currentRefundPage: 1,
      pagiCalculate: 0,
      showData: null,
      showRefundData: null,
      showCouponData: null,
      showConvertHistoryData: null,
      options: [{
        value: '5',
        label: '5'
      }, {
        value: '10',
        label: '10'
      }, {
        value: '15',
        label: '15'
      }, {
        value: '20',
        label: '20'
      }, {
        value: '25',
        label: '25'
      }, {
        value: '30',
        label: '30'
      }, {
        value: '40',
        label: '40'
      }, {
        value: '50',
        label: '50'
      }, {
        value: '60',
        label: '60'
      }, {
        value: '70',
        label: '70'
      }, {
        value: '80',
        label: '80'
      }, {
        value: '90',
        label: '90'
      }, {
        value: '100',
        label: '100'
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
      showRefundModal: false,
      sendData: {},
      eachSetting: {},
      currencyData: [{
        gameName: '楓之谷',
        currency: '楓幣',
        use: '5,000',
        edit: ''
      }, {
        gameName: 'OOXX',
        currency: 'OOXX',
        use: '160,000',
        edit: ''
      }, {
        gameName: 'OOXX',
        currency: 'OOXX',
        use: '123',
        edit: ''
      }, {
        gameName: 'OOXX',
        currency: 'OOXX',
        use: '456',
        edit: ''
      }, {
        gameName: 'OOXX',
        currency: 'OOXX',
        use: '150,050',
        edit: ''
      }, {
        gameName: 'OOXX',
        currency: 'OOXX',
        use: '59,288,03',
        edit: ''
      }, {
        gameName: 'OOXX',
        currency: 'OOXX',
        use: '999,999,99',
        edit: '',
        state: 'pause'
      }],
      editData: {},
      editName: '', 
      editCurrency: '',
      currentIndex: null,
      eachcondition: 'normal',
      showCenter: false,
      showAds1: false,
      adsTab: 1,
      liveTime: '', 
      expireTime: '',
      live1Time: '', 
      expire1Time: '',
      deleteItem: false,
      refundData: [{
        redemptionNo: 'sdvrn454bfdln33',
        returnAppTime: '2024-01-26 18:59',
        memberAccout: 'blackpink321',
        returnItem: '商品名稱商品名稱...',
        returnQty: '3',
        receiveGoods: '否',
        requestRefund: '500,000',
        trackingNo: '15645161326',
        state: '等待審核',
        detailInformation: '開啟'
      }, {
        redemptionNo: 'berointgrty,954',
        returnAppTime: '2024-01-26 18:59',
        memberAccout: 'titan666',
        returnItem: '商品名稱商品名稱...',
        returnQty: '1',
        receiveGoods: '是',
        requestRefund: '100,000',
        trackingNo: '65164651512',
        state: '結束',
        detailInformation: '開啟'
      }, {
        redemptionNo: 'berointgrty,954',
        returnAppTime: '2024-01-26 18:59',
        memberAccout: 'titan666',
        returnItem: '商品名稱商品名稱...',
        returnQty: '1',
        receiveGoods: '是',
        requestRefund: '100,000',
        trackingNo: '65164651512',
        state: '已拒絕',
        detailInformation: '開啟'
      }, {
        redemptionNo: 'sdvrn454bfdln33',
        returnAppTime: '2024-01-26 18:59',
        memberAccout: 'blackpink321',
        returnItem: '商品名稱商品名稱...',
        returnQty: '3',
        receiveGoods: '否',
        requestRefund: '500,000',
        trackingNo: '15645161326',
        state: '等待取件',
        detailInformation: '開啟'
      }],
      showNewRefundModal: false,
      tograndChild: {},
      priceEdit: false,
      editPrice: '',
      // dialogImageUrl: '',
      // dialogVisible: false,
      imgUpload: '',
      img1Upload: '',
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
    refund_size() {
      this.refund_size = +this.refund_size;
      this.pagiCalculate = 0;
      this.showReund()
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
    this.showReund()
    this.showCouponItem()
    this.showConvertHistoryItem()
  },
  methods: {
    handleChange(file, fileList) {
      this.imgUpload = fileList.url

      const element = document.querySelector('.el-upload--picture-card');
      element.className += 'imgdataHide'; 
    },
    handle1Change(file, fileList) {
      this.img1Upload = fileList.url

      const element = document.querySelector('.el-upload--picture-card');
      element.className += 'imgdataHide'; 
    },
    updateFunc() {
      this.priceEdit = true
    },
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
    handleRefundChange(val) {
      this.currentRefundPage = val
      this.showReund()
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
    showReund() {
      this.refund_tot_page = Math.ceil(this.refundData.length/this.refund_size);
      this.showRefundData = []

      const temp = (this.currentRefundPage - 1) * this.refund_size;
      this.clonelist = [...this.refundData]
      const result = this.clonelist.splice(temp, this.refund_size)
       
      this.showRefundData = result
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
      // console.log(JSON.stringify(val))
      this.eachSetting = val
      this.showSettingModal = true
    },
    historyDataModal(val) {
      this.sendData = val
      this.showConvertModal = true
    },
    refundDataModal(val) {
      this.sendData = val
      document.body.classList.add('tofix');
      this.showRefundModal = true
    },
    editBlock(val, index) {
      this.editData = val
      this.editName = val.gameName
      this.editCurrency = val.currency
      this.currentIndex = index
      if(this.currentIndex === (this.currencyData.length - 1)) {
        this.eachcondition = 'disabled'
      } else if(this.currentIndex !== null) {
        this.eachcondition = 'active'
      } else {
        this.eachcondition = 'normal'
      }
    },
    tableRowClassName({row, rowIndex}) {
      if ((rowIndex === this.currentIndex) && (rowIndex !== (this.currencyData.length - 1))) {
        return 'active-row';
      } 
      return '';
    },
    closeBlock() {
      this.eachcondition = 'normal'
      this.currentIndex = null
    },
    toShow() {
      this.showAds1 = false
      this.deleteItem = false
      this.showCenter = true
    },
    toHide() {
      this.showCenter = false
    },
    showAdvertise() {
      this.showCenter = false
      this.deleteItem = false
      this.showAds1 = true
    },
    exitEditMode() {
      if(this.editPrice === '' || this.editData.use === this.editPrice) {
        console.log('please fill new input data')
      } else {
        this.currencyData.map((item, index) => {
          if(index === this.currentIndex) {
            item.use = this.editPrice
          }
          return item;
        })
        this.priceEdit = false
      }
    },
    activeAdsTab(val) {
      this.adsTab = val
    },
    toDeleteBtn() {
      this.showCenter = false
      this.deleteItem = !this.deleteItem
    },
    toDelete() {
      
    },
    openRefund(val) {
      this.showRefundModal = false
      document.body.classList.add('tofix');
      this.showNewRefundModal = true
      this.tograndChild = this.sendData
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

#accountingId, #couponManagerId, #convertHistoryId, #currencyManagerId, #refundHistoryId {
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

      width: 75px;
    }
    .el-input__icon {
      line-height: 100%;
    }
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
  .el-table td.el-table__cell div {
    color: #E4E4E4;
  }
}
#refundHistoryId {
  .el-table {
    background: #191A21;
    border-radius: 12px;
    padding: 1rem 1rem 2rem 5px;
    margin: 0 auto 34px;
  }
  .el-input__inner {
    width: 340px;
    height: 30px;
    background: #34344C;
    border-radius: 10px;
    border: 1px solid #34344C;
  }
  .el-table th.el-table_1_column_5>.cell, .el-table td.el-table_1_column_5>.cell, .el-table th.el-table_1_column_6>.cell, .el-table td.el-table_1_column_6>.cell, .el-table th.el-table_1_column_7>.cell, .el-table td.el-table_1_column_7>.cell {
    text-align: right;
  }
  .el-table th.el-table_1_column_7>.cell, .el-table td.el-table_1_column_7>.cell, .el-table th.el-table_1_column_9>.cell, .el-table td.el-table_1_column_9>.cell, .el-table th.el-table_1_column_10>.cell, .el-table td.el-table_1_column_10>.cell {
    text-align: center;
  }
  .el-table td.el-table__cell div {
    color: #E4E4E4;
  }
  .el-table th.el-table__cell>.cell, .el-table td.el-table__cell div {
    padding-top: 3px;
    padding-bottom: 3px;
  }
}
#childConHisId {
  .el-input__inner {
    width: 186px;
    height: 30px;
    background: #34344C;
    border-radius: 10px;
    border: 1px solid #34344C;
  }
}
#currencyManagerId {
  .el-table {
    padding: 2rem 1rem 2rem 1rem;
    margin-top: 0;
    margin-left: 63px;
  }
  .el-table .active-row {
    td.el-table__cell div {
      color: #EDFF21;
    }
  }
  .el-table th.el-table_1_column_3>.cell, .el-table td.el-table_1_column_3>.cell {
    text-align: right;
  }
  .el-table th.el-table_1_column_4>.cell, .el-table td.el-table_1_column_4>.cell {
    text-align: center;
  }
  .el-table td.el-table__cell, .el-table th.el-table__cell>.cell {
    padding-bottom: 5px;
  }
  .el-table td.el-table__cell div {
    color: #E4E4E4;
  }
  .el-table tr:last-child td.el-table__cell div {
    color: #F35A90;
  }
  .el-input__inner {
    width: 196px;
    height: 30px;
    border: 1px solid #34344C;

    background: #343449;
    border-radius: 6px;
    padding: 0 7px;
  }
}
#rightId {
  .el-input__inner {
    font-weight: 400;
    font-size: 16px;
    color: #E4E4E4;
  }
}
#adsId {
  .el-input__inner {
    font-weight: 400;
    font-size: 16px;
    color: #E4E4E4;

    width: 347px;
    height: 48px;
    background: #34344C;
    border-radius: 6px;
    border: 1px solid #34344c;
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
  .el-upload-list--picture-card .el-upload-list__item {
    height: 100%;
    margin-bottom: 0;
  }
  .el-upload--picture-card {
    border: 1px dashed transparent;
    background: transparent;
  }
}
.imgdataHide, .el-upload-list--picture-card .el-upload-list__item-actions {
  display: none;
}
.tofix {
  width: 100%;
  position: fixed;
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
    .whole1-content {
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
      .banner-block {

      }
      .advert-count, .advert1-count, .advert2-count {
        font-weight: 400;
        font-size: 16px;
        color: #FFF;
        margin-top: 33px;
      }
      .advert1-count {
        margin-top: 100px;
      }
      .advert2-count {
        margin-top: 0;
      }
      .banner-block1 {
        margin-left: 63px;
        margin-top: 1rem;
      }
      .banner-block2, .pad-left {
        margin-left: 63px;
      }
      .each-row {
        display: flex;
        .each-block {
          margin-right: 10px;
          position: relative;
          .status-condition1, .status-condition2 {
            font-weight: 400;
            font-size: 16px;
            color: #FFF;
            width: 67px;
            text-align: center;
            position: absolute;
          }
          .status-condition1 {
            background: #2BDE73;
          }
          .status-condition2 {
            background: #FFA149;
          }
          .fake-img {
            width: 393px;
          }
          .remove-img {
            width: 36px;
            height: 36px;
            cursor: pointer;
            position: absolute;
            top: -15px;
            right: -3px;
          }
          .fake1-img {
            width: 360px;
          }
          .date-time, .date1-time {
            font-weight: 400;
            font-size: 16px;
            color: #FFF;
            width: 393px;
            height: 30px;
            background: rgba(0, 0, 0, 0.95);
            margin-bottom: 0;
            position: absolute;
            bottom: 0;
          }
          .date1-time {
            width: 360px;
          }
        }
      }
      .row-content {
        display: flex;

      }
      .left-block {
        margin-bottom: 2rem;
      }
      .center-block {
        background: #191A21;
        border: 1px solid #7161EF;
        border-radius: 12px;

        padding: 1rem 1rem 2rem;
        width: 500px;
        margin-left: 100px;
        .first-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .close-ads {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
        }
        .sec-row {
          width: 393px;
          height: 160px;
          background: #191A21;
          border: 1px solid #263B71;
          margin: 38px auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
          .img-icon {
            width: 64px;
            height: 64px;
          }
        }
        .sec1-row {
          width: 393px;
          height: 299px;
          background: #191A21;
          border: 1px solid #263B71;
          margin: 38px auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
          .img-icon {
            width: 64px;
            height: 64px;
          }
        }
        .third-row {
          width: 393px;
          margin: 90px auto 150px;
        }
        .third1-row {
          width: 393px;
          margin: 30px auto 40px;
        }
        .ads-btn {
          width: 200px;
          height: 39px;
          background: linear-gradient(90deg, #7161EF 0%, #3C27DC 100%);
          border-radius: 12px;
          font-weight: 400;
          font-size: 16px;
          color: #FFF;
          text-align: center;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .btn-ads {
          display: flex;

          .mall-ads, .game-ads {
            font-weight: 400;
            font-size: 16px;
            border-radius: 12px;
            width: 100px;
            height: 36px;
            border: 1px solid #7161EF;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 11px 0 11px;
            cursor: pointer;
          }
          .mall-ads {
            color: #FFF;
            background: #7161EF;
          }
          .game-ads {
            color: #7161EF;
            background: #191A21;
          }
        }
      }
      .row-css {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left-content {
          width: 65%;
        }
        .right-content {
          width: 33%;
        }
        .showcss {
          visibility: visible;
        }
        .hidecss {
          visibility: hidden;
        }
        .right-div {
          width: 360px;
          height: 500px;
          background: #191A21;
          border-radius: 12px;
          padding: 1rem 1rem 1rem 3rem;
          .right-close {
            text-align: right;
          }
          .close-img {
            width: 18px;
            height: 18px;
            cursor: pointer;
          }
          .red-block {
            .disabled-btn, .removed-btn {
              font-weight: 400;
              font-size: 16px;
              color: #F35A90;
              border: 1px solid #F35A90;
              border-radius: 12px;
              width: 120px;
              height: 36px;
              margin-bottom: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .removed-btn {
              margin-top: 21px;
              margin-bottom: 55px;
            }
          }
          .btn-block {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .store-btn {
            font-weight: 400;
            font-size: 16px;
            color: #FFF;
            background: linear-gradient(90deg, #7161EF 0%, #3C27DC 100%);
            border-radius: 12px;
            width: 200px;
            height: 40px;
            margin-bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
        }
      }
      .block-css {
        margin-bottom: 1.1rem;
        .name-lable, .name1-lable {
          font-weight: 400;
          font-size: 16px;
          color: #808080;
          margin-bottom: 10px;
          margin-left: 7px;
        }
        .name1-lable {
          margin-left: 0;
        }
        .name-css {
          font-weight: 400;
          font-size: 16px;
          color: #E4E4E4;
        }
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
      .date-picker-css, .date-picker1-css {
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
      .date-picker1-css {
        margin-top: 30px;
      }
      .btnNtable {
        width: 94%;
        background: #191A21;
        border-radius: 12px;
        padding: 1rem 1rem 2rem 2rem;
        margin: 29px auto 34px;
        .btn-block {
          display: flex;
          align-items: center;
          
          .all-css {
            font-weight: 400;
            font-size: 1rem;
            margin-bottom: 0;

            width: 100px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 22px;
            cursor: pointer;
          }
          .active-btn {
            background: #7161EF;
            color: #FFF;

            border: 1px solid #7161EF;
            border-radius: 12px;
          }
          .noactvie-btn {
            background: #191A21;
            color: #7161EF;

            border: 1px solid #7161EF;
            border-radius: 12px;
          }
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
      .manager1-css {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price-css {
          font-weight: 400;
          font-size: 24px;
          color: #E4E4E4;
          margin-bottom: 0;
        }
      }
      .price-btn {
        font-weight: 400;
        font-size: 16px;
        color: #00A0FF;
        border: 1px solid #00A0FF;
        border-radius: 12px;
        width: 70px;
        height: 30px;
        margin-bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .manager2-css {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name1-css {
          font-weight: 400;
          font-size: 16px;
          color: #E4E4E4;
          width: 196px;
        }
      }
      .orange-css, .pink-css, .green-css, .white-css, .blue-css, .yellow-css {
        font-weight: 400;
        font-size: 16px;
        color: #FF8A65;
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
      .advertise-btn, .advertise-btn1 {
        width: 93px;
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
          // background: #132235;
        }
        .plus-img {
          width: 12px;
          height: 12px;
        }
        .trash-img {
          width: 18px;
          height: 18px;
        }
      }
      .advertise-btn1 {
        margin-right: 18px;
      }
      .activeDelete {
        background: #0270B1;
        border: 1px solid #00A0FF;
        border-radius: 12px;
      }
      .btn-div {
        width: 140px;
        height: 36px;
        background: #132235;
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
  
          color: #FFF
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
      cursor: pointer;
    }
    .edit-img {
      width: 24px;
      height: 24px;
      cursor: pointer;
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
