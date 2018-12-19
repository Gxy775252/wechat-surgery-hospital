<template>
  <wv-tabbar>
    <wv-tabbar-item :to="item.path" v-for="(item, index) in tabList" :key="index" :is-on="item.isActive" v-on:click="clickSwitchTab(index)">
      <span slot="icon" style="display: inline-block; position: relative;">
        <img class="weui-tabbar__icon" :src="item.icon" slot="icon">
        <span v-if="index == '2'">
          <span v-if="item.isDot">
            <wv-badge is-dot style="position: absolute;top: -2px;right: -13px;"></wv-badge>
          </span>
          <span v-else></span>
        </span>
      </span>
       {{ item.name }}
    </wv-tabbar-item>
  </wv-tabbar>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  },
  data: function () {
    return {
      tabList: [{
        name: '首页',
        icon: require('@/assets/images/gold-icon.png'),
        isDot: false,
        pathName: 'index',
        isActive: false,
        path: '/'
      }, {
        name: '分类',
        icon: require('@/assets/images/gold-icon.png'),
        isDot: false,
        pathName: 'classIfication',
        isActive: false,
        path: '/classIfication'
      }, {
        name: '购物车',
        icon: require('@/assets/images/gold-icon.png'),
        isDot: true,
        pathName: 'shopingCart',
        isActive: false,
        path: '/shopingCart'
      }, {
        name: '我的',
        icon: require('@/assets/images/gold-icon.png'),
        isDot: false,
        pathName: 'mine',
        isActive: false,
        path: '/mine'
      }]
    }
  },
  beforeCreate: function() {
    let pathname = window.location.pathname.substr(1)
    this.pathName = pathname != '' ? pathname : 'index'
  },
  created: function() {
   let pageIndex = this.tabList.findIndex(json => json.pathName == this.pathName)
   this.tabList[pageIndex].isActive = true
  },
  methods: {
    clickSwitchTab: function(num){
      this.tabList.map((json, index) => {
        if(index == num){
          json.isActive = true
        }else {
          json.isActive = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.weui-tabbar{
  position: fixed !important;
  bottom: 0;
  left: 0;
}
</style>
