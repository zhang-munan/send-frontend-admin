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
	name: 'template-list'
});

import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';
import { useDict } from '/$/dict';

const { dict } = useDict();
const { service } = useCool();
const { t } = useI18n();

// 选项
const options = reactive({
	isAnonymous: [
		{ label: t('实名'), value: 0, type: 'danger' },
		{ label: t('匿名'), value: 1, type: 'success' }
	],
	isActive: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('启用'), value: 1, type: 'success' }
	],
	source: [
		{ label: t('系统'), value: 0, type: 'danger' },
		{ label: t('用户投稿'), value: 1, type: 'success' }
	],
	auditStatus: [
		{ label: t('待审核'), value: 0 },
		{ label: t('通过'), value: 1 },
		{ label: t('拒绝'), value: 2 }
	]
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t('模板标题'),
			prop: 'title',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('模板内容'),
			prop: 'content',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('分类'),
			prop: 'category',
			component: {
				name: 'cl-select',
				props: { options: dict.get('templateCategory') }
			},
			span: 12,
			required: true
		},
		{
			label: t('标签(JSON数组)'),
			prop: 'tags',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('使用建议'),
			prop: 'usageTip',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('使用人数'),
			prop: 'useCount',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('收藏人数'),
			prop: 'collectCount',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('是否匿名模板'),
			prop: 'isAnonymous',
			component: { name: 'el-radio-group', options: options.isAnonymous },
			value: 1,
			required: true
		},
		{
			label: t('排序权重'),
			prop: 'sortOrder',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('是否推荐'),
			prop: 'isRecommended',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12,
			required: true
		},
		{
			label: t('是否启用'),
			prop: 'isActive',
			component: { name: 'el-radio-group', options: options.isActive },
			value: 1,
			required: true
		},
		{
			label: t('来源'),
			prop: 'source',
			component: { name: 'el-radio-group', options: options.source },
			value: 1,
			required: true
		},
		{
			label: t('选择创建者'),
			prop: 'creatorId',
			component: { name: 'el-input', props: { clearable: true } },
			span: 12
		},
		{
			label: t('审核状态'),
			prop: 'auditStatus',
			component: { name: 'el-radio-group', options: options.auditStatus },
			value: 1,
			required: true
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('模板标题'), prop: 'title', minWidth: 120 },
		{ label: t('模板内容'), prop: 'content', minWidth: 120 },
		{
			label: t('分类'),
			prop: 'category',
			minWidth: 120,
			dict: dict.get('templateCategory')
		},
		{ label: t('标签(JSON数组)'), prop: 'tags', minWidth: 120 },
		{ label: t('使用建议'), prop: 'usageTip', minWidth: 120 },
		{ label: t('使用人数'), prop: 'useCount', minWidth: 120 },
		{ label: t('收藏人数'), prop: 'collectCount', minWidth: 120 },
		{
			label: t('是否匿名模板'),
			prop: 'isAnonymous',
			minWidth: 120,
			dict: options.isAnonymous
		},
		{ label: t('排序权重'), prop: 'sortOrder', minWidth: 120 },
		{ label: t('是否推荐'), prop: 'isRecommended', minWidth: 120 },
		{
			label: t('是否启用'),
			prop: 'isActive',
			minWidth: 120,
			dict: options.isActive
		},
		{
			label: t('来源'),
			prop: 'source',
			minWidth: 120,
			dict: options.source
		},
		{ label: t('创建者'), prop: 'creatorId', minWidth: 120 },
		{
			label: t('审核状态'),
			prop: 'auditStatus',
			minWidth: 120,
			dict: options.auditStatus
		},
		{
			label: t('创建时间'),
			prop: 'createTime',
			minWidth: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		},
		{
			label: t('更新时间'),
			prop: 'updateTime',
			minWidth: 170,
			sortable: 'custom',
			component: { name: 'cl-date-text' }
		},
		{ type: 'op', buttons: ['edit', 'delete'] }
	]
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.template.info
	},
	app => {
		app.refresh();
	}
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
