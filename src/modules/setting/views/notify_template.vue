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
	name: "setting-notify-template",
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
			label: t("业务场景标识：send_result"),
			prop: "sceneKey",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("场景名称"),
			prop: "sceneName",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("平台：miniprogram"),
			prop: "platform",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("选择模板"),
			prop: "templateId",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("模板标题"),
			prop: "templateTitle",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("模板字段映射（JSON）"),
			prop: "fieldMapping",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("是否启用"),
			prop: "enabled",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("备注"),
			prop: "remark",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{
			label: t("业务场景标识：send_result"),
			prop: "sceneKey",
			minWidth: 120,
		},
		{ label: t("场景名称"), prop: "sceneName", minWidth: 120 },
		{ label: t("平台：miniprogram"), prop: "platform", minWidth: 120 },
		{ label: t("模板ID"), prop: "templateId", minWidth: 120 },
		{ label: t("模板标题"), prop: "templateTitle", minWidth: 120 },
		{
			label: t("模板字段映射（JSON）"),
			prop: "fieldMapping",
			minWidth: 120,
		},
		{ label: t("是否启用"), prop: "enabled", minWidth: 120 },
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
		{ type: "op", buttons: ["edit", "delete"] },
	],
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.setting.notifyTemplate,
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
