<template>
	<div v-loading="loading" class="card">
		<div class="card__header">
			<cl-select-button v-model="tab.active" :options="tab.list" />

			<span class="year">{{ $t('{year}年', { year }) }}</span>
		</div>

		<v-chart :option="chartOption" autoresize />
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTheme } from '/#/theme';
import type { MonthlyOrderStat } from '../dashboard';

const props = defineProps<{
	data: MonthlyOrderStat[];
	year: number;
	loading: boolean;
}>();

const { t } = useI18n();
const theme = useTheme();

const tab = reactive({
	active: 'sales',

	list: [
		{
			label: t('实收金额'),
			value: 'sales'
		},
		{
			label: t('已支付订单'),
			value: 'order'
		}
	]
});

const chartOption = computed(() => ({
	grid: {
		containLabel: true,
		left: '5%',
		right: '5%'
	},
	xAxis: {
		type: 'category',
		data: props.data.map(item => t('{i}月', { i: item.month })),
		offset: 5,
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		}
	},
	yAxis: {
		type: 'value',
		offset: 20,
		splitLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLine: {
			show: false
		}
	},
	tooltip: {
		trigger: 'axis',
		formatter: (comp: any) => {
			const name = tab.list.find(e => e.value === tab.active)?.label;
			const value = comp[0]?.value || 0;
			return `${name}：${tab.active === 'sales' ? `¥${Number(value).toFixed(2)}` : value}`;
		},
		axisPointer: {
			show: true,
			status: 'shadow',
			z: -1,
			type: 'shadow'
		},
		extraCssText: 'width:120px; white-space:pre-wrap'
	},
	series: [
		{
			barWidth: 25,
			type: 'bar',
			data: props.data.map(item =>
				tab.active === 'sales' ? Number((item.revenue / 100).toFixed(2)) : item.orderCount
			),
			itemStyle: {
				color: theme.color
			}
		}
	]
}));
</script>

<style lang="scss" scoped>
.card {
	&__header {
		padding: 10px 20px 10px 10px !important;

		.year {
			display: flex;
			align-items: center;
			font-size: 14px;
			line-height: 1;
			color: var(--el-text-color-primary);

			&::before {
				content: '';
				display: inline-block;
				width: 6px;
				height: 6px;
				border-radius: 50%;
				background-color: var(--el-color-info);
				margin-right: 6px;
			}
		}
	}

	.echarts {
		height: 500px;
		width: 100%;
	}
}
</style>
