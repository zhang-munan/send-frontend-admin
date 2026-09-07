<template>
	<div v-loading="loading" class="count-views">
		<el-popover placement="top" :width="300" trigger="hover">
			<template #reference>
				<div class="card">
					<div class="card__header">
						<span class="label">{{ $t('累计短信量') }}</span>
						<cl-svg name="trend" class="icon" />
					</div>

					<div class="card__container">
						<cl-number :value="data.total" class="num" suffix="条" />
						<v-chart :option="chartOption" autoresize />
					</div>

					<div class="card__footer">
						<span>{{ $t('今日短信量') }} {{ data.today }}</span>
						<span>{{ $t('送达率') }} {{ delivery.rate }}%</span>
					</div>
				</div>
			</template>

			<div class="device-stats">
				<div class="device-stats__title">发送设备明细</div>
				<template v-if="data.devices.length">
					<div v-for="item in data.devices" :key="item.device" class="device-stats__item">
						<span class="device-stats__name">{{ item.device }} 设备</span>
						<span class="device-stats__count">发送 {{ item.count }} 条</span>
					</div>
				</template>
				<div v-else class="device-stats__empty">暂无设备发送记录</div>
			</div>
		</el-popover>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { DeviceMessageStat, HourlyMessageStat } from '../dashboard';

const props = defineProps<{
	data: {
		total: number;
		today: number;
		devices: DeviceMessageStat[];
		hourly: HourlyMessageStat[];
	};
	delivery: { delivered: number; failed: number; rate: number };
	loading: boolean;
}>();

const chartOption = computed(() => ({
	grid: {
		left: 0,
		top: 1,
		right: 0,
		bottom: 0
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		axisLine: {
			show: false
		},
		data: props.data.hourly.map(item => `${String(item.hour).padStart(2, '0')}:00`)
	},
	yAxis: {
		type: 'value',
		splitLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLine: {
			show: false
		},
		axisLabel: {
			show: false
		}
	},
	series: [
		{
			type: 'line',
			smooth: true,
			showSymbol: false,
			symbol: 'circle',
			symbolSize: 6,
			data: props.data.hourly.map(item => item.count),
			itemStyle: {
				color: '#4165d7'
			},
			lineStyle: {
				width: 2
			}
		}
	]
}));
</script>

<style lang="scss" scoped>
.count-views {
	.card {
		.echarts {
			height: 50px;
			width: 100%;
		}

		&__container {
			position: relative;
			padding: 0 20px;

			.num {
				position: relative;
				z-index: 2;
				font-size: 32px;
			}

			.echarts {
				position: absolute;
				inset: 0;
				opacity: 0.45;
			}
		}

		&__footer {
			border-top: 0;
			justify-content: space-between;
		}
	}
}
</style>

<style lang="scss">
.device-stats {
	max-height: 320px;
	overflow-y: auto;
	font-size: 13px;

	&__title {
		margin-bottom: 8px;
		font-weight: 600;
		color: var(--el-text-color-primary);
	}

	&__item {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding: 4px 0;
		color: var(--el-text-color-regular);
	}

	&__name {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__count {
		flex-shrink: 0;
		white-space: nowrap;
	}

	&__empty {
		color: var(--el-text-color-secondary);
	}
}
</style>
