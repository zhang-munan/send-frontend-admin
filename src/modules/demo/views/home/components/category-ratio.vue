<template>
	<div v-loading="loading" class="card">
		<div class="card__header">
			<span class="label">{{ $t('消息状态分布') }}</span>
		</div>

		<div class="card__container">
			<v-chart :option="chartOption" autoresize />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core';
import { computed } from 'vue';
import type { MessageStatusStat } from '../dashboard';

const props = defineProps<{
	data: MessageStatusStat[];
	loading: boolean;
}>();

const isDark = useDark();

const textColor = computed(() => (isDark.value ? '#f1f1f9' : '#000'));

const chartOption = computed(() => ({
	legend: {
		top: 'bottom',
		textStyle: {
			color: textColor.value
		}
	},
	grid: {
		top: 0
	},
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b}: {c} ({d}%)'
	},
	series: [
		{
			type: 'pie',
			radius: ['35%', '50%'],
			avoidLabelOverlap: false,
			padAngle: 5,
			itemStyle: {
				borderRadius: 6
			},
			label: {
				color: textColor.value
			},
			data: props.data.map(item => ({ value: item.count, name: item.name }))
		}
	],
	graphic: props.data.length
		? undefined
		: {
			type: 'text',
			left: 'center',
			top: 'middle',
			style: { text: '暂无消息数据', fill: textColor.value }
		}
}));
</script>

<style lang="scss" scoped>
.card {
	&__container {
		height: 456px;
	}

	.echarts {
		height: calc(100% - 50px);
	}
}
</style>
