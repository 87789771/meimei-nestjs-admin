module.exports = {
  apps: [
    {
      name: 'app_server',
      script: 'dist/main.js',
      watch: false,
      min_uptime: '60s',
      max_restarts: 3,
      // log 顯示時間
      time: true,
      // 錯誤 log 的指定位置
      error_file: './logs/err.log',
      // 正常輸出 log 的指定位置
      out_file: './logs/app.log',
      env: {
        NODE_ENV: 'development',
        APP_ENV: 'development',
        TZ: 'Asia/Shanghai', // 设置时区为上海时间（CST）
      },
      env_test: {
        NODE_ENV: 'test',
        APP_ENV: 'test',
        TZ: 'Asia/Shanghai', // 设置时区为上海时间（CST）
      },
      env_production: {
        NODE_ENV: 'production',
        APP_ENV: 'production',
        TZ: 'Asia/Shanghai', // 设置时区为上海时间（CST）
      },
    },
  ],
}
