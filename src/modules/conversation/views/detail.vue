<template>
	<div class="conversation-detail">
		<div class="detail-header">
			<div class="header-main">
				<el-button circle plain aria-label="返回对话列表" @click="router.back()">
					<el-icon><arrow-left /></el-icon>
				</el-button>
				<div>
					<h1>对话详情</h1>
					<p>对话 ID：{{ route.params.id }}</p>
				</div>
			</div>
			<el-button :loading="loading" @click="loadDetail">
				<el-icon><refresh /></el-icon>
				刷新
			</el-button>
		</div>

		<el-skeleton v-if="loading && !detail" :rows="8" animated class="loading-card" />

		<el-result
			v-else-if="error"
			icon="error"
			title="加载失败"
			:sub-title="error"
		>
			<template #extra>
				<el-button type="primary" @click="loadDetail">重新加载</el-button>
			</template>
		</el-result>

		<template v-else-if="detail">
			<section class="summary-grid">
				<div class="summary-card">
					<span class="summary-icon sender"><el-icon><user /></el-icon></span>
					<div>
						<label>发起用户</label>
						<strong>{{ detail.conversation.userName || '未设置昵称' }}</strong>
						<small>ID {{ detail.conversation.userId }} · {{ detail.conversation.userPhone || '未绑定手机号' }}</small>
					</div>
				</div>
				<div class="summary-card">
					<span class="summary-icon receiver"><el-icon><phone /></el-icon></span>
					<div>
						<label>对话收件人</label>
						<strong>{{ detail.conversation.receiverPhone }}</strong>
						<small>{{ detail.conversation.receiverPhoneMask }}</small>
					</div>
				</div>
				<div class="summary-card">
					<span class="summary-icon messages"><el-icon><chat-dot-round /></el-icon></span>
					<div>
						<label>聊天记录</label>
						<strong>{{ detail.messages.length }} 条</strong>
						<small>最后活跃于 {{ formatTime(detail.conversation.lastMsgTime) }}</small>
					</div>
				</div>
				<div class="summary-card status-card">
					<label>当前状态</label>
					<div class="tag-row">
						<el-tag :type="detail.conversation.status === 1 ? 'success' : 'danger'">
							{{ detail.conversation.status === 1 ? '正常' : '已删除' }}
						</el-tag>
						<el-tag v-if="detail.conversation.isMarked" type="warning">已标记重要</el-tag>
						<el-tag v-if="detail.conversation.isReceiverUnsubscribed" type="info">收件人已退订</el-tag>
					</div>
					<small>创建于 {{ formatTime(detail.conversation.createTime) }}</small>
				</div>
			</section>

			<section class="chat-card">
				<div class="chat-title">
					<div>
						<h2>全部聊天记录</h2>
						<p>按发送时间从早到晚排列</p>
					</div>
					<span>{{ detail.messages.length }} 条消息</span>
				</div>

				<div v-if="!detail.messages.length" class="empty-wrap">
					<el-empty description="暂无聊天记录" :image-size="90" />
				</div>

				<div v-else ref="chatBody" class="chat-body">
					<div
						v-for="message in detail.messages"
						:key="message.id"
						class="message-row"
						:class="message.direction === 1 ? 'outgoing' : 'incoming'"
					>
						<div class="message-wrap">
							<div class="message-meta">
								<span>{{ message.direction === 1 ? '发起用户' : '收件人' }}</span>
								<time>{{ formatTime(message.createTime) }}</time>
							</div>
							<div class="message-bubble">{{ message.content }}</div>
							<div class="message-extra">
								<span v-if="message.messageId">消息 ID：{{ message.messageId }}</span>
								<span v-if="message.replyId">回复 ID：{{ message.replyId }}</span>
								<span v-if="message.smsCount">计费 {{ message.smsCount }} 条</span>
								<span v-if="message.replyType && message.replyType !== 1">{{ replyTypeName(message.replyType) }}</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</template>
	</div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'conversation-detail' });

import { ArrowLeft, ChatDotRound, Phone, Refresh, User } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { nextTick, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCool } from '/@/cool';

interface ConversationMessage {
	id: number;
	messageId: number | null;
	replyId: number | null;
	direction: number;
	content: string;
	smsCount: number | null;
	replyType: number | null;
	createTime: string;
}

interface ConversationDetail {
	conversation: {
		id: number;
		userId: number;
		userName: string | null;
		userPhone: string | null;
		receiverPhone: string;
		receiverPhoneMask: string;
		lastMsgTime: string;
		isMarked: number;
		isReceiverUnsubscribed: number;
		status: number;
		createTime: string;
	};
	messages: ConversationMessage[];
}

const route = useRoute();
const router = useRouter();
const { service } = useCool();
const detail = ref<ConversationDetail | null>(null);
const loading = ref(false);
const error = ref('');
const chatBody = ref<HTMLElement | null>(null);

function formatTime(value?: string) {
	return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '暂无记录';
}

