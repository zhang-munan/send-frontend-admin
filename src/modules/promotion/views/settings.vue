<template>
	<el-card v-loading="loading" class="promotion-settings">
		<template #header><div class="header"><span>推广规则与结算配置</span><el-button type="primary" :loading="saving" @click="save">保存配置</el-button></div></template>
		<el-alert title="金额单位在页面按元填写；修改比例只影响修改后支付的新订单，历史订单保留支付时的比例快照。" type="warning" :closable="false" show-icon />
		<el-form label-width="170px" class="form">
			<el-form-item label="推广计划"><el-switch v-model="form.enabled" :active-value="1" :inactive-value="0" /></el-form-item>
			<el-row :gutter="20">
				<el-col :span="12"><el-form-item label="新用户赠送次数"><el-input-number v-model="form.referralRewardQuota" :min="0" :max="100" /></el-form-item></el-col>
				<el-col :span="12"><el-form-item label="佣金比例"><el-input-number v-model="commissionPercent" :min="0" :max="100" :precision="2" /><span class="unit">%</span></el-form-item></el-col>
				<el-col :span="12"><el-form-item label="结算等待天数"><el-input-number v-model="form.settlementDays" :min="0" :max="365" /></el-form-item></el-col>
				<el-col :span="12"><el-form-item label="推广码绑定窗口"><el-input-number v-model="form.bindWindowHours" :min="1" :max="720" /><span class="unit">小时</span></el-form-item></el-col>
				<el-col :span="12"><el-form-item label="最低提现金额"><el-input-number v-model="minWithdrawYuan" :min="0.01" :precision="2" /><span class="unit">元</span></el-form-item></el-col>
				<el-col :span="12"><el-form-item label="单笔最高提现"><el-input-number v-model="maxWithdrawYuan" :min="0.01" :precision="2" /><span class="unit">元</span></el-form-item></el-col>
				<el-col :span="12"><el-form-item label="提现手续费"><el-input-number v-model="feePercent" :min="0" :max="100" :precision="2" /><span class="unit">%</span></el-form-item></el-col>
			</el-row>
			<el-divider />
			<el-form-item label="规则标题"><el-input v-model="form.rulesTitle" maxlength="100" /></el-form-item>
			<el-form-item label="规则状态"><el-switch v-model="form.rulesStatus" :active-value="1" :inactive-value="0" /></el-form-item>
			<el-form-item label="推广规则正文"><cl-editor v-model="form.rulesContent" name="cl-editor-wang" :height="520" /></el-form-item>
		</el-form>
	</el-card>
</template>

<script lang="ts" setup name="promotion-settings">
import { computed, onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useCool } from '/@/cool';
const { service } = useCool();
const loading = ref(false);
const saving = ref(false);
const form = reactive<any>({ enabled: 1, referralRewardQuota: 2, commissionRateBps: 5000, settlementDays: 7, bindWindowHours: 24, minWithdrawAmount: 1000, maxWithdrawAmount: 500000, withdrawFeeRateBps: 0, rulesTitle: '推广大使规则', rulesContent: '', rulesStatus: 1 });
const commissionPercent = computed({ get: () => form.commissionRateBps / 100, set: value => form.commissionRateBps = Math.round(Number(value) * 100) });
const feePercent = computed({ get: () => form.withdrawFeeRateBps / 100, set: value => form.withdrawFeeRateBps = Math.round(Number(value) * 100) });
const minWithdrawYuan = computed({ get: () => form.minWithdrawAmount / 100, set: value => form.minWithdrawAmount = Math.round(Number(value) * 100) });
const maxWithdrawYuan = computed({ get: () => form.maxWithdrawAmount / 100, set: value => form.maxWithdrawAmount = Math.round(Number(value) * 100) });
async function load() { loading.value = true; try { Object.assign(form, await (service as any).promotion.config.request({ url: '/get' })); } finally { loading.value = false; } }
async function save() { saving.value = true; try { await (service as any).promotion.config.request({ url: '/save', method: 'POST', data: form }); ElMessage.success('推广配置已保存'); await load(); } catch (error: any) { ElMessage.error(error?.message || '保存失败'); } finally { saving.value = false; } }
onMounted(load);
</script>

<style scoped>
.promotion-settings { margin: 10px; }
.header { display: flex; align-items: center; justify-content: space-between; font-weight: 600; }
.form { margin-top: 24px; max-width: 1200px; }
.unit { margin-left: 8px; color: var(--el-text-color-secondary); }
</style>
