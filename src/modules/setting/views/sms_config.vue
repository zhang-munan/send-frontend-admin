<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table">
				<!-- 主通道标记 -->
				<template #column-isPrimary="{ scope }">
					<el-tag v-if="scope.row.isPrimary === 1" type="danger" size="small" effect="dark">
						主通道
					</el-tag>
					<el-tag v-else type="info" size="small" effect="plain">备用</el-tag>
				</template>

				<!-- 启用状态 -->
				<template #column-isActive="{ scope }">
					<el-switch
						:model-value="scope.row.isActive === 1"
						@change="onToggleActive(scope.row)"
					/>
				</template>

				<!-- 操作列 -->
				<template #column-op="{ scope }">
					<el-button
						v-if="scope.row.isPrimary !== 1"
						link
						type="primary"
						size="small"
						@click="onSetPrimary(scope.row)"
					>
						设为主通道
					</el-button>
					<cl-table-op-btns :scope="scope" :buttons="['edit', 'delete']" />
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: "setting-sms_config",
});

import { ElMessage, ElMessageBox } from "element-plus";
import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { centsToYuanFields, formatYuan, yuanToCentsFields } from "/$/order/utils/money";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: "通道名称",
			prop: "channelName",
			required: true,
			span: 12,
			component: {
				name: "el-select",
				props: { clearable: true },
				options: [
					{ label: "阿里云", value: "aliyun" },
					{ label: "腾讯云", value: "tencent" },
					{ label: "其他", value: "other" },
				],
			},
		},
		{
			label: "短信签名",
			prop: "signName",
			required: true,
			span: 12,
			component: { name: "el-input", props: { clearable: true, placeholder: "与服务商申请一致" } },
		},
		{
			label: "短信模板编码",
			prop: "templateCode",
			required: true,
			span: 12,
			component: { name: "el-input", props: { clearable: true, placeholder: "如 SMS_12345678" } },
		},
		{
			label: "AccessKey",
			prop: "accessKey",
			required: true,
			span: 12,
			component: { name: "el-input", props: { clearable: true, placeholder: "服务商 AccessKey ID" } },
		},
		{
			label: "AccessSecret",
			prop: "accessSecret",
			required: true,
			span: 12,
			component: {
				name: "el-input",
				props: { clearable: true, showPassword: true, placeholder: "服务商 AccessSecret" },
			},
		},
		{
			label: "API 端点",
			prop: "endpoint",
			span: 12,
			component: {
				name: "el-input",
				props: { clearable: true, placeholder: "可选，留空使用默认端点" },
			},
		},
		{
			label: "日发送上限",
			prop: "dailyLimit",
			required: true,
			span: 12,
			value: 10000,
			component: {
				name: "el-input-number",
				props: { min: 1, max: 1000000, step: 1000, style: "width: 100%" },
			},
		},
		{
			label: "通道余额(元)",
			prop: "balance",
			span: 12,
			component: {
				name: "el-input-number",
				props: { min: 0, precision: 2, step: 0.01, style: "width: 100%", placeholder: "可选" },
			},
		},
		{
			label: "是否启用",
			prop: "isActive",
			span: 12,
			value: 1,
			component: {
				name: "el-radio-group",
				options: [
					{ label: "启用", value: 1 },
					{ label: "禁用", value: 0 },
				],
			},
		},
	],
	onOpened(data) {
		centsToYuanFields(data, ["balance"]);
	},
	onSubmit(data, { next }) {
		next(yuanToCentsFields(data, ["balance"]));
	},
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{
			label: "通道名称",
			prop: "channelName",
			minWidth: 100,
			dict: [
				{ label: "阿里云", value: "aliyun", type: "primary" },
				{ label: "腾讯云", value: "tencent", type: "success" },
				{ label: "其他", value: "other", type: "warning" },
			],
		},
		{ label: "短信签名", prop: "signName", minWidth: 120 },
		{ label: "模板编码", prop: "templateCode", minWidth: 140 },
		{ label: "主通道", prop: "isPrimary", minWidth: 90 },
		{ label: "启用状态", prop: "isActive", minWidth: 90 },
		{ label: "日发送上限", prop: "dailyLimit", minWidth: 110 },
		{
			label: "余额(元)",
			prop: "balance",
			minWidth: 100,
			formatter: (row: any) => (row.balance != null ? `¥${formatYuan(row.balance)}` : "-"),
		},
		{
			label: "API 端点",
			prop: "endpoint",
			minWidth: 160,
			showOverflowTooltip: true,
			formatter: (row: any) => row.endpoint || "-",
		},
		{
			label: "创建时间",
			prop: "createTime",
			minWidth: 170,
			sortable: "desc",
			component: { name: "cl-date-text" },
		},
		{ type: "op", width: 200 },
	],
});

// cl-search
const Search = useSearch({
	items: [
		{
			label: "通道名称",
			prop: "channelName",
			component: {
				name: "el-select",
				props: { clearable: true },
				options: [
					{ label: "阿里云", value: "aliyun" },
					{ label: "腾讯云", value: "tencent" },
					{ label: "其他", value: "other" },
				],
			},
		},
		{
			label: "是否主通道",
			prop: "isPrimary",
			component: {
				name: "el-select",
				props: { clearable: true },
				options: [
					{ label: "主通道", value: 1 },
					{ label: "备用", value: 0 },
				],
			},
		},
		{
			label: "启用状态",
			prop: "isActive",
			component: {
				name: "el-select",
				props: { clearable: true },
				options: [
					{ label: "启用", value: 1 },
					{ label: "禁用", value: 0 },
				],
			},
		},
	],
});

// cl-crud
const Crud = useCrud(
	{
		service: service.setting.smsConfig,
	},
	(app) => {
		app.refresh();
	},
);

// 设为主通道
async function onSetPrimary(row: any) {
	await ElMessageBox.confirm(
		`确定将「${row.channelName}（${row.signName}）」设为主通道？原主通道将自动降为备用通道。`,
		"设置主通道",
		{ confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" },
	);
	await service.setting.smsConfig.setPrimary({ id: row.id });
	ElMessage.success("主通道设置成功");
	Crud.value?.refresh();
}

// 切换启用状态
async function onToggleActive(row: any) {
	const action = row.isActive === 1 ? "禁用" : "启用";
	await ElMessageBox.confirm(`确定${action}该通道？`, "操作确认", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
	});
	await service.setting.smsConfig.toggleActive({ id: row.id });
	ElMessage.success(`${action}成功`);
	Crud.value?.refresh();
}
</script>
