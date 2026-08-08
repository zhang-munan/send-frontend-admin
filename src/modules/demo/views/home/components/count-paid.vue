<template>
	<div v-loading="loading" class="count-paid">
		<div class="card">
			<div class="card__header">
				<span class="label">{{ $t('付费订单') }}</span>
				<cl-svg name="order" class="icon" />
			</div>

			<div class="card__container">
				<cl-number :value="num" class="num" suffix="笔" />
			</div>

			<div class="card__footer">
				<span class="mr-2">{{ $t('今日付费订单') }}</span>
				<span>{{ data.todayPaidCount }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
	data: { paidCount: number; todayPaidCount: number };
	loading: boolean;
}>();

const num = computed(() => props.data.paidCount);
</script>
