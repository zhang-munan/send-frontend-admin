<template>
	<div v-loading="loading" class="count-effect">
		<div class="card">
			<div class="card__header">
				<span class="label">{{ $t('累计实收') }}</span>

				<cl-svg name="amount" class="icon" />
			</div>

			<div class="card__container">
				<cl-number :value="totalYuan" class="num" type="amount" suffix="元" />
			</div>

			<div class="card__footer">
				<span class="mr-2">{{ $t('今日实收') }}</span>
				<span>¥{{ formatYuan(data.today) }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatYuan } from '/$/order/utils/money';

const props = defineProps<{
	data: { total: number; today: number };
	loading: boolean;
}>();

const totalYuan = computed(() => Number(formatYuan(props.data.total)));
</script>
