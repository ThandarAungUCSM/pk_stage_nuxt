(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{521:function(t,e,o){var content=o(563);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(129).default)("429fcce0",content,!0,{sourceMap:!1})},522:function(t,e,o){var content=o(565);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(129).default)("d010cc48",content,!0,{sourceMap:!1})},562:function(t,e,o){"use strict";o(521)},563:function(t,e,o){var n=o(128)((function(i){return i[1]}));n.push([t.i,"#convertId .modal-mask{-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);background:rgba(0,0,0,.65);display:table;height:100%;left:0;position:fixed;top:0;transition:opacity .3s ease;width:100%;z-index:9998}#convertId .modal-wrapper{display:table-cell;vertical-align:middle}#convertId .modal-container{background:#191a21;border-radius:12px;box-shadow:0 4px 4px rgba(33,66,116,.25);font-family:Helvetica,Arial,sans-serif;height:666px;margin:0 auto;padding:2rem 3.5rem 24px;position:relative;transition:all .3s ease;width:500px}@media screen and (max-width:768px){#convertId .modal-container{border-radius:12px;height:auto;margin:auto;padding:0 0 4rem;width:95%}}#convertId .modal-header h3{color:#42b983;margin-top:0}#convertId .modal-body{height:100%;padding:0}#convertId .modal-default-button{float:right}#convertId .modal-enter,#convertId .modal-leave-active{opacity:0}#convertId .modal-enter .modal-container,#convertId .modal-leave-active .modal-container{transform:scale(1.1)}",""]),n.locals={},t.exports=n},564:function(t,e,o){"use strict";o(522)},565:function(t,e,o){var n=o(128)((function(i){return i[1]}));n.push([t.i,"@media screen and (max-width:768px){.parent-block[data-v-62e96204]{padding:1rem 2rem}}.parent-block .redemption-no[data-v-62e96204]{color:#fff;font-size:16px;font-weight:700;text-align:center}.parent-block .each-row[data-v-62e96204]{align-items:center;display:flex;margin-bottom:1rem}@media screen and (max-width:768px){.parent-block .each-row[data-v-62e96204]{margin-bottom:12px}}.parent-block .each-row1[data-v-62e96204]{display:flex;margin-bottom:1rem}@media screen and (max-width:768px){.parent-block .each-row1[data-v-62e96204]{margin-bottom:12px}}.coupon-type[data-v-62e96204],.free-shipping-coupon[data-v-62e96204],.free-shipping-coupon1[data-v-62e96204]{color:gray;font-size:20px;font-weight:400;margin-bottom:0;width:30%}@media screen and (max-width:768px){.coupon-type[data-v-62e96204],.free-shipping-coupon[data-v-62e96204],.free-shipping-coupon1[data-v-62e96204]{font-size:18px}}.free-shipping-coupon[data-v-62e96204]{color:#fff;padding-left:5px;width:70%}.free-shipping-coupon1[data-v-62e96204]{color:#fff;margin-bottom:1rem;padding-left:5px;width:100%}@media screen and (max-width:768px){.free-shipping-coupon1[data-v-62e96204]{margin-bottom:12px}}.bottom-div[data-v-62e96204]{align-items:center;bottom:0;display:flex;justify-content:center;position:absolute;width:100%;z-index:999}@media screen and (max-width:768px){.bottom-div[data-v-62e96204]{bottom:-2.5rem;margin-top:2rem}}.bottom-div .m-bottom[data-v-62e96204]{align-items:center;background:linear-gradient(90deg,#7161ef,#3c27dc);border-radius:12px;color:#fff;cursor:pointer;display:flex;font-size:20px;font-weight:400;height:40px;justify-content:center;width:180px}",""]),n.locals={},t.exports=n},591:function(t,e,o){"use strict";o.r(e);var n={props:["show","sendData"],data:function(){return{effectiveTime:"",expiredTime:"",minimumConsumption:0,isCheck:[!1,!1]}},created:function(){},methods:{closePopup:function(){this.$emit("settingData","hi"),this.$emit("close")}}},c=(o(562),o(564),o(79)),component=Object(c.a)(n,(function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"convertId"}},[e("transition",{attrs:{name:"modal"}},[t.show?e("div",{staticClass:"modal-mask"},[e("div",{staticClass:"modal-wrapper"},[e("div",{staticClass:"modal-container"},[e("div",{staticClass:"modal-body"},[t._t("body",(function(){return[e("div",{staticClass:"parent-block"},[e("div",[e("p",{staticClass:"redemption-no"},[t._v("兌換編號 651615615")])]),t._v(" "),e("div",{staticClass:"each-row"},[e("p",{staticClass:"coupon-type"},[t._v("狀態")]),t._v(" "),e("p",{staticClass:"free-shipping-coupon"},[t._v(t._s(t.sendData.state))])]),t._v(" "),e("div",{staticClass:"each-row"},[e("p",{staticClass:"coupon-type"},[t._v("建立時間")]),t._v(" "),e("p",{staticClass:"free-shipping-coupon"},[t._v(t._s(t.sendData.exchangeCreation))])]),t._v(" "),e("div",{staticClass:"each-row"},[e("p",{staticClass:"coupon-type"},[t._v("商品數量")]),t._v(" "),e("p",{staticClass:"free-shipping-coupon"},[t._v(t._s(t.sendData.noofProduct))])]),t._v(" "),e("div",{staticClass:"each-row1"},[e("p",{staticClass:"coupon-type"},[t._v("兌換內容")]),t._v(" "),e("div",[e("p",{staticClass:"free-shipping-coupon1"},[t._v("商品名稱")]),t._v(" "),e("p",{staticClass:"free-shipping-coupon1"},[t._v("x5")]),t._v(" "),e("p",{staticClass:"free-shipping-coupon1"},[t._v("商品名稱 ")]),t._v(" "),e("p",{staticClass:"free-shipping-coupon"},[t._v("x2 ")])])]),t._v(" "),e("div",{staticClass:"each-row"},[e("p",{staticClass:"coupon-type"},[t._v("運費")]),t._v(" "),e("p",{staticClass:"free-shipping-coupon"},[t._v("60")])]),t._v(" "),e("div",{staticClass:"each-row"},[e("p",{staticClass:"coupon-type"},[t._v("小計")]),t._v(" "),e("p",{staticClass:"free-shipping-coupon"},[t._v(t._s(t.sendData.exchangeTotal))])]),t._v(" "),e("div",{staticClass:"each-row"},[e("p",{staticClass:"coupon-type"},[t._v("使用優惠券")]),t._v(" "),e("p",{staticClass:"free-shipping-coupon"},[t._v("免運券")])]),t._v(" "),e("div",{staticClass:"each-row"},[e("p",{staticClass:"coupon-type"},[t._v("合計")]),t._v(" "),e("p",{staticClass:"free-shipping-coupon"},[t._v(t._s(t.sendData.exchangeTotal))])])]),t._v(" "),e("div",{staticClass:"bottom-div"},[e("div",{staticClass:"m-bottom",on:{click:t.closePopup}},[e("span",[t._v("確認")])])])]}))],2)])])]):t._e()])],1)}),[],!1,null,"62e96204",null);e.default=component.exports}}]);