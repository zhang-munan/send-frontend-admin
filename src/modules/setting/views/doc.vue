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
	name: "setting-doc",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";

const { service } = useCool();
const { t } = useI18n();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("文档标识：user_agreement"),
			prop: "docKey",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("文档标题"),
			prop: "title",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("文档内容（富文本HTML）"),
			prop: "content",
			component: {
				name: "cl-editor",
				props: {
					name: "cl-editor-wang",
					height: 400,
				},
			},
			span: 24,
			required: true,
		},
		{
			label: t("状态"),
			prop: "status",
			component: {
				name: "el-switch",
				props: {
					activeValue: 1,
					inactiveValue: 0,
					activeText: t("启用"),
					inactiveText: t("禁用"),
				},
			},
			value: 1,
			span: 12,
			required: true,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("文档标识：user_agreement"), prop: "docKey", minWidth: 120 },
		{ label: t("文档标题"), prop: "title", minWidth: 120 },
		{
			label: t("状态"),
			prop: "status",
			minWidth: 120,
			dict: [
				{ label: t("禁用"), value: 0, type: "danger" },
				{ label: t("启用"), value: 1, type: "success" },
			],
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
		{ type: "op", buttons: ["edit", "delete"] },
	],
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.setting.doc,
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
