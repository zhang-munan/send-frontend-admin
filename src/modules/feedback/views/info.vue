<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table">
				<!-- 截图预览 -->
				<template #column-images="{ scope }">
					<template v-if="scope.row.images && scope.row.images.length > 0">
						<el-image
							v-for="(img, idx) in scope.row.images"
							:key="idx"
							:src="img"
							:preview-src-list="scope.row.images"
							:initial-index="idx"
							style="width: 48px; height: 48px; margin-right: 4px; border-radius: 4px; object-fit: cover"
						/>
					</template>
					<span v-else style="color: #ccc">无</span>
				</template>

				<!-- 自定义操作按钮 -->
				<template #column-op="{ scope }">
					<el-button type="primary" size="small" @click="openReply(scope.row)">
						回复
					</el-button>
					<el-button
						v-if="scope.row.status !== 2"
						type="warning"
						size="small"
						@click="closeItem(scope.row)"
					>
						关闭
					</el-button>
					<el-button type="danger" size="small" @click="deleteItem(scope.row)">
						删除
					</el-button>
				</template>
			</cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<!-- 回复对话框 -->
		<el-dialog v-model="replyDialog.visible" title="回复反馈" width="520px" destroy-on-close>
			<div style="margin-bottom: 16px">
				<div style="font-weight: 600; margin-bottom: 8px; color: #333">反馈内容：</div>
				<div
					style="
						background: #f8f8f8;
						border-radius: 8px;
						padding: 12px 16px;
						color: #555;
						font-size: 14px;
						line-height: 1.6;
						max-height: 120px;
						overflow-y: auto;
					"
				>
					{{ replyDialog.row?.content }}
				</div>
			</div>
			<el-form label-width="80px">
				<el-form-item label="回复内容">
					<el-input
						v-model="replyDialog.reply"
						type="textarea"
						:rows="5"
						placeholder="请输入回复内容"
						maxlength="1000"
						show-word-limit
					/>
				</el-form-item>
				<el-form-item label="处理状态">
					<el-select v-model="replyDialog.status" style="width: 100%">
						<el-option label="待处理" :value="0" />
						<el-option label="已回复" :value="1" />
						<el-option label="已关闭" :value="2" />
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="replyDialog.visible = false">取消</el-button>
				<el-button type="primary" :loading="replyDialog.loading" @click="submitReply">
					提交
				</el-button>
			</template>
		</el-dialog>
	</cl-crud>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'feedback-info',
});

import { useCrud, useTable, useSearch } from '@cool-vue/crud';
import { useCool } from '/@/cool';
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const { service } = useCool();

const Crud = ref();
const Table = ref();

const typeOptions = [
	{ label: '功能建议', value: 0, type: 'success' },
	{ label: '问题反馈', value: 1, type: 'danger' },
	{ label: '投诉举报', value: 2, type: 'warning' },
	{ label: '其他', value: 3, type: 'info' },
];

const statusOptions = [
	{ label: '待处理', value: 0, type: 'warning' },
	{ label: '已回复', value: 1, type: 'success' },
	{ label: '已关闭', value: 2, type: 'info' },
];

// cl-table
useTable({
	columns: [
		{ type: 'selection' },
		{ label: 'ID', prop: 'id', width: 70 },
		{ label: '用户昵称', prop: 'userNickName', minWidth: 100 },
		{ label: '手机号', prop: 'userPhone', minWidth: 120 },
		{
			label: '反馈类型',
			prop: 'type',
			width: 100,
			dict: typeOptions,
		},
		{
			label: '反馈内容',
			prop: 'content',
			minWidth: 200,
			showOverflowTooltip: true,
		},
		{
			label: '截图',
			prop: 'images',
			width: 160,
			component: { name: 'slot-images' },
		},
		{ label: '联系方式', prop: 'contact', minWidth: 130 },
		{
			label: '状态',
			prop: 'status',
			width: 100,
			dict: statusOptions,
		},
		{
			label: '管理员回复',
			prop: 'reply',
			minWidth: 180,
			showOverflowTooltip: true,
		},
		{ label: '回复时间', prop: 'replyTime', width: 160 },
		{
			label: '提交时间',
			prop: 'createTime',
			width: 170,
			sortable: 'desc',
			component: { name: 'cl-date-text' },
		},
		{ type: 'op', label: '操作', width: 200, fixed: 'right' },
	],
});

// cl-search
useSearch({
	items: [
		{
			label: '反馈类型',
			prop: 'type',
			component: {
				name: 'el-select',
				props: { clearable: true },
				options: typeOptions,
			},
		},
		{
			label: '状态',
			prop: 'status',
			component: {
				name: 'el-select',
				props: { clearable: true },
				options: statusOptions,
			},
		},
	],
});

// cl-crud
useCrud(
	{ service: service.feedback.info },
	(app) => {
		app.refresh();
	},
);

// 回复对话框
const replyDialog = reactive({
	visible: false,
	loading: false,
	row: null as any,
	reply: '',
	status: 1,
});

function openReply(row: any) {
	replyDialog.row = row;
	replyDialog.reply = row.reply || '';
	replyDialog.status = row.status === 0 ? 1 : row.status;
	replyDialog.visible = true;
}

async function submitReply() {
	if (!replyDialog.reply.trim()) {
		ElMessage.warning('回复内容不能为空');
		return;
	}
	replyDialog.loading = true;
	try {
		await service.feedback.info.request({
			url: '/admin/feedback/info/reply',
			method: 'POST',
			data: {
				id: replyDialog.row.id,
				reply: replyDialog.reply.trim(),
			},
		});
		if (replyDialog.status !== 1) {
			await service.feedback.info.request({
				url: '/admin/feedback/info/updateStatus',
				method: 'POST',
				data: { id: replyDialog.row.id, status: replyDialog.status },
			});
		}
		ElMessage.success('回复成功');
		replyDialog.visible = false;
		Table.value?.refresh();
	}
	catch (e: any) {
		ElMessage.error(e.message || '操作失败');
	}
	finally {
		replyDialog.loading = false;
	}
}

async function closeItem(row: any) {
	await ElMessageBox.confirm('确认将该反馈标记为"已关闭"吗？', '提示', {
		type: 'warning',
	});
	try {
		await service.feedback.info.request({
			url: '/admin/feedback/info/updateStatus',
			method: 'POST',
			data: { id: row.id, status: 2 },
		});
		ElMessage.success('已关闭');
		Table.value?.refresh();
	}
	catch (e: any) {
		ElMessage.error(e.message || '操作失败');
	}
}

async function deleteItem(row: any) {
	await ElMessageBox.confirm('确认删除该条反馈吗？', '提示', { type: 'warning' });
	try {
		await service.feedback.info.delete({ ids: [row.id] });
		ElMessage.success('已删除');
		Table.value?.refresh();
	}
	catch (e: any) {
		ElMessage.error(e.message || '删除失败');
	}
}
</script>
