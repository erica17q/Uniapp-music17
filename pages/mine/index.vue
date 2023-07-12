<template>
	<view>
		<!-- 头部 -->
		<!-- #ifdef APP-PLUS || MP-WEIXIN-->
		<uni-nav-bar fixed :status-bar="true" title="我的音乐" @clickLeft="goCloud" @clickRight="goCloud">
			<block slot="left">
				<image class="top-img left" src="/static/image/mine/1.png"></image>
			</block>
			<!-- #ifdef APP-PLUS -->
			<block slot="right">
				<image class="top-img" src="/static/image/mine/r.png"> </image>
			</block>
			<!-- #endif -->
		</uni-nav-bar>
		<!-- #endif -->

		<!-- 内容页 y 轴滚动/ 一般来说 导航栏是 x 轴滚动-->
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<scroll-view scroll-y="true" class="page-content">
			<!-- #endif -->
			<!-- 导航栏 x 轴滚动 -->
			<scroll-view class="nav-list scroll-view" scroll-x :show-scrollbar="false">
				<view class="item" v-for="(item,index) in navList" :key="index" @click="goUrl(item.id,index)">
					<image class="img" :src="'/static/image/mine/' + item.imd + '.png' "></image>
					<view class="desc">{{ item.name }}</view>
				</view>
			</scroll-view>
			<uni-list>
				<uni-list-item title="本地音乐" thumb="/static/image/mine/m_15.png"  link clickable/>
				<uni-list-item title="最近播放" thumb="/static/image/mine/m_17.png"  link clickable/>
				<uni-list-item title="我的电台" thumb="/static/image/mine/m_19.png"  link clickable/>
				<uni-list-item title="我的收藏" thumb="/static/image/mine/m_21.png"  link clickable/>
			</uni-list>
			<view class="recommend-list">
				<songList title="推荐歌单" :list="recommendSongs" />
			</view>
			<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		</scroll-view>
		<!-- #endif -->
	</view>
</template>

<script>
	import songList from '@/components/songList.vue'
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import uniList from '@/uni_modules/uni-list/components/uni-list/uni-list.vue'
	import uniListItem from '@/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniNavBar,
			uniList,
			uniListItem,
			songList
		},
		data() {
			return {
				navList: [
					{ name: '私人FM', imd: 1 },
					{ name: '最嗨电音', imd: 2 },
					{ name: 'ACG专区', imd: 3 },
					{ name: 'Sati空间', imd: 4 },
					{ name: '私藏推荐', imd: 5 },
					{ name: '因乐交友', imd: 6 },
					{ name: '亲子频道', imd: 7 },
					{ name: '古典专区', imd: 8 }
				],
				recommendSongs: [],
			}
		},
		onLoad() {
			this.getRecommendSongs()
		},
		methods: {
			goUrl() {},
			goCloud() {
				uni.showToast({
					icon: 'none',
					title: '功能未开发'
				})
			},
			getRecommendSongs() {
				uni.request({
					url: 'https://www.gzamon.wang/api/personalized',
					method: 'GET',
					data: {},
					success: res => {
						console.log('000',res.data);
						// 格式化播放量数据
						const formatCount = data => {
							let tepmNum = data
							if (data > 100000) {
								tepmNum = parseInt(data / 10000) + '万'
							}
							return tepmNum
						}
						this.recommendSongs = res.data.result.slice(0,6)
						console.log('111',this.recommendSongs);
						this.recommendSongs.forEach(item =>{
							item.playCount = formatCount(item.playCount)
						})
					},
					fail: () => {
						console.error(err);
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	.top-img {
		width: 50rpx;
		height: 50rpx;

		&.left {
			margin-left: 10rpx;
		}
	}

	.nav-list {
		height: 160rpx;
		padding-top: 10px;
		padding-bottom: 14rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 76rpx;
		color: #666;
		border-bottom: 1rpx solid #e6e6e6;
		font-size: 24rpx;
		background: #fff;
		
		.item {
			position: relative;
			display: inline-block;
			height: 210rpx;
			width: 166rpx;
		}
		.img{
			display: block;
			width: 70rpx;
			height: 70rpx;
			margin: 0 auto;
			border-radius: 50%;
		}
	}
	// .line-item {
	// 	.icon {
	// 		float: left;
	// 		width: 70rpx;
	// 		height: 70rpx;
	// 		margin-top: 24rpx;
	// 		margin-right: 36rpx;
	// 	}
	// 	.lab{
	// 		font-size: 32rpx;
	// 		color:#444;
	// 	}
	// 	.con{
	// 		position:relative;
	// 		height:100rpx;
	// 		overflow: hidden;
	// 		&:before{
	// 			position:absolute;
	// 			content:"";
	// 			right:0;
	// 			bottom:0;
	// 			width:100%;
	// 			border-bottom: 1rpx solid #e6e6e6;
	// 		}
	// 	}
	// }
	.uni-list-item{
		font-size: 32rpx;
		padding: 17rpx 15rpx 17rpx 0;
		// .img{
		// 	font-size: 30rpx;
		// 	width: 70rpx;
		// 	height: 70rpx;
		// }
	}
	.recommend-list{
		border-top:16rpx solid #f8f8f8;
	}
</style>