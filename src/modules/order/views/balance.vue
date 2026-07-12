<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />

			<cl-flex1 />
			<!-- 条件搜索 -->
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: "order-balance",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import UserSelect from "/$/user/components/user-select.vue";
import { centsToYuanFields, formatYuan, yuanToCentsFields } from "../utils/money";

const { service } = useCool();
const { t } = useI18n();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("选择用户"),
			prop: "userId",
			component: { vm: UserSelect },
			required: true,
		},
		{
			label: t("当前余额(元)"),
			prop: "balance",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("剩余消息条数"),
			prop: "messageQuota",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("累计充值(元)"),
			prop: "totalRecharge",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("累计消费(元)"),
			prop: "totalConsumed",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
	],
	onOpened(data) {
		centsToYuanFields(data, ["balance", "totalRecharge", "totalConsumed"]);
	},
	onSubmit(data, { next }) {
		next(yuanToCentsFields(data, ["balance", "totalRecharge", "totalConsumed"]));
	},
});

// cl-table
const Table = useTable({
	columns: [
		{ label: t("#"), type: "index" },
		{ label: t("头像"), prop: "userAvatar", minWidth: 120 },
		{ label: t("手机号"), prop: "userPhone", minWidth: 120 },
		{ label: t("昵称"), prop: "userNickName", minWidth: 120 },
		{ label: t("当前余额(元)"), prop: "balance", minWidth: 120, formatter: (row: any) => formatYuan(row.balance) },
		{ label: t("剩余消息条数"), prop: "messageQuota", minWidth: 120 },
		{ label: t("累计充值(元)"), prop: "totalRecharge", minWidth: 120, formatter: (row: any) => formatYuan(row.totalRecharge) },
		{ label: t("累计消费(元)"), prop: "totalConsumed", minWidth: 120, formatter: (row: any) => formatYuan(row.totalConsumed) },
		{
			label: t("创建时间"),
			prop: "createTime",
			minWidth: 170,
			sortable: "desc",
			component: { name: "cl-date-text" },
		},
		{
			label: t("更新时间"),
			prop: "updateTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
	],
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.order.balance,
	},
	(app) => {
		app.refresh();
	},
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
