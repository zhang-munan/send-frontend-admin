<template>
	<cl-crud ref="Crud">
		<cl-row><cl-refresh-btn /><cl-flex1 /><cl-search ref="Search" /></cl-row>
		<cl-row><cl-table ref="Table" /></cl-row>
		<cl-row><cl-flex1 /><cl-pagination /></cl-row>
	</cl-crud>
</template>

<script lang="ts" setup name="promotion-commission">
import { useCrud, useSearch, useTable } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { formatYuan } from '/$/order/utils/money';
const { service } = useCool();
const statuses = [{ label: '待结算', value: 0, type: 'warning' }, { label: '已结算', value: 1, type: 'success' }, { label: '已冲正', value: 2, type: 'danger' }];
const Table = useTable({ columns: [
	{ type: 'index', label: '#' },
	{ prop: 'promotionCode', label: '推广码', minWidth: 140 },
	{ prop: 'referredUserPhone', label: '被推广用户', minWidth: 130 },
	{ prop: 'orderNo', label: '订单号', minWidth: 210 },
	{ prop: 'sourceAmount', label: '实付金额(元)', width: 130, formatter: (row: any) => formatYuan(row.sourceAmount) },
	{ prop: 'commissionRateBps', label: '分成比例', width: 100, formatter: (row: any) => `${Number(row.commissionRateBps) / 100}%` },
	{ prop: 'commissionAmount', label: '佣金(元)', width: 110, formatter: (row: any) => formatYuan(row.commissionAmount) },
	{ prop: 'status', label: '状态', width: 100, dict: statuses },
	{ prop: 'availableAt', label: '预计可提现', minWidth: 170, component: { name: 'cl-date-text' } },
	{ prop: 'reverseReason', label: '冲正原因', minWidth: 180, showOverflowTooltip: true },
	{ prop: 'createTime', label: '创建时间', minWidth: 170, component: { name: 'cl-date-text' } }
] });
const Search = useSearch({ items: [{ prop: 'status', label: '状态', component: { name: 'el-select', props: { clearable: true }, options: statuses } }] });
const Crud = useCrud({ service: (service as any).promotion.commission }, app => app.refresh());
</script>
