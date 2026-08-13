import { BaseService } from '/@/cool';

class ControlWorkspaceService extends BaseService {
	constructor() {
		super('control/workspace');
	}

	summary() {
		return this.request({ url: '/summary' });
	}

	auditList(params: any) {
		return this.request({ url: '/auditList', params });
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
