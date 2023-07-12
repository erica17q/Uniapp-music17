<template>
	<view>
		<view :class="{dpn: isShowSearch}">
			
			
			<view class="topbar">
				<view class="h86"></view>
				<!-- show-scrollbar 控制是否出现滚动条 -->
				<scroll-view class="scroll-view" scroll-x="true" :show-scrollbar="false" >	
					<view class="item" v-for="(item,index) in navList" :key="item.id" @click="switchNav(item.id,index)" :class="{active:curNav == item.id}">
						<view class="desc" >{{item.name}}</view>
					</view>
					<!-- 底下的红色滑块  -->
					<view class="slide" :style="'width:'+ sliderWidth + 'rpx;transform: translateX('+sliderOffset+'rpx)'"></view>
				</scroll-view>
			</view>
			
			<!-- 精选视频 -->
			<!-- top=86向下偏移导航栏的高度 -->
			<mescroll-uni top="86" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
				<view class="video-list">
					<view class="video-item" v-for="(item, index) in relatedVideo" :key="index">
						<view class="video-wrap">							
							<image class="img" :src="item.cover + $imgSuffix"></image>
							<view class="desc ellipsis">{{ item.name}}</view>
							<view class="creater-bar flex-box">
								<view class="avactor-box flex-box">
									<image class="avactor" :src="item.cover + $imgSuffix"></image>
									<view class="ellipsis">{{ item.artistName}}</view>
								</view>
								<view class="more">
									<view class="iconfont">...</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import MescrollUni from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue";

	export default {
		components: {
			MescrollUni,
		},
		data() {
			return {
				isShowSearch: false,

				navList: [
					{ name: '推荐', id: 34571},
					{ name: 'LOCK直播', id: 23472},
					{ name: '翻唱', id: 33485},
					{ name: '广场', id: 4652},
					{ name: '舞蹈', id: 658785},
					{ name: '游戏', id: 62689},
					{ name: '现场', id: 7456345},
				],
				sliderWidth: 60, // 滑块宽度
				sliderOffset: 0,  // 滑块偏移量
				curNav: '',
				relatedVideo: [],
				mescrollTop:210,
				refreshing: false,
				// 下拉刷新的常用配置
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
				},
			}
		},
		onLoad() {
			this.getRelatedVideo()
			// #ifdef H5
			this.mescrollTop = 186
			// #endif
		},
		methods: {
			// 切换滑块方法
			switchNav(id,index){
				this.curNav = id 
				this.sliderWidth = index == 1 ? 140 : 60; //LOCK直播 比较宽，为120 ，其他都是60
				
				this.sliderOffset = 126 * index + (index > 1 ? 80 : 16) + (index == 0 && 16);  // 偏移量：移动的距离 
				// 加载数据
				this.getRelatedVideo(id)
			},
			
			//  获取相关视频
			getRelatedVideo(pageNum, pageSize, successCallback, errorCallback) {
				const params = {
					id: this.curNav,
					pageNum,
					pageSize,
				}
				uni.request({
					url: 'https://www.gzamon.wang/api/top/mv?limit=6',
					method: 'GET',
					data: {},
					success: (res) => {
						console.log(res.data);
						this.relatedVideo = res.data.data;
						// console.log(this.relatedVideo);
						//联网成功的回调
						successCallback && successCallback(res.data);
					},
					fail: (error) => {
						// 联网失败的回调
						errorCallback && errorCallback();
					}
					
				})
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				//联网加载数据
				// this.getList(1, 10, res => {
				// 	//联网成功的回调,隐藏下拉刷新的状态
				// 	mescroll.endSuccess();
					
					
				// 	//设置列表数据
				// 	this.relatedVideo = res
				// }, () => {
				// 	//联网失败的回调,隐藏下拉刷新的状态
				// 	mescroll.endErr();
				// })
				// 第2种方法
				mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getRelatedVideo(mescroll.num, mescroll.size, (res) => {
					//设置列表数据
					if(mescroll.num == 1) {
						this.relatedVideo = []; //如果是第一页需手动置空列表
					}
					this.relatedVideo = this.relatedVideo.concat(res.data)
					
					// 后台接口有返回列表的总数据量 totalSize
					// mescroll.endBySize(10, 50); // 必传参数(当前页的数据个数, 总数据量)
					mescroll.endSuccess();
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
		} 
	}
</script>

<style lang="scss">
	.topbar {
		.h86 {
			height: 86rpx;
		}
		.scroll-view {
			position: fixed;
			top: 64rpx;
			width: 100%;
			height: 86rpx;
			white-space: nowrap;
			text-align: center;
			line-height: 86rpx;
			color: #333;
			font-weight: 600;
			border-bottom: 1rpx solid #e6e6e6;
			z-index: 10;
			background: #fff;
			/* #ifdef H5 */
			top: 44rpx;
			/* #endif */
			.item {
				position: relative;
				display: inline-block;
				min-width: 126rpx;
				height: 86rpx;
				line-height: 86rpx;
				padding: 0 20rpx;
				// 触发向样式
				&.active {
					color: #f32628
				}
				
			}
		}
		// 滑块样式
		.slide{
			position: absolute;
			width: 60rpx;
			height: 4rpx;
			left: 0;
			bottom: 0;
			background: #f32628;
			transition: transform 0.3s;
			z-index: 2;
			/* #ifdef MP-WEIXIN */
			bottom: 2rpx;
			/* #endif*/
		}
		.desc {
			
		}
	}

	.video-list {
		color: #333;
		background: #f8f8f8;
		
		.video-item {
			padding-top: 32rpx;
			background: #fff;
			border-bottom: 24rpx solid #f8f8f8;
		}

		.video-wrap {
			width: 686rpx;
			margin: 0 auto;
		}

		.img {
			display: block;
			width: 686rpx;
			height: 390rpx;
			border-radius: 10rpx;
			background: #eee;
		}

		.desc {
			font-size: 30rpx;
			font-weight: 600;
			line-height: 84rpx;
			border-bottom: 1rpx solid #e6e6e6;
		}
		.creater-bar {
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.avactor-box {
				display: flex;
				align-items: center;
				.avactor{
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>