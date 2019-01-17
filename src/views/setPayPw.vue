<template>
	<div class="pwd-box">
		<input type="tel" maxlength="6" class="pwd-input" id="pwd-input" v-model="inputContent">
		<div class="fake-box">
			<input type="password" readonly="">
			<input type="password" readonly="">
			<input type="password" readonly="">
			<input type="password" readonly="">
			<input type="password" readonly="">
			<input type="password" readonly="">
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			inputContent: ''
		};
	},
	watch: {
		inputContent: function() {
			var $input = document.querySelectorAll('.fake-box input');
			var pwd = this.inputContent.replace(/\s+/g, '');
			this.inputContent = pwd;
			console.log(pwd);
			if (pwd.length <= 6) {
				for (var i = 0; i < pwd.length; i++) {
					$input[i].value = pwd[i];
				}
				console.log(pwd);
				for (var a = 0; a < $input.length; a++) {
					if (a >= pwd.length) {
						$input[i].value = '';
					}
				}
			}
		}
	},
	methods: {}
};
</script>

<style>
	.pwd-box {
		/*display: none;*/
		width: 310px;
		height: 220px;
		left: 50%;
		top: 10%;
		margin-left: -155px;
		position: absolute;
		border: none;
		background: white;
		z-index: 101;
	}

	.pwd-input {
		width: 99%;
		height: 45px;
		color: transparent;
		position: absolute;
		top: 10%;
		left: 0;
		border: 1px solid;
		font-size: 18px;
		opacity: 0;
		z-index: 1;
		letter-spacing: 35px;
	}


	.fake-box {
		width: 280px;
		margin-left: 15px;
		bottom: 2px;
		height: 41px;
		margin-top: 30px;
		border: 1px solid #bfb6b6;
	}

	.fake-box input {
		width: 41px;
		height: 95%;
		border: none;
		border-right: 1px solid #e5e5e5;
		text-align: center;
		font-size: 30px;
		margin: 0 !important;
		border:1px solid;
		/* 小input框*/
	}

	.fake-box input:nth-last-child(1) {
		border: none;
	}
</style>
