<template>
	<el-scrollbar>
		<div class="demo-home">
			<div class="dashboard-meta">
				<span v-if="dashboard.updatedAt">数据更新于 {{ dashboard.updatedAt }}</span>
				<el-button link :loading="loading" @click="refresh">刷新</el-button>
			</div>

			<el-row :gutter="10">
				<el-col :lg="6" :md="12" :xs="24">
					<count-user :data="dashboard.users" :loading="loading" />
				</el-col>
				<el-col :lg="6" :md="12" :xs="24">
					<count-views :data="dashboard.messages" :delivery="dashboard.delivery" :loading="loading" />
				</el-col>
				<el-col :lg="6" :md="12" :xs="24">
					<count-paid :data="dashboard.orders" :loading="loading" />
				</el-col>
				<el-col :lg="6" :md="12" :xs="24">
					<count-effect :data="dashboard.revenue" :loading="loading" />
				</el-col>
			</el-row>

			<el-row :gutter="10">
				<el-col :lg="24" :xs="24">
					<tab-chart :data="dashboard.monthly" :year="dashboard.year" :loading="loading" />
				</el-col>
			</el-row>

			<el-row :gutter="10">
				<el-col :lg="14" :sm="24">
					<hot-goods />
				</el-col>
				<el-col :lg="10" :sm="24">
					<category-ratio :data="dashboard.messageStatuses" :loading="loading" />
				</el-col>
			</el-row>
		</div>
	</el-scrollbar>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'home'
});

import CategoryRatio from './components/category-ratio.vue';
import CountUser from './components/count-user.vue';
import CountViews from './components/count-views.vue';
import CountPaid from './components/count-paid.vue';
import CountEffect from './components/count-effect.vue';
import TabChart from './components/tab-chart.vue';
import HotGoods from './components/hot-goods.vue';
import { ElMessage } from 'element-plus';
import { onActivated, onMounted, ref } from 'vue';
import { createEmptyDashboard, getDashboardSummary } from './dashboard';

const dashboard = ref(createEmptyDashboard());
const loading = ref(false);

async function refresh() {
	if (loading.value) return;
	loading.value = true;
	try {
		dashboard.value = await getDashboardSummary();
	} catch (error: any) {
		ElMessage.error(error?.message || '首页统计加载失败');
	} finally {
		loading.value = false;
	}
}

onMounted(refresh);
onActivated(() => {
	// 首次进入由 onMounted 加载；从其他页面返回时再刷新一次。
	if (dashboard.value.updatedAt) refresh();
});
</script>

<style lang="scss">
.demo-home {
	overflow-x: hidden;

	.dashboard-meta {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 10px;
		min-height: 28px;
		padding: 0 4px 6px;
		font-size: 12px;
		color: var(--el-text-color-secondary);
	}

	.card {
		border-radius: 10px;
		margin-bottom: 10px;
		border: 1px solid var(--el-border-color-extra-light);
		background-color: var(--el-bg-color);
		color: var(--el-text-color-primary);
		user-select: none;

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 20px;
			min-height: 50px;

			.label {
				font-size: 15px;
			}

			.icon {
				font-size: 30px;
				background-color: var(--el-fill-color-light);
				padding: 5px;
				border-radius: 6px;
			}
		}

		&__container {
			padding: 0 20px;
			min-height: 50px;

			.num {
				font-size: 32px;
			}
		}

		&__footer {
			display: flex;
			align-items: center;
			height: 50px;
			margin: 0 5px;
			padding: 0 15px;
			box-sizing: border-box;
			font-size: 12px;

			.label {
				margin-right: 10px;
			}
		}
	}
}
</style>
