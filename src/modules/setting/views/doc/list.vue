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

		<!-- 新增/编辑 -->
		<cl-upsert ref="Upsert">
			<template #slot-content="{ scope }">
				<rich-editor v-model="scope.content" style="min-height: 360px" />
			</template>
		</cl-upsert>
	</cl-crud>
</template>

<script lang="ts" setup name="setting-doc-list">
import { useCool } from '/@/cool';
import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';

const { service } = useCool();

const Crud = useCrud(
	{ service: service.setting.doc },
	app => {
		app.refresh();
	}
);

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ prop: 'id', label: 'ID', width: 80 },
		{
			prop: 'docKey',
			label: '文档标识',
			minWidth: 160,
			dict: [
				{ label: '用户协议', value: 'user_agreement', type: 'primary' },
				{ label: '隐私政策', value: 'privacy_policy', type: 'success' },
				{ label: '使用须知', value: 'usage_guide', type: 'warning' }
			]
		},
		{ prop: 'title', label: '文档标题', minWidth: 160 },
		{
			prop: 'status',
			label: '状态',
			width: 100,
			dict: [
				{ label: '禁用', value: 0, type: 'danger' },
				{ label: '启用', value: 1, type: 'success' }
			]
		},
		{ prop: 'updateTime', label: '更新时间', width: 170, sortable: true },
		{ type: 'op', label: '操作', width: 150, fixed: 'right' }
	]
});

const Upsert = useUpsert({
	items: [
		{
			prop: 'docKey',
			label: '文档标识',
			required: true,
			component: {
				name: 'el-select',
				options: [
					{ label: '用户协议', value: 'user_agreement' },
					{ label: '隐私政策', value: 'privacy_policy' },
					{ label: '使用须知', value: 'usage_guide' }
				]
			}
		},
		{
			prop: 'title',
			label: '文档标题',
			required: true,
			component: { name: 'el-input' }
		},
		{
			prop: 'content',
			label: '文档内容',
			required: true,
			span: 24,
			component: { name: 'cl-editor-quill', props: { height: 400 } }
		},
		{
			prop: 'status',
			label: '状态',
			value: 1,
			component: {
				name: 'el-radio-group',
				options: [
					{ label: '启用', value: 1 },
					{ label: '禁用', value: 0 }
				]
			}
		}
	]
});

const Search = useSearch({
	items: [
		{
			label: '状态',
			prop: 'status',
			fieldEq: 'status',
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
