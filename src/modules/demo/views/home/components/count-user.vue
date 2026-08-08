<template>
	<div v-loading="loading" class="count-sales">
		<div class="card">
			<div class="card__header">
				<span class="label">{{ $t('总用户数') }}</span>
				<cl-svg name="team" class="icon" />
			</div>

			<div class="card__container">
				<cl-number :value="num" class="num" />

				<div v-if="data.dayOverDayRate !== null" :class="data.dayOverDayRate >= 0 ? 'rise' : 'fall'">
					<el-icon>
						<top-right v-if="data.dayOverDayRate >= 0" />
						<bottom-right v-else />
					</el-icon>

					<span>{{ data.dayOverDayRate > 0 ? '+' : '' }}{{ data.dayOverDayRate }}%</span>
				</div>
			</div>

			<div class="card__footer">
				<span class="mr-2">{{ $t('日增用户数') }}</span>
				<span>{{ data.today }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { BottomRight, TopRight } from '@element-plus/icons-vue';
import { computed } from 'vue';

const props = defineProps<{
	data: { total: number; today: number; yesterday: number; dayOverDayRate: number | null };
	loading: boolean;
}>();

const num = computed(() => props.data.total);
</script>

<style lang="scss" scoped>
.count-sales {
	.fall,
	.rise {
		display: inline-flex;
		align-items: center;
		margin-left: 10px;
	}

	.fall {
		color: var(--el-color-success);
	}

	.rise {
		color: var(--el-color-danger);
	}
}
</style>