function replyTypeName(type: number) {
	return ({ 2: '退订消息', 3: '投诉消息' } as Record<number, string>)[type] || '普通回复';
}

async function loadDetail() {
	const id = Number(route.params.id);
	if (!Number.isInteger(id) || id <= 0) {
		error.value = '无效的对话 ID';
		return;
	}

	loading.value = true;
	error.value = '';
	try {
		detail.value = await service.conversation.info.request({
			url: '/detail',
			params: { id }
		});
		await nextTick();
		if (chatBody.value) chatBody.value.scrollTop = chatBody.value.scrollHeight;
	} catch (err: any) {
		error.value = err?.message || '对话详情加载失败';
		ElMessage.error(error.value);
	} finally {
		loading.value = false;
	}
}

onMounted(loadDetail);
</script>

<style lang="scss" scoped>
.conversation-detail {
	height: 100%;
	overflow: auto;
	box-sizing: border-box;
	padding: 20px;
	background: var(--el-bg-color-page);
	color: var(--el-text-color-primary);
}

.detail-header,
.header-main,
.summary-card,
.chat-title,
.message-meta,
.message-extra,
.tag-row {
	display: flex;
	align-items: center;
}

.detail-header {
	justify-content: space-between;
	margin-bottom: 18px;
}

.header-main {
	gap: 14px;

	h1 {
		margin: 0 0 4px;
		font-size: 24px;
	}

	p {
		margin: 0;
		font-size: 13px;
		color: var(--el-text-color-secondary);
	}
}

.loading-card,
.chat-card,
.summary-card {
	box-sizing: border-box;
	border: 1px solid var(--el-border-color-lighter);
	border-radius: 12px;
	background: var(--el-bg-color);
	box-shadow: 0 3px 12px rgb(0 0 0 / 3%);
}

.loading-card {
	padding: 28px;
}

.summary-grid {
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 14px;
	margin-bottom: 16px;
}

.summary-card {
	min-height: 112px;
	gap: 14px;
	padding: 18px;

	.summary-icon {
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		flex: 0 0 42px;
		border-radius: 12px;
		font-size: 20px;
	}

	.sender { color: #2f73da; background: #edf5ff; }
	.receiver { color: #7b5bbf; background: #f3efff; }
	.messages { color: #d16a2d; background: #fff4e9; }

	label,
	strong,
	small {
		display: block;
	}

	label {
		margin-bottom: 6px;
		font-size: 12px;
		color: var(--el-text-color-secondary);
	}

	strong {
		margin-bottom: 5px;
		font-size: 16px;
		word-break: break-all;
	}

	small {
		font-size: 12px;
		color: var(--el-text-color-secondary);
	}
}

.status-card {
	display: block;

	.tag-row {
		flex-wrap: wrap;
		gap: 6px;
		margin: 8px 0 12px;
	}
}

.chat-card {
	overflow: hidden;
}

.chat-title {
	justify-content: space-between;
	padding: 18px 22px;
	border-bottom: 1px solid var(--el-border-color-lighter);

	h2 {
		margin: 0 0 4px;
		font-size: 17px;
	}

	p,
	span {
		margin: 0;
		font-size: 12px;
		color: var(--el-text-color-secondary);
	}
}

.chat-body {
	height: calc(100vh - 320px);
	min-height: 420px;
	overflow-y: auto;
	padding: 28px;
	background: linear-gradient(180deg, #f7f9fc 0%, #f3f6fa 100%);
}

.empty-wrap {
	padding: 70px 20px;
}

.message-row {
	display: flex;
	margin-bottom: 22px;

	&.outgoing {
		justify-content: flex-end;

		.message-meta { justify-content: flex-end; }
		.message-bubble { color: #fff; background: #409eff; border-top-right-radius: 5px; }
		.message-extra { justify-content: flex-end; }
	}

	&.incoming {
		justify-content: flex-start;

		.message-bubble { background: var(--el-bg-color); border-top-left-radius: 5px; }
	}
}

.message-wrap {
	width: min(68%, 720px);
}

.message-meta,
.message-extra {
	gap: 9px;
	padding: 0 3px;
	font-size: 12px;
	color: var(--el-text-color-secondary);
}

.message-meta {
	margin-bottom: 7px;

	span { font-weight: 600; color: var(--el-text-color-regular); }
}

.message-extra {
	flex-wrap: wrap;
	margin-top: 7px;
	font-size: 11px;
}

.message-bubble {
	padding: 12px 16px;
	border-radius: 14px;
	box-shadow: 0 2px 10px rgb(0 0 0 / 6%);
	font-size: 14px;
	line-height: 1.75;
	white-space: pre-wrap;
	word-break: break-word;
}

@media (max-width: 1200px) {
	.summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 720px) {
	.conversation-detail { padding: 12px; }
	.summary-grid { grid-template-columns: 1fr; }
	.message-wrap { width: 88%; }
	.chat-body { padding: 18px 12px; }
}
</style>
