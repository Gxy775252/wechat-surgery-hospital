<template>
<div class="all">
  <div v-for='(item,key,index) in listDetailInfo' :key='key'>
    <div class="center">
      <div class="center-left">
        <div class="leftImg">
          <img :src="item.coverResource!=null?item.coverResource.cover:ImgNull" />
        </div>
        <div class="leftText">
          <p>{{item.goodsName}}</p>
          <p>规格：{{item.sizeName}}</p>
        </div>
      </div>
      <div class="center-right">
        <p>￥ {{item.price}}</p>
        <p>x{{item.number}}</p>
      </div>
    </div>
		<input :value="item.goodsid" type="text" style="display: none;"  id="goodsid"   ref="goodsid"/>
		<input :value="item.sizeid" type="text" style="display: none;" id="sizeid"  ref="sizeid"/>
    <div class="box">
      <div class="srarsFont">
        滑动星星进行总体评价
      </div>
      <div class="srarsBoxA">
        <Five-Srars @starsNumA="starsNumB" :id="item.id" :size="4.4" :marginRight="2.06"></Five-Srars>
      </div>
    </div>
    <div class="upload">
      <p>描述您对商品的评价</p>
      <div class="pingjia">
        <wv-textarea placeholder="请输入文本" :rows="3" v-model="textContent" :show-counter="false"></wv-textarea>
      </div>
    </div>
  </div>
  <div class="bottom" @click='submit'>
    <button>提交</button>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import {
  Textarea,
  Toast
} from 'we-vue'
Vue.use(Textarea)
import * as api from '@/assets/js/api';
import FiveSrars from '@/components/fiveStars.vue';
import * as session from '@/assets/js/session';
export default {
  data() {
    return {
      ImgNull: this.$store.state.ImgNull,
      listDetailInfo: '',
      numberBox: [],
			stars:'',
			textContent:'',
			goodsid:'',
			sizeid:'',
			commentList:[]
    };
  },
  components: {
    'Five-Srars': FiveSrars
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
  },
  mounted: function() {
    api.goOrderComment({
      data: {
        openid: this.$store.state.uid,
        orderid: this.$route.query.orderid,
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('商城订单', res.data);
        this.listDetailInfo = res.data.listDetail;
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
  },
  methods: {
    starsNumB: function(e) {
      var data = {
        'detailid': e.id,
        'stars': e.index
      };
			this.stars=e.index;
			this.goodsid=document.getElementById('goodsid').value;
			this.sizeid=document.getElementById('sizeid').value;
			// console.log(e);
//       if (this.numberBox.length == 0) {
//         this.numberBox.push(data);
//       } else {
//         for (var i = 0; i < this.numberBox.length; i++) {
//           if (this.numberBox[i].detailid == e.id) {
//             this.numberBox[i].stars = e.index;
//             return;
//           }
//         }
//         this.numberBox.push(data);
//       }
    },
    submit: function() {
      // 提交
      if (this.stars=="") {
        Toast.text({
          duration: 1000,
          message: '请打分'
        });
        return;
      }
			if(this.textContent==''){
				Toast.text({
				  duration: 1000,
				  message: '请填写评论内容'
				});
				return;
			}
			
			this.commentList.push({"goodsid":this.goodsid,"sizeid":this.sizeid,"stars":this.stars,"comment":this.textContent})
			console.log(this.commentList);
      api.submitComment({
        data: {
          openid: this.$store.state.uid,
          orderid:this.$route.query.orderid,
      		commentList:JSON.stringify(this.commentList),
        }
      }).then(res => {
        console.log('全部收益', res.data);
        if (res.data.flag) {
          Toast.text({
            duration: 1000,
            message: '评价成功'
          });
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    },
  }

}
</script>

<style lang="scss" scoped>
@import '@/assets/css/commodityEvaluation.scss';
.box {
    padding: calc(3rem/2) 0;
    background: #fff;
    margin-bottom: calc(2rem/2);
}

.srarsFont {
    color: #333;
    font-size: calc(1.6rem/2);
    margin-left: calc(3.33rem/ 2);
}

.srarsBoxA {
    margin-top: calc(1.6rem/2);
    margin-left: calc(3.33rem/ 2);
}
</style>
