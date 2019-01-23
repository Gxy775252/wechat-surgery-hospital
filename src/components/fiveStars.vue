<template>
<div>
  <div class="rating">
    <img :style="{width:'calc('+size+'rem/2)',height:'calc('+size+'rem/2)',marginRight:'calc('+marginRight+'rem/2)'}" v-for="item,index in imgs" :src="item.colorUrl" v-on:click="stars(index)" />
  </div>
</div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number //参数：尺寸
    },
    marginRight: {
      type: Number //参数：尺寸
    },
		id: {
		  type: Number //参数：尺寸
		},
  },
  data() {
    return {
      imgs: [{
          colorUrl: require("@/assets/images/icon/ashStars.png")
        },
        {
          colorUrl: require("@/assets/images/icon/ashStars.png")
        },
        {
          colorUrl: require("@/assets/images/icon/ashStars.png")
        },
        {
          colorUrl: require("@/assets/images/icon/ashStars.png")
        },
        {
          colorUrl: require("@/assets/images/icon/ashStars.png")
        }
      ],
      gray: require("@/assets/images/icon/ashStars.png"),
      green: require("@/assets/images/icon/bigStarColor.png")
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
  },
  methods: {
    stars: function(index) {
			var data={'index':index+1,"id":this.id}
      this.$emit('starsNumA', data);
      for (var i = 0; i < this.imgs.length; i++) {
        if (i <= index) {
          this.imgs[i].colorUrl = this.green;
        } else {
          this.imgs[i].colorUrl = this.gray;
        }
      }
    }
  }
}
</script>

<style>
.rating {

  display: flex;
}
</style>
