import { BaseService } from '/@/cool';

class ControlWorkspaceService extends BaseService {
	constructor() {
		// 使用完整管理端命名空间，不依赖运行时 EPS 自动接口描述。
		super('admin/control/workspace');
	}

	summary() {
		return this.request({ url: '/summary' });
	}

	auditList(params: any) {
		return this.request({ url: '/auditList', params });
	}

	pricingConfig() {
		return this.request({ url: '/pricingConfig' });
	}

	previewPricing(data: any) {
		return this.request({ url: '/previewPricing', method: 'POST', data });
	}

	savePricingConfig(data: any) {
		return this.request({ url: '/savePricingConfig', method: 'POST', data });
	}

	searchUsers(params: any) {
		return this.request({ url: '/searchUsers', params });
	}

	searchOrders(params: any) {
		return this.request({ url: '/searchOrders', params });
	}

	forceRefund(data: any) {
		return this.request({ url: '/forceRefund', method: 'POST', data });
	}

	repairOrderStatus(data: any) {
		return this.request({ url: '/repairOrderStatus', method: 'POST', data });
	}

	adjustUserBenefit(data: any) {
		return this.request({ url: '/adjustUserBenefit', method: 'POST', data });
	}
}

export default ControlWorkspaceService;
