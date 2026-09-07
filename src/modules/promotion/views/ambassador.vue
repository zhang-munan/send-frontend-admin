<template>
	<cl-crud ref="Crud">
		<cl-row><cl-refresh-btn /><cl-flex1 /><cl-search ref="Search" /></cl-row>
		<cl-row><cl-table ref="Table" /></cl-row>
		<cl-row><cl-flex1 /><cl-pagination /></cl-row>
	</cl-crud>
</template>

<script lang="ts" setup name="promotion-ambassador">
import { useCrud, useSearch, useTable } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { ElMessage, ElMessageBox } from 'element-plus';
import { formatYuan } from '/$/order/utils/money';

const { service } = useCool();
const Table = useTable({ columns: [
	{ type: 'index', label: '#' },
	{ prop: 'userPhone', label: '手机号', minWidth: 130 },
	{ prop: 'userNickName', label: '昵称', minWidth: 130 },
	{ prop: 'promotionCode', label: '推广码', minWidth: 150 },
	{ prop: 'status', label: '状态', width: 90, dict: [{ label: '停用', value: 0, type: 'danger' }, { label: '正常', value: 1, type: 'success' }] },
	{ prop: 'totalReferrals', label: '推广用户', width: 100 },
	{ prop: 'availableBalance', label: '可提现(元)', width: 120, formatter: (row: any) => formatYuan(row.availableBalance) },
	{ prop: 'frozenBalance', label: '冻结(元)', width: 110, formatter: (row: any) => formatYuan(row.frozenBalance) },
	{ prop: 'totalCommission', label: '累计佣金(元)', width: 130, formatter: (row: any) => formatYuan(row.totalCommission) },
	{ prop: 'totalWithdrawn', label: '累计提现(元)', width: 130, formatter: (row: any) => formatYuan(row.totalWithdrawn) },
	{ prop: 'agreedAt', label: '同意规则时间', minWidth: 170, component: { name: 'cl-date-text' } },
	{ prop: 'createTime', label: '申请时间', minWidth: 170, component: { name: 'cl-date-text' } },
	{ type: 'op', width: 110, buttons({ scope }: any) { return [{ label: scope.row.status === 1 ? '停用' : '启用', type: scope.row.status === 1 ? 'danger' : 'success', onClick: () => changeStatus(scope.row) }]; } }
] });
const Search = useSearch({ items: [{ prop: 'status', label: '状态', component: { name: 'el-select', props: { clearable: true }, options: [{ label: '正常', value: 1 }, { label: '停用', value: 0 }] } }] });
const Crud = useCrud({ service: (service as any).promotion.ambassador }, app => app.refresh());
async function changeStatus(row: any) {
	try {
		const status = row.status === 1 ? 0 : 1;
		await ElMessageBox.confirm(status === 0 ? '停用后该推广码立即失效，且不能继续提现。确认停用？' : '确认重新启用该推广大使？', '状态变更', { type: 'warning' });
		await (service as any).promotion.ambassador.setStatus({ id: row.id, status });
		ElMessage.success('状态已更新');
		Crud.value?.refresh();
	} catch (error: any) {
		if (error !== 'cancel' && error !== 'close') ElMessage.error(error?.message || '操作失败');
	}
}
</script>
