<template>
	<div>
		<div class="bottomButton">
			<button>在线预约</button>
			<button>在线咨询</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.bottomButton {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: calc(6.26rem/2);
		display: flex;
		z-index: 10;
		>button {
			width: 50%;
			height: 100%;
			color: #fff;
			font-size: calc(2.13rem/2);
		}

		>button:first-child {
			background-color: #008e83;
		}

		>button:last-child {
			background-color: #828d93;
		}
	}
</style>
