<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-flex1 />
			<cl-search ref="Search" />
		</cl-row>
		<cl-row><cl-table ref="Table" /></cl-row>
		<cl-row><cl-flex1 /><cl-pagination /></cl-row>
	</cl-crud>
</template>

<script lang="ts" setup name="message-blacklist">
import { BaseService } from '/@/cool';
import { useCrud, useSearch, useTable } from '@cool-vue/crud';
import { ElMessage, ElMessageBox } from 'element-plus';

const blacklistService = new BaseService('admin/message/blacklist');

function maskPhone(phone?: string) {
	return phone ? phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : '-';
}

const Crud = useCrud(
	{ service: blacklistService },
	app => app.refresh()
);

const Table = useTable({
	columns: [
		{ prop: 'id', label: 'ID', width: 80 },
		{
			prop: 'blockerNickName',
			label: '拉黑用户（收件人）',
			minWidth: 180,
			formatter: (row: any) => `${row.blockerNickName || '未设置昵称'} / ${maskPhone(row.blockerPhone)}`
		},
		{
			prop: 'blockedNickName',
			label: '被拉黑用户（发送人）',
			minWidth: 180,
			formatter: (row: any) => `${row.blockedNickName || '未设置昵称'} / ${maskPhone(row.blockedPhone)}`
		},
		{ prop: 'sourceConversationId', label: '来源会话', width: 110 },
		{ prop: 'deliveredMessageCount', label: '拉黑时已送达', width: 130 },
		{
			prop: 'lastMessagePreview',
			label: '最近消息摘要',
			minWidth: 220,
			showOverflowTooltip: true
		},
		{
			prop: 'status',
			label: '状态',
			width: 100,
			dict: [
				{ label: '已解除', value: 0, type: 'info' },
				{ label: '拉黑中', value: 1, type: 'danger' }
			]
		},
		{ prop: 'blockedAt', label: '拉黑时间', width: 170, sortable: 'desc' },
		{ prop: 'unblockedAt', label: '解除时间', width: 170 },
		{
			type: 'op',
			label: '操作',
			width: 110,
			fixed: 'right',
			buttons: ({ scope }: any) => scope.row.status === 1 ? [{
				label: '解除拉黑',
				type: 'warning',
				onClick: () => unblock(scope.row)
			}] : []
		}
	]
});

const Search = useSearch({
	items: [{
		label: '状态',
		prop: 'status',
		fieldEq: 'status',
		component: {
			name: 'el-select',
			options: [
				{ label: '拉黑中', value: 1 },
				{ label: '已解除', value: 0 }
			]
		}
	}]
});

async function unblock(row: any) {
	await ElMessageBox.confirm(
		'解除后，被拉黑用户可以再次向该收件人发送短信。',
		'确认解除拉黑',
		{ type: 'warning', confirmButtonText: '确认解除' }
	);
	await blacklistService.request({
		url: '/unblock',
		method: 'POST',
		data: { id: row.id }
	});
	ElMessage.success('已解除拉黑');
	Crud.value?.refresh();
}
</script>
