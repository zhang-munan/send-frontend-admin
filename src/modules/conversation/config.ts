import { type ModuleConfig } from '/@/cool';

export default (): ModuleConfig => {
	return {
		views: [
			{
				path: '/conversation/detail/:id',
				meta: { label: '对话详情' },
				component: () => import('./views/detail.vue')
			}
		]
	};
};
