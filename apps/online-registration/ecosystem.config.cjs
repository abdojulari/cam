module.exports = {
    apps: [
      {
        name: 'online-registration',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs',
        env: {
          NODE_ENV: 'production',
        },
        env_file: '/var/www/cam/.env'
      }
    ]
  }
