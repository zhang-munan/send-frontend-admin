<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
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
	name: "message-info",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import UserSelect from "/$/user/components/user-select.vue";
import { centsToYuanFields, formatYuan, yuanToCentsFields } from "/$/order/utils/money";

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	sendType: [
		{ label: t("立即发送"), value: 0, type: "danger" },
		{ label: t("定时发送"), value: 1, type: "success" },
	],
	status: [
		{ label: t("待审核"), value: 0 },
		{ label: t("审核通过"), value: 1 },
		{ label: t("审核拒绝"), value: 2 },
		{ label: t("待发送"), value: 3 },
		{ label: t("发送中"), value: 4 },
		{ label: t("已送达"), value: 5 },
		{ label: t("发送失败"), value: 6 },
		{ label: t("已取消"), value: 7 },
	],
	auditStatus: [
		{ label: t("待审核"), value: 0 },
		{ label: t("通过"), value: 1 },
		{ label: t("拒绝"), value: 2 },
		{ label: t("转人工"), value: 3 },
	],
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("选择发送用户"),
			prop: "userId",
			component: { vm: UserSelect },
			required: true,
		},
		{
			label: t("选择使用的模板"),
			prop: "templateId",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("选择所属对话"),
			prop: "conversationId",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("收件人手机号（后续加密）"),
			prop: "receiverPhone",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("收件人脱敏号码"),
			prop: "receiverPhoneMask",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("收件人手机号哈希"),
			prop: "receiverPhoneHash",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("消息内容"),
			prop: "content",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("消息字数"),
			prop: "contentLength",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("计费条数"),
			prop: "smsCount",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("是否匿名"),
			prop: "isAnonymous",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("发送者签名"),
			prop: "senderSignature",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("1立即发送"),
			prop: "sendType",
			component: { name: "el-radio-group", options: options.sendType },
			value: 1,
			required: true,
		},
		{
			label: t("定时发送时间"),
			prop: "scheduledAt",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("0待审核"),
			prop: "status",
			component: {
				name: "cl-select",
				props: { options: options.status },
			},
			value: 0,
			span: 12,
			required: true,
		},
		{
			label: t("0待审核"),
			prop: "auditStatus",
			component: { name: "el-radio-group", options: options.auditStatus },
			value: 0,
			required: true,
		},
		{
			label: t("审核备注"),
			prop: "auditRemark",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("审核时间"),
			prop: "auditedAt",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("选择短信平台消息"),
			prop: "smsMsgId",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("短信通道标识"),
			prop: "smsChannel",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("送达时间"),
			prop: "deliveredAt",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("失败原因"),
			prop: "failReason",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("重试次数"),
			prop: "retryCount",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("扣费金额(元)"),
			prop: "feeAmount",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("是否免费重发"),
			prop: "isFreeRetry",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("发送端IP"),
			prop: "clientIp",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
	],
	onOpened(data) {
		centsToYuanFields(data, ["feeAmount"]);
	},
	onSubmit(data, { next }) {
		next(yuanToCentsFields(data, ["feeAmount"]));
	},
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("昵称"), prop: "senderNickName", minWidth: 120 },
		{ label: t("使用的模板ID"), prop: "templateId", minWidth: 120 },
		{ label: t("所属对话ID"), prop: "conversationId", minWidth: 120 },
		{
			label: t("收件人手机号（后续加密）"),
			prop: "receiverPhone",
			minWidth: 120,
		},
		{
			label: t("收件人脱敏号码"),
			prop: "receiverPhoneMask",
			minWidth: 120,
		},
		{
			label: t("收件人手机号哈希"),
			prop: "receiverPhoneHash",
			minWidth: 120,
		},
		{ label: t("消息内容"), prop: "content", minWidth: 120 },
		{ label: t("消息字数"), prop: "contentLength", minWidth: 120 },
		{ label: t("计费条数"), prop: "smsCount", minWidth: 120 },
		{ label: t("是否匿名"), prop: "isAnonymous", minWidth: 120 },
		{ label: t("发送者签名"), prop: "senderSignature", minWidth: 120 },
		{
			label: t("1立即发送"),
			prop: "sendType",
			minWidth: 120,
			dict: options.sendType,
		},
		{ label: t("定时发送时间"), prop: "scheduledAt", minWidth: 120 },
		{
			label: t("0待审核"),
			prop: "status",
			minWidth: 120,
			dict: options.status,
		},
		{
			label: t("0待审核"),
			prop: "auditStatus",
			minWidth: 120,
			dict: options.auditStatus,
		},
		{ label: t("审核备注"), prop: "auditRemark", minWidth: 120 },
		{ label: t("审核时间"), prop: "auditedAt", minWidth: 120 },
		{ label: t("短信平台消息ID"), prop: "smsMsgId", minWidth: 120 },
		{ label: t("短信通道标识"), prop: "smsChannel", minWidth: 120 },
		{ label: t("送达时间"), prop: "deliveredAt", minWidth: 120 },
		{ label: t("失败原因"), prop: "failReason", minWidth: 120 },
		{ label: t("重试次数"), prop: "retryCount", minWidth: 120 },
		{ label: t("扣费金额(元)"), prop: "feeAmount", minWidth: 120, formatter: (row: any) => formatYuan(row.feeAmount) },
		{ label: t("是否免费重发"), prop: "isFreeRetry", minWidth: 120 },
		{ label: t("发送端IP"), prop: "clientIp", minWidth: 120 },
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
		{ type: "op", buttons: ["edit", "delete"] },
	],
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.message.info,
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
