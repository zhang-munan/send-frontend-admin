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

<script lang="ts" setup name="order-product">
import { useCool } from '/@/cool';
import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { centsToYuanFields, formatYuan, yuanToCentsFields } from '../utils/money';

const { service } = useCool();

useCrud({ service: service.order.product }, app => {
	app.refresh();
});

const { Table } = useTable({
	columns: [
		{ type: 'selection' },
		{ prop: 'id', label: 'ID', width: 80 },
		{
			prop: 'coverImage',
			label: '封面图',
			width: 80,
			component: { name: 'cl-image', props: { size: 48 } }
		},
		{ prop: 'name', label: '套餐名称', minWidth: 120 },
		{ prop: 'subtitle', label: '副标题', minWidth: 140, showOverflowTooltip: true },
		{ prop: 'tagContent', label: '角标', width: 100, showOverflowTooltip: true },
		{ prop: 'messageQuota', label: '消息条数', width: 100, align: 'center' },
		{ prop: 'originalPrice', label: '原价(元)', width: 100, align: 'right', formatter: (row: any) => formatYuan(row.originalPrice) },
		{ prop: 'sellPrice', label: '售价(元)', width: 100, align: 'right', formatter: (row: any) => formatYuan(row.sellPrice) },
		{
			prop: 'status',
			label: '状态',
			width: 90,
			dict: [
				{ label: '下架', value: 0, type: 'danger' },
				{ label: '上架', value: 1, type: 'success' }
			]
		},
		{ prop: 'sortOrder', label: '排序', width: 80, align: 'center' },
		{
			prop: 'createTime',
			label: '创建时间',
			width: 170,
			sortable: true,
			component: { name: 'cl-date-text' }
		},
		{ type: 'op', buttons: ['edit', 'delete'] }
	]
});

const { Upsert } = useUpsert({
	items: [
		{
			prop: 'name',
			label: '套餐名称',
			required: true,
			span: 12,
			component: { name: 'el-input', props: { placeholder: '例：标准包', clearable: true } }
		},
		{
			prop: 'subtitle',
			label: '副标题/宣传语',
			span: 12,
			component: { name: 'el-input', props: { placeholder: '例：最受欢迎', clearable: true } }
		},
		{
			prop: 'tagContent',
			label: '角标内容',
			span: 12,
			component: { name: 'el-input', props: { maxlength: 30, placeholder: '例：最受欢迎', clearable: true } }
		},
		{
			prop: 'tagBackgroundColor',
			label: '角标背景色',
			span: 12,
			component: { name: 'el-color-picker', props: { showAlpha: false, predefine: ['#fe8973', '#ff8c00', '#ff5f57'] } }
		},
		{
			prop: 'messageQuota',
			label: '消息条数',
			required: true,
			span: 12,
			component: {
				name: 'el-input-number',
				props: { min: 1, max: 100000, placeholder: '购买后获得的发送条数' }
			}
		},
		{
			prop: 'originalPrice',
			label: '原价(元)',
			required: true,
			span: 12,
			component: { name: 'el-input-number', props: { min: 0, precision: 2, step: 0.01 } }
		},
		{
			prop: 'sellPrice',
			label: '售价(元)',
			required: true,
			span: 12,
			component: { name: 'el-input-number', props: { min: 0, precision: 2, step: 0.01 } }
		},
		{
			prop: 'sortOrder',
			label: '排序权重',
			span: 12,
			value: 0,
			component: {
				name: 'el-input-number',
				props: { min: 0, max: 9999, placeholder: '数值越小越靠前' }
			}
		},
		{
			prop: 'status',
			label: '上架状态',
			value: 1,
			component: {
				name: 'el-radio-group',
				options: [
					{ label: '上架', value: 1 },
					{ label: '下架', value: 0 }
				]
			}
		},
		{
			prop: 'coverImage',
			label: '封面图',
			component: { name: 'cl-upload', props: { text: '点击上传封面图' } }
		},
		{
			prop: 'description',
			label: '套餐描述',
			component: { name: 'el-input', props: { type: 'textarea', rows: 3, placeholder: '套餐详细描述（可选）' } }
		}
	],
	onOpened(data) {
		centsToYuanFields(data, ['originalPrice', 'sellPrice']);
	},
	onSubmit(data, { next }) {
		next(yuanToCentsFields(data, ['originalPrice', 'sellPrice']));
	}
});

const { Search } = useSearch({
	items: [
		{
			label: '状态',
			prop: 'status',
			component: {
				name: 'el-select',
				options: [
					{ label: '上架', value: 1 },
					{ label: '下架', value: 0 }
				]
			}
		}
	]
});
</script>
