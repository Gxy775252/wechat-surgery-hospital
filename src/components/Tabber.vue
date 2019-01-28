<template>
<wv-tabbar>
  <wv-tabbar-item :to="item.path" v-for="(item, index) in tabList" :key="index" :is-on="item.isActive" v-on:click="clickSwitchTab(index)">
    <span slot="icon" style="display: inline-block; position: relative;">
      <img class="weui-tabbar__icon" :src="item.isActive?item.iconSelect:item.icon" slot="icon">
      <span v-if="index == '2'">
        <span v-if="item.isDot">
          <wv-badge is-dot style="position: absolute;top: -2px;right: -13px;"></wv-badge>
        </span>
        <span v-else></span>
      </span>
    </span>
    <label :class="item.isActive?item.selectColor:item.color">{{ item.name }}</label>
  </wv-tabbar-item>
</wv-tabbar>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  },
  data: function() {
    return {
      tabList: [{
          name: '首页',
          icon: require('@/assets/images/icon/indexGray.png'),
          iconSelect: require('@/assets/images/icon/index.png'),
          isDot: false,
          pathName: 'index',
          isActive: false,
          path: '/',
          color: 'color',
          selectColor: 'selectColor',
        },
        {
          name: '预约',
          icon: require('@/assets/images/icon/reserveGray.png'),
          iconSelect: require('@/assets/images/icon/reserve.png'),
          isDot: false,
          pathName: 'reserve',
          isActive: false,
          path: '/reserve',
          color: 'color',
          selectColor: 'selectColor',
        },
        {
          name: '商城',
          icon: require('@/assets/images/icon/shoppingMallGray.png'),
          iconSelect: require('@/assets/images/icon/shoppingMall.png'),
          isDot: false,
          pathName: 'shoppingMall',
          isActive: false,
          path: '/shoppingMall',
          color: 'color',
          selectColor: 'selectColor',
        },
        {
          name: '我的',
          icon: require('@/assets/images/icon/mineGray.png'),
          iconSelect: require('@/assets/images/icon/mine.png'),
          isDot: true,
          pathName: 'mine',
          isActive: false,
          path: '/mine',
          color: 'color',
          selectColor: 'selectColor',
        }
      ]
    };
  },
  beforeCreate: function() {
    let _this = this

    function getPathName(urlName) {
      return new Promise((resolve, reject) => {
        let pathname = urlName.substr(1)
        let name = pathname != '' ? pathname : 'index'
        resolve(name)
      })
    }
    setTimeout(() => {
      getPathName(_this.$route.path).then(res => {
        if (res != '') {
          let pageIndex = this.tabList.findIndex(json => json.pathName == res);
          this.tabList[pageIndex].isActive = true
        }
      })
    }, 500)
  },
  created: function() {

  },
  methods: {
    clickSwitchTab: function(num) {
      window.scrollTo(0, 0);
      this.tabList.map((json, index) => {
        if (index == num) {
          json.isActive = true;
        } else {
          json.isActive = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.weui-tabbar__icon{

}
.weui-tabbar {
    position: fixed !important;
    bottom: 0;
    left: 0;
}
.color {
    color: #aaa !important;
}
.selectColor {
    color: #008e83 !important;
}
</style>
