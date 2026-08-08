<template>
	<div class="card">
		<div class="card__header">
			<span class="label">{{ $t('业务排行') }}</span>

			<cl-select-button v-model="range" :options="options" small @change="load" />
		</div>

		<div v-loading="loading" class="card__container">
			<el-table :data="list" height="406" empty-text="该时间范围内暂无已支付订单">
				<el-table-column type="index" :label="$t('排名')" width="70" />
				<el-table-column prop="name" :label="$t('业务名称')" min-width="180" show-overflow-tooltip />
				<el-table-column prop="revenue" :label="$t('实收金额')" min-width="120" align="right">
					<template #default="{ row }">¥{{ formatYuan(row.revenue) }}</template>
				</el-table-column>
				<el-table-column prop="orderCount" :label="$t('已支付订单')" min-width="120" align="right" sortable />
				<el-table-column prop="latestPayTime" :label="$t('最近支付时间')" min-width="170" />
			</el-table>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { onActivated, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatYuan } from '/$/order/utils/money';
import {
	getDashboardRanking,
	type DashboardRange,
	type DashboardRankingItem
} from '../dashboard';

const { t } = useI18n();
const range = ref<DashboardRange>('day');
const list = ref<DashboardRankingItem[]>([]);
const loading = ref(false);
const loaded = ref(false);

const options = [
	{ label: t('今日'), value: 'day' },
	{ label: t('本周'), value: 'week' },
	{ label: t('本月'), value: 'month' },
	{ label: t('全年'), value: 'year' }
];

async function load() {
	if (loading.value) return;
	loading.value = true;
	try {
		const result = await getDashboardRanking(range.value);
		list.value = result.list;
		loaded.value = true;
	} catch (error: any) {
		ElMessage.error(error?.message || '业务排行加载失败');
	} finally {
		loading.value = false;
	}
}

onMounted(load);
onActivated(() => {
	if (loaded.value) load();
});
</script>

<style lang="scss" scoped>
.card {
	padding-bottom: 20px;

	&__container {
		min-height: 406px;
	}
}
</style>
