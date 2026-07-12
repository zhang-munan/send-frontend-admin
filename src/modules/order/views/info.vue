<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />

			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
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
	name: "order-info",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import UserSelect from "/$/user/components/user-select.vue";
import { centsToYuanFields, formatYuan, yuanToCentsFields } from "../utils/money";

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	payMethod: [
		{ label: t(""), value: 0 },
		{ label: t("微信"), value: 1 },
		{ label: t("支付宝"), value: 2 },
		{ label: t("余额"), value: 3 },
		{ label: t("模拟支付"), value: 4 },
	],
	status: [
		{ label: t("待支付"), value: 0 },
		{ label: t("已支付"), value: 1 },
		{ label: t("已退款"), value: 2 },
		{ label: t("已关闭"), value: 3 },
	],
});

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
			label: t("订单编号"),
			prop: "orderNo",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("选择商品"),
			prop: "productId",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("商品名称"),
			prop: "productName",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("数量"),
			prop: "quantity",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("商品原价(元)"),
			prop: "originalPrice",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("优惠金额(元)"),
			prop: "discountAmount",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("实付金额(元)"),
			prop: "payAmount",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("支付方式"),
			prop: "payMethod",
			component: { name: "el-radio-group", options: options.payMethod },
		},
		{
			label: t("0待支付"),
			prop: "status",
			component: { name: "el-radio-group", options: options.status },
			value: 0,
			required: true,
		},
		{
			label: t("支付时间"),
			prop: "payTime",
			component: {
				name: "el-date-picker",
				props: { type: "datetime", valueFormat: "YYYY-MM-DD HH:mm:ss" },
			},
			span: 12,
		},
		{
			label: t("第三方支付流水号"),
			prop: "tradeNo",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("支付参数JSON（如消息内容等附加参数）"),
			prop: "payParams",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("退款金额(元)"),
			prop: "refundAmount",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("退款时间"),
			prop: "refundTime",
			component: {
				name: "el-date-picker",
				props: { type: "datetime", valueFormat: "YYYY-MM-DD HH:mm:ss" },
			},
			span: 12,
		},
		{
			label: t("退款原因"),
			prop: "refundReason",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("客户端IP"),
			prop: "clientIp",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("备注"),
			prop: "remark",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
	],
	onOpened(data) {
		centsToYuanFields(data, ["originalPrice", "discountAmount", "payAmount", "refundAmount"]);
	},
	onSubmit(data, { next }) {
		next(yuanToCentsFields(data, ["originalPrice", "discountAmount", "payAmount", "refundAmount"]));
	},
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("手机号"), prop: "userPhone", minWidth: 120 },
		{ label: t("昵称"), prop: "userNickName", minWidth: 120 },
		{ label: t("订单编号"), prop: "orderNo", minWidth: 120 },
		{ label: t("商品ID"), prop: "productId", minWidth: 120 },
		{ label: t("商品名称"), prop: "productName", minWidth: 120 },
		{ label: t("数量"), prop: "quantity", minWidth: 120 },
		{ label: t("商品原价(元)"), prop: "originalPrice", minWidth: 120, formatter: (row: any) => formatYuan(row.originalPrice) },
		{ label: t("优惠金额(元)"), prop: "discountAmount", minWidth: 120, formatter: (row: any) => formatYuan(row.discountAmount) },
		{ label: t("实付金额(元)"), prop: "payAmount", minWidth: 120, formatter: (row: any) => formatYuan(row.payAmount) },
		{
			label: t("支付方式"),
			prop: "payMethod",
			minWidth: 120,
			dict: options.payMethod,
		},
		{
			label: t("0待支付"),
			prop: "status",
			minWidth: 120,
			dict: options.status,
		},
		{
			label: t("支付时间"),
			prop: "payTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
		{ label: t("第三方支付流水号"), prop: "tradeNo", minWidth: 120 },
		{
			label: t("支付参数JSON（如消息内容等附加参数）"),
			prop: "payParams",
			minWidth: 120,
		},
		{ label: t("退款金额(元)"), prop: "refundAmount", minWidth: 120, formatter: (row: any) => formatYuan(row.refundAmount) },
		{
			label: t("退款时间"),
			prop: "refundTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
		{ label: t("退款原因"), prop: "refundReason", minWidth: 120 },
		{ label: t("客户端IP"), prop: "clientIp", minWidth: 120 },
		{ label: t("备注"), prop: "remark", minWidth: 120 },
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
		{ type: "op", buttons: ["delete"] },
	],
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.order.info,
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
