<template>
	<div class="control-page">
		<section class="hero">
			<div>
				<div class="eyebrow">
					<el-icon><Lock /></el-icon> ROOT WORKSPACE · 最高权限
				</div>
				<h1>总控制台</h1>
				<p>处理标准流程无法覆盖的特殊情况，所有操作都会留下完整审计记录。</p>
			</div>
			<div class="hero-status">
				<span class="pulse"></span> 系统运行正常
				<small>{{ summary.updatedAt || '正在加载' }}</small>
			</div>
		</section>

		<section class="stats">
			<div v-for="item in stats" :key="item.label" class="stat-card">
				<div class="stat-icon" :class="item.color">
					<el-icon><component :is="item.icon" /></el-icon>
				</div>
				<div>
					<span>{{ item.label }}</span
					><strong>{{ item.value }}</strong
					><em>{{ item.hint }}</em>
				</div>
			</div>
		</section>

		<div class="section-title">
			<div>
				<h2>高权限能力</h2>
				<p>按业务域组织，后续可直接扩展新的能力模块</p>
			</div>
			<el-button plain round @click="showLog = true"
				><el-icon><List /></el-icon> 查看审计日志</el-button
			>
		</div>
		<section class="capability-grid">
			<div
				v-for="item in capabilities"
				:key="item.key"
				class="capability-card"
				:class="{ featured: item.featured }"
				@click="openCapability(item)"
			>
				<div class="cap-top">
					<div class="cap-icon" :class="item.color">
						<el-icon><component :is="item.icon" /></el-icon>
					</div>
					<el-tag
						v-if="item.risk"
						size="small"
						:type="item.risk === '高风险' ? 'danger' : 'warning'"
						effect="plain"
						>{{ item.risk }}</el-tag
					>
				</div>
				<h3>{{ item.title }}</h3>
				<p>{{ item.description }}</p>
				<div class="cap-action">
					{{ item.action }} <el-icon><ArrowRight /></el-icon>
				</div>
			</div>
			<div
				class="capability-card add-card"
				@click="ElMessage.info('能力模块可通过配置 action key 接入')"
			>
				<div class="add-circle">
					<el-icon><Plus /></el-icon>
				</div>
				<h3>扩展新能力</h3>
				<p>为总控制台添加一项新的运营或数据能力</p>
				<div class="cap-action">
					查看接入说明 <el-icon><ArrowRight /></el-icon>
				</div>
			</div>
		</section>

		<section class="lower-grid">
			<div class="panel">
				<div class="panel-title">
					<h2>最近操作</h2>
					<el-button link type="primary" @click="showLog = true">全部记录</el-button>
				</div>
				<el-empty
					v-if="!logs.length && !loading"
					description="暂无操作记录"
					:image-size="70"
				/>
				<div v-for="log in recentLogs" :key="log.id" class="log">
					<span class="log-dot" :class="log.color"></span>
					<div>
						<b
							>{{ log.actionName
							}}<template v-if="log.targetOrderNo">
								· {{ log.targetOrderNo }}</template
							></b
						>
						<p>{{ auditDescription(log) }} · {{ log.createTime }}</p>
					</div>
					<el-tag size="small" :type="log.type" effect="plain">{{
						auditStatusName(log.status)
					}}</el-tag>
				</div>
			</div>
			<div class="panel safety">
				<div class="panel-title">
					<h2>安全提示</h2>
					<el-icon><WarningFilled /></el-icon>
				</div>
				<p>
					总控制台的操作拥有绕过常规校验的权限，请仅在确认用户身份、订单归属及业务依据后执行。
				</p>
				<div class="safety-line"><span>二次确认</span><b>已开启</b></div>
				<div class="safety-line"><span>操作留痕</span><b>已开启</b></div>
			</div>
		</section>

		<el-drawer v-model="drawer" :title="active?.title" size="480px"
			><div v-if="active" class="drawer-content">
				<div class="drawer-lead">
					<div class="cap-icon" :class="active.color">
						<el-icon><component :is="active.icon" /></el-icon>
					</div>
					<div>
						<h3>{{ active.title }}</h3>
						<p>{{ active.description }}</p>
					</div>
				</div>
				<el-alert
					title="这是高权限操作，提交后将写入审计日志。"
					type="warning"
					:closable="false"
					show-icon
				/><el-form label-position="top" class="control-form">
					<el-form-item label="目标用户">
						<el-select
							v-model="form.userId"
							filterable
							remote
							clearable
							:remote-method="searchUsers"
							:loading="userLoading"
							placeholder="输入用户 ID、手机号或昵称"
							style="width: 100%"
							@change="onUserChange"
						>
							<el-option
								v-for="user in users"
								:key="user.id"
								:value="Number(user.id)"
								:label="userLabel(user)"
							/>
						</el-select>
					</el-form-item>
					<div v-if="selectedUser" class="data-preview">
						<span
							>当前余额 <b>¥{{ centsToYuan(selectedUser.balance) }}</b></span
						><span
							>剩余次数 <b>{{ selectedUser.messageQuota }}</b></span
						>
					</div>
					<el-form-item
						v-if="active.key === 'refund' || active.key === 'order'"
						label="指定订单"
					>
						<el-select
							v-model="form.orderId"
							filterable
							remote
							clearable
							:remote-method="searchOrders"
							:loading="orderLoading"
							:disabled="!form.userId"
							placeholder="输入订单号或商品名称"
							style="width: 100%"
							@change="onOrderChange"
						>
							<el-option
								v-for="order in orders"
								:key="order.id"
								:value="Number(order.id)"
								:label="orderLabel(order)"
							/>
						</el-select>
					</el-form-item>
					<div v-if="selectedOrder" class="order-preview">
						<div>
							<span>订单号</span><b>{{ selectedOrder.orderNo }}</b>
						</div>
						<div>
							<span>实付金额</span><b>¥{{ centsToYuan(selectedOrder.payAmount) }}</b>
						</div>
						<div>
							<span>订单状态</span><b>{{ orderStatusName(selectedOrder.status) }}</b>
						</div>
						<div>
							<span>退款状态</span
							><b>{{ refundStatusName(selectedOrder.refundStatus) }}</b>
						</div>
					</div>
					<el-form-item v-if="active.key === 'order'" label="目标订单状态">
						<el-select
							v-model="form.targetStatus"
							placeholder="选择目标状态"
							style="width: 100%"
							><el-option
								v-for="item in orderStatuses"
								:key="item.value"
								:label="item.label"
								:value="item.value"
						/></el-select>
					</el-form-item>
					<template v-if="active.key === 'user'">
						<el-form-item label="账户余额调整（元）"
							><el-input-number
								v-model="form.balanceDeltaYuan"
								:precision="2"
								:step="1"
								:min="-1000000"
								:max="1000000"
								style="width: 100%"
							/>
							<div class="form-hint">正数增加，负数扣减</div></el-form-item
						>
						<el-form-item label="消息次数调整（次）"
							><el-input-number
								v-model="form.quotaDelta"
								:step="1"
								:min="-1000000"
								:max="1000000"
								style="width: 100%"
							/>
							<div class="form-hint">正数增加，负数扣减</div></el-form-item
						>
					</template>
					<el-form-item label="操作原因"
						><el-input
							v-model="form.reason"
							type="textarea"
							:rows="4"
							placeholder="请填写业务依据，至少 10 个字"
							maxlength="200"
							show-word-limit /></el-form-item></el-form
				><el-button
					type="primary"
					size="large"
					class="submit"
					:disabled="!canSubmit"
					:loading="submitting"
					@click="confirmAction"
					>继续操作 <el-icon><ArrowRight /></el-icon
				></el-button>
			</div>
		</el-drawer>
		<el-dialog v-model="showLog" title="审计日志" width="720px" @open="loadAudits"
			><el-empty v-if="!logs.length" description="暂无审计日志" />
			<div v-for="log in logs" :key="log.id" class="log dialog-log">
				<span class="log-dot" :class="log.color"></span>
				<div>
					<b
						>{{ log.actionName
						}}<template v-if="log.targetOrderNo">
							· {{ log.targetOrderNo }}</template
						></b
					>
					<p>{{ auditDescription(log) }} · {{ log.createTime }}</p>
				</div>
				<el-tag size="small" :type="log.type" effect="plain">{{
					auditStatusName(log.status)
				}}</el-tag>
			</div>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCool } from '/@/cool';
