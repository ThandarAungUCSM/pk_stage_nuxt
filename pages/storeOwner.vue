<template>
  <div>
    <!-- @checkAuth="checkAuth" -->
    <!-- page="prodDetail" // sidebar bugs -->
    <!-- <Header /> -->

    <div class="content-css">
      <div class="content-block">
        <SidebarCom :opensidebar="opensidebar" :activedata="activeData" @sidebarFunc="sidebarFunc" @activeTab="activeTab" @activemTab="activemTab" />
        <storeOwnerOrderManagerModal v-if="showRefundModal" :show="showRefundModal" :send-data="sendData" @close="openRefund" />
        <div v-if="activeMenu !== '' && activeMenu === 'categoryProduct'" id="categoryProductId">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                上架商品管理
              </p>
              <div v-if="addnewProduct" class="content1-category">
                <div class="cate1-left-block">
                  <div class="cate1-row-title">
                    <p class="cate-title">分類項目管理</p>
                  </div>
                  <div class="addbelow">
                    <p class="classification-css">分類</p>
                    <div class="class-div">
                      <p :class="currencyCate === 'all-good' ? 'activeCate' : ''" class="all-good" @click="toshowCate('all-good')">所有商品</p>
                      <p class="all1-good">新品上市</p>
                      <p class="all1-good">限時優惠</p>
                      <p class="all1-good">日用雜貨</p>
                      <p class="all1-good">零食飲料</p>
                      <p class="all1-good">玩具公仔</p>
                    </div>
                  </div>
                  <!-- abc -->
                  <div v-if="Object.keys(updateProduct).length > 0" class="left-addprod">
                    <p class="prod-photo">商品照片(0/8)</p>
                    <div v-for="i in 5" :key="i" class="prodimg-div">
                      <img src="../assets/pc/data-image.png" class="prod-img aaa" :class="i === 1 ? 'active-img' : ''">
                      <img src="../assets/pc/remove-img.png" class="remove1-img" @click="toDelete()">
                    </div>
                  </div>
                  <div v-else class="left-addprod">
                    <p class="prod-photo">商品照片(0/8)</p>
                  </div>
                  <!-- abc -->
                </div>
                <div id="addprodId" class="right-addprod">
                  <div class="one1row">
                    <p class="advant1Setting">
                      商品進階設定  
                      <span v-if="updateProduct.state === '販售中'" class="advantSetting white-css">{{updateProduct.state}}</span>
                      <span v-else-if="updateProduct.state === '預售'" class="advantSetting yellow-css">{{updateProduct.state}}</span>
                      <span v-else-if="(updateProduct.state === '已下架') || (updateProduct.state === '售罄')" class="advantSetting pink-css">{{updateProduct.state}}</span>
                    </p>
                    <p v-if="(updateProduct.state === '販售中') || (updateProduct.state === '預售') || (updateProduct.state === '售罄')" class="newSettingTxt">下架此商品</p>
                    <p v-else-if="(updateProduct.state === '已下架')" class="newSettingTxt">刪除</p>
                  </div>
                  <div class="one-row">
                    <div>
                      <div class="onerow">
                        <p class="hidetext">hi</p>
                        <div class="one2row">
                          <p class="photoPreview">了解更多照片(0/5)</p>
                          <p :class="updateProduct && updateProduct.state ? 'viewall' : 'view1all'">查看全部</p>
                        </div>
                      </div>
                      <div class="imgupload-row">
                        <div class="img-row">
                          <div class="sec2-row">
                            <el-upload
                              :on-change="handle5Change"
                              action="#"
                              list-type="picture-card"
                              :auto-upload="false" 
                              >
                                <img v-if="img5Upload === ''" src="../assets/pc/img-img.png" class="img-icon">
                                <p class="text-photo">新增商品照片</p>
                            </el-upload>
                          </div>
                          <div class="sec2-row">
                            <el-upload
                              :on-change="handle2Change"
                              action="#"
                              list-type="picture-card"
                              :auto-upload="false" 
                              >
                                <img v-if="img2Upload === ''" src="../assets/pc/img-img.png" class="img-icon">
                                <p class="text-photo">新增了解更多照片</p>
                            </el-upload>
                          </div>
                        </div>
                        <div class="preview-div">
                          <p class="view-css">預覽(0/8)</p>
                          <p class="view-css">預覽(0/5)</p>
                        </div>
                        <div v-if="updateProduct && updateProduct.state">
                          <img src="../assets/pc/showimg.png" class="show-img">
                        </div>
                      </div>
                      <div class="input-block">
                        <div class="prod-left">
                          <div id="nameTextareaId" class="prod-div1">
                            <p class="prod-name">商品名稱：</p>
                            <el-input v-model="prodName" type="textarea" :rows="2" placeholder="" class="prod-css"></el-input>
                          </div>
                          <div id="nameTextarea1Id" class="prod-div2">
                            <p class="prod-name">商品簡介：</p>
                            <el-input v-model="prodDescription" type="textarea" :rows="9" placeholder="" class="prod-description"></el-input>
                          </div>
                        </div>
                        <div id="secTextareaId" class="prod-div1">
                          <p class="prod-name">商品描述：</p>
                          <el-input v-model="prod1Description" type="textarea" :rows="11" placeholder="" class="prod1-description"></el-input>
                        </div>
                      </div>
                    </div>
                    <div class="coin-div">
                      <img src="../assets/pc/price-coin.png" class="pricecoin-img">
                    </div>
                    <div class="child-right-block">
                      <div>
                        <div>
                          <p class="prod1-name">商品分類：</p>
                          <div class="check-block">
                            <el-checkbox-group v-model="checkList">
                              <el-checkbox label="新品上市"></el-checkbox>
                              <el-checkbox label="限時特賣"></el-checkbox>
                              <el-checkbox label="玩具公仔"></el-checkbox>
                              <el-checkbox label="零食飲料"></el-checkbox>
                              <el-checkbox label="日用雜貨"></el-checkbox>
                            </el-checkbox-group>
                          </div>
                        </div>
                        <div id="time1Id" class="timecss">
                          <p class="prod-nname">預售時間</p>
                          <div v-if="Object.keys(updateProduct).length === 0" id="childConHisId" class="date-picker2-css">
                            <el-date-picker
                              v-model="presellTime"
                              type="datetime"
                              placeholder="無">
                            </el-date-picker>
                          </div>
                          <el-input v-else-if="(updateProduct.state === '販售中') || (updateProduct.state === '已下架') || (updateProduct.state === '售罄')" v-model="presellTime" placeholder="無" class="prod-presell"></el-input>
                          <div v-else-if="updateProduct.state === '預售'" id="childConHisId" class="date-picker2-css">
                            <el-date-picker
                              v-model="presellTime"
                              type="datetime"
                              placeholder="">
                            </el-date-picker>
                          </div>
                        </div>
                        <div id="time2Id" class="timecss">
                          <p class="prod-nname">商品兌換價：</p>
                          <el-input v-model="excPrice" placeholder="0" class="pc-show"></el-input>
                          <div class="m-show">
                            <img src="../assets/pc/price-coin.png" class="pricecoin1-img">
                            <el-input v-model="excPrice" placeholder="0" class=""></el-input>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div v-if="Object.keys(updateProduct).length === 0" id="time4Id" class="time1css">
                          <p class="prod-name">架上可購商品數量：</p>
                          <el-input v-model="noofItem" placeholder="999" class=""></el-input>
                        </div>
                        <div v-else-if="updateProduct.state === '售罄'" id="time3Id" class="time1css">
                          <p class="prod-name">架上可購商品數量：</p>
                          <el-input v-model="noofItem" placeholder="999" class=""></el-input>
                        </div>
                        <div v-else-if="(updateProduct.state === '販售中') || (updateProduct.state === '已下架') || (updateProduct.state === '預售')" id="time4Id" class="time1css">
                          <p class="prod-name">架上可購商品數量：</p>
                          <el-input v-model="noofItem" placeholder="999" class=""></el-input>
                        </div>
                        <div>
                          <p v-if="(Object.keys(updateProduct).length > 0) && ((updateProduct.state === '販售中') || (updateProduct.state === '預售'))" class="prod1-btn" @click="productSetting">儲存</p>
                          <p v-else-if="(Object.keys(updateProduct).length > 0) && ((updateProduct.state === '售罄') || (updateProduct.state === '已下架'))" class="prod1-btn" @click="productSetting">完成</p>
                          <div v-else class="prod-btn">
                            <p class="pc-show">上架</p>
                            <p class="m-show" @click="productSetting">上架</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="Object.keys(updateProduct).length === 0" class="right1-close">
                      <img src="../assets/pc/modal-close.png" class="closecate-img aaa" @click="productSetting">
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="content-category">
                <div v-if="!newScreen" class="each-row">
                  <div class="cate-left-block">
                    <div class="cate-row-title">
                      <p class="cate-title">分類項目管理</p>
                    </div>
                    <div>
                      <p class="classification-css">分類</p>
                      <div class="class-div">
                        <p :class="currencyCate === 'all-good' ? 'activeCate' : ''" class="all-good" @click="toshowCate('all-good')">所有商品</p>
                        <p class="all1-good">新品上市</p>
                        <p class="all1-good">限時優惠</p>
                        <p class="all1-good">日用雜貨</p>
                        <p class="all1-good">零食飲料</p>
                        <p class="all1-good">玩具公仔</p>
                      </div>
                    </div>
                  </div>
                  <div class="catetable-block">
                    <div class="row-right">
                      <p class="commodity-text">商品管理</p>
                      <img src="../assets/pc/plus.png" class="plus1-img" @click="toAddFunc">
                    </div>
                    <div class="btncate-block">
                      <p class="active-btn all-css">全部</p>
                      <p class="noactvie-btn all-css">販售中</p>
                      <p class="noactvie-btn all-css">已下架</p>
                      <p class="noactvie-btn all-css">售罄</p>
                      <p class="noactvie-btn all-css">預售</p>
                    </div>
                    <div v-if="cateData">
                      <el-table
                        :data="cateData"
                        height="675"
                        style="width: 92%">
                        <el-table-column
                          prop="serialNo"
                          label="編號"
                          width="70">
                        </el-table-column>
                        <el-table-column
                          prop="productName"
                          label="商品名稱"
                          width="393">
                          <template slot-scope="props">
                            <div>
                              <span v-if="(props.row.state === '已下架') || (props.row.state === '售罄')" class="pink-css">{{props.row.productName}}</span>
                              <span v-else>{{props.row.productName}}</span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="exchangePrice"
                          label="兌換價格"
                          width="150">
                          <template slot-scope="props">
                            <div>
                              <span v-if="(props.row.state === '已下架') || (props.row.state === '售罄')" class="pink-css">{{props.row.exchangePrice}}</span>
                              <span v-else>{{props.row.exchangePrice}}</span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="state"
                          label="狀態"
                          width="100">
                          <template slot-scope="props">
                            <div>   
                              <span v-if="props.row.state === '販售中'" class="white-css">{{props.row.state}}</span>
                              <span v-else-if="props.row.state === '預售'" class="yellow-css">{{props.row.state}}</span>
                              <span v-else-if="props.row.state === '已下架'" class="pink-css">{{props.row.state}}</span>
                              <span v-else-if="props.row.state === '售罄'" class="pink-css">{{props.row.state}}</span>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="advancedSetting"
                          label="進階設定"
                          width="100">
                          <template slot-scope="props">
                            <div @click="toUpdateFunc(props.row)">
                              <img src="../assets/pc/setting.png" class="setting-img">
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <div v-if="!newScreen && plusCondition" class="cate-right-block">
                    <div class="right-close">
                      <img src="../assets/pc/modal-close.png" class="closecate-img" @click="closeCate">
                    </div>
                    <div>
                      <div class="input-cate">
                        <p class="cate-name">新分類名稱</p>
                        <el-input v-model="cateName" placeholder="" class="search-css"></el-input>
                      </div>
                      <p class="cate-btn" @click="closeCate">完成</p>
                    </div>
                  </div>
                </div>
                <div v-else class="each-row">
                  <div class="cate-left1-block">
                    <div class="cate-row-title">
                      <p class="cate-title">分類項目管理</p>
                    </div>
                    <div>
                      <p class="classification-css">分類</p>
                      <div class="class-div">
                        <draggable v-model="cateShow" @start="drag=true" @end="drag=false">
                          <div v-for="(i, index) in cateShow" id="childCateId" :key="index" class="seccate-row">
                            <!-- <p class="allsec-good">{{i.name}}</p> -->
                            <!-- <el-input v-model="cateArrname[index]" class="allsec-good"></el-input> -->
                            <el-input v-model="cateShow[index].name" class="allsec-good"></el-input>
                            <div class="img1-right">
                              <p class="equal-img">=</p>
                              <img src="../assets/pc/red-trash.png" class="track-img" @click="deleteCate(i.value)">
                            </div>
                          </div>
                        </draggable>
                      </div>
                      <p class="notice-text">
                        順序由上至下，對應電腦版為由左至右
                        手機則為相同。
                      </p>
                      <div class="btn-cate" @click="exchangeCate()">
                        <span >完成</span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <!-- <categoryModal v-if="plusCondition" :show="plusCondition" @close="plusCondition = false" /> -->
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'orderManager'" id="orderManagerId" class="refund-css">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test1-text">
                訂單&出貨管理
              </p>
              <div class="manager-css for-pc">
                <el-input v-model="searchInput" placeholder="請輸入會員帳號/兌換編號" class="search-css1"></el-input>
                <div @click="afterSearch">
                  <p class="btn-css">查詢</p>
                </div>
              </div>
              <div class="managerefund-css show-mobile">
                <el-input v-model="searchInput" placeholder="請輸入會員帳號/兌換編號" class="search-css1"></el-input>
              </div>
              <div id="childConHisId" class="date-picker1-css for-pc">
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
              <div id="childConHisId" class="date-picker1-css show-1mobile">
                <el-date-picker
                  v-model="value3"
                  type="date"
                  placeholder="開始時間">
                </el-date-picker>
                <div class="m-refund-row">
                  <el-date-picker
                    v-model="value4"
                    type="date"
                    placeholder="結束時間">
                  </el-date-picker>
                  <div @click="afterSearch">
                    <p class="btn-css">查詢</p>
                  </div>
                </div>
              </div>
              <div class="btnNtable">
                <p class="ordercss">訂單</p>
                <div class="btn-block">
                  <p class="active-btn all-css">全部</p>
                  <p class="noactvie-btn all-css">待處理</p>
                  <p class="noactvie-btn all-css">已出貨</p>
                  <p class="noactvie-btn all-css">已取消</p>
                </div>
                <div v-if="showOrderData">
                  <el-table
                    :data="showOrderData"
                    style="width: 100%">
                    <el-table-column
                      prop="redemptionNo"
                      label="兌換編號"
                      width="150">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.redemptionNo}}</span>
                          <span v-else>{{props.row.redemptionNo}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="orderCreateDate"
                      label="訂單建立日期"
                      width="180">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.orderCreateDate}}</span>
                          <span v-else>{{props.row.orderCreateDate}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="memberAccount"
                      label="會員帳號"
                      width="100">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.memberAccount}}</span>
                          <span v-else>{{props.row.memberAccount}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="productName"
                      label="商品名稱"
                      width="225">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.productName}}</span>
                          <span v-else>{{props.row.productName}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="exchangePrice"
                      label="兌換價格"
                      width="160">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.exchangePrice}}</span>
                          <span v-else>{{props.row.exchangePrice}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="state"
                      label="狀態"
                      width="85">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '待處理'" class="orange-css">{{props.row.state}}</span>
                          <span v-else-if="props.row.state === '已出貨'" class="green-css">{{props.row.state}}</span>
                          <span v-else-if="props.row.state === '已取消'" class="pink-css">{{props.row.state}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="advancedSetting"
                      label="進階設定"
                      width="80">
                      <template slot-scope="props">
                        <div @click="refundDataModal(props.row)">
                          <img src="../assets/pc/setting.png" class="setting-img">
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div id="selectId" class="pagi-block for-pc">
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
                  :total="orderData.length"
                  @current-change="handleOrderManager">
                </el-pagination>
              </div>
              <div id="selectId" class="pagim-block">
                <el-pagination
                  background
                  :page-size="refundm_size"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="orderData.length"
                  @current-change="handlemOrderManager">
                </el-pagination>
              </div>
              <newRefundModal v-if="showNewRefundModal" :show="showNewRefundModal" :send-data="tograndChild" @close="showNewRefundModal = false" />
            </div>
          </div>
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'refundHistory'" id="refundHistoryId">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test1-text">
                會員退貨申請
              </p>
              <div class="manager-css for-pc">
                <el-input v-model="searchInput" placeholder="請輸入會員帳號/兌換編號" class="search-css1"></el-input>
                <div @click="afterSearch">
                  <p class="btn-css">查詢</p>
                </div>
              </div>
              <div class="managerefund-css show-mobile">
                <el-input v-model="searchInput" placeholder="請輸入會員帳號/兌換編號" class="search-css1"></el-input>
              </div>
              <div id="childConHisId" class="date-picker1-css for-pc">
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
              <div id="childConHisId" class="date-picker1-css show-1mobile">
                <el-date-picker
                  v-model="value3"
                  type="date"
                  placeholder="開始時間">
                </el-date-picker>
                <div class="m-refund-row">
                  <el-date-picker
                    v-model="value4"
                    type="date"
                    placeholder="結束時間">
                  </el-date-picker>
                  <div @click="afterSearch">
                    <p class="btn-css">查詢</p>
                  </div>
                </div>
              </div>
              <div class="btnNtable">
                <div class="btn-block">
                  <p class="active-btn all-css">全部</p>
                  <p class="noactvie-btn all-css">待處理</p>
                  <p class="noactvie-btn all-css">已出貨</p>
                  <p class="noactvie-btn all-css">已取消</p>
                </div>
                <div v-if="showRefundData" class="for-pc">
                  <el-table
                    :data="showRefundData"
                    style="width: 100%">
                    <el-table-column
                      prop="redemptionNo"
                      label="兌換編號"
                      width="150">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.redemptionNo}}</span>
                          <span v-else>{{props.row.redemptionNo}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="returnAppTime"
                      label="退貨申請時間"
                      width="180">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.returnAppTime}}</span>
                          <span v-else>{{props.row.returnAppTime}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="memberAcc"
                      label="會員帳號"
                      width="100">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.memberAcc}}</span>
                          <span v-else>{{props.row.memberAcc}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="returnItem"
                      label="退貨品項"
                      width="225">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.returnItem}}</span>
                          <span v-else>{{props.row.returnItem}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="returnQty"
                      label="退貨數量"
                      width="160">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.returnQty}}</span>
                          <span v-else>{{props.row.returnQty}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="receiveGood"
                      label="是否收貨"
                      width="160">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.receiveGood}}</span>
                          <span v-else>{{props.row.receiveGood}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="requestRefund"
                      label="申請退款"
                      width="160">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.requestRefund}}</span>
                          <span v-else>{{props.row.requestRefund}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="trackingNo"
                      label="運送單號"
                      width="160">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.trackingNo}}</span>
                          <span v-else>{{props.row.trackingNo}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="state"
                      label="狀態"
                      width="85">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '等待審核'" class="org-css">{{props.row.state}}</span>
                          <span v-else-if="props.row.state === '等待取件'" class="org1-css">{{props.row.state}}</span>
                          <span v-else-if="props.row.state === '已拒絕'" class="pink-css">{{props.row.state}}</span>
                          <span v-else-if="props.row.state === '結束'" class="white-css">{{props.row.state}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="detail"
                      label="詳細資料"
                      width="80">
                      <template slot-scope="props">
                        <div @click="refundDataModal1(props.row)">
                          <span class="blue-css">開啟</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="showmRefundData" class="foracc-mobile">
                  <el-table
                    :data="showmRefundData"
                    style="width: 100%">
                    <el-table-column
                      prop="redemptionNo"
                      label="兌換編號"
                      width="150">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.redemptionNo}}</span>
                          <span v-else>{{props.row.redemptionNo}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="returnAppTime"
                      label="退貨申請時間"
                      width="180">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.returnAppTime}}</span>
                          <span v-else>{{props.row.returnAppTime}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="memberAcc"
                      label="會員帳號"
                      width="100">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.memberAcc}}</span>
                          <span v-else>{{props.row.memberAcc}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="returnItem"
                      label="退貨品項"
                      width="225">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.returnItem}}</span>
                          <span v-else>{{props.row.returnItem}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="returnQty"
                      label="退貨數量"
                      width="160">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.returnQty}}</span>
                          <span v-else>{{props.row.returnQty}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="receiveGood"
                      label="是否收貨"
                      width="160">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.receiveGood}}</span>
                          <span v-else>{{props.row.receiveGood}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="requestRefund"
                      label="申請退款"
                      width="160">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.requestRefund}}</span>
                          <span v-else>{{props.row.requestRefund}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="trackingNo"
                      label="運送單號"
                      width="160">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '已取消'" class="gray-css">{{props.row.trackingNo}}</span>
                          <span v-else>{{props.row.trackingNo}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="state"
                      label="狀態"
                      width="85">
                      <template slot-scope="props">
                        <div>
                          <span v-if="props.row.state === '等待審核'" class="org-css">{{props.row.state}}</span>
                          <span v-else-if="props.row.state === '等待取件'" class="org1-css">{{props.row.state}}</span>
                          <span v-else-if="props.row.state === '已拒絕'" class="pink-css">{{props.row.state}}</span>
                          <span v-else-if="props.row.state === '結束'" class="white-css">{{props.row.state}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="detail"
                      label="詳細資料"
                      width="80">
                      <template slot-scope="props">
                        <div @click="refundDataModal1(props.row)">
                          <span class="blue-css">開啟</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div id="selectId" class="pagi-block for-pc">
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
              <div id="selectId" class="pagim-block">
                <el-pagination
                  background
                  :page-size="refundm_size"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="refundData.length"
                  @current-change="handlemRefundChange">
                </el-pagination>
              </div>
              <newRefundModal v-if="showNewRefundModal" :show="showNewRefundModal" :send-data="tograndChild" @close="showNewRefundModal = false" />
            </div>
          </div>
        </div>
        <div v-else class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
          <!-- <div class="page-content" >
          </div> -->
        </div>
      </div>
    </div>
    <!-- <div v-if="!newScreen && plusCondition" class="cate-right-block">
      <div class="right-close">
        <img src="../assets/pc/modal-close.png" class="closecate-img" @click="closeCate">
      </div>
      <div>
        <div class="input-cate">
          <p class="cate-name">新分類名稱</p>
          <el-input v-model="cateName" placeholder="" class="search-css"></el-input>
        </div>
        <p class="cate-btn">完成</p>
      </div>
    </div> -->

    <!-- <Footer /> -->
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import "element-ui/lib/theme-chalk/index.css"; 
export default {
  name: 'IndexPage',
  components: {
    draggable,
  },
  data() {
    return {
      activeData: 'storeOwner',
      activeMenu: 'categoryProduct',
      currencyCate: 'all-good',
      userLogin: false,
      opensidebar: true,
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      coupon_size: 20,
      couponm_size: 10,
      refund_size: 20,
      refundm_size: 10,
      refund_tot_page: 0,
      coupon_tot_page: 0,
      currentRefundPage: 1,
      currentCouponPage: 1,
      pagiCalculate: 0,
      showRefundData: [],
      showmRefundData: [],
      showOrderData: [],
      showmOrderData: [],
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
      cateName: '',
      prodName: '',
      prodDescription: '',
      prod1Description: '',
      presellTime: '',
      excPrice: 0,
      noofItem: 0,
      showSearch: false,
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
      orderData: [{
        redemptionNo: '16513521351313',
        orderCreateDate: '2024-12-02 23:56:30',
        memberAccount: 'test01',
        productName: '山丘藍台灣藍莓5盒裝 單盒淨重 100公克 ×5 盒',
        exchangePrice: '999,999,999,999',
        state: '待處理',
        advancedSetting: ''
      }, {
        redemptionNo: '35135135133651',
        orderCreateDate: '2024-12-02 23:56:30',
        memberAccount: 'test02',
        productName: '商品2',
        exchangePrice: '999,999',
        state: '待處理',
        advancedSetting: ''
      }, {
        redemptionNo: '13232135213132',
        orderCreateDate: '2024-12-02 23:56:30',
        memberAccount: 'test03',
        productName: '商品3',
        exchangePrice: '9,999',
        state: '已出貨',
        advancedSetting: ''
      }, {
        redemptionNo: '13232135213132',
        orderCreateDate: '2024-12-02 23:56:30',
        memberAccount: 'test04',
        productName: '商品3',
        exchangePrice: '9,999',
        state: '已取消',
        advancedSetting: ''
      }],
      refundData: [{
        redemptionNo: 'sdvrn454bfdln33',
        returnAppTime: '2024-01-26 18:59',
        memberAcc: 'blackpink321',
        returnItem: 'abcdeljsflkshfkjskdh 商品名稱商品名稱...',
        returnQty: '3',
        receiveGood: '否',
        requestRefund: '500,000',
        trackingNo: '15645161326',
        state: '等待審核',
        detail: '開啟'
      }, {
        redemptionNo: 'berointgrty,954',
        returnAppTime: '2024-01-26 18:59',
        memberAcc: 'titan666',
        returnItem: 'abcdeljsflkshfkjskdh 商品名稱商品名稱...',
        returnQty: '1',
        receiveGood: '是',
        requestRefund: '100,000',
        trackingNo: '65164651512',
        state: '等待審核',
        detail: '開啟'
      }, {
        redemptionNo: 'sdvrn454bfdln33',
        returnAppTime: '2024-01-26 18:59',
        memberAcc: 'blackpink321',
        returnItem: 'abcdeljsflkshfkjskdh 商品名稱商品名稱...',
        returnQty: '3',
        receiveGood: '是',
        requestRefund: '500,000',
        trackingNo: '15645161326',
        state: '等待取件',
        detail: '開啟'
      }, {
        redemptionNo: 'berointgrty,954',
        returnAppTime: '2024-01-26 18:59',
        memberAcc: 'titan666',
        returnItem: 'abcdeljsflkshfkjskdh 商品名稱商品名稱...',
        returnQty: '1',
        receiveGood: '是',
        requestRefund: '100,000',
        trackingNo: '65164651512',
        state: '已拒絕',
        detail: '開啟'
      }, {
        redemptionNo: 'berointgrty,954',
        returnAppTime: '2024-01-26 18:59',
        memberAcc: 'titan666',
        returnItem: 'abcdeljsflkshfkjskdh 商品名稱商品名稱...',
        returnQty: '1',
        receiveGood: '是',
        requestRefund: '100,000',
        trackingNo: '65164651512',
        state: '結束',
        detail: '開啟'
      }, {
        redemptionNo: 'berointgrty,954',
        returnAppTime: '2024-01-26 18:59',
        memberAcc: 'titan666',
        returnItem: 'abcdeljsflkshfkjskdh 商品名稱商品名稱...',
        returnQty: '1',
        receiveGood: '否',
        requestRefund: '100,000',
        trackingNo: '65164651512',
        state: '結束',
        detail: '開啟'
      }],
      showNewRefundModal: false,
      tograndChild: {},
      priceEdit: false,
      editPrice: '',
      imgUpload: '',
      img1Upload: '',
      img2Upload: '',
      img5Upload: '',
      cateData: [{
        serialNo: '1',
        productName: '山丘藍台灣藍莓 5盒裝 單盒淨重 100公克 ×5 盒',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '販售中',
        advancedSetting: '',
        category: '新品上市',
        noofItem: 1,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '2',
        productName: '商品2',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '販售中',
        advancedSetting: '',
        category: '限時特賣',
        noofItem: 2,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '3',
        productName: '商品3',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '預售',
        advancedSetting: '',
        category: '玩具公仔',
        noofItem: 3,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '4',
        productName: '商品4',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '5,000',
        state: '已下架',
        advancedSetting: '',
        category: '零食飲料',
        noofItem: 4,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '5',
        productName: '商品5',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '200',
        state: '售罄',
        advancedSetting: '',
        category: '日用雜貨',
        noofItem: 5,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '6',
        productName: '山丘藍台灣藍莓 5盒裝 單盒淨重 100公克 ×5 盒',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '販售中',
        advancedSetting: '',
        category: '新品上市',
        noofItem: 1,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '7',
        productName: '商品2',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '販售中',
        advancedSetting: '',
        category: '限時特賣',
        noofItem: 2,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '8',
        productName: '商品3',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '販售中',
        advancedSetting: '',
        category: '玩具公仔',
        noofItem: 3,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '9',
        productName: '商品4',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '5,000',
        state: '販售中',
        advancedSetting: '',
        category: '零食飲料',
        noofItem: 4,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '10',
        productName: '商品5',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '200',
        state: '販售中',
        advancedSetting: '',
        category: '日用雜貨',
        noofItem: 5,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '11',
        productName: '山丘藍台灣藍莓 5盒裝 單盒淨重 100公克 ×5 盒',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '販售中',
        advancedSetting: '',
        category: '新品上市',
        noofItem: 1,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '12',
        productName: '商品2',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '販售中',
        advancedSetting: '',
        category: '限時特賣',
        noofItem: 2,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '13',
        productName: '商品3',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '販售中',
        advancedSetting: '',
        category: '玩具公仔',
        noofItem: 3,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '14',
        productName: '商品4',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '5,000',
        state: '販售中',
        advancedSetting: '',
        category: '零食飲料',
        noofItem: 4,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '15',
        productName: '商品5',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '200',
        state: '販售中',
        advancedSetting: '',
        category: '日用雜貨',
        noofItem: 5,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '16',
        productName: '山丘藍台灣藍莓 5盒裝 單盒淨重 100公克 ×5 盒',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '販售中',
        advancedSetting: '',
        category: '新品上市',
        noofItem: 1,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '17',
        productName: '商品2',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '販售中',
        advancedSetting: '',
        category: '限時特賣',
        noofItem: 2,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '18',
        productName: '商品3',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '9,999,999,999',
        state: '販售中',
        advancedSetting: '',
        category: '玩具公仔',
        noofItem: 3,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '19',
        productName: '商品4',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '5,000',
        state: '販售中',
        advancedSetting: '',
        category: '零食飲料',
        noofItem: 4,
        preTime: '2024/02/02 00:00'
      }, {
        serialNo: '20',
        productName: '商品5',
        description: '藍莓是一種深藍色的小果實，是近年來越來越受歡迎的農產品之一。藍莓味道鮮美，並且擁有豐富的營養價值，含有豐富的維生素C、維生素K、維生素E和膳食纖維等多種營養成分。此外，藍莓還含有豐富的抗氧化物質，能夠幫助抵禦自由基對身體的損害，對保持身體健康有很大的幫助。',
        description1: '【注意事項】【商品特色】【商品規格】',
        exchangePrice: '200',
        state: '販售中',
        advancedSetting: '',
        category: '日用雜貨',
        noofItem: 5,
        preTime: '2024/02/02 00:00'
      }],
      showCateRight: false,
      newScreen: false,
      plusCondition: false,
      addnewProduct: false,
      checkList: [],
      updateProduct: {},
      cateShow: [
        {name: '所有商品', value: 'all-good'},
        {name: '新品上市', value: 'val2'},
        {name: '限時優惠', value: 'val3'},
        {name: '日用雜貨', value: 'val4'},
        {name: '零食飲料', value: 'val5'}, 
        {name: '玩具公仔', value: 'val6'},    
      ],
      cateArrname: ['所有商品', '新品上市', '限時優惠', '日用雜貨', '零食飲料', '玩具公仔'],
      mobile: false,
      windowWidth: null
    }
  },
  computed: {
  },
  watch: {
    refund_size() {
      this.refund_size = +this.refund_size;
      this.pagiCalculate = 0;
      this.showReund()
    },
    coupon_size() {
      this.coupon_size = +this.coupon_size;
      this.pagiCalculate = 0;
      this.showOrderItem()
    },
  },
  created() {
    if(this.$route.query && this.$route.query.item) {
      this.activeMenu = this.$route.query.item
    }
    this.resizeFunc();
  },
  methods: {
    resizeFunc() {
      if (typeof window !== "undefined") {
        window.addEventListener("resize", this.checkScreen);
        this.checkScreen();
      }
    },
    checkScreen() {
      if (window) {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth <= 768) {
          this.opensidebar = false
          this.mobile = true;
        } else {
          this.mobile = false;
        }
      }
    },
    activeTab(val) {
      this.activeMenu = val
      if(val === 'refundHistory') {
        this.showReund()
        this.showmReund()
      } else if(val === 'orderManager') {
        this.showOrderItem()
        this.showmOrderItem()
      }
    },
    activemTab(val) {
      this.activeMenu = val
      if(val === 'refundHistory') {
        this.showReund()
        this.showmReund()
      } else if(val === 'orderManager') {
        this.showOrderItem()
        this.showmOrderItem()
      }
      this.opensidebar = !this.opensidebar;
    },
    deleteCate(val) {
      this.$confirm('確定要移除該項目嗎？', 'Warning', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'Delete completed'
        });
        const temp = [...this.cateShow];
        this.cateShow = temp.filter(item => item.value !== val);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        });
      });
    },
    toUpdateFunc(val) {
      this.updateProduct = val
      this.prodName = this.updateProduct.productName
      this.prodDescription = this.updateProduct.description
      this.prod1Description = this.updateProduct.description1
      this.excPrice = this.updateProduct.exchangePrice
      this.noofItem = this.updateProduct.noofItem
      this.presellTime = this.updateProduct.preTime
      this.checkList = []
      this.checkList.push(this.updateProduct.category)
      this.addnewProduct = true
    }, 
    productSetting() {
      this.updateProduct = {}
      this.addnewProduct = false 
    },
    toAddFunc() {
      this.updateProduct = {}
      this.addnewProduct = true
    },
    toshowCate(val) {
      // if(val === this.currencyCate) {
      //   this.currencyCate = ''
      // } else {
      //   this.currencyCate = val
      // }
      // this.showCateRight = !this.showCateRight
    },
    exchangeCate() {
      this.newScreen = !this.newScreen;
    },
    plusCate() {
      this.plusCondition = !this.plusCondition;
    },
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
    handle5Change(file, fileList) {
      this.img5Upload = fileList.url

      const element = document.querySelector('.el-upload--picture-card');
      element.className += 'imgdataHide'; 
    },
    handle2Change(file, fileList) {
      this.img2Upload = fileList.url

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
      if(this.windowWidth <= 768) {
        this.activeMenu = ''
      }
    },
    handleRefundChange(val) {
      this.currentRefundPage = val
      this.showReund()
    },
    handlemRefundChange(val) {
      this.currentRefundPage = val
      this.showmReund()
    },

    handleOrderManager(val) {
      this.currentCouponPage = val
      this.showOrderItem()
    },
    handlemOrderManager(val) {
      this.currentCouponPage = val
      this.showmOrderItem()
    },
    showReund(val) {
      this.refund_tot_page = Math.ceil(this.refundData.length/this.refund_size);
      this.showRefundData = []

      const temp = (this.currentRefundPage - 1) * this.refund_size;
      this.clonelist = [...this.refundData]
      const result = this.clonelist.splice(temp, this.refund_size)
       
      this.showRefundData = result
    }, 
    showmReund() {
      this.refund_tot_page = Math.ceil(this.refundData.length/this.refundm_size);
      this.showmRefundData = []

      const temp = (this.currentRefundPage - 1) * this.refundm_size;
      this.clonelist = [...this.refundData]
      const result = this.clonelist.splice(temp, this.refundm_size)
       
      this.showmRefundData = result
    }, 
    showOrderItem(val) {
      this.coupon_tot_page = Math.ceil(this.orderData.length/this.coupon_size);
      this.showOrderData = []
      const temp = (this.currentCouponPage - 1) * this.coupon_size;
      this.clonelist = [...this.orderData]
      const result = this.clonelist.splice(temp, this.coupon_size)
       
      this.showOrderData = result
    },
    showmOrderItem(val) {
      this.coupon_tot_page = Math.ceil(this.orderData.length/this.couponm_size);
      this.showmOrderData = []
      const temp = (this.currentCouponPage - 1) * this.couponm_size;
      this.clonelist = [...this.orderData]
      const result = this.clonelist.splice(temp, this.couponm_size)
       
      this.showmOrderData = result
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
    refundDataModal1(val) {
      console.log(val);
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
    closeCate() {
      this.newScreen = false
      this.plusCondition = false
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
      if(val && val === 'newRefundPopup') {
        document.body.classList.add('tofix');
        this.showNewRefundModal = true
        this.tograndChild = this.sendData
      }
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
    color: #CECECE;
    font-weight: 400;
    font-size: 1rem;
  }
}

#refundHistoryId, #accountingId, #orderManagerId, #categoryProductId {
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
    line-height: 30px;

    // text-align: center; //coupon
  }
  .el-table th.el-table__cell div {
    line-height: 30px;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background: #191A21 !important;
  }
  .el-date-editor.el-input {
    width: 186px;
    height: 30px;
    line-height: 30px;
    @media screen and (max-width: 768px) {
      width: 263px;
      height: 32px;
      line-height: 32px;
    }
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
#refundHistoryId, #orderManagerId {
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
    font-weight: 400;
    font-size: 16px;
    color: #CECECE;
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

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-input__inner {
    @media screen and (max-width: 768px) {
      width: 230px;
      height: 30px;
    }
  }
  .el-date-editor.el-input {
    @media screen and (max-width: 768px) {
      width: 137px;
      height: 30px;
      line-height: 30px;
    }
  }
}
#categoryProductId {
  .el-table {
    background: #191A21;
    border-radius: 12px;
    padding: 0 1rem 2rem 5px;
    margin: 0 auto 34px;
  }
  .el-input__inner {
    width: 347px;
    width: 300px;
    height: 48px;

    background: #34344C;
    border-radius: 6px;
    border: 1px solid #34344C;
    font-weight: 400;
    font-size: 1rem;
    color: #FFF;
  }
  .el-table_2_column_10 {
    text-align: center;
  }
  .el-table_2_column_8, .el-table_2_column_9 {
    text-align: right;
  }
  .el-table td.el-table__cell div {
    color: #E4E4E4;
  }
  .el-table th.el-table__cell>.cell, .el-table td.el-table__cell div {
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .el-table td.el-table_1_column_1>.cell {
    color: #808080;
  }
  #childCateId {
    .el-input__inner {
      background: #34344C;
      border-radius: 6px;
      width: 109px;
      height: 27px;
      padding: 0 0 0 3px;
      font-weight: 400;
      font-size: 1rem;
      color: #FFF;
      margin-bottom: 0;
    }
  }
}
#childConHisId {
  .el-input__inner {
    width: 186px;
    height: 30px;
    background: #34344C;
    border-radius: 10px;
    border: 1px solid #34344C;
    @media screen and (max-width: 768px) {
      width: 137px;
    }
  }
}
#rightId {
  .el-input__inner {
    font-weight: 400;
    font-size: 16px;
    color: #E4E4E4;
  }
}
#adsId, #addprodId {
  .el-checkbox-group {
    padding-top: 1rem;
    width: 152px;
    height: 243px;
    @media screen and (max-width: 768px) {
      height: auto;
      padding-bottom: 1rem;
    }
  }
  .el-checkbox {
    font-weight: 400;
    font-size: 12px !important;
    color: #808080;
    margin-left: 14px;
  }
  .el-checkbox__inner {
    background-color: #34344C;
    border: 1px solid #808080;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #FFF;
    border: 1px solid #FFF;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #FFF;
  }
  .el-input__inner {
    font-weight: 400;
    font-size: 16px;
    color: #E4E4E4;

    width: 347px;
    width: 300px;
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
    width: 180px;
  }
  .el-upload--picture-card {
    border: 1px dashed transparent;
    background: transparent;
  }
  .el-textarea__inner {
    background: #34344C;
    border-radius: 6px;
    border: 1px solid #34344c;
    height: 200px;
    font-weight: 400;
    font-size: 16px;
    color: #FFF;
  }
  #nameTextareaId {
    .el-textarea__inner {
      width: 347px;
      height: 72px;
      @media screen and (max-width: 768px) {
        width: 265px;
        height: 48px;
        padding: 0 10px;
      }
    }
  }
  #nameTextarea1Id {
    .el-textarea__inner {
      width: 347px;
      @media screen and (max-width: 768px) {
        width: 265px;
        height: 160px;
      }
    }
  }
  #secTextareaId {
    .el-textarea__inner {
      height: 326px;
      @media screen and (max-width: 768px) {
        height: 180px;
      }
    }
  }
  #time1Id {
    .el-input__inner {
      width: 152px;
      height: 32px;
      font-size: 12px;
      padding-left: 10px;
      padding-right: 10px;
      @media screen and (max-width: 768px) {
        width: 263px;
        border-radius: 6px;
      }
    }
  }
  #time2Id, #time4Id {
    .el-input__inner {
      width: 152px;
      height: 32px;
      font-weight: 400;
      font-size: 16px;
      text-align: right;
    }
  }
  #time2Id {
    .el-input__inner {
      @media screen and (max-width: 768px) {
        width: 214px;
        height: 50px;
      }
    }
  }
  #time3Id {
    .el-input__inner {
      width: 152px;
      height: 32px;
      color: #FF0000;
      @media screen and (max-width: 768px) {
        text-align: right;
        width: 263px;
        height: 50px;
      }
    }
  }
  #time4Id {
    .el-input__inner {
      @media screen and (max-width: 768px) {
        width: 263px;
        height: 50px;
      }
    }
  }
}
#addprodId {
  .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: auto;
    height: auto;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    margin: 0;
  }
  .el-upload--picture-card {
    width: 124px;
    height: 124px;
    line-height: 124px;
    position: relative;
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
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    .refund-css {
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
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
      margin: 32px auto 32px;
      .test-text, .test1-text {
        font-weight: 700;
        font-size: 24px;
        color: #FFF;
        margin-left: 63px;
        margin-bottom: 0;
        @media screen and (max-width: 768px) {
          margin-left: 0;
          text-align: center;
          margin-bottom: 1rem;
        }
      }
      .test1-text {
        width: 94%;
        margin: 0px auto 70px;
        @media screen and (max-width: 768px) {
          margin-bottom: 1rem;
        }
      }
      .content-category, .content1-category {
        padding-top: 40px;
        padding-left: 63px;
        position: relative;
        .each-row {
          display: flex;
          align-items: flex-start;
          @media screen and (max-width: 768px) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        }
        .left-addprod {
          background: rgba(25, 26, 33, 0.9);
          border: 1px solid #7161EF;
          backdrop-filter: blur(2px);
          border-radius: 12px;

          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          padding: 1rem;
          .prod-photo {
            font-weight: 700;
            font-size: 12px;
            color: #FFF;
            width: 120px;
            margin: auto auto 9px;
          }
          .prodimg-div {
            text-align: center;
            margin-bottom: 9px;
            position: relative;
            .prod-img {
              width: 120px;
              height: 120px;
            }
            .active-img {
              border: 5px solid #E9F8FF;
            }
            .remove1-img {
              width: 36px;
              height: 36px;
              cursor: pointer;
              position: absolute;
              top: -14px;
              right: 6px;
            }
          }
        }
        .right-addprod {
          background: rgba(25, 26, 33, 0.9);
          border: 1px solid #7161EF;
          backdrop-filter: blur(2px);
          border-radius: 12px;

          padding: 1rem 1rem 2rem 2rem;
          position: relative;
          margin-left: 10px;
          width: 1050px;
          max-width: 1110px;
          height: 763px;
          @media screen and (max-width: 768px) {
            flex-direction: column;
            margin-left: 0;
            width: 95%;
            max-width: 95%;
            margin: auto;
            padding: 20px 39px 57px 39px;
            height: unset;
          }
          .one-row {
            display: flex;
            @media screen and (max-width: 768px) {
              flex-direction: column;
            }
          }
          .coin-div {
            display: flex;
            align-items: center;
            margin-top: 7rem;
            @media screen and (max-width: 768px) {
              display: none;
            }
            .pricecoin-img {
              width: 24px;
              height: 24px;
              margin-left: 10px;
              margin-right: 10px;
            }
          }
          .child-right-block {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .check-block {
              background: #34344C;
              border-radius: 6px;
              width: 152px;
            }
            .timecss {
              margin-top: 11px;
              .pricecoin1-img {
                width: 24px;
                height: 24px;
                margin-right: 21px;
              }
            }
            .time1css {
              margin-top: 11px;
              margin-bottom: 34px;
            }
          }
          .prod-btn, .prod1-btn {
            background: #332B50;
            color: #5D4C9A;
            border-radius: 12px;
            width: 200px;
            height: 40px;
            line-height: 40px;
            font-weight: 400;
            font-size: 20px;
            text-align: center;
            cursor: pointer;
            margin-bottom: 0;
            @media screen and (max-width: 768px) {
              margin: 47px auto 0;
            }
          }
          .prod1-btn {
            background: linear-gradient(90deg, #7161EF 0%, #432FDE 100%);
            color: #FFF;
            @media screen and (max-width: 768px) {
              margin: 47px auto 0;
            }
          }
          .prod-photo {
            font-weight: 700;
            font-size: 12px;
            color: #FFF;
            width: 120px;
            margin: auto auto 9px;
          }
          .advantSetting {
            margin-left: 10px;
          }
          .advantSetting {
            font-weight: 700;
            font-size: 12px;
            color: #FFF;
            margin-bottom: 0;
            width: calc(124px + 17px);
          }
          .advant1Setting {
            font-weight: 700;
            font-size: 12px;
            color: #FFF;
            margin-bottom: 0;
            height: 24px;
            line-height: 24px;
          }
          .newSettingTxt {
            font-weight: 700;
            font-size: 12px;
            color: #FFF;
            margin-bottom: 0;
            width: 124px;
            border: 1px solid #F35A90;
            text-align: center;
            height: 24px;
            line-height: 24px;
            margin-left: 12px;
          }
          .one1row {
            display: flex;
            width: 347px;
            @media screen and (max-width: 768px) {
              width: 100%;
              margin-bottom: 1rem;
            }
          }
          .onerow {
            display: flex;
            justify-content: space-between;
            .hidetext {
              width: 347px;
              margin-bottom: 0;
              visibility: hidden;
              @media screen and (max-width: 768px) {
                display: none;
              }
            }
          }
          .one2row {
            display: flex;
            justify-content: space-between;
            width: 370px;
            @media screen and (max-width: 768px) {
              display: none;
            }
            .photoPreview {
              color: #FFF;
              font-size: 12px;
              margin-bottom: 0;
              line-height: 34px;
              font-weight: 700;
              text-align: center;
            }
            .viewall, .view1all {
              color: #00A0FF;
              font-size: 12px;
              margin-bottom: 0;
              line-height: 34px;
              font-weight: 700;
            }
            .view1all {
              color: #34344C;
            }
          }
          .imgupload-row {
            display: flex;
            @media screen and (max-width: 768px) {
              flex-direction: column;
              width: 100%;
            }
            .img-row {
              display: flex;
              width: 347px;
              @media screen and (max-width: 768px) {
                width: 100%;
              }
            }
            .preview-div {
              display: none;
              @media screen and (max-width: 768px) {
                display: flex;
              }
              .view-css {
                color: #00A0FF;
                font-size: 14px;
                font-weight: 400;
                width: 124px;
                margin-top: 12px;
                margin-right: 17px;
                margin-bottom: 0;
                text-align: center;
              }
            }
            .show-img {
              width: 370px;
              height: 194px;
              @media screen and (max-width: 768px) {
                width: 265px;
                height: auto;
                margin-top: 1rem;
              }
            }
          }
          .sec2-row {
            width: 124px;
            height: 124px;
            background: #191A21;
            border: 1px solid #263B71;
            margin: 0 17px 13px;
            margin-left: 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            justify-content: center;
            @media screen and (max-width: 768px) {
              margin-bottom: 0;
            }
            .img-icon {
              width: 40px;
              height: 40px;
            }
            .text-photo {
              font-weight: 400;
              font-size: 14px;
              color: #FFF;
              margin-bottom: 0;
              position: absolute;
              bottom: -47px;
              width: 100%;
            }
          }
          .input-block {
            display: flex;
            @media screen and (max-width: 768px) {
              flex-direction: column;
            }
            .prod-left {
              margin-right: 20px;
            }
            .prod-div1, .prod-div2 {
              margin-top: 37px;
              
              .prod-css {
                background: #34344C;
                border-radius: 6px;
                width: 347px;
                width: 347px;
                // height: 72px; 
                @media screen and (max-width: 768px) {
                  width: 265px;
                }
              }
              .prod-description {
                background: #34344C;
                border-radius: 6px;
                width: 347px;
                width: 300px;
                height: 200px;
                @media screen and (max-width: 768px) {
                  width: 265px;
                  height: 160px;
                }
              }
              .prod1-description {
                background: #34344C;
                border-radius: 6px;
                width: 347px;
                width: 347px;
                height: 326px;
                @media screen and (max-width: 768px) {
                  width: 265px;
                  height: 180px;
                }
              }
            }
            .prod-div2 {
              margin-top: 26px;
            }
          }
          .prod-name {
            font-weight: 400;
            font-size: 12px;
            color: #808080;
            margin-bottom: 5px;
          }
          .prod-nname {
            font-weight: 400;
            font-size: 12px;
            color: #808080;
            margin-bottom: 8px;
          }
          .prod1-name {
            font-weight: 400;
            font-size: 12px;
            color: #808080;
            margin-bottom: 0;
            height: 34px;
            line-height: 34px;
          }
        }
      }
      .content-category {
        @media screen and (max-width: 768px) {
          padding-left: 0;
        }
      }
      .content1-category {
        max-width: 1322px;
        padding-top: 0;
        padding-left: 33px;
        display: flex;
        @media screen and (max-width: 768px) {
          width: 100%;
          max-width: 100%;
          padding-left: 0;
        }
      }
      .img1-right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 60px;
      }

      .cate-left-block, .cate-left1-block, .cate1-left-block {
        background: #191A21;
        border-radius: 12px;
        width: 249px;
        min-width: 170px;
        // height: 377px;
        padding: 1rem;
        .cate-row-title, .cate1-row-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          .cate-title {
            font-weight: 700;
            font-size: 14px;
            color: #FFF;
            margin-bottom: 0;
          }
          
        }
        .cate1-row-title, .addbelow {
          padding: 0 1rem;
        }
        .classification-css {
          font-weight: 400;
          font-size: 12px;
          color: #808080;
          margin-bottom: 10px;
        }
        .class-div {
          .activeCate {
            color: #00A0FF !important;
          }
          .seccate-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .all-good {
            font-weight: 400;
            font-size: 16px;
            color: #FFF;
            cursor: pointer;
          }
          .all1-good {
            font-weight: 400;
            font-size: 16px;
            color: #FFF;
            cursor: pointer;
          }
          .allsec-good {
            background: #34344C;
            border-radius: 6px;
            width: 109px;
            padding: 0 0 0 3px;
            font-weight: 400;
            font-size: 1rem;
            color: #FFF;
            margin-bottom: 0;
          }
          .equal-img {
            font-weight: 400;
            font-size: 16px;
            color: #FFF;
            margin-bottom: 0;
            width: 30px;
            text-align: center;
          }
          .track-img {
            width: 10px;
            height: 10px;
            cursor: pointer;
          }
        }
        .notice-text {
          font-weight: 400;
          font-size: 12px;
          color: #808080;
          margin-top: 21px;
          margin-bottom: 29px;
        }

        .btn-cate {
          font-weight: 400;
          font-size: 1rem;
          color: #FFF;

          background: linear-gradient(90deg, #7161EF 0%, #3C27DC 100%);
          border-radius: 12px;
          width: 120px;
          height: 40px;
          line-height: 40px;
          margin: auto;
          text-align: center;
          cursor: pointer;
        }
      }
      .cate-left1-block {
        height: 425px;
        padding: 10px 1rem 1rem;
      }
      .cate1-left-block {
        position: relative;
        padding: 1rem 0;
        min-width: 202px;
        max-width: 202px;
        @media screen and (max-width: 768px) {
          display: none;
        }
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
        width: 100%;
        min-height: calc(100vh - 64px);
        position: relative;
      }
      .left-block {
        margin-bottom: 2rem;
      }
      .center-block, .center1-block {
        background: #191A21;
        border: 1px solid #7161EF;
        border-radius: 12px;

        padding: 23px 1rem 43px;
        width: 500px;
        margin-left: 10px;

        position: absolute;
        top: 50%;
        left: calc(50% - 160px);
        transform: translate(-50%, -50%);
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
            width: 40px;
            height: 40px;
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
            width: 40px;
            height: 40px;
          }
        }
        .third-row {
          width: 393px;
          margin: 90px auto 150px;
        }
        .third1-row {
          width: 393px;
          margin: 60px auto 40px;
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
      .center1-block {
        left: calc(50% - 55px);
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
      .date-picker-css, .date-picker1-css, .date-picker2-css {
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
        width: 94%;
        margin: 30px auto 0;
        @media screen and (max-width: 768px) {
          margin-top: 1rem; 
          margin-left: 0;
          padding-left: 63px;
        }
        .m-refund-row {
          @media screen and (max-width: 768px) {
            margin-top: 19px;
            display: flex;
          }
        }
      }
      .date-picker2-css {
        margin-left: 0px;
      }
      .btnNtable, .catetable-block {
        width: 94%;
        background: #191A21;
        border-radius: 12px;
        padding: 1rem 1rem 2rem 2rem;
        margin: 30px auto 34px;
        .ordercss {
          color: #FFF;
          font-size: 14px;
          font-weight: 700;
        }
        .btn-block, .btncate-block {
          display: flex;
          align-items: center;
          @media screen and (max-width: 768px) {
            width: 100%;
            overflow-x: scroll;
          }
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
            @media screen and (max-width: 768px) {
              min-width: 100px;
            }
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
        .btn-block {
          @media screen and (max-width: 768px) {
            width: 100%;
            overflow-x: scroll;
            padding-bottom: 1rem;
          }

        }
      }
      .commodity-text {
        font-weight: 700;
        font-size: 14px;
        color: #FFF;
        margin-bottom: 0;
      }
      .btncate-block {
        margin-bottom: 45px;
        @media screen and (max-width: 768px) {
          padding-bottom: 16px;
          margin-bottom: 29px;
        }
      }
      .catetable-block {
        width: 877px;
        margin: 0;
        margin-left: 1rem;
        padding: 1rem;
        @media screen and (max-width: 768px) {
          margin-left: 0;
          width: 90%;
          margin-top: 39px;
        }
        .row-right {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
      }
      .pagi-block, .pagim-block {
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
      .pagim-block {
        display: none;
        @media screen and (max-width: 768px) {
          display: flex;
          justify-content: center;
          margin-left: 0;
          margin-bottom: 0;
        }
      }
      .manager-css, .managerefund-css {
        width: 94%;
        margin: 30px auto 0;
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
          @media screen and (max-width: 768px) {
            width: 230px;
          }
        }
      }
      .managerefund-css {
        @media screen and (max-width: 768px) {
          margin-top: 0; 
          width: 100%; 
          padding-left: 63px; 
          margin-left: 0;
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
      .orange-css, .pink-css, .green-css, .white-css, .blue-css, .yellow-css, .gray-css, .org-css, .org1-css {
        font-weight: 400;
        font-size: 16px;
        color: #FFA451;
      }
      .pink-css {
        color: #F35A90 !important;
      }
      .org-css {
        color: #FF8A65;
      }
      .org1-css {
        color: #FFF965;
      }
      .gray-css {
        color: #677198;
        font-size: 16px;
      }
      .green-css {
        color: #35E818;
      }
      .yellow-css {
        color: #F0FF40 !important;
      }
      .white-css {
        color: #E4E4E4 !important;
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
        margin-left: 5px;
        cursor: pointer;

        color: #00A0FF;
        @media screen and (max-width: 768px) {
          margin-left: 18px;
        }
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
      .img-setting {
        width: 30px;
        text-align: center;
      }
      .setting-img {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
      .plus1-img {
        width: 12px;
        height: 12px;
        cursor: pointer;
      }
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
      @media screen and (max-width: 768px) {
        padding-left: 0;
      }
    }
  }
}
.right-close, .right1-close {
  text-align: right;
  .closecate-img {
    width: 20px;
    height: 19px;
    cursor: pointer;
  }
}
.right1-close {
  position: absolute;
  top: 15px;
  right: 15px;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.cate-right-block {
  background: #191A21;
  border-radius: 12px;
  width: 500px;
  height: 315px;
  padding: 1rem;
  margin-left: 46px;
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%); 
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
    font-weight: 400;
    font-size: 1rem;
    color: #FFF;
  }
}
.pc-show {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.m-show {
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.for-pc {
  @media screen and (max-width: 768px) {
    display: none !important;
  }
}
.show-mobile {
  display: none !important;
  @media screen and (max-width: 768px) {
    display: flex !important;
  }
}
.show-1mobile {
  display: none !important;
  @media screen and (max-width: 768px) {
    display: flex !important;
    flex-direction: column;
    align-items: flex-start !important;
    justify-content: flex-start !important;
  }
}
.foracc-mobile {
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
  }
}
</style>
