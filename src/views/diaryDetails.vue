<template>
	<div>
		<div class="userBox">
			<div class="userImg"><img src="../assets/images/example/doctor.png"></div>
			<div class="userFont">
				<p class="userName">用户姓名</p>
				<p class="userTitle">项目名称：吸脂瘦大腿</p>
			</div>
		</div>
		<div class="lineBox">
			<div class="lineImg"><img src="../assets/images/icon/level.jpg"></div>
			<p>项目医生</p>
		</div>
		<div class="doctorBox">
			<div class="doctorImgName">
				<div class="doctorImg"><img src="../assets/images/example/doctor.png"></div>
				<div class="doctorFont">
					<p class="doctorName">黄伟医生</p>
					<p class="doctorTitle">整形医院五官精雕主任</p>
					<p class="doctorAdd">所在门店 | 北京天辰嘉华医疗东城区门店</p>
				</div>
			</div>
			<div class="doctorHorn"><img src="../assets/images/icon/horn.png"></div>
		</div>
		<div class="lineBox">
			<div class="lineImg"><img src="../assets/images/icon/level.jpg"></div>
			<p>美丽日记</p>
		</div>
		<div class="box">
			<div class="diaryList" v-for="item in dataList">
				<p class="yearFont">{{item.year}}</p>
				<div class="monthBox" v-for="mon in item.monthList">
					<div class="month">
						<div class="monthImg"><img src="../assets/images/icon/level.jpg"></div>
						<p>{{mon.month}}</p>
					</div>
					<div class="listContent">
						<div class="contentBox">
							<div v-for="img in mon.img"><img :src="img.imgUrl"></div>
						</div>
						<div class="listFont">
							{{mon.content}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="height: 6.6rem;"></div>
	</div>
</template>

<script>
	import * as api from '@/assets/js/api';
	export default {
		data() {
			return {
				dataList:[
					{year:'2018年',monthList:[
		                 {month:'10月10日',img:[
							{imgUrl:require('../assets/images/example/doctor.png')},
							{imgUrl:require('../assets/images/example/doctor.png')}
							],
							content:'【医美整形-ST全脸字体脂肪填充-第99天】大家好我有来更新日记啦，现在做完ST全脸字体脂肪填充已经恢复的很好了'
						},
						{month:'10月10日',img:[
							{imgUrl:require('../assets/images/example/doctor.png')},
							{imgUrl:require('../assets/images/example/doctor.png')}
							],
							content:'【医美整形-ST全脸字体脂肪填充-第99天】大家好我有来更新日记啦，现在做完ST全脸字体脂肪填充已经恢复的很好了'
						},
						],
				    }
]
			};
		},
		created:function(){
			api.getdiaryDetails({
				data:{
					// openid:this.globalData.openid,
					id:'1'
				}
			}).then(res=>{
				if(res.data.flag){
					console.log(res.data.listDiary);
				}
			})
		}
	}
</script>

<style scoped="scoped" lang="scss">
   @import '@/assets/css/diaryDetails.scss';
</style>
