(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-205bad4e"],{"678a":function(t,e,a){},a104:function(t,e,a){t.exports=a.p+"img/tuFour.3f8a7a43.png"},b520:function(t,e,a){"use strict";var s=a("678a"),n=a.n(s);n.a},d64a:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"all"},[t._m(0),a("div",{staticClass:"conList"},[t._m(1),t._m(2),a("div",{staticClass:"bottom"},[t._m(3),a("div",{staticClass:"bottom-right"},[a("button",{staticClass:"color2",on:{click:function(e){t.returnGoods(t.item.id)}}},[t._v("退货/退款")]),a("button",{staticClass:"color1",on:{click:function(e){t.cancel(t.item.id)}}},[t._v("取消订单")]),a("button",{staticClass:"color2"},[t._v("去支付")])])])])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navList"},[a("div",[a("p",[t._v("全部")]),a("p")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"top"},[a("p",[t._v("订单编号：24783647878")]),a("p",[t._v("待支付")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"center"},[s("div",{staticClass:"center-left"},[s("div",{staticClass:"leftImg"},[s("img",{attrs:{src:a("a104")}})]),s("div",{staticClass:"leftText"},[s("p",[t._v("活力眼尖的")]),s("p",[t._v("规格：200ml")])])]),s("div",{staticClass:"center-right"},[s("p",[t._v("￥ 299")]),s("p",[t._v("x1")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-left"},[a("p",[t._v("已付金额：")]),a("p",[t._v("￥299")])])}],i=a("e800"),o=a.n(i),c=a("ba3e"),r=a.n(c),l=a("a474"),d=a("8386"),u={name:"mineOrder",inject:["reload"],data:function(){return{listOrderInfo:"",defaultProps1:{children:"children",label:"comName"}}},created:function(){var t=this;this.$store.commit("showBottomNav",{isShow:!1}),l["K"]({data:{openid:this.$store.state.uid,status:0}}).then(function(e){e.data.flag?(console.log("商城订单",e.data),t.listOrderInfo=e.data.listOrder):r.a.text({duration:1e3,message:e.data.msg})})},methods:{cancel:function(t){var e=this;console.log("取消啊啊啊-----",t),o.a.confirm({title:"提示",message:"是否取消",skin:"ios",showCancelButton:!0}).then(function(){l["b"]({data:{openid:e.$store.state.uid,orderid:t}}).then(function(t){console.log("是否取消了----",t),t.data.flag?(r.a.text({duration:1e3,message:"取消成功"}),e.reload()):r.a.text({duration:1e3,message:t.data.msg})})}).catch(function(){})},returnGoods:function(t){d["a"].setItem("returnId",t),this.$router.push({name:"returnGoodsChoice"})}}},f=u,v=(a("b520"),a("2877")),m=Object(v["a"])(f,s,n,!1,null,"6b26c92b",null);m.options.__file="mineOrder.vue";e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-205bad4e.b1dfb3c5.js.map