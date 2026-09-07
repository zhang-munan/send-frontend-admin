<template>
	<cl-crud ref="Crud">
		<cl-row><cl-refresh-btn /><cl-flex1 /><cl-search ref="Search" /></cl-row>
		<cl-row><cl-table ref="Table" /></cl-row>
		<cl-row><cl-flex1 /><cl-pagination /></cl-row>
	</cl-crud>
</template>

<script lang="ts" setup name="promotion-withdrawal">
import { useCrud, useSearch, useTable } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { ElMessage, ElMessageBox } from 'element-plus';
import { formatYuan } from '/$/order/utils/money';

const { service } = useCool();
const statuses = [
	{ label: '待审核', value: 0, type: 'warning' }, { label: '打款中', value: 1, type: 'primary' },
	{ label: '已打款', value: 2, type: 'success' }, { label: '已驳回', value: 3, type: 'danger' }, { label: '已取消', value: 4, type: 'info' }
];
const methods = [{ label: '微信', value: 1 }, { label: '支付宝', value: 2 }, { label: '银行卡', value: 3 }];
const Table = useTable({ columns: [
	{ type: 'index', label: '#' },
	{ prop: 'withdrawalNo', label: '提现单号', minWidth: 220 },
	{ prop: 'userPhone', label: '手机号', minWidth: 130 },
	{ prop: 'userNickName', label: '昵称', minWidth: 120 },
	{ prop: 'amount', label: '申请金额(元)', width: 130, formatter: (row: any) => formatYuan(row.amount) },
	{ prop: 'feeAmount', label: '手续费(元)', width: 110, formatter: (row: any) => formatYuan(row.feeAmount) },
	{ prop: 'actualAmount', label: '到账金额(元)', width: 130, formatter: (row: any) => formatYuan(row.actualAmount) },
	{ prop: 'withdrawMethod', label: '方式', width: 90, dict: methods },
	{ prop: 'accountName', label: '收款人', width: 110 },
	{ prop: 'accountNo', label: '收款账号', minWidth: 180 },
	{ prop: 'bankName', label: '开户行', minWidth: 160, showOverflowTooltip: true },
	{ prop: 'status', label: '状态', width: 100, dict: statuses },
	{ prop: 'paymentTradeNo', label: '打款流水号', minWidth: 180 },
	{ prop: 'auditRemark', label: '处理说明', minWidth: 180, showOverflowTooltip: true },
	{ prop: 'createTime', label: '申请时间', minWidth: 170, component: { name: 'cl-date-text' } },
	{ type: 'op', width: 230, buttons({ scope }: any) {
		const buttons: any[] = [];
		if (scope.row.status === 0) buttons.push({ label: '通过', type: 'success', onClick: () => audit(scope.row, 'approve') }, { label: '驳回', type: 'danger', onClick: () => audit(scope.row, 'reject') });
		if (scope.row.status === 1) buttons.push({ label: '确认打款', type: 'primary', onClick: () => audit(scope.row, 'paid') }, { label: '驳回', type: 'danger', onClick: () => audit(scope.row, 'reject') });
		return buttons;
	} }
] });
const Search = useSearch({ items: [
	{ prop: 'status', label: '状态', component: { name: 'el-select', props: { clearable: true }, options: statuses } },
	{ prop: 'withdrawMethod', label: '提现方式', component: { name: 'el-select', props: { clearable: true }, options: methods } }
] });
const Crud = useCrud({ service: (service as any).promotion.withdrawal }, app => app.refresh());

async function audit(row: any, action: string) {
	try {
		let remark = '';
		let paymentTradeNo = '';
		if (action === 'approve') {
			await ElMessageBox.confirm(`确认通过提现申请 ${row.withdrawalNo}？通过后请线下打款。`, '提现审核', { type: 'warning' });
		} else if (action === 'reject') {
			const result = await ElMessageBox.prompt('请输入驳回原因，冻结金额将退回用户余额', '驳回提现', { inputPattern: /\S{2,}/, inputErrorMessage: '请至少输入 2 个字符' });
			remark = result.value;
		} else {
			const result = await ElMessageBox.prompt('请输入真实打款流水号', '确认已打款', { inputPattern: /\S{4,}/, inputErrorMessage: '请至少输入 4 个字符' });
			paymentTradeNo = result.value;
		}
		await (service as any).promotion.withdrawal.audit({ id: row.id, action, remark, paymentTradeNo });
		ElMessage.success('操作成功');
		Crud.value?.refresh();
	} catch (error: any) {
		if (error === 'cancel' || error === 'close') return;
		ElMessage.error(error?.message || '操作失败');
	}
}
</script>
