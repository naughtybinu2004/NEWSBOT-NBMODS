module.exports = {
  apps: [
    {
      name: 'whatsapp-bot',
      script: 'index.js',
      watch: true,
      ignore_watch: ['node_modules', 'assets'],          env: {
        NODE_ENV: 'production',
        PORT: 8989, 
      },
    },
  ],
};
