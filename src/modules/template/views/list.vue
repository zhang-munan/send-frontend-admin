<template>
	<cl-crud ref="Crud">
		<!-- 工具栏 -->
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search ref="Search" />
		</cl-row>

		<!-- 表格 -->
		<cl-row>
			<cl-table ref="Table">
				<!-- 标签字段：数组展示为 el-tag -->
				<template #column-tags="{ scope }">
					<template v-if="scope.row.tags && scope.row.tags.length">
						<el-tag
							v-for="tag in scope.row.tags"
							:key="tag"
							size="small"
							style="margin: 2px"
							type="info"
						>
							{{ tag }}
						</el-tag>
					</template>
					<span v-else class="cl-table__empty">—</span>
				</template>

				<!-- 是否推荐：快捷 switch -->
				<template #column-isRecommended="{ scope }">
					<el-switch
						:model-value="scope.row.isRecommended === 1"
						:loading="scope.row._toggleRecommendedLoading"
						@change="toggleRecommended(scope.row)"
					/>
				</template>

				<!-- 是否启用：快捷 switch -->
				<template #column-isActive="{ scope }">
					<el-switch
						:model-value="scope.row.isActive === 1"
						:loading="scope.row._toggleActiveLoading"
						@change="toggleActive(scope.row)"
					/>
				</template>

				<!-- 操作列：编辑 / 删除 / 审核 -->
				<template #column-op="{ scope }">
					<el-button type="primary" link size="small" @click="Upsert?.open(scope.row)">
						编辑
					</el-button>
					<el-button type="danger" link size="small" @click="rowDelete(scope.row)">
						删除
					</el-button>
					<el-button
						v-if="scope.row.auditStatus === 0"
						type="warning"
						size="small"
						@click="openAudit(scope.row)"
					>
						审核
					</el-button>
				</template>
			</cl-table>
		</cl-row>

		<!-- 分页 -->
		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<!-- 新增 / 编辑弹窗 -->
		<cl-upsert ref="Upsert" />

		<!-- 审核弹窗 -->
		<el-dialog v-model="audit.visible" title="模板审核" width="480px" destroy-on-close>
			<div
				style="
					margin-bottom: 12px;
					padding: 12px 16px;
					background: #f8f9fb;
					border-radius: 8px;
					font-size: 13px;
					color: #666;
					line-height: 1.8;
				"
			>
				<div><strong>模板标题：</strong>{{ audit.row?.title }}</div>
				<div style="margin-top: 6px">
					<strong>模板内容：</strong>
					<span style="white-space: pre-wrap">{{ audit.row?.content }}</span>
				</div>
			</div>

			<el-form label-width="90px">
				<el-form-item label="审核结果" required>
					<el-radio-group v-model="audit.form.status as any">
						<el-radio :label="1">
							<el-tag type="success">通过</el-tag>
						</el-radio>
						<el-radio :label="2">
							<el-tag type="danger">拒绝</el-tag>
						</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>

			<template #footer>
				<el-button @click="audit.visible = false">取消</el-button>
				<el-button
					type="primary"
					:loading="audit.loading"
					:disabled="audit.form.status === null"
					@click="submitAudit"
				>
					确认提交
				</el-button>
			</template>
		</el-dialog>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({ name: 'template-list' });

