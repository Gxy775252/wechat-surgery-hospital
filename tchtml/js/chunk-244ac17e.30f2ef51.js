(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-244ac17e"],{"1bb6":function(i,t,e){"use strict";e.r(t);var s=function(){var i=this,t=i.$createElement,s=i._self._c||t;return s("div",{staticClass:"all"},[s("div",{staticClass:"listAll"},[i._l(i.content,function(t,a,n){return s("div",{key:a,staticClass:"insList"},[s("div",{staticClass:"insImg",on:{click:function(e){i.videoPlay(t.resource.url)}}},[s("img",{staticClass:"imgA",attrs:{src:t.resource.cover||i.ImgNull}}),1==t.resource.isVideo?s("div",{staticClass:"playImg"},[s("img",{attrs:{src:e("aabd")}})]):i._e()]),s("div",{staticClass:"insInfo"},[s("p",[i._v(i._s(t.goodsName))]),s("p",[i._v(i._s(t.goodsBrief))])]),s("div",{staticClass:"inspirce"},[s("p",[i._v("￥"+i._s(t.goodsPrice))]),s("div",{on:{click:function(e){i.shoucang(t.goodsid)}}},[s("img",{attrs:{src:i.heart}})])])])}),s("div",{staticStyle:{clear:"both"}})],2),i.isPlay?s("div",{staticClass:"briefImg"},[s("Video-Play",{attrs:{videoUrl:i.videoUrl,isNone:i.isPlay},on:{surt:i.surtChild}})],1):i._e()])},a=[],n=e("e800"),A=e.n(n),o=e("ba3e"),c=e.n(o),l=function(){var i=this,t=i.$createElement,e=i._self._c||t;return e("div",[i.showDis?e("div",{staticClass:"all"},[e("div",[e("video",{attrs:{src:i.videoUrl,controls:i.controls,autoplay:i.autoplay}})]),e("div",{staticClass:"aller",on:{click:i.surt}})]):i._e()])},d=[],g=(e("cadf"),e("551c"),e("097d"),{props:{videoUrl:{type:String,required:!0},isNone:!1},data:function(){return{autoplay:!0,controls:!0,showDis:!0}},created:function(){this.$store.commit("showBottomNav",{isShow:!1})},methods:{surt:function(){this.showDis=this.isNone,this.$emit("surt","false")}}}),r=g,h=(e("450d"),e("2877")),I=Object(h["a"])(r,l,d,!1,null,"0a81a4be",null);I.options.__file="bigWindowVideo.vue";var G=I.exports,u=e("a474"),Z=(e("8386"),{name:"mineCollector",inject:["reload"],components:{VideoPlay:G},data:function(){return{ImgNull:this.$store.state.ImgNull,isPlay:!1,content:[],heart:e("6ec6"),defaultProps1:{children:"children",label:"comName"}}},created:function(){var i=this;this.$store.commit("showBottomNav",{isShow:!1}),u["J"]({data:{openid:this.$store.state.uid}}).then(function(t){console.log("我的收藏",t.data),t.data.flag?i.content=t.data.listFavor:c.a.text({duration:1e3,message:t.data.msg})})},methods:{shoucang:function(i){var t=this;A.a.confirm({title:"确认取消收藏吗？",skin:"ios",showCancelButton:!0}).then(function(){u["fb"]({data:{openid:t.$store.state.uid,goodsid:i}}).then(function(i){i.data.flag?(c.a.text({duration:1e3,message:"取消成功"}),t.reload()):c.a.text({duration:1e3,message:i.data.msg})})}).catch(function(){})},videoPlay:function(i){1==i.isVideo&&(this.videoUrl=i.url,this.isPlay=!0,this.isNone=!0)},surtChild:function(i){this.isPlay=!1,this.isNone=!1}}}),b=Z,m=(e("bc59"),Object(h["a"])(b,s,a,!1,null,"e9e5f0c2",null));m.options.__file="mineCollector.vue";t["default"]=m.exports},2858:function(i,t,e){},"450d":function(i,t,e){"use strict";var s=e("2858"),a=e.n(s);a.a},"6ec6":function(i,t){i.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTA1QjVEOTcwNjg4MTFFOUI4NTNFRUYwNjQwOTBFNDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTA1QjVEOTgwNjg4MTFFOUI4NTNFRUYwNjQwOTBFNDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MDVCNUQ5NTA2ODgxMUU5Qjg1M0VFRjA2NDA5MEU0MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MDVCNUQ5NjA2ODgxMUU5Qjg1M0VFRjA2NDA5MEU0MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhyQYpgAAAHtSURBVHjaxJZPKARRGMBnllhFjg6chJuSIn9C2S3Z3CRpy8FBlPbugOQgdye1imySddOWgwslOSDruDkQYpVEyZ/k99XbbRt2Z3atma9+fW923vd+O/Om956uGaJwfqqMNAoD0ADF8AJHsA6rn5Nz74aaItIwDEEzlMIbnMImLFHznFqjGwbwkZahQksfMfAz0JGqaSKFoDZDzR2MUBP5IWYAvzwNuDTzeIU+1d6GEgs1X/JWkIeSYqQtpH1patbjSeXyLGo+oQP5oY5U5MdqPu0ImfdGea0+G6WacvlE3K/ZH/0i7nRA3CniSgfElSJ2OyB2u9SqZHe8iDjqgDgq4ogD4oiIV+DDRqm4VlwsX1c0gjaKg+JMbAgz8GiDVBzTWmIn4h/ckwI2iAO44tIoSO5Zu3tnLm9XHc36f5KuIZ1NXBj33jG1e+Q7TmA87QlE7c2yhB5CVZ6kl9DC096m/vjjtEGHa1IvPORBKt+OxyjV0h1z6HhO6v6jXGq9jBX77Wba8xUFUSW/yUEqb61LjfFr6GYjMOc1pB2otiiVJ+xBepGpk+mJUr2qVvXBmcUBtJlJLYlTFhgPbGXoFlZzGrcyZoHVSWOB+WCBCaszdLvh9oKsAUgtbzZ6Lp8r8z5IWlSXEwg3sh3jW4ABAMO0lAkwh2GZAAAAAElFTkSuQmCC"},aabd:function(i,t){i.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDk0MzRBMjIwMjlCMTFFOTlBQThDQTM0REI5N0JDMDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDk0MzRBMjMwMjlCMTFFOTlBQThDQTM0REI5N0JDMDUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOTQzNEEyMDAyOUIxMUU5OUFBOENBMzREQjk3QkMwNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOTQzNEEyMTAyOUIxMUU5OUFBOENBMzREQjk3QkMwNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkFQHskAAAY8SURBVHja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"},bc59:function(i,t,e){"use strict";var s=e("ff84"),a=e.n(s);a.a},ff84:function(i,t,e){}}]);
//# sourceMappingURL=chunk-244ac17e.30f2ef51.js.map