module.exports = {
	apps: [
		{
			name: 'home_storage-scanner',
			script: 'pnpm start',
			port: 3002,
		},
	],
	deploy: {
		production: {
			key: '~/.ssh/bekkai.fr/id_ed25519',
			user: 'qbekkai',
			host: '176.31.162.67',
			ref: 'origin/master',
			repo: 'https://github.com/qbekkai/home_storage_scanner.git',
			path: '/home/qbekkai/home_storage_scanner',
			'pre-deploy-local': '',
			'post-deploy':
				'source ~/.nvm/nvm.sh && pnpm i && pnpm run build && pm2 reload ecosystem.config.js --env production',
			'pre-setup': '',
			ssh_options: 'ForwardAgent=yes',
		},
	},
};
