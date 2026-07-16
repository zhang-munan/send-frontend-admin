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
	name: "conversation-list",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import UserSelect from "/$/user/components/user-select.vue";

const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	status: [
		{ label: t("已删除"), value: 0, type: "danger" },
		{ label: t("正常"), value: 1, type: "success" },
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
			label: t("收件人手机号哈希"),
			prop: "receiverPhoneHash",
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
			label: t("最后一条消息摘要"),
			prop: "lastMsgContent",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("最后消息时间"),
			prop: "lastMsgTime",
			component: {
				name: "el-date-picker",
				props: { type: "datetime", valueFormat: "YYYY-MM-DD HH:mm:ss" },
			},
			span: 12,
		},
		{
			label: t("最后一条是否为回复"),
			prop: "lastMsgIsReply",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("未读回复数"),
			prop: "unreadCount",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("消息总数"),
			prop: "msgCount",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("收件人是否已退订"),
			prop: "isReceiverUnsubscribed",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("是否标记重要"),
			prop: "isMarked",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("标记类型"),
			prop: "markType",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("状态"),
			prop: "status",
			component: { name: "el-radio-group", options: options.status },
			value: 1,
			required: true,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("昵称"), prop: "userName", minWidth: 140, showOverflowTooltip: true },
		{
			label: t("收件人手机号哈希"),
			prop: "receiverPhoneHash",
			minWidth: 280,
			showOverflowTooltip: true,
		},
		{
			label: t("收件人脱敏号码"),
			prop: "receiverPhoneMask",
			minWidth: 150,
		},
		{
			label: t("最后一条消息摘要"),
			prop: "lastMsgContent",
			minWidth: 260,
			showOverflowTooltip: true,
		},
		{
			label: t("最后消息时间"),
			prop: "lastMsgTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
		{
			label: t("最后一条是否为回复"),
			prop: "lastMsgIsReply",
			minWidth: 160,
		},
		{ label: t("未读回复数"), prop: "unreadCount", minWidth: 110 },
		{ label: t("消息总数"), prop: "msgCount", minWidth: 100 },
		{
			label: t("收件人是否已退订"),
			prop: "isReceiverUnsubscribed",
			minWidth: 170,
		},
		{ label: t("是否标记重要"), prop: "isMarked", minWidth: 140 },
		{ label: t("标记类型"), prop: "markType", minWidth: 130, showOverflowTooltip: true },
		{
			label: t("状态"),
			prop: "status",
			minWidth: 100,
			dict: options.status,
		},
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
		service: service.conversation.info,
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