import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { useI18n } from 'vue-i18n';
import { onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const { service } = useCool();
const { t } = useI18n();

// ─── 枚举选项 ─────────────────────────────────────────────────────────────────

const options = reactive({
	// 由 template_category 表动态加载，初始为空
	category: [] as { label: string; value: string; type?: string }[],
	isAnonymous: [
		{ label: t('实名'), value: 0, type: 'info' },
		{ label: t('匿名'), value: 1, type: 'warning' }
	],
	isActive: [
		{ label: t('禁用'), value: 0, type: 'danger' },
		{ label: t('启用'), value: 1, type: 'success' }
	],
	isRecommended: [
		{ label: t('否'), value: 0, type: 'info' },
		{ label: t('推荐'), value: 1, type: 'success' }
	],
	source: [
		{ label: t('系统创建'), value: 1, type: 'primary' },
		{ label: t('用户投稿'), value: 2, type: 'warning' }
	],
	auditStatus: [
		{ label: t('待审核'), value: 0, type: 'warning' },
		{ label: t('通过'), value: 1, type: 'success' },
		{ label: t('拒绝'), value: 2, type: 'danger' }
	]
});

// ─── cl-upsert ────────────────────────────────────────────────────────────────

const Upsert = useUpsert({
	items: [
		{
			label: t('模板标题'),
			prop: 'title',
			component: {
				name: 'el-input',
				props: { clearable: true, maxlength: 100, showWordLimit: true }
			},
			required: true,
			span: 24
		},
		{
			label: t('模板内容'),
			prop: 'content',
			component: {
				name: 'el-input',
				props: { type: 'textarea', rows: 6, clearable: true, showWordLimit: true }
			},
			required: true,
			span: 24
		},
		{
			label: t('分类'),
			prop: 'category',
			component: {
				name: 'cl-select',
				props: { options: options.category }
			},
			span: 12,
			required: true
		},
		{
			label: t('标签'),
			prop: 'tags',
			component: {
				name: 'el-select',
				props: {
					multiple: true,
					allowCreate: true,
					filterable: true,
					clearable: true,
					placeholder: t('输入后按回车添加标签'),
					style: 'width: 100%'
				}
			},
			span: 12
		},
		{
			label: t('使用建议'),
			prop: 'usageTip',
			component: {
				name: 'el-input',
				props: {
					type: 'textarea',
					rows: 3,
					clearable: true,
					maxlength: 200,
					showWordLimit: true
				}
			},
			span: 24
		},
		{
			label: t('是否匿名'),
			prop: 'isAnonymous',
			component: { name: 'el-radio-group', options: options.isAnonymous },
			value: 1,
			span: 12,
			required: true
		},
		{
			label: t('排序权重'),
			prop: 'sortOrder',
			component: {
				name: 'el-input-number',
				props: { min: 0, max: 9999, controlsPosition: 'right', style: 'width: 100%' }
			},
			value: 0,
			span: 12,
			required: true
		},
		{
			label: t('是否推荐'),
			prop: 'isRecommended',
			component: {
				name: 'el-switch',
				props: { activeValue: 1, inactiveValue: 0 }
			},
			value: 0,
			span: 12
		},
		{
			label: t('是否启用'),
			prop: 'isActive',
			component: {
				name: 'el-switch',
				props: { activeValue: 1, inactiveValue: 0 }
			},
			value: 1,
			span: 12
		},
		{
			label: t('来源'),
			prop: 'source',
			component: { name: 'el-radio-group', options: options.source },
			value: 1,
			span: 12,
			required: true
		},
		{
			label: t('使用人数'),
			prop: 'useCount',
			component: {
				name: 'el-input-number',
				props: { min: 0, controlsPosition: 'right', style: 'width: 100%' }
			},
			value: 0,
			span: 12,
			required: true
		},
		{
			label: t('收藏人数'),
			prop: 'collectCount',
			component: {
				name: 'el-input-number',
				props: { min: 0, controlsPosition: 'right', style: 'width: 100%' }
			},
			value: 0,
			span: 12,
			required: true
		},
		{
			label: t('审核状态'),
			prop: 'auditStatus',
			component: { name: 'el-radio-group', options: options.auditStatus },
			value: 1,
			span: 12,
			required: true
		}
	]
});

// ─── cl-table ─────────────────────────────────────────────────────────────────

const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ label: t('ID'), prop: 'id', width: 70 },
		{
			label: t('模板标题'),
			prop: 'title',
			minWidth: 150,
			showOverflowTooltip: true
		},
		{
			label: t('模板内容'),
			prop: 'content',
			minWidth: 220,
			showOverflowTooltip: true
		},
		{
			label: t('分类'),
			prop: 'category',
			minWidth: 110,
			dict: options.category
		},
		{
			label: t('标签'),
			prop: 'tags',
			minWidth: 160
		},
		{
			label: t('使用建议'),
			prop: 'usageTip',
			minWidth: 160,
			showOverflowTooltip: true
		},
		{
			label: t('使用人数'),
			prop: 'useCount',
			width: 90,
			sortable: 'custom'
		},
		{
			label: t('收藏人数'),
			prop: 'collectCount',
			width: 90,
			sortable: 'custom'
		},
		{
			label: t('是否匿名'),
			prop: 'isAnonymous',
			width: 90,
			dict: options.isAnonymous
		},
		{
			label: t('排序'),
			prop: 'sortOrder',
			width: 80,
			sortable: 'custom'
		},
		{
			label: t('推荐'),
			prop: 'isRecommended',
			width: 80
		},
		{
			label: t('启用'),
			prop: 'isActive',
			width: 80
		},
		{
			label: t('来源'),
			prop: 'source',
			width: 90,
			dict: options.source
		},
		{
			label: t('审核状态'),
			prop: 'auditStatus',
			width: 90,
			dict: options.auditStatus
		},
		{
			label: t('创建时间'),
			prop: 'createTime',
			width: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' }
		},
		{
			label: t('操作'),
			type: 'op',
			width: 160,
			fixed: 'right'
		}
	]
});

