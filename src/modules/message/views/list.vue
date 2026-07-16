<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
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

		<!-- 审核对话框 -->
		<el-dialog v-model="audit.visible" title="消息审核" width="480px" destroy-on-close>
			<el-form label-width="80px">
				<el-form-item label="审核结果">
					<el-select
						v-model="audit.form.auditStatus as any"
						placeholder="请选择"
						style="width: 100%"
					>
						<el-option label="通过" :value="1" />
						<el-option label="拒绝" :value="2" />
						<el-option label="转人工" :value="3" />
					</el-select>
				</el-form-item>
				<el-form-item label="审核备注">
					<el-input
						v-model="audit.form.auditRemark"
						type="textarea"
						:rows="4"
						placeholder="请输入审核备注"
					/>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="audit.visible = false">取消</el-button>
				<el-button type="primary" :loading="audit.loading" @click="submitAudit">
					确定
				</el-button>
			</template>
		</el-dialog>
	</cl-crud>
</template>

<script lang="ts" setup name="message-info-list">
import { useCool } from '/@/cool';
import { useCrud, useTable, useUpsert, useSearch } from '@cool-vue/crud';
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { formatYuan } from '/$/order/utils/money';

const { service } = useCool();
const { t } = useI18n();

// cl-crud
const Crud = useCrud(
	{
		service: service.message.info
	},
	app => {
		app.refresh();
	}
);

// cl-table
const Table = useTable({
	columns: [
		{ type: 'selection' },
		{ prop: 'id', label: 'ID', width: 80 },
		{ prop: 'senderNickName', label: '发送者', minWidth: 100 },
		{ prop: 'receiverPhoneMask', label: '收件人', minWidth: 120 },
		{
			prop: 'content',
			label: '消息内容',
			minWidth: 200,
			showOverflowTooltip: true
		},
		{
			prop: 'sendType',
			label: '发送类型',
			width: 100,
			dict: [
				{ label: '立即发送', value: 1, type: 'success' },
				{ label: '定时发送', value: 2, type: 'warning' }
			]
		},
		{
			prop: 'isAnonymous',
			label: '匿名',
			width: 80,
			dict: [
				{ label: '实名', value: 0, type: 'info' },
				{ label: '匿名', value: 1, type: 'warning' }
			]
		},
		{
			prop: 'status',
			label: '状态',
			width: 100,
			dict: [
				{ label: '待审核', value: 0, type: 'info' },
				{ label: '审核通过', value: 1, type: 'success' },
				{ label: '审核拒绝', value: 2, type: 'danger' },
				{ label: '待发送', value: 3, type: 'warning' },
				{ label: '发送中', value: 4, type: 'primary' },
				{ label: '已送达', value: 5, type: 'success' },
				{ label: '发送失败', value: 6, type: 'danger' },
				{ label: '已取消', value: 7, type: 'info' }
			]
		},
		{
			prop: 'auditStatus',
			label: '审核状态',
			width: 100,
			dict: [
				{ label: '待审核', value: 0, type: 'info' },
				{ label: '通过', value: 1, type: 'success' },
				{ label: '拒绝', value: 2, type: 'danger' },
				{ label: '转人工', value: 3, type: 'warning' }
			]
		},
		{
			prop: 'feeAmount',
			label: '费用(元)',
			width: 90,
			formatter: (row: any) =>
				row.payType === 1 ? '套餐余额' : formatYuan(row.feeAmount)
		},
		{ prop: 'createTime', label: '创建时间', width: 170, sortable: true },
		{
			type: 'op',
			label: '操作',
			width: 120,
			fixed: 'right',
			buttons: ({ scope }: any) =>
				scope.row.status === 0
					? [
							{
								label: '审核',
								type: 'warning',
								onClick({ scope }: any) {
									openAudit(scope.row);
								}
							}
						]
					: []
		}
	]
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			prop: 'receiverPhone',
			label: '收件人手机号',
			required: true,
			component: { name: 'el-input' }
		},
		{
			prop: 'content',
			label: '消息内容',
			required: true,
			component: { name: 'el-input', props: { type: 'textarea', rows: 4 } }
		},
		{
			prop: 'isAnonymous',
			label: '是否匿名',
			value: 0,
			component: {
				name: 'el-radio-group',
				options: [
					{ label: '实名', value: 0 },
					{ label: '匿名', value: 1 }
				]
			}
		},
		{
			prop: 'sendType',
			label: '发送类型',
			value: 1,
			component: {
				name: 'el-radio-group',
				options: [
					{ label: '立即发送', value: 1 },
					{ label: '定时发送', value: 2 }
				]
			}
		},
		{
			prop: 'scheduledAt',
			label: '定时发送时间',
			hidden: ({ scope }) => scope.sendType !== 2,
			component: {
				name: 'el-date-picker',
				props: {
					type: 'datetime',
					placeholder: '请选择定时发送时间',
					valueFormat: 'YYYY-MM-DD HH:mm:ss'
				}
			}
		}
	]
});

// cl-search
const Search = useSearch({
	items: [
		{
			label: '状态',
			prop: 'status',
			fieldEq: 'status',
			component: {
				name: 'el-select',
				options: [
					{ label: '待审核', value: 0 },
					{ label: '审核通过', value: 1 },
					{ label: '审核拒绝', value: 2 },
					{ label: '待发送', value: 3 },
					{ label: '发送中', value: 4 },
					{ label: '已送达', value: 5 },
					{ label: '发送失败', value: 6 },
					{ label: '已取消', value: 7 }
				]
			}
		},
		{
			label: '审核状态',
			prop: 'auditStatus',
			fieldEq: 'auditStatus',
			component: {
				name: 'el-select',
				options: [
					{ label: '待审核', value: 0 },
					{ label: '通过', value: 1 },
					{ label: '拒绝', value: 2 },
					{ label: '转人工', value: 3 }
				]
			}
		},
		{
			label: '发送类型',
			prop: 'sendType',
			fieldEq: 'sendType',
			component: {
				name: 'el-select',
				options: [
					{ label: '立即发送', value: 1 },
					{ label: '定时发送', value: 2 }
				]
			}
		},
		{
			label: '是否匿名',
			prop: 'isAnonymous',
			fieldEq: 'isAnonymous',
			component: {
				name: 'el-select',
				options: [
					{ label: '实名', value: 0 },
					{ label: '匿名', value: 1 }
				]
			}
		}
	]
});

// 审核相关
const audit = reactive({
	visible: false,
	loading: false,
	form: {
		id: null as number | null,
		auditStatus: null as number | null,
		auditRemark: ''
	}
});

function openAudit(row: any) {
	audit.form.id = row.id;
	audit.form.auditStatus = null;
	audit.form.auditRemark = '';
	audit.visible = true;
}

async function submitAudit() {
	if (audit.form.auditStatus === null) {
		ElMessage.warning('请选择审核结果');
		return;
	}

	audit.loading = true;
	try {
		await service.message.info.request({
			url: '/admin/message/info/audit',
			method: 'POST',
			data: {
				id: audit.form.id,
				auditStatus: audit.form.auditStatus,
				auditRemark: audit.form.auditRemark
			}
		});
		ElMessage.success('审核完成');
		audit.visible = false;
		Crud.value?.refresh();
	} catch (e: any) {
		ElMessage.error(e.message || '审核失败');
	} finally {
		audit.loading = false;
	}
}
</script>