import {
	ArrowRight,
	CreditCard,
	DocumentChecked,
	List,
	Lock,
	Plus,
	Refresh,
	User,
	WarningFilled
} from '@element-plus/icons-vue';

const { service } = useCool();
const api = (service as any).control.workspace;
const summary = reactive({
	pendingSpecialItems: 0,
	monthOperationCount: 0,
	affectedUserCount: 0,
	safetyScore: 100,
	updatedAt: ''
});
const stats = computed(() => [
	{
		label: '待处理特殊事项',
		value: summary.pendingSpecialItems,
		hint: '待审批、处理中与失败',
		icon: WarningFilled,
		color: 'orange'
	},
	{
		label: '本月已执行操作',
		value: summary.monthOperationCount,
		hint: '全部已留痕',
		icon: DocumentChecked,
		color: 'blue'
	},
	{
		label: '影响用户数',
		value: summary.affectedUserCount,
		hint: '近 30 天',
		icon: User,
		color: 'purple'
	},
	{
		label: '系统安全评分',
		value: summary.safetyScore,
		hint: '近 30 天操作成功率',
		icon: Lock,
		color: 'green'
	}
]);
const capabilities = [
	{
		key: 'refund',
		title: '强制退款',
		description: '为指定用户的指定订单执行退款，支持已消耗权益的特殊场景。',
		action: '进入退款工作台',
		icon: CreditCard,
		color: 'red',
		risk: '高风险',
		featured: true
	},
	{
		key: 'order',
		title: '订单状态修复',
		description: '在保留真实支付与退款事实的前提下，修正异常订单状态。',
		action: '处理异常订单',
		icon: Refresh,
		color: 'blue',
		risk: '中风险'
	},
	{
		key: 'user',
		title: '用户权益调整',
		description: '增减消息次数与账户余额，处理客诉补偿和数据校正。',
		action: '调整用户权益',
		icon: User,
		color: 'purple',
		risk: '高风险'
	}
];
const users = ref<any[]>([]),
	orders = ref<any[]>([]),
	logs = ref<any[]>([]);
