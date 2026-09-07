import { BaseService } from '/@/cool';

export interface HourlyMessageStat {
	hour: number;
	count: number;
}

export interface DeviceMessageStat {
	device: string;
	count: number;
}

export interface MonthlyOrderStat {
	month: number;
	orderCount: number;
	revenue: number;
}

export interface MessageStatusStat {
	status: number;
	name: string;
	count: number;
}

export interface DashboardSummary {
	users: {
		total: number;
		today: number;
		yesterday: number;
		dayOverDayRate: number | null;
	};
	messages: {
		total: number;
		today: number;
		devices: DeviceMessageStat[];
		hourly: HourlyMessageStat[];
	};
	orders: {
		paidCount: number;
		todayPaidCount: number;
	};
	revenue: {
		total: number;
		today: number;
	};
	delivery: {
		delivered: number;
		failed: number;
		rate: number;
	};
	monthly: MonthlyOrderStat[];
	messageStatuses: MessageStatusStat[];
	year: number;
	updatedAt: string;
}

export interface DashboardRankingItem {
	name: string;
	orderCount: number;
	revenue: number;
	latestPayTime: string;
}

export type DashboardRange = 'day' | 'week' | 'month' | 'year';

const api = new BaseService('admin/base/comm');

export function createEmptyDashboard(): DashboardSummary {
	return {
		users: { total: 0, today: 0, yesterday: 0, dayOverDayRate: null },
		messages: {
			total: 0,
			today: 0,
			devices: [],
			hourly: Array.from({ length: 24 }, (_, hour) => ({ hour, count: 0 }))
		},
		orders: { paidCount: 0, todayPaidCount: 0 },
		revenue: { total: 0, today: 0 },
		delivery: { delivered: 0, failed: 0, rate: 0 },
		monthly: Array.from({ length: 12 }, (_, index) => ({
			month: index + 1,
			orderCount: 0,
			revenue: 0
		})),
		messageStatuses: [],
		year: new Date().getFullYear(),
		updatedAt: ''
	};
}

export function getDashboardSummary(): Promise<DashboardSummary> {
	return api.request({ url: '/dashboard', method: 'GET' }) as unknown as Promise<DashboardSummary>;
}

export function getDashboardRanking(range: DashboardRange): Promise<{ list: DashboardRankingItem[] }> {
	return api.request({
		url: '/dashboardRanking',
		method: 'GET',
		params: { range }
	}) as unknown as Promise<{ list: DashboardRankingItem[] }>;
}
