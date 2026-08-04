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
import { ElMessage, ElMessageBox } from "element-plus";
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
		{ label: t("套餐余额"), value: 5 },
	],
	status: [
		{ label: t("待支付"), value: 0 },
		{ label: t("已支付"), value: 1 },
		{ label: t("已退款"), value: 2 },
		{ label: t("已关闭"), value: 3 },
	],
	refundStatus: [
		{ label: t("未申请"), value: 0 },
		{ label: t("待审批"), value: 1 },
		{ label: t("已退款"), value: 2 },
		{ label: t("已拒绝"), value: 3 },
		{ label: t("退款处理中"), value: 4 },
		{ label: t("退款失败"), value: 5 },
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
			label: t("退款状态"),
			prop: "refundStatus",
			component: { name: "el-radio-group", options: options.refundStatus },
			value: 0,
		},
		{
			label: t("退款申请时间"),
			prop: "refundApplyTime",
			component: {
				name: "el-date-picker",
				props: { type: "datetime", valueFormat: "YYYY-MM-DD HH:mm:ss" },
			},
			span: 12,
		},
		{
			label: t("退款审批时间"),
			prop: "refundAuditTime",
			component: {
				name: "el-date-picker",
				props: { type: "datetime", valueFormat: "YYYY-MM-DD HH:mm:ss" },
			},
			span: 12,
		},
		{
			label: t("退款处理说明"),
			prop: "refundRejectReason",
			component: { name: "el-input", props: { clearable: true } },
		},
		{
			label: t("商户退款单号"),
			prop: "refundNo",
			component: { name: "el-input", props: { clearable: true } },
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
		{ label: t("手机号"), prop: "userPhone", minWidth: 130 },
		{ label: t("昵称"), prop: "userNickName", minWidth: 140, showOverflowTooltip: true },
		{ label: t("订单编号"), prop: "orderNo", minWidth: 220, showOverflowTooltip: true },
		{ label: t("商品ID"), prop: "productId", minWidth: 110 },
		{ label: t("商品名称"), prop: "productName", minWidth: 180, showOverflowTooltip: true },
		{ label: t("数量"), prop: "quantity", minWidth: 80 },
		{ label: t("商品原价(元)"), prop: "originalPrice", minWidth: 130, formatter: (row: any) => formatYuan(row.originalPrice) },
		{ label: t("优惠金额(元)"), prop: "discountAmount", minWidth: 130, formatter: (row: any) => formatYuan(row.discountAmount) },
		{ label: t("实付金额(元)"), prop: "payAmount", minWidth: 130, formatter: (row: any) => formatYuan(row.payAmount) },
		{
			label: t("支付方式"),
			prop: "payMethod",
			minWidth: 100,
			dict: options.payMethod,
		},
		{
			label: t("0待支付"),
			prop: "status",
			minWidth: 100,
			dict: options.status,
		},
		{
			label: t("支付时间"),
			prop: "payTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
		{ label: t("第三方支付流水号"), prop: "tradeNo", minWidth: 220, showOverflowTooltip: true },
		{
			label: t("支付参数JSON（如消息内容等附加参数）"),
			prop: "payParams",
			minWidth: 260,
			showOverflowTooltip: true,
		},
		{ label: t("退款金额(元)"), prop: "refundAmount", minWidth: 130, formatter: (row: any) => formatYuan(row.refundAmount) },
		{
			label: t("退款时间"),
			prop: "refundTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
		{ label: t("退款原因"), prop: "refundReason", minWidth: 180, showOverflowTooltip: true },
		{
			label: t("退款状态"),
			prop: "refundStatus",
			minWidth: 120,
			dict: options.refundStatus,
		},
		{
			label: t("申请时间"),
			prop: "refundApplyTime",
			minWidth: 170,
			component: { name: "cl-date-text" },
		},
		{ label: t("处理说明"), prop: "refundRejectReason", minWidth: 180, showOverflowTooltip: true },
		{ label: t("退款单号"), prop: "refundNo", minWidth: 220, showOverflowTooltip: true },
		{ label: t("客户端IP"), prop: "clientIp", minWidth: 130 },
		{ label: t("备注"), prop: "remark", minWidth: 180, showOverflowTooltip: true },
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
		{
			type: "op",
			width: 260,
			buttons({ scope }: any) {
				const buttons: any[] = [];
				if (scope.row.refundStatus === 1) {
					buttons.push(
						{
							label: t("通过退款"),
							type: "success",
							onClick: () => auditRefund(scope.row, true),
						},
						{
							label: t("拒绝"),
							type: "danger",
							onClick: () => auditRefund(scope.row, false),
						},
					);
				}
				if (scope.row.payMethod === 1 && scope.row.refundStatus === 4) {
					buttons.push({
						label: t("同步状态"),
						type: "primary",
						onClick: () => syncRefund(scope.row),
					});
				}
				if (scope.row.payMethod === 1 && scope.row.refundStatus === 5) {
					buttons.push({
						label: t("重试退款"),
						type: "warning",
						onClick: () => retryRefund(scope.row),
					});
				}
				buttons.push("delete");
				return buttons;
			},
		},
	],
});

async function auditRefund(row: any, approved: boolean) {
	try {
		let remark = "";
		if (approved) {
			await ElMessageBox.confirm(
				t(`确认通过订单 ${row.orderNo} 的全额退款申请吗？`),
				t("退款审批"),
				{ type: "warning", confirmButtonText: t("确认退款"), cancelButtonText: t("取消") },
			);
		} else {
			const result = await ElMessageBox.prompt(t("请输入拒绝原因"), t("拒绝退款"), {
				confirmButtonText: t("确认拒绝"),
				cancelButtonText: t("取消"),
				inputPattern: /\S+/,
				inputErrorMessage: t("拒绝原因不能为空"),
			});
			remark = result.value;
		}
		await (service.order.info as any).refundAudit({ id: row.id, approved, remark });
		ElMessage.success(approved ? t("退款已受理") : t("已拒绝退款申请"));
		Crud.value?.refresh();
	} catch (error: any) {
		if (error === "cancel" || error === "close") return;
		ElMessage.error(error?.message || t("操作失败"));
	}
}

async function syncRefund(row: any) {
	try {
		await (service.order.info as any).syncRefund({ id: row.id });
		ElMessage.success(t("退款状态已同步"));
		Crud.value?.refresh();
	} catch (error: any) {
		ElMessage.error(error?.message || t("同步失败"));
	}
}

async function retryRefund(row: any) {
	try {
		await ElMessageBox.confirm(t("确认重试该笔微信退款吗？"), t("重试退款"), {
			type: "warning",
		});
		await (service.order.info as any).retryRefund({ id: row.id });
		ElMessage.success(t("退款已重新受理"));
		Crud.value?.refresh();
	} catch (error: any) {
		if (error === "cancel" || error === "close") return;
		ElMessage.error(error?.message || t("重试失败"));
	}
}

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