const loading = ref(false),
	userLoading = ref(false),
	orderLoading = ref(false),
	submitting = ref(false);
const drawer = ref(false),
	showLog = ref(false),
	active = ref<any>(null),
	form = ref<any>({
		userId: undefined,
		orderId: undefined,
		targetStatus: undefined,
		balanceDeltaYuan: 0,
		quotaDelta: 0,
		reason: ''
	});
const orderStatuses = [
	{ label: '待支付', value: 0 },
	{ label: '已支付', value: 1 },
	{ label: '已退款', value: 2 },
	{ label: '已关闭', value: 3 }
];
const recentLogs = computed(() => logs.value.slice(0, 5));
const selectedUser = computed(() =>
	users.value.find(item => Number(item.id) === Number(form.value.userId))
);
const selectedOrder = computed(() =>
	orders.value.find(item => Number(item.id) === Number(form.value.orderId))
);
const canSubmit = computed(() => {
	if (!form.value.userId || form.value.reason.trim().length < 10) return false;
	if (active.value?.key === 'refund') return Boolean(form.value.orderId);
	if (active.value?.key === 'order')
		return form.value.orderId && form.value.targetStatus !== undefined;
	if (active.value?.key === 'user')
		return Number(form.value.balanceDeltaYuan) !== 0 || Number(form.value.quotaDelta) !== 0;
	return false;
});
function openCapability(item: any) {
	active.value = item;
	form.value = {
		userId: undefined,
		orderId: undefined,
		targetStatus: undefined,
		balanceDeltaYuan: 0,
		quotaDelta: 0,
		reason: ''
	};
	users.value = [];
	orders.value = [];
	drawer.value = true;
}
async function searchUsers(keyword: string) {
	if (!keyword?.trim()) return;
	userLoading.value = true;
	try {
		users.value = await api.searchUsers({ keyword });
	} finally {
		userLoading.value = false;
	}
}
async function onUserChange() {
	form.value.orderId = undefined;
	orders.value = [];
	if (form.value.userId && active.value?.key !== 'user') await searchOrders('');
}
async function searchOrders(keyword: string) {
	if (!form.value.userId) return;
	orderLoading.value = true;
	try {
		orders.value = await api.searchOrders({
			keyword,
			userId: form.value.userId,
			mode: active.value?.key === 'refund' ? 'refund' : 'all'
		});
	} finally {
		orderLoading.value = false;
	}
}
function onOrderChange() {
	if (active.value?.key === 'order') form.value.targetStatus = undefined;
}
async function confirmAction() {
	try {
		await ElMessageBox.confirm(
			`确认对「${selectedUser.value?.nickName || selectedUser.value?.phone || form.value.userId}」执行${active.value.title}？此操作将被记录且可能无法撤销。`,
			'最后确认',
			{ type: 'warning', confirmButtonText: '确认执行', cancelButtonText: '返回检查' }
		);
		submitting.value = true;
		const common = { userId: form.value.userId, reason: form.value.reason.trim() };
		if (active.value.key === 'refund')
			await api.forceRefund({ ...common, orderId: form.value.orderId });
		if (active.value.key === 'order')
			await api.repairOrderStatus({
				...common,
				orderId: form.value.orderId,
				targetStatus: form.value.targetStatus
			});
		if (active.value.key === 'user')
			await api.adjustUserBenefit({
				...common,
				balanceDelta: Math.round(Number(form.value.balanceDeltaYuan) * 100),
				quotaDelta: Number(form.value.quotaDelta)
			});
		drawer.value = false;
		ElMessage.success('操作完成，审计记录已生成');
		await loadDashboard();
	} catch (error: any) {
		if (error !== 'cancel' && error !== 'close') ElMessage.error(error?.message || '操作失败');
	} finally {
		submitting.value = false;
	}
}
async function loadSummary() {
	Object.assign(summary, await api.summary());
}
async function loadAudits() {
	const result = await api.auditList({ page: 1, size: 50 });
	logs.value = (result.list || []).map((item: any) => ({
		...item,
		status: Number(item.status),
		type:
			Number(item.status) === 1
				? 'success'
				: Number(item.status) === 2
					? 'danger'
					: 'warning',
		color: Number(item.status) === 1 ? 'green' : Number(item.status) === 2 ? 'red' : 'orange'
	}));
}
async function loadDashboard() {
	loading.value = true;
	try {
		await Promise.all([loadSummary(), loadAudits()]);
	} catch (error: any) {
		ElMessage.error(error?.message || '总控制台数据加载失败');
	} finally {
		loading.value = false;
	}
}
function userLabel(user: any) {
	return `${user.nickName || '未设置昵称'} · ${user.phone || '无手机号'} · ID ${user.id}`;
}
function orderLabel(order: any) {
	return `${order.orderNo} · ${order.productName || '未命名订单'} · ¥${centsToYuan(order.payAmount)}`;
}
function centsToYuan(value: any) {
	return (Number(value || 0) / 100).toFixed(2);
}
function orderStatusName(value: any) {
	return orderStatuses.find(item => item.value === Number(value))?.label || '未知';
}
function refundStatusName(value: any) {
	return ['未申请', '待审批', '已退款', '已拒绝', '处理中', '失败'][Number(value)] || '未知';
}
function auditStatusName(value: any) {
	return ['处理中', '已完成', '失败'][Number(value)] || '未知';
}
function auditDescription(log: any) {
	return `管理员 ${log.operatorName}，用户 ${log.targetUserName || log.targetUserPhone || log.targetUserId || '-'}`;
}
onMounted(loadDashboard);
</script>