// ─── cl-search ────────────────────────────────────────────────────────────────

const Search = useSearch({
	items: [
		{
			label: t('分类'),
			prop: 'category',
			component: {
				name: 'el-select',
				props: { clearable: true, placeholder: t('全部分类'), style: 'width: 130px' },
				options: options.category
			}
		},
		{
			label: t('来源'),
			prop: 'source',
			component: {
				name: 'el-select',
				props: { clearable: true, placeholder: t('全部来源'), style: 'width: 120px' },
				options: options.source
			}
		},
		{
			label: t('审核状态'),
			prop: 'auditStatus',
			component: {
				name: 'el-select',
				props: { clearable: true, placeholder: t('全部状态'), style: 'width: 120px' },
				options: options.auditStatus
			}
		},
		{
			label: t('是否启用'),
			prop: 'isActive',
			component: {
				name: 'el-select',
				props: { clearable: true, placeholder: t('全部'), style: 'width: 100px' },
				options: options.isActive
			}
		},
		{
			label: t('是否推荐'),
			prop: 'isRecommended',
			component: {
				name: 'el-select',
				props: { clearable: true, placeholder: t('全部'), style: 'width: 100px' },
				options: options.isRecommended
			}
		}
	]
});

// ─── 加载分类选项 ─────────────────────────────────────────────────────────────

onMounted(async () => {
	try {
		const list = await service.template.category.list({ isActive: 1 });
		const items = (list || []).map((item: any) => ({
			label: item.name,
			value: item.value
		}));
		// 就地修改数组，保持 useUpsert/useSearch 中持有的引用不变
		options.category.splice(0, options.category.length, ...items);
	} catch (e) {
		// 加载失败不影响页面其他功能
	}
});

// ─── cl-crud ──────────────────────────────────────────────────────────────────

const Crud = useCrud(
	{
		service: service.template.info
	},
	app => {
		app.refresh();
	}
);

// ─── 快捷切换：推荐 / 启用 ────────────────────────────────────────────────────

async function toggleRecommended(row: any) {
	const newVal = row.isRecommended === 1 ? 0 : 1;
	row._toggleRecommendedLoading = true;
	try {
		await service.template.info.update({ id: row.id, isRecommended: newVal });
		row.isRecommended = newVal;
		ElMessage.success(newVal === 1 ? t('已设为推荐') : t('已取消推荐'));
	} catch (e: any) {
		ElMessage.error(e.message || t('操作失败'));
	} finally {
		row._toggleRecommendedLoading = false;
	}
}

async function toggleActive(row: any) {
	const newVal = row.isActive === 1 ? 0 : 1;
	row._toggleActiveLoading = true;
	try {
		await service.template.info.update({ id: row.id, isActive: newVal });
		row.isActive = newVal;
		ElMessage.success(newVal === 1 ? t('已启用') : t('已禁用'));
	} catch (e: any) {
		ElMessage.error(e.message || t('操作失败'));
	} finally {
		row._toggleActiveLoading = false;
	}
}

// ─── 手动删除 ─────────────────────────────────────────────────────────────────

async function rowDelete(row: any) {
	await ElMessageBox.confirm(
		t('确定要删除模板「{title}」吗？', { title: row.title }),
		t('删除确认'),
		{ type: 'warning', confirmButtonText: t('删除'), cancelButtonText: t('取消') }
	);
	await service.template.info.delete({ ids: [row.id] });
	ElMessage.success(t('删除成功'));
	Crud.value?.refresh();
}

// ─── 审核对话框 ───────────────────────────────────────────────────────────────

const audit = reactive({
	visible: false,
	loading: false,
	row: null as any,
	form: {
		id: null as number | null,
		status: null as number | null
	}
});

function openAudit(row: any) {
	audit.row = row;
	audit.form.id = row.id;
	audit.form.status = null;
	audit.visible = true;
}

async function submitAudit() {
	if (audit.form.status === null) {
		ElMessage.warning(t('请选择审核结果'));
		return;
	}
	audit.loading = true;
	try {
		await service.template.info.request({
			url: '/admin/template/info/audit',
			method: 'POST',
			data: { id: audit.form.id, status: audit.form.status }
		});
		ElMessage.success(t('审核完成'));
		audit.visible = false;
		Crud.value?.refresh();
	} catch (e: any) {
		ElMessage.error(e.message || t('审核失败'));
	} finally {
		audit.loading = false;
	}
}

// ─── 刷新 ─────────────────────────────────────────────────────────────────────

function refresh(params?: any) {
	Crud.value?.refresh(params);
}

defineExpose({ refresh });
</script>
