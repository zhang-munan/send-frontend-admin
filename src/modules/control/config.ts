import { type ModuleConfig } from '/@/cool';

export default (): ModuleConfig => ({
	order: 88,
	views: [
		{
			path: '/control',
			meta: { label: '总控制台', process: true },
			component: () => import('./views/index.vue')
		}
	]
});