<style scoped lang="scss">
.control-page {
	padding: 28px 32px 48px;
	background: #f6f8fb;
	min-height: 100%;
	color: #172033;
}
.hero {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 28px 32px;
	border-radius: 18px;
	background: linear-gradient(120deg, #16243d, #253c67);
	color: #fff;
	box-shadow: 0 10px 30px #192b501c;
}
.eyebrow {
	font-size: 11px;
	letter-spacing: 1.5px;
	color: #8fa9d5;
	display: flex;
	gap: 7px;
	align-items: center;
}
.hero h1 {
	font-size: 30px;
	margin: 10px 0 6px;
}
.hero p {
	margin: 0;
	color: #bdcbe0;
}
.hero-status {
	font-size: 13px;
	color: #b9c9df;
}
.hero-status small {
	display: block;
	margin: 10px 0 0 17px;
	color: #8192ad;
}
.pulse {
	display: inline-block;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #49d5a1;
	box-shadow: 0 0 0 5px #49d5a126;
	margin-right: 8px;
}
.stats {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 16px;
	margin: 22px 0 30px;
}
.stat-card,
.panel {
	background: #fff;
	border: 1px solid #e8edf4;
	border-radius: 14px;
}
.stat-card {
	display: flex;
	gap: 14px;
	padding: 18px;
}
.stat-card span,
.stat-card em {
	display: block;
	color: #8792a5;
	font-size: 12px;
	font-style: normal;
}
.stat-card strong {
	display: block;
	font-size: 25px;
	margin: 5px 0 2px;
}
.stat-icon,
.cap-icon {
	display: grid;
	place-items: center;
	border-radius: 11px;
	flex: none;
}
.stat-icon {
	width: 42px;
	height: 42px;
	font-size: 20px;
}
.orange {
	color: #e99836;
	background: #fff4e5;
}
.blue {
	color: #4e87ed;
	background: #edf4ff;
}
.purple {
	color: #8869dd;
	background: #f3efff;
}
.green {
	color: #28ae78;
	background: #eafaf3;
}
.red {
	color: #e56767;
	background: #fff0f0;
}
.section-title,
.panel-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.section-title {
	margin-bottom: 14px;
}
.section-title h2,
.panel h2 {
	font-size: 18px;
	margin: 0;
}
.section-title p {
	margin: 5px 0 0;
	color: #8994a6;
	font-size: 13px;
}
.capability-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;
}
.capability-card {
	background: #fff;
	border: 1px solid #e8edf4;
	border-radius: 14px;
	padding: 22px;
	min-height: 175px;
	cursor: pointer;
	transition: 0.2s;
}
.capability-card:hover {
	transform: translateY(-3px);
	box-shadow: 0 8px 24px #243b6014;
	border-color: #c9d8ef;
}
.featured {
	border-color: #f0b6b6;
	background: linear-gradient(145deg, #fff, #fff9f9);
}
.cap-top {
	display: flex;
	justify-content: space-between;
}
.cap-icon {
	width: 44px;
	height: 44px;
	font-size: 21px;
}
.capability-card h3 {
	margin: 17px 0 6px;
	font-size: 16px;
}
.capability-card p {
	font-size: 13px;
	line-height: 1.6;
	color: #8792a5;
	margin: 0;
}
.cap-action {
	margin-top: 17px;
	color: #527fc8;
	font-size: 13px;
	display: flex;
	align-items: center;
	gap: 5px;
}
.add-card {
	border-style: dashed;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	justify-content: center;
}
.add-card h3 {
	margin: 10px 0 5px;
}
.add-circle {
	width: 42px;
	height: 42px;
	border-radius: 50%;
	display: grid;
	place-items: center;
	background: #f0f4fa;
	color: #7890b4;
	font-size: 21px;
}
.lower-grid {
	display: grid;
	grid-template-columns: 1.4fr 1fr;
	gap: 16px;
	margin-top: 30px;
}
.panel {
	padding: 22px;
}
.panel-title {
	margin-bottom: 14px;
}
.panel-title h2 {
	font-size: 16px;
}
.log {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 13px 0;
	border-bottom: 1px solid #f0f2f6;
}
.log:last-child {
	border-bottom: 0;
}
.log > div:nth-child(2) {
	flex: 1;
}
.log b {
	font-size: 13px;
	font-weight: 500;
}
.log p {
	font-size: 12px;
	color: #9aa4b4;
	margin: 5px 0 0;
}
.log-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #6b8dcc;
}
.log-dot.green {
	background: #45c595;
}
.log-dot.purple {
	background: #9876e6;
}
.safety {
	background: #fffdf8;
	border-color: #f3e8cf;
}
.safety .panel-title .el-icon {
	color: #dfa548;
	font-size: 20px;
}
.safety > p {
	font-size: 13px;
	color: #7d6e4b;
	line-height: 1.7;
}
.safety-line {
	display: flex;
	justify-content: space-between;
	border-top: 1px solid #f3ead5;
	padding: 11px 0;
	font-size: 13px;
}
.safety-line b {
	color: #43ad80;
}
.drawer-content {
	padding: 0 4px;
}
.drawer-lead {
	display: flex;
	gap: 13px;
	margin-bottom: 20px;
}
.drawer-lead h3 {
	margin: 4px 0 5px;
}
.drawer-lead p {
	margin: 0;
	color: #8b96a6;
	font-size: 13px;
	line-height: 1.5;
}
.control-form {
	margin-top: 24px;
}
.data-preview {
	display: flex;
	gap: 12px;
	margin: -8px 0 18px;
}
.data-preview span {
	flex: 1;
	padding: 11px 12px;
	border-radius: 8px;
	background: #f5f8fc;
	color: #7c899d;
	font-size: 12px;
}
.data-preview b {
	float: right;
	color: #29354a;
}
.order-preview {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1px;
	margin: -8px 0 18px;
	padding: 1px;
	background: #e9edf4;
	border-radius: 9px;
	overflow: hidden;
}
.order-preview > div {
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 10px 12px;
	background: #f8fafd;
}
.order-preview span,
.form-hint {
	color: #929daf;
	font-size: 12px;
}
.order-preview b {
	font-size: 12px;
	font-weight: 500;
}
.form-hint {
	width: 100%;
	margin-top: 5px;
}
.submit {
	width: 100%;
	margin-top: 8px;
}
.dialog-log {
	padding: 15px 4px;
}
@media (max-width: 1100px) {
	.stats {
		grid-template-columns: repeat(2, 1fr);
	}
	.capability-grid {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
