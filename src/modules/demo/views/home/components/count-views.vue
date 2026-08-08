<template>
	<div v-loading="loading" class="count-views">
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
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { HourlyMessageStat } from '../dashboard';

const props = defineProps<{
	data: { total: number; today: number; hourly: HourlyMessageStat[] };
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
