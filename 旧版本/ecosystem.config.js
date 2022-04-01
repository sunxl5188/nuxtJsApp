module.exports = {
  apps: [{
    name: 'NuxtApp',
    exec_mode: 'cluster',
    instances: 'max', // Or a number of instances
    watch: true,
    script: './node_modules/nuxt/bin/nuxt.js',
    args: 'start'
  }],
  deploy: {
    production: {
      user: 'root', // 用于身份验证的用户
      host: 'gitee.com', // 服务器地址
      key: 'C:/Users/sunxi/.ssh/id_rsa_nuxt_home', // 要验证的公钥的路径
      ref: 'origin',
      repo: 'git@gitee.com:sxl5188/nuxt-home-applyera.git',
      path: 'D:/www/nuxt-service/',
      // 复制repo后在服务器上执行的命令
      'post-deploy': 'npm install && npm run build && npm run start && pm2 reload ecosystem.config.js --env production',
      ssh_options: 'StrictHostKeyChecking=no'
    }
  }
}
