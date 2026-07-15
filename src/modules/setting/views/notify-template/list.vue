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
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup name="setting-notify-template-list">
import { useCool } from '/@/cool';
import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';

const { service } = useCool();

const Crud = useCrud({ service: service.setting.notifyTemplate }, app => {
	app.refresh();
});

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ prop: 'id', label: 'ID', width: 80 },
		{
			prop: 'sceneKey',
			label: '业务场景',
			minWidth: 140,
			dict: [
				{ label: '发送结果', value: 'send_result', type: 'primary' },
				{ label: '回复通知', value: 'reply', type: 'success' },
				{ label: '活动推送', value: 'activity', type: 'warning' }
			]
		},
		{ prop: 'sceneName', label: '场景名称', minWidth: 120 },
		{
			prop: 'platform',
			label: '平台',
			width: 120,
			dict: [
				{ label: '小程序', value: 'miniprogram', type: 'primary' },
				{ label: '公众号', value: 'official', type: 'success' }
			]
		},
		{ prop: 'templateId', label: '模板ID', minWidth: 200, showOverflowTooltip: true },
		{ prop: 'templateTitle', label: '模板标题', minWidth: 160, showOverflowTooltip: true },
		{
			prop: 'enabled',
			label: '是否启用',
			width: 100,
			dict: [
				{ label: '禁用', value: 0, type: 'danger' },
				{ label: '启用', value: 1, type: 'success' }
			]
		},
		{ prop: 'remark', label: '备注', minWidth: 160, showOverflowTooltip: true },
		{ prop: 'updateTime', label: '更新时间', width: 170, sortable: true },
		{ type: 'op', label: '操作', width: 150, fixed: 'right' }
	]
});

const Upsert = useUpsert({
	items: [
		{
			prop: 'sceneKey',
			label: '业务场景',
			required: true,
			component: {
				name: 'el-select',
				options: [
					{ label: '发送结果', value: 'send_result' },
					{ label: '回复通知', value: 'reply' },
					{ label: '活动推送', value: 'activity' }
				]
			}
		},
		{
			prop: 'sceneName',
			label: '场景名称',
			required: true,
			component: { name: 'el-input' }
		},
		{
			prop: 'platform',
			label: '平台',
			required: true,
			component: {
				name: 'el-radio-group',
				options: [
					{ label: '小程序', value: 'miniprogram' },
					{ label: '公众号', value: 'official' }
				]
			}
		},
		{
			prop: 'templateId',
			label: '模板ID',
			required: true,
			component: {
				name: 'el-input',
				props: { placeholder: '填入微信后台对应的消息模板ID' }
			}
		},
		{
			prop: 'templateTitle',
			label: '模板标题',
			component: { name: 'el-input' }
		},
		{
			prop: 'fieldMapping',
			label: '字段映射 (JSON)',
			span: 24,
			component: {
				name: 'el-input',
				props: {
					type: 'textarea',
					rows: 5,
					placeholder: '{"keyword1": "发送时间", "keyword2": "消息内容"}'
				}
			}
		},
		{
			prop: 'enabled',
			label: '是否启用',
			value: 0,
			component: {
				name: 'el-radio-group',
				options: [
					{ label: '禁用', value: 0 },
					{ label: '启用', value: 1 }
				]
			}
		},
		{
			prop: 'remark',
			label: '备注',
			span: 24,
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 3 }
			}
		}
	]
});

const Search = useSearch({
	items: [
		{
			label: '平台',
			prop: 'platform',
			fieldEq: 'platform',
			component: {
				name: 'el-select',
				options: [
					{ label: '小程序', value: 'miniprogram' },
					{ label: '公众号', value: 'official' }
				]
			}
		},
		{
			label: '是否启用',
			prop: 'enabled',
			fieldEq: 'enabled',
			component: {
				name: 'el-select',
				options: [
					{ label: '启用', value: 1 },
					{ label: '禁用', value: 0 }
				]
			}
		}
	]
});
</script>
