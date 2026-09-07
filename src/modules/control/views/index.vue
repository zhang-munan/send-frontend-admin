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
						<p class="log-action">{{ auditActionDetail(log) }}</p>
						<p class="log-meta">{{ auditDescription(log) }} · {{ log.createTime }}</p>
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
							show-word-limit
						/>
						<div
							class="form-hint"
							:class="{ invalid: reasonLength > 0 && reasonLength < 10 }"
						>
							{{
								reasonLength < 10
									? `还需填写 ${10 - reasonLength} 个字`
									: '已满足原因字数要求'
							}}
						</div></el-form-item
					></el-form
				><el-button
					type="primary"
					size="large"
					class="submit"
					:loading="submitting"
					@click="confirmAction"
					>继续操作 <el-icon><ArrowRight /></el-icon
				></el-button>
			</div>
		</el-drawer>
		<el-drawer v-model="pricingDrawer" title="消息计价规则" size="760px">
			<div class="pricing-editor" v-loading="pricingLoading">
				<el-alert
					title="发布后立即生效。手机端只展示预估金额，不会展示内部计算方式；创建订单时服务端会再次按最新版本核价。"
					type="info"
					:closable="false"
					show-icon
				/>
				<div class="pricing-version">
					<div><span>当前版本</span><b>v{{ pricingMeta.version }}</b></div>
					<div><span>最近发布</span><b>{{ pricingMeta.publishedAt || '尚未发布，使用系统默认值' }}</b></div>
					<div><span>发布人</span><b>{{ pricingMeta.operatorName || '-' }}</b></div>
				</div>
				<el-form label-position="top" class="control-form">
					<el-form-item label="方案名称">
						<el-input v-model="pricingForm.name" maxlength="100" placeholder="例如：常规消息计价" />
					</el-form-item>
					<div class="pricing-base-grid">
						<el-form-item label="最低价格（元）">
							<el-input-number v-model="pricingForm.minimumAmountYuan" :min="0" :max="100000" :precision="2" :step="0.1" />
						</el-form-item>
						<el-form-item label="封顶价格">
							<div class="cap-price-input">
								<el-switch v-model="pricingForm.maximumEnabled" active-text="启用" />
								<el-input-number v-if="pricingForm.maximumEnabled" v-model="pricingForm.maximumAmountYuan" :min="0" :max="100000" :precision="2" :step="1" />
							</div>
						</el-form-item>
					</div>

					<div class="rule-heading">
						<div><h3>计价规则</h3><p>从上到下匹配，第一条符合字数范围的规则生效。</p></div>
						<el-button type="primary" plain @click="addPricingRule"><el-icon><Plus /></el-icon> 新增规则</el-button>
					</div>
					<div v-for="(rule, index) in pricingForm.rules" :key="rule.id" class="pricing-rule">
						<div class="pricing-rule-head">
							<div class="rule-order">{{ index + 1 }}</div>
							<el-input v-model="rule.name" maxlength="100" placeholder="规则名称" />
							<el-switch v-model="rule.enabled" active-text="启用" />
							<el-button-group>
								<el-button :disabled="index === 0" @click="movePricingRule(index, -1)">上移</el-button>
								<el-button :disabled="index === pricingForm.rules.length - 1" @click="movePricingRule(index, 1)">下移</el-button>
							</el-button-group>
							<el-button type="danger" link :disabled="pricingForm.rules.length === 1" @click="removePricingRule(index)">删除</el-button>
						</div>
						<div class="rule-grid">
							<el-form-item label="起始字数（含）">
								<el-input-number v-model="rule.minChars" :min="1" :max="500" :step="1" />
							</el-form-item>
							<el-form-item label="结束字数">
								<div class="unlimited-input"><el-switch v-model="rule.unlimited" active-text="不限" /><el-input-number v-if="!rule.unlimited" v-model="rule.maxChars" :min="rule.minChars" :max="500" :step="1" /></div>
							</el-form-item>
							<el-form-item label="计价方式">
								<el-select v-model="rule.type"><el-option label="区间固定价" value="fixed" /><el-option label="每若干字阶梯加价" value="step" /></el-select>
							</el-form-item>
						</div>
						<div v-if="rule.type === 'fixed'" class="rule-price-line">
							<span>该区间统一收取</span><el-input-number v-model="rule.amountYuan" :min="0" :max="100000" :precision="2" :step="0.1" /><span>元</span>
						</div>
						<div v-else class="rule-price-line step-line">
							<span>基础价</span><el-input-number v-model="rule.baseAmountYuan" :min="0" :max="100000" :precision="2" :step="0.1" /><span>元，区间内每</span><el-input-number v-model="rule.unitChars" :min="1" :max="500" :step="1" /><span>字增加</span><el-input-number v-model="rule.unitAmountYuan" :min="0" :max="100000" :precision="2" :step="0.1" /><span>元，不足一档按一档计</span>
						</div>
					</div>

					<div class="pricing-preview">
						<div><h3>规则试算</h3><p>发布前用任意文本检查最终金额。</p></div>
						<el-input v-model="pricingPreviewContent" type="textarea" :rows="3" maxlength="500" show-word-limit placeholder="输入一段测试消息" />
						<div class="preview-result">
							<el-button :loading="pricingPreviewing" @click="previewPricing">开始试算</el-button>
							<strong v-if="pricingPreviewFee !== null">预估金额 ¥{{ centsToYuan(pricingPreviewFee) }}</strong>
						</div>
					</div>
					<el-form-item label="发布原因">
						<el-input v-model="pricingReason" type="textarea" :rows="3" maxlength="200" show-word-limit placeholder="说明本次调价依据，至少 10 个字" />
					</el-form-item>
				</el-form>
				<el-button type="primary" size="large" class="submit" :loading="pricingSaving" @click="publishPricing">发布并立即生效</el-button>
			</div>
		</el-drawer>
		<el-dialog v-model="showLog" title="审计日志" width="860px" @open="loadAudits"
			><el-empty v-if="!logs.length" description="暂无审计日志" />
			<div v-for="log in logs" :key="log.id" class="log dialog-log">
				<span class="log-dot" :class="log.color"></span>
				<div class="audit-log-body">
					<b
						>{{ log.actionName
						}}<template v-if="log.targetOrderNo">
							· {{ log.targetOrderNo }}</template
						></b
					>
					<div class="audit-detail">
						<div>
							<span>操作内容</span>
							<p>{{ auditActionDetail(log) }}</p>
						</div>
						<div>
							<span>操作原因</span>
							<p>{{ log.reason || '-' }}</p>
						</div>
						<div v-if="log.errorMessage" class="audit-error">
							<span>失败原因</span>
							<p>{{ log.errorMessage }}</p>
						</div>
					</div>
					<p class="log-meta">{{ auditDescription(log) }} · {{ log.createTime }}</p>
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
import ControlWorkspaceService from '../service/workspace';
import {
	ArrowRight,
	CreditCard,
	DocumentChecked,
	List,
	Lock,
	Plus,
	Refresh,
	Setting,
	User,
	WarningFilled
} from '@element-plus/icons-vue';

