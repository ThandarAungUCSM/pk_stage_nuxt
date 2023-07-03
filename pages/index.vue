<template>
  <div>
    <!-- @checkAuth="checkAuth" -->
    <!-- page="prodDetail" // sidebar bugs -->
    <!-- <Header /> -->

    <div class="content-css">
      <div class="content-block">
        <SidebarCom :opensidebar="opensidebar" :activedata="activeData" @sidebarFunc="sidebarFunc" @activeTab="activeTab" @activemTab="activemTab" />
        <refundModal v-if="showRefundModal" :show="showRefundModal" :send-data="sendData" @close="openRefund" />
        <div v-if="activeMenu !== '' && activeMenu === 'currencyManager'" :class="opensidebar ? 'm1-currency' : 'm-currency'" id="currencyManagerId">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="equal-text">
                遊戲幣值比率
              </p>
              <div class="pad-css">
                <div class="row-css">
                  <div v-if="currencyData" class="left-content">
                    <el-table
                      class="for-pc"
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
                    <el-table
                      class="for-mobile"
                      :data="currencyData"
                      style="width: 97%"
                      :row-class-name="tableRowClassName">
                      <el-table-column
                        prop="gameName"
                        label="遊戲名稱"
                        width="72">
                      </el-table-column>
                      <el-table-column
                        prop="currency"
                        label="幣別"
                        width="93">
                        <template slot-scope="props">
                          <span class="">PK/{{ props.row.currency }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="use"
                        label="採用"
                        width="135">
                        <template slot-scope="props">
                          <span v-if="props.row.state && props.row.state === 'pause'" class="">{{ props.row.use }}(停用)</span>
                          <span v-else class="">{{ props.row.use }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="edit"
                        label="編輯"
                        width="47">
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
                          <el-input v-model="editPrice" pattern="[0-9]{4} [0-9]{3} [0-9]{3}" oninput="this.value = this.value.replace(/^0/, ''); this.value = this.value.replace(/[^0-9.]/g, ''); " placeholder="" onfocus="this.placeholder=''" class="name1-css"></el-input>
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
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'bannerAdvertise'" :class="opensidebar ? 'm1-currency' : 'm-currency'">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <div v-if="!showAds1" class="row-content">
                <div class="left-block">
                  <p class="equal-text">
                    橫幅廣告管理
                  </p>
                  <div class="pad-css">
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
                </div>

                <div :class="showCenter === true ? 'show1css' : 'hide1css'">
                  <div id="adsId" :class="opensidebar ? 'center-block' : 'center1-block'">
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
              </div>
              <div v-else-if="!deleteItem" class="row-content">
                <div class="left-block">
                  <p class="equal-text">
                    橫幅廣告管理
                  </p>
                  <div class="pad-css">
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
              </div>
              <div v-else-if="deleteItem" class="row-content">
                <div class="left-block">
                  <p class="equal-text">
                    橫幅廣告管理
                  </p>
                  <div class="pad-css">
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
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'categoryProduct'" id="categoryProductId">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                上架商品管理(平台)
              </p>
              <div v-if="addnewProduct" class="content1-category">
                <div class="cate1-left-block">
                  <div class="cate1-row-title">
                    <p class="cate-title">分類項目管理</p>
                    <div class="img-right">
                      <img src="../assets/pc/setting.png" class="setting-img" @click="exchangeCate()">
                      <img src="../assets/pc/plus.png" class="plus1-img" @click="plusCate()">
                    </div>
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
                  <div>
                    <p class="advantSetting">
                      商品進階設定  
                      <span v-if="updateProduct.state === '販售中'" class="advantSetting white-css">{{updateProduct.state}}</span>
                      <span v-else-if="updateProduct.state === '預售'" class="advantSetting yellow-css">{{updateProduct.state}}</span>
                      <span v-else-if="(updateProduct.state === '已下架') || (updateProduct.state === '售罄')" class="advantSetting pink-css">{{updateProduct.state}}</span>
                    </p>
                    <p class="photoPreview">商品照片預覽</p>
                    <div class="sec2-row">
                      <el-upload
                        :on-change="handle2Change"
                        action="#"
                        list-type="picture-card"
                        :auto-upload="false" 
                        >
                          <img v-if="img2Upload === ''" src="../assets/pc/img-img.png" class="img-icon">
                      </el-upload>
                    </div>
                    <div v-if="(Object.keys(updateProduct).length > 0) && (updateProduct.state === '已下架')" class="photo-flex">
                      <p class="addprod-photo1-txt">刪除</p>
                    </div>
                    <div v-else class="photo-flex">
                      <p class="addprod-photo-txt">新增商品照片</p>
                      <p class="addprod-photo-txt">新增了解更多照片</p>
                      <p v-if="Object.keys(updateProduct).length > 0" class="addprod-photo1-txt">下架此商品</p>
                    </div>
                    <div class="input-block">
                      <div class="prod-left">
                        <div id="nameTextareaId" class="prod-div1">
                          <p class="prod-name">商品名稱：</p>
                          <el-input v-model="prodName" type="textarea" :rows="2" placeholder="" class="prod-css"></el-input>
                        </div>
                        <div class="prod-div2">
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
                        <p class="prod-name">商品分類：</p>
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
                        <p class="prod-name">預售時間</p>
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
                        <p class="prod-name">商品兌換價：</p>
                        <el-input v-model="excPrice" placeholder="0" class=""></el-input>
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
                        <p v-else class="prod-btn">上架</p>
                      </div>
                    </div>
                  </div>
                  <div v-if="Object.keys(updateProduct).length === 0" class="right1-close">
                    <img src="../assets/pc/modal-close.png" class="closecate-img aaa" @click="productSetting">
                  </div>
                </div>
              </div>
              <div v-else class="content-category">
                <div v-if="!newScreen" class="each-row">
                  <div class="cate-left-block">
                    <div class="cate-row-title">
                      <p class="cate-title">分類項目管理</p>
                      <div class="img-right">
                        <img src="../assets/pc/setting.png" class="setting-img" @click="exchangeCate()">
                        <img src="../assets/pc/plus.png" class="plus1-img" @click="plusCate()">
                      </div>
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
                  <div v-if="showCateRight" class="catetable-block">
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
                            <div @click="refundDataModal(props.row)">
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
                            <div @click="refundDataModal(props.row)">
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
                            <div @click="refundDataModal(props.row)">   
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
                      <div class="img-right">
                        <div class="img-setting">
                          <img src="../assets/pc/setting.png" class="setting-img" @click="exchangeCate()">
                        </div>
                        <img src="../assets/pc/plus.png" class="plus1-img" @click="plusCate()">
                      </div>
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
        <div v-else-if="activeMenu !== '' && activeMenu === 'couponManager'" id="couponManagerId" class="coupon-block">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="coupon-text">
                優惠券管理 
              </p>
              <div class="man-coupon-css">
                <div class="btn-div" @click="showModal = true">
                  <img src="../assets/pc/plus.png" class="plus-img">
                  <p class="manager-btn">新增優惠券</p>
                </div>
              </div>
              <div v-if="showCouponData" class="for-pc">
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
              <div v-if="showmCouponData" class="foracc-mobile">
                <el-table
                  :data="showmCouponData"
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
              <div id="selectId" class="pagi-block for-pc">
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
              <div id="selectId" class="pagim-block">
                <el-pagination
                  background
                  :page-size="couponm_size"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="couponData.length"
                  @current-change="handleCouponmCurrentChange">
                </el-pagination>
              </div>
            </div>
          </div>
          <couponModal v-if="showModal" :show="showModal" @close="showModal = false" @selectData="selectData" />
          <settingModal v-if="showSettingModal" :show="showSettingModal" :send-data="eachSetting" @close="showSettingModal = false" @settingData="settingData" />
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'membershipManager'" id="managerId" class="managid-css">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                會員資料查詢
              </p>
              <div class="padacc-css">
                <div class="manag-div-css">
                  <el-input v-model="searchInput" placeholder="請輸入會員帳號" class="search-manag-css"></el-input>
                  <div @click="afterSearch">
                    <p class="btn-css">查詢</p>
                  </div>
                </div>

                <div v-if="showSearch" class="" >
                  <p class="basic-info1">基本資料</p>
                  <div class="each-black-block manag-pc">
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
                  <div class="each-black-block manag-m">
                    <div class="m-scroll1">
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
                    </div>
                    <div class="m-scroll2">
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
                  </div>

                  <p class="basic-info2">已連動的遊戲</p>
                  <div class="each-black-block manag-pc">
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
                  <div class="each-black-block manag-m">
                    <div class="m-scroll1">
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
          </div>
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'convertHistory'" id="convertHistoryId" class="convertHistId-css">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="convertHistory-text">
                會員兌換記錄
              </p>
              <div class="padacc-css">
                <div class="manager-css for-m-convertHist">
                  <el-input v-model="searchInput" placeholder="請輸入會員帳號/兌換編號" class="search-convert-css"></el-input>
                  <div @click="afterSearch">
                    <p class="btn-css">查詢</p>
                  </div>
                </div>
                <div v-if="showConvertHistoryData" class="conv-history-table for-pc">
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
                <div v-if="showmConvertHistoryData" class="conv-history-table foracc-mobile">
                  <el-table
                    :data="showmConvertHistoryData"
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
              </div>
              <div id="selectId" class="pagi-block for-pc">
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
              <div id="selectId" class="pagim-block">
                <el-pagination
                  background
                  :page-size="convertm_size"
                  :pager-count="11"
                  layout="prev, pager, next"
                  :total="convertData.length"
                  @current-change="handleConvertmCurrentChange">
                </el-pagination>
              </div>
            </div>
          </div>
          <convertModal v-if="showConvertModal" :show="showConvertModal" :send-data="sendData" @close="showConvertModal = false" @convertModalData="convertModalData" />
        </div>
        <div v-else-if="activeMenu !== '' && activeMenu === 'refundHistory'" id="refundHistoryId" class="refund-css">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                退貨審核管理
              </p>
              <div class="manager-css show-pc">
                <el-input v-model="searchInput" placeholder="請輸入會員帳號/兌換編號" class="search-css1"></el-input>
                <div @click="afterSearch">
                  <p class="btn-css">查詢</p>
                </div>
              </div>
              <div class="managerefund-css show-mobile">
                <el-input v-model="searchInput" placeholder="請輸入會員帳號/兌換編號" class="search-css1"></el-input>
              </div>
              <div id="childConHisId" class="date-picker1-css show-pc">
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
                <div class="btn1-block">
                  <p class="active-btn all-css">全部</p>
                  <p class="noactvie-btn all-css">等待審核</p>
                  <p class="noactvie-btn all-css">結束</p>
                  <p class="noactvie-btn all-css">已拒絕</p>
                  <p class="noactvie-btn all-css">等待取件</p>
                </div>
                <div v-if="showRefundData" class="for-pc">
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
                          <span v-else-if="props.row.state === '等待取件'" class="yell1ow-css">{{props.row.state}}</span>
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
                <div v-if="showmRefundData" class="foracc-mobile">
                  <el-table
                    :data="showmRefundData"
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
                          <span v-else-if="props.row.state === '等待取件'" class="yell1ow-css">{{props.row.state}}</span>
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
        <div v-else-if="activeMenu !== '' && activeMenu === 'accounting'" id="accountingId">
          <div class="whole-content" :class="opensidebar ? 'opentrue' : 'openfalse'">
            <div class="rightall-content" >
              <p class="test-text">
                對帳資料
              </p>
              <div class="padacc-css">
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
                <div class="date-pickerm-css">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="開始時間">
                  </el-date-picker>
                  <div class="m-date">
                    <el-date-picker
                      v-model="value2"
                      type="date"
                      placeholder="結束時間">
                    </el-date-picker>
                    <div>
                      <p class="btn-css">查詢</p>
                    </div>
                  </div>
                </div>
                <div v-if="showData" class="for-pc">
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
                      label="兌換小計(PK)"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="typeofCoupon"
                      label="優惠券種類"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="discountPoint"
                      label="優惠點數(PK)"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="gameName"
                      label="扣除遊戲名稱"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="gameCurrency"
                      label="扣除遊戲幣"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="totalConversion"
                      label="兌換合計(PK)"
                      width="120">
                    </el-table-column>
                  </el-table>
                </div>
                <div v-if="showmData" class="foracc-mobile">
                  <el-table
                    :data="showmData"
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
                      label="兌換小計(PK)"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="typeofCoupon"
                      label="優惠券種類"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="discountPoint"
                      label="優惠點數(PK)"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="gameName"
                      label="扣除遊戲名稱"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="gameCurrency"
                      label="扣除遊戲幣"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="totalConversion"
                      label="兌換合計(PK)"
                      width="120">
                    </el-table-column>
                  </el-table>
                </div>
                <div id="selectId" class="pagi-block for-pc">
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
                <div id="selectId" class="pagim-block">
                  <el-pagination
                    background
                    :page-size="pagem_size"
                    :pager-count="11"
                    layout="prev, pager, next"
                    :total="tableData.length"
                    @current-change="handleCurrentmChange">
                  </el-pagination>
                </div>
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
      userLogin: false,
      opensidebar: true,
      activeMenu: '',
      activeData: 'admin',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      pagem_size: 10,
      refundm_size: 10,
      convertm_size: 10,
      couponm_size: 10,
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
      showmData: null,
      showRefundData: null,
      showmRefundData: null,
      showCouponData: null,
      showmCouponData: null,
      showConvertHistoryData: null,
      showmConvertHistoryData: null,
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
      img2Upload: '',
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
      }],
      showCateRight: false,
      currencyCate: '',
      newScreen: false,
      plusCondition: false,
      addnewProduct: false,
      checkList: ['日用雜貨'],
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
    if(this.$route.query && this.$route.query.item) {
      this.activeMenu = this.$route.query.item
    }
    this.resizeFunc();
  },
  destroyed() {
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
      if(val === 'currencyManager') {
        this.eachcondition = 'normal';
        this.editPrice = '';
      }
      this.activeMenu = val
      if(val === 'convertHistory') {
        this.showConvertHistoryItem()
        this.showmConvertHistoryItem()
      } else if(val === 'couponManager') {
        this.showCouponItem()
        this.showmCouponItem()
      } else if(val === 'refundHistory') {
        this.showReund()
        this.showmReund()
      } else if(val === 'accounting') {
        this.showItem()
        this.showmItem()
      }
    },
    activemTab(val) {
      if(val === 'currencyManager') {
        this.eachcondition = 'normal';
        this.editPrice = '';
      }
      this.activeMenu = val
      if(val === 'convertHistory') {
        this.showConvertHistoryItem()
        this.showmConvertHistoryItem()
      } else if(val === 'couponManager') {
        this.showCouponItem()
        this.showmCouponItem()
      } else if(val === 'refundHistory') {
        this.showReund()
        this.showmReund()
      } else if(val === 'accounting') {
        this.showItem()
        this.showmItem()
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
      // alert(JSON.stringify(this.updateProduct))
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
      if(val === this.currencyCate) {
        this.currencyCate = ''
      } else {
        this.currencyCate = val
      }
      this.showCateRight = !this.showCateRight
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
    handleCurrentChange(val) {
      this.currentPage = val
      this.showItem()
    },
    handleCurrentmChange(val) {
      this.currentPage = val
      this.showmItem()
    },
    handleRefundChange(val) {
      this.currentRefundPage = val
      this.showReund()
    },
    handlemRefundChange(val) {
      this.currentRefundPage = val
      this.showmReund()
    },
    handleCouponCurrentChange(val) {
      this.currentCouponPage = val
      this.showCouponItem()
    },
    handleCouponmCurrentChange(val) {
      this.currentCouponPage = val
      this.showmCouponItem()
    },
    handleConvertCurrentChange(val) {
      this.currentConvertPage = val
      this.showConvertHistoryItem()
    },
    handleConvertmCurrentChange(val) {
      this.currentConvertPage = val
      this.showmConvertHistoryItem()
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
    showmItem() {
      this.total_page = Math.ceil(this.tableData.length/this.pagem_size);
      this.showmData = []
      const temp = (this.currentPage - 1) * this.pagem_size;
      this.clonelist = [...this.tableData]
      const result = this.clonelist.splice(temp, this.pagem_size)
      this.showmData = result
    },
    showReund() {
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
    showCouponItem() {
      this.coupon_tot_page = Math.ceil(this.couponData.length/this.coupon_size);
      this.showCouponData = []
      const temp = (this.currentCouponPage - 1) * this.coupon_size;
      this.clonelist = [...this.couponData]
      const result = this.clonelist.splice(temp, this.coupon_size)
       
      this.showCouponData = result
    },
    showmCouponItem() {
      this.coupon_tot_page = Math.ceil(this.couponData.length/this.couponm_size);
      this.showmCouponData = []
      const temp = (this.currentCouponPage - 1) * this.couponm_size;
      this.clonelist = [...this.couponData]
      const result = this.clonelist.splice(temp, this.couponm_size)
       
      this.showmCouponData = result
    },
    showConvertHistoryItem() {
      this.convert_tot_page = Math.ceil(this.convertData.length/this.convert_size);
      this.showConvertHistoryData = []
      const temp = (this.currentConvertPage - 1) * this.convert_size;
      this.clonelist = [...this.convertData]
      const result = this.clonelist.splice(temp, this.convert_size)
       
      this.showConvertHistoryData = result
    },
    showmConvertHistoryItem() {
      this.convert_tot_page = Math.ceil(this.convertData.length/this.convertm_size);
      this.showmConvertHistoryData = []
      const temp = (this.currentConvertPage - 1) * this.convertm_size;
      this.clonelist = [...this.convertData]
      const result = this.clonelist.splice(temp, this.convertm_size)
       
      this.showmConvertHistoryData = result
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

#accountingId, #couponManagerId, #convertHistoryId, #currencyManagerId, #refundHistoryId, #categoryProductId {
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
    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
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
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
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
      width: 341px;
      height: 48px;
      line-height: 48px;
    }
  }
  .el-input__inner {
    height: 30px;
    line-height: 30px;
    @media screen and (max-width: 768px) {
      width: 150px;
    }
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
#couponManagerId {
  .el-table {
    @media screen and (max-width: 768px) {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .el-date-editor.el-input {
    @media screen and (max-width: 768px) {
      width: 196px;
      width: 100%;
    }
  }
  .el-input__inner {
    @media screen and (max-width: 768px) {
      width: 100%;
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
    font-weight: 400;
    font-size: 16px;
    color: #CECECE;
    @media screen and (max-width: 768px) {
      width: 230px;
    }
  }
  .el-table th.el-table_1_column_5>.cell, .el-table th.el-table_1_column_6>.cell {
    text-align: right;
  }
  .el-table th.el-table_1_column_7>.cell, .el-table td.el-table_1_column_7>.cell {
    text-align: center;
  }
  .el-table td.el-table__cell div {
    color: #E4E4E4;
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
  .el-table {
    @media screen and (max-width: 768px) {
      padding-top: 1.1rem;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
#refundHistoryId {
  .el-table {
    background: #191A21;
    border-radius: 12px;
    padding: 1rem 1rem 2rem 5px;
    margin: 0 auto 34px;
    @media screen and (max-width: 768px) {
      padding: 0 1rem 2rem 0;
    }
  }
  .el-table th.el-table__cell>.cell, .el-table td.el-table__cell>.cell {
    @media screen and (max-width: 768px) {
      padding-left: 0;
    }
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
    @media screen and (max-width: 768px) {
      width: 230px;
    }
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
  .el-date-editor.el-input {
    @media screen and (max-width: 768px) {
      width: 137px;
      height: 30px;
      line-height: 30px;
    }
  }
}
#accountingId {
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  .el-date-editor.el-input {
    @media screen and (max-width: 768px) {
      width: 150px;
      height: 30px;
      line-height: 30px;
    }
  }
  .el-table {
    background: #191A21;
    border-radius: 12px;
    padding: 3rem 1rem 2rem 1rem;
    margin: 29px auto 34px;
    @media screen and (max-width: 768px) {
      padding: 5px 1rem 2rem 1rem;
    }
  }
  .el-table th.el-table__cell {
    @media screen and (max-width: 768px) {
      height: 60px;
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
    @media screen and (max-width: 768px) {
      width: 341px;
    }
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
#currencyManagerId {
  .el-table {
    padding: 2rem 1rem 2rem 1rem;
    margin-top: 0;
    margin-left: 63px;
    @media screen and (max-width: 768px) {
      margin-left: 0;
      margin: auto;
      padding: 2rem 5px;
    }
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
#adsId, #addprodId {
  .el-checkbox-group {
    padding-top: 1rem;
    width: 152px;
  }
  .el-date-editor.el-input {
    // width: 186px;
    // height: 30px;
    // line-height: 30px;
    @media screen and (max-width: 768px) {
      width: 341px;
      height: 48px;
      line-height: 48px;
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
    @media screen and (max-width: 768px) {
      width: 341px;
    }
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
    @media screen and (max-width: 768px) {
      width: 135px;
      height: 135px;
      line-height: 135px;
    }
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
      height: 72px;
    }
  }
  #secTextareaId {
    .el-textarea__inner {
      height: 326px;
    }
  }
  #time1Id {
    .el-input__inner {
      width: 152px;
      height: 32px;
      font-size: 12px;
      padding-left: 10px;
      padding-right: 10px;
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
  #time3Id {
    .el-input__inner {
      width: 152px;
      height: 32px;
      color: #FF0000;
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
    .m-currency {
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
    .m1-currency {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    .refund-css, .managid-css, .convertHistId-css {
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
    .coupon-block {
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
      @media screen and (max-width: 768px) {
        left: unset;
        transform: unset;
        position: unset;
      }
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
      .test-text, .equal-text, .coupon-text, .convertHistory-text {
        font-weight: 700;
        font-size: 24px;
        color: #FFF;
        margin-left: 63px;
        @media screen and (max-width: 768px) {
          margin-left: 0;
        }
      }
      .banAds {
        width: 100%;
        height: calc(100vh - 64px);
      }
      .test-text {
        @media screen and (max-width: 768px) {
          text-align: center;
          font-size: 20px;
        }
      }
      .equal-text {
        margin-bottom: 120px;
        @media screen and (max-width: 768px) {
          text-align: center;
          margin-bottom: 90px;
          margin-bottom: 65px; // advertise
          font-size: 20px;
          z-index: 10;
          position: fixed;
          width: 100%;
        }
      }
      .pad-css {
        @media screen and (max-width: 768px) {
          margin-top: 127px;
        }
      }
      .padacc-css {
        @media screen and (max-width: 768px) {
          margin-top: 69px;
        }
      }
      .coupon-text {
        margin-bottom: 100px;
        @media screen and (max-width: 768px) {
          text-align: center;
          margin-bottom: 47px;
        }
      }
      .convertHistory-text {
        margin-bottom: 60px;
        @media screen and (max-width: 768px) {
          margin-bottom: 0;
          text-align: center;
          font-size: 20px;
        }
      }
      .banner-block {

      }
      .content-category, .content1-category {
        padding-top: 40px;
        padding-left: 102px;
        position: relative;
        .each-row {
          display: flex;
          align-items: flex-start;
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
          display: flex;
          width: 1000px;
          max-width: 1110px;
          .coin-div {
            display: flex;
            align-items: center;
            margin-top: 7rem;
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
          }
          .prod1-btn {
            background: linear-gradient(90deg, #7161EF 0%, #432FDE 100%);
            color: #FFF;
          }
          .prod-photo {
            font-weight: 700;
            font-size: 12px;
            color: #FFF;
          }
          .advantSetting {
            font-weight: 700;
            font-size: 12px;
            color: #FFF;
            margin-bottom: 5px;
          }
          .photoPreview {
            font-weight: 400;
            font-size: 12px;
            color: #808080;
            margin-bottom: 10px;
          }
          .sec2-row {
            width: 150px;
            width: 180px;
            height: 150px;
            height: 180px;
            background: #191A21;
            border: 1px solid #263B71;
            margin: 0 auto 13px;
            margin-left: 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            justify-content: center;
            .img-icon {
              width: 64px;
              height: 64px;
              @media screen and (max-width: 768px) {
                width: 57px;
                height: 57px;
              }
            }
          }
          .photo-flex {
            display: flex;
            align-items: flex-end;
            .addprod-photo-txt, .addprod-photo1-txt {
              font-weight: 400;
              font-size: 14px;
              color: #FFF;
              border: 1px solid #00A0FF;
              width: 150px;
              width: 180px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              margin-right: 27px;
              margin-bottom: 0;
            }
            .addprod-photo1-txt {
              font-size: 12px;
              color: #FFF;
              border: 1px solid #F35A90;
              width: 120px;
              height: 24px;
              line-height: 24px;
            }
          }
          .input-block {
            display: flex;
            .prod-left {
              margin-right: 20px;
            }
            .prod-div1, .prod-div2 {
              margin-top: 37px;
              
              .prod-css {
                background: #34344C;
                border-radius: 6px;
                width: 347px;
                width: 300px;
                // height: 72px; 
              }
              .prod-description {
                background: #34344C;
                border-radius: 6px;
                width: 347px;
                width: 300px;
                height: 200px;
              }
              .prod1-description {
                background: #34344C;
                border-radius: 6px;
                width: 347px;
                width: 300px;
                height: 326px;
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
            margin-bottom: 10px;
          }
        }
      }
      .content1-category {
        max-width: 1322px;
        padding-top: 0;
        padding-left: 33px;
        display: flex;
      }
      .img1-right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 60px;
      }
      .img-right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 60px;
      }
      .cate-left-block, .cate-left1-block, .cate1-left-block {
        background: #191A21;
        border-radius: 12px;
        width: 249px;
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
        @media screen and (max-width: 768px) {
          margin-left: 43px;
          overflow-x: scroll;
        }
      }
      .banner-block2, .pad-left {
        margin-left: 63px;
        @media screen and (max-width: 768px) {
          margin-left: 43px;
          overflow-x: scroll;
        }
      }
      .each-row {
        display: flex;
        @media screen and (max-width: 768px) {
          width: 100%;
          max-width: 100%;
        }
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
        @media screen and (max-width: 768px) {
          width: 100%;
        }
      }
      .show1css {
        visibility: visible;
        @media screen and (max-width: 768px) {
          position: absolute;
          width: 100%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 11;
        }
      }
      .hide1css {
        visibility: hidden;
        @media screen and (max-width: 768px) {
          display: none;
        }
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
          @media screen and (max-width: 768px) {
            width: 341px;
            height: 135px;
            margin: 30px auto 0;
          }
          .img-icon {
            width: 64px;
            height: 64px;
            @media screen and (max-width: 768px) {
              width: 57px;
              height: 57px;
            }
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
          @media screen and (max-width: 768px) {
            width: 341px;
            height: 135px;
            margin: 30px auto 0;
          }
          .img-icon {
            width: 64px;
            height: 64px;
            @media screen and (max-width: 768px) {
              width: 57px;
              height: 57px;
            }
          }
        }
        .third-row {
          width: 393px;
          margin: 90px auto 150px;
          @media screen and (max-width: 768px) {
            width: 341px;
            margin: 20px auto 50px;
          }
        }
        .third1-row {
          width: 393px;
          margin: 60px auto 40px;
          @media screen and (max-width: 768px) {
            width: 341px;
            margin: 20px auto 50px;
          }
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
        @media screen and (max-width: 768px) {
          width: 100%;
          left: 50%;
          position: unset;
          transform: unset;
          margin-left: 0;
          padding: 1rem 1rem 1.5rem;
        }
      }
      .row-css {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media screen and (max-width: 768px) {
          width: 100%;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        .left-content {
          width: 65%;
          @media screen and (max-width: 768px) {
            width: 100%;
          }
        }
        .right-content {
          width: 33%;
          @media screen and (max-width: 768px) {
            width: 100%;
          }
        }
        .showcss {
          visibility: visible;
          @media screen and (max-width: 768px) {
            position: absolute;
          }
        }
        .hidecss {
          visibility: hidden;
          @media screen and (max-width: 768px) {
            display: none;
          }
        }
        .right-div {
          width: 360px;
          height: 500px;
          background: #191A21;
          border-radius: 12px;
          padding: 1rem 1rem 1rem 3rem;
          @media screen and (max-width: 768px) {
            margin: auto;
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
        @media screen and (max-width: 768px) {
          margin-bottom: 7px;
        }
        .name-lable, .name1-lable {
          font-weight: 400;
          font-size: 16px;
          color: #808080;
          margin-bottom: 10px;
          margin-left: 7px;
          @media screen and (max-width: 768px) {
            margin-bottom: 5px;
          }
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
      .basic-info1 {
        @media screen and (max-width: 768px) {
          margin-top: 5px;
          margin-left: 73px;
        }
      }
      .basic-info2 {
        margin-top: 1rem;
        @media screen and (max-width: 768px) {
          margin-left: 73px;
        }
      }
      .each-black-block {
        width: 100%;
        max-width: 1184px;
        background: #191A21;
        border-radius: 6px;
        margin-left: 63px;
        padding: 1rem 45px;
        @media screen and (max-width: 768px) {
          width: 95%;
          margin: auto;
        }
        
        .head-div {
          display: flex;
          // justify-content: space-between;
          .head-css, .long-headcss, .head1-css, .head2-css, .headl-css {
            font-weight: 400;
            font-size: 16px;
            color: #808080;
            width: 13%;
          }
          .head-css {
            @media screen and (max-width: 768px) {
              width: 110px;
              min-width: 110px;
            }
          }
          .long-headcss {
            width: 17.5%;
            @media screen and (max-width: 768px) {
              width: 170px;
              min-width: 170px;
            }
          }
          .head1-css {
            width: 26%;
            @media screen and (max-width: 768px) {
              width: 220px;
              min-width: 220px;
            }
          }
          .head2-css {
            width: 13%;
            @media screen and (max-width: 768px) {
              width: 110px;
              min-width: 110px;
            }
          }
          .headl-css {
            width: 15%;
            @media screen and (max-width: 768px) {
              width: 170px;
              min-width: 170px;
            }
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
            @media screen and (max-width: 768px) {
              width: 170px;
              min-width: 170px;
            }
          }
          .td1-css {
            width: 26%;
            @media screen and (max-width: 768px) {
              width: 220px;
              min-width: 220px;
            }
          }
          .td2-css {
            width: 13%;
            @media screen and (max-width: 768px) {
              width: 110px;
              min-width: 110px;
            }
          }
          .tdl-css  {
            width: 15%;
            @media screen and (max-width: 768px) {
              width: 170px;
              min-width: 170px;
            }
          }
          .tdcolor-css {
            color: #F35A90;
          }
          .td-css {
            @media screen and (max-width: 768px) {
              width: 110px;
              min-width: 110px;
            }
          }
        }
      }
      .m-scroll1, .m-scroll2 {
        @media screen and (max-width: 768px) {
          overflow-x: scroll;
        }
      }
      .manag-pc {
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
      .manag-m {
        display: none;
        @media screen and (max-width: 768px) {
          display: block;
        }
      }
      .date-picker-css, .date-pickerm-css, .date-picker1-css, .date-picker2-css {
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
      .date-picker-css {
        @media screen and (max-width: 768px) {
          margin-left: 0;
          display: none;
        }
      }
      .date-pickerm-css {
        display: none;
        @media screen and (max-width: 768px) {
          margin-left: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
      }
      .date-picker1-css {
        margin-top: 30px;
        @media screen and (max-width: 768px) {
          margin-top: 1rem; // refund history
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
      .m-date {
        @media screen and (max-width: 768px) {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 19px;
          padding-left: 90px;
        }
      }
      .btnNtable, .catetable-block {
        width: 94%;
        background: #191A21;
        border-radius: 12px;
        padding: 1rem 1rem 2rem 2rem;
        margin: 29px auto 34px;
        .btn-block, .btn1-block, .btncate-block {
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
      }
      .btnNtable {
        @media screen and (max-width: 768px) {
          width: 100%;
          padding-bottom: 0;
        }
        .btn1-block {
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
      }
      .catetable-block {
        width: 877px;
        height: 496px;
        margin: 0;
        margin-left: 33px;
        padding: 1rem;
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
      .manager-css, .managerefund-css, .manag-div-css, .man-coupon-css {
        margin-left: 63px;
        display: flex;
        align-items: center;
        @media screen and (max-width: 768px) {
          margin-left: 43px;
        }
        .search-css, .search-css1, .search-manag-css, .search-convert-css {
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
        .search-convert-css {
          @media screen and (max-width: 768px) {
            width: 230px;
            margin-bottom: 19px;
          }
        }
        .search-manag-css {
          @media screen and (max-width: 768px) {
            margin-bottom: 24px;
          }
        }
      }
      .man-coupon-css {
        @media screen and (max-width: 768px) {
          margin-left: 0;
          justify-content: center;
        }
      }
      .for-m-convertHist {
        @media screen and (max-width: 768px) {
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          margin-left: 0;
          padding-right: 33px;
        }
      }
      .manag-div-css {
        @media screen and (max-width: 768px) {
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          margin-left: 0;
          padding-right: 43px;
        }
      }
      .conv-history-table {
        @media screen and (max-width: 768px) {
          margin-top: 23px;
        }
      }
      .managerefund-css {
        @media screen and (max-width: 768px) {
          margin-left: 0; 
          width: 100%; 
          padding-left: 63px; 
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
      .orange-css, .pink-css, .green-css, .white-css, .blue-css, .yellow-css, .yell1ow-css {
        font-weight: 400;
        font-size: 16px;
        color: #FF8A65;
      }
      .pink-css {
        color: #F35A90 !important;
      }
      .green-css {
        color: #2BDE73;
      }
      .yellow-css {
        color: #F0FF40 !important;
      }
      .yell1ow-css {
        color: #FFF965 !important;
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
        margin-left: 1rem;
        cursor: pointer;

        color: #00A0FF;
        @media screen and (max-width: 768px) {
          width: 72px;
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
        z-index: 10; // advertise
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
      .plus-img {
        width: 12px;
        height: 12px;
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
.for-pc {
  @media screen and (max-width: 768px) {
    display: none !important;
  }
}
.for-mobile {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
}
.show-pc {
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
</style>
