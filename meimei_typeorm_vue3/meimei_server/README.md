



## 启动开发环境

依赖 docker 开发环境，使用 docker 启动 mysql 和 redis

```shell
# 停止开发环境
docker-compose down
# 启动开发环境
docker-compose up -d
# 访问 http://localhost:8080/ 找到 meimei 数据库导入 meimei_server 下面的 mei-mei.sql 文件
```

进入 meimei_server

```shell
# 安装依赖
yarn
# 启动 
yarn dev
```

进入 meimei_ui_vue3

```shell
# 安装依赖
yarn
# 启动 
yarn dev
```

访问 