// 直接使用模块服务，避免本地/生产环境的 EPS 缓存未及时包含新增接口。
const api = new ControlWorkspaceService();
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
		key: 'pricing',
		title: '消息计价规则',
		description: '按字数区间、固定价或阶梯价自由组合，发布后手机端实时获取最新预估金额。',
		action: '配置动态价格',
		icon: Setting,
		color: 'green',
		risk: '中风险'
	},
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
const reasonLength = computed(() => form.value.reason.trim().length);
function openCapability(item: any) {
	if (item.key === 'pricing') {
		openPricingEditor();
		return;
	}
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

const pricingDrawer = ref(false);
const pricingLoading = ref(false);
const pricingSaving = ref(false);
const pricingPreviewing = ref(false);
const pricingPreviewContent = ref('这是一段用于检查价格的测试消息');
const pricingPreviewFee = ref<number | null>(null);
const pricingReason = ref('');
const pricingMeta = reactive({ version: 0, publishedAt: '', operatorName: '' });
const pricingForm = reactive<any>({
	name: '',
	minimumAmountYuan: 0,
	maximumEnabled: false,
	maximumAmountYuan: 0,
	rules: []
});
function yuanToCents(value: any) {
	return Math.round(Number(value || 0) * 100);
}
function createRule(index = 0) {
	return {
		id: `rule-${Date.now()}-${index}`,
		name: `计价规则 ${index + 1}`,
		enabled: true,
		minChars: 1,
		maxChars: 500,
		unlimited: true,
		type: 'step',
		amountYuan: 1.99,
		baseAmountYuan: 0,
		unitChars: 10,
		unitAmountYuan: 1.99
	};
}
function applyPricingConfig(result: any) {
	const config = result.config || {};
	pricingMeta.version = Number(result.version || 0);
	pricingMeta.publishedAt = result.publishedAt || '';
	pricingMeta.operatorName = result.operatorName || '';
	pricingForm.name = config.name || '消息动态计价';
	pricingForm.minimumAmountYuan = Number(config.minimumAmount || 0) / 100;
	pricingForm.maximumEnabled = config.maximumAmount !== null && config.maximumAmount !== undefined;
	pricingForm.maximumAmountYuan = Number(config.maximumAmount || 0) / 100;
	pricingForm.rules = (config.rules || []).map((rule: any) => ({
		...rule,
		maxChars: rule.maxChars ?? 500,
		unlimited: rule.maxChars === null || rule.maxChars === undefined,
		amountYuan: Number(rule.amount || 0) / 100,
		baseAmountYuan: Number(rule.baseAmount || 0) / 100,
		unitAmountYuan: Number(rule.unitAmount || 0) / 100
	}));
	if (!pricingForm.rules.length) pricingForm.rules = [createRule()];
}
function serializePricingConfig() {
	return {
		name: pricingForm.name.trim(),
		minimumAmount: yuanToCents(pricingForm.minimumAmountYuan),
		maximumAmount: pricingForm.maximumEnabled ? yuanToCents(pricingForm.maximumAmountYuan) : null,
		rules: pricingForm.rules.map((rule: any) => ({
			id: rule.id,
			name: rule.name.trim(),
			enabled: rule.enabled,
			minChars: Number(rule.minChars),
			maxChars: rule.unlimited ? null : Number(rule.maxChars),
			type: rule.type,
			...(rule.type === 'fixed'
				? { amount: yuanToCents(rule.amountYuan) }
				: {
						baseAmount: yuanToCents(rule.baseAmountYuan),
						unitChars: Number(rule.unitChars),
						unitAmount: yuanToCents(rule.unitAmountYuan)
					})
		}))
	};
}
async function openPricingEditor() {
	pricingDrawer.value = true;
	pricingLoading.value = true;
	pricingPreviewFee.value = null;
	pricingReason.value = '';
	try {
		applyPricingConfig(await api.pricingConfig());
	} catch (error: any) {
		ElMessage.error(error?.message || '计价配置加载失败');
	} finally {
		pricingLoading.value = false;
	}
}
function addPricingRule() {
	pricingForm.rules.push(createRule(pricingForm.rules.length));
}
function removePricingRule(index: number) {
	pricingForm.rules.splice(index, 1);
}
function movePricingRule(index: number, offset: number) {
	const target = index + offset;
	if (target < 0 || target >= pricingForm.rules.length) return;
	const [rule] = pricingForm.rules.splice(index, 1);
	pricingForm.rules.splice(target, 0, rule);
}
async function previewPricing() {
	pricingPreviewing.value = true;
	try {
		const result = await api.previewPricing({
			content: pricingPreviewContent.value,
			config: serializePricingConfig()
		});
		pricingPreviewFee.value = Number(result.feeAmount);
	} catch (error: any) {
		pricingPreviewFee.value = null;
		ElMessage.warning(error?.message || '规则试算失败');
	} finally {
		pricingPreviewing.value = false;
	}
}
async function publishPricing() {
	if (pricingReason.value.trim().length < 10) {
		ElMessage.warning('发布原因至少需要 10 个字');
		return;
	}
	try {
		await ElMessageBox.confirm('新计价规则发布后将立即影响手机端预估价和新创建的订单，确认继续？', '确认发布', {
			type: 'warning', confirmButtonText: '确认发布', cancelButtonText: '返回检查'
		});
		pricingSaving.value = true;
		const result = await api.savePricingConfig({
			config: serializePricingConfig(),
			reason: pricingReason.value.trim()
		});
		applyPricingConfig(result);
		pricingReason.value = '';
		ElMessage.success(`计价规则 v${result.version} 已生效`);
		await loadDashboard();
	} catch (error: any) {
		if (error !== 'cancel' && error !== 'close') ElMessage.error(error?.message || '计价规则发布失败');
	} finally {
		pricingSaving.value = false;
	}
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
	const validationError = getValidationError();
	if (validationError) {
		ElMessage.warning(validationError);
		return;
	}
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
function getValidationError() {
	if (!form.value.userId) return '请先选择目标用户';
	if (active.value?.key === 'refund' && !form.value.orderId) return '请选择需要退款的订单';
	if (active.value?.key === 'order' && !form.value.orderId) return '请选择需要修复的订单';
	if (active.value?.key === 'order' && form.value.targetStatus === undefined)
		return '请选择目标订单状态';
	if (
		active.value?.key === 'order' &&
		Number(form.value.targetStatus) === Number(selectedOrder.value?.status)
	)
		return '选择的状态与当前状态相同，请重新选择';
	if (
		active.value?.key === 'user' &&
		Number(form.value.balanceDeltaYuan) === 0 &&
		Number(form.value.quotaDelta) === 0
	)
		return '账户余额和消息次数至少调整一项';
	if (!reasonLength.value) return '请填写操作原因';
	if (reasonLength.value < 10)
		return `操作原因至少需要 10 个字，当前为 ${reasonLength.value} 个字`;
	return '';
}
async function loadSummary() {
	Object.assign(summary, await api.summary());
}
async function loadAudits() {
	const result = await api.auditList({ page: 1, size: 50 });
	logs.value = (result.list || []).map((item: any) => ({
		...item,
		beforeData: normalizeAuditData(item.beforeData),
		afterData: normalizeAuditData(item.afterData),
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
	if (log.actionType === 'pricing_config') return `管理员 ${log.operatorName}，全局消息计价配置`;
	return `管理员 ${log.operatorName}，用户 ${log.targetUserName || log.targetUserPhone || log.targetUserId || '-'}`;
}
function auditActionDetail(log: any) {
	const before = log.beforeData || {};
	const after = log.afterData || {};

	if (log.actionType === 'force_refund') {
		const amount = Number(after.refundAmount || before.payAmount || 0);
		const afterStatus =
			after.refundStatus === undefined
				? Number(log.status) === 2
					? '未变更'
					: '处理中'
				: refundStatusName(after.refundStatus);
		return `整单强制退款 ¥${centsToYuan(amount)}，退款状态 ${formatChange(
			refundStatusName(before.refundStatus),
			afterStatus
		)}`;
	}

	if (log.actionType === 'order_status') {
		const changes: string[] = [];
		const orderStatusChanged =
			after.status !== undefined && Number(before.status) !== Number(after.status);
		const refundStatusChanged =
			after.refundStatus !== undefined &&
			Number(before.refundStatus) !== Number(after.refundStatus);
		if (orderStatusChanged) {
			changes.push(
				`订单状态 ${formatChange(orderStatusName(before.status), orderStatusName(after.status))}`
			);
		}
		if (refundStatusChanged) {
			changes.push(
				`退款状态 ${formatChange(
					refundStatusName(before.refundStatus),
					refundStatusName(after.refundStatus)
				)}`
			);
		}
		return changes.join('；') || '订单及退款状态未发生变化';
	}

	if (log.actionType === 'user_benefit') {
		if (after.balance === undefined && after.messageQuota === undefined) {
			return '尝试调整用户权益，操作未完成且未产生数据变更';
		}
		const changes: string[] = [];
		if (Number(before.balance) !== Number(after.balance)) {
			changes.push(
				`账户余额 ¥${centsToYuan(before.balance)} → ¥${centsToYuan(after.balance)}（${formatMoneyDelta(
					Number(after.balance) - Number(before.balance)
				)}）`
			);
		}
		if (Number(before.messageQuota) !== Number(after.messageQuota)) {
			changes.push(
				`消息次数 ${Number(before.messageQuota || 0)} → ${Number(after.messageQuota || 0)}（${formatNumberDelta(
					Number(after.messageQuota) - Number(before.messageQuota)
				)}）`
			);
		}
		return changes.join('；') || '用户权益数据未发生变化';
	}

	if (log.actionType === 'pricing_config') {
		return `计价版本 v${Number(before.version || 0)} → v${Number(after.version || before.version || 0)}`;
	}

	return log.actionName || '未知操作';
}
function normalizeAuditData(value: any) {
	if (!value || typeof value !== 'string') return value;
	try {
		return JSON.parse(value);
	} catch {
		return {};
	}
}
function formatChange(before: string, after: string) {
	return `${before} → ${after}`;
}
function formatMoneyDelta(value: number) {
	return `${value >= 0 ? '+' : '-'}¥${centsToYuan(Math.abs(value))}`;
}
function formatNumberDelta(value: number) {
	return `${value >= 0 ? '+' : ''}${value}`;
}
onMounted(loadDashboard);
</script>

<style scoped lang="scss">
.control-page {
	height: 100%;
	padding: 28px 32px 48px;
	box-sizing: border-box;
	overflow-x: hidden;
	overflow-y: auto;
	background: #f6f8fb;
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
.log .log-action {
	color: #4c596d;
	line-height: 1.55;
}
.log .log-meta {
	color: #9aa4b4;
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
.form-hint.invalid {
	color: var(--el-color-danger);
}
.submit {
	width: 100%;
	margin-top: 8px;
}
.pricing-editor {
	padding: 0 4px 32px;
}
.pricing-version {
	display: grid;
	grid-template-columns: 100px 1fr 120px;
	gap: 1px;
	margin: 18px 0 8px;
	padding: 1px;
	border-radius: 10px;
	overflow: hidden;
	background: #e7edf5;
}
.pricing-version > div {
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 12px 14px;
	background: #f8fafd;
}
.pricing-version span {
	font-size: 11px;
	color: #8b96a8;
}
.pricing-version b {
	font-size: 13px;
	font-weight: 600;
	color: #29364b;
}
.pricing-base-grid,
.rule-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 14px;
}
.pricing-base-grid :deep(.el-input-number),
.rule-grid :deep(.el-input-number),
.rule-grid :deep(.el-select) {
	width: 100%;
}
.cap-price-input,
.unlimited-input {
	display: flex;
	align-items: center;
	gap: 12px;
	width: 100%;
}
.rule-heading {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 10px 0 12px;
}
.rule-heading h3,
.pricing-preview h3 {
	margin: 0;
	font-size: 15px;
}
.rule-heading p,
.pricing-preview p {
	margin: 5px 0 0;
	font-size: 12px;
	color: #8c97a8;
}
.pricing-rule {
	margin-bottom: 14px;
	padding: 16px;
	border: 1px solid #e5eaf2;
	border-radius: 12px;
	background: #fbfcfe;
}
.pricing-rule-head {
	display: grid;
	grid-template-columns: 30px minmax(120px, 1fr) auto auto auto;
	gap: 10px;
	align-items: center;
	margin-bottom: 14px;
}
.rule-order {
	display: grid;
	place-items: center;
	width: 28px;
	height: 28px;
	border-radius: 8px;
	background: #eaf2ff;
	color: #4f7fc8;
	font-size: 12px;
	font-weight: 700;
}
.rule-grid {
	grid-template-columns: repeat(3, minmax(0, 1fr));
}
.rule-price-line {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 12px;
	border-radius: 8px;
	background: #f1f5fa;
	color: #5f6d82;
	font-size: 12px;
}
.rule-price-line :deep(.el-input-number) {
	width: 145px;
}
.step-line {
	flex-wrap: wrap;
}
.step-line :deep(.el-input-number) {
	width: 112px;
}
.pricing-preview {
	display: grid;
	gap: 12px;
	margin: 20px 0;
	padding: 16px;
	border: 1px dashed #cfd9e8;
	border-radius: 12px;
	background: #f8faff;
}
.preview-result {
	display: flex;
	align-items: center;
	gap: 16px;
}
.preview-result strong {
	color: #e36f59;
	font-size: 16px;
}
.dialog-log {
	align-items: flex-start;
	padding: 18px 4px;
}
.dialog-log .log-dot {
	margin-top: 5px;
}
.audit-log-body {
	min-width: 0;
}
.audit-detail {
	display: grid;
	gap: 8px;
	margin-top: 10px;
	padding: 11px 13px;
	border-radius: 8px;
	background: #f7f9fc;
}
.audit-detail > div {
	display: grid;
	grid-template-columns: 64px minmax(0, 1fr);
	gap: 10px;
}
.audit-detail span {
	font-size: 12px;
	color: #8994a6;
}
.audit-detail p {
	margin: 0;
	color: #364256;
	line-height: 1.55;
	word-break: break-word;
}
.audit-detail .audit-error p {
	color: var(--el-color-danger);
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
