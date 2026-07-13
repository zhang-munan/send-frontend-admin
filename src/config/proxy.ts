const proxy = {
	'/dev/': {
		target: 'http://192.168.10.116:8001',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/dev/, '')
	},

	'/prod/': {
		target: 'http://mljxcloud.com:8001',
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/prod/, '/api')
	}
};

const value = 'dev';
const host = proxy[`/${value}/`]?.target;

export { proxy, host, value };
