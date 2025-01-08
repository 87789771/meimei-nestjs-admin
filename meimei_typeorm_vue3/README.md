# 槑槑后台管理系统

槑槑是一款后台管理系统，前端基于 [Vue](https://cn.vuejs.org/) 和 [Element-UI](https://element.eleme.cn/#/zh-CN)，后端基于 Node 的后端框架 [NestJS](https://docs.nestjs.cn/8/)，数据库采用 MySQL，缓存采用 Redis。

该版本从 [4e71788999965e325ba1f5545a663869be222664](https://github.com/87789771/meimei-nestjs-admin/commit/4e71788999965e325ba1f5545a663869be222664) 抽取出来，后续由 [SunSeekerX](https://github.com/SunSeekerX) 维护，随缘修改，不建议用在生产环境。

---

## 相对于 meimei-prisma-vue3 的区别

- 更加激进的版本更新策略，依赖最新版本。
- 使用 `dotenv` 进行环境变量配置。

---

## 在线演示

- **演示地址**: [https://meimei.yoouu.cn/](https://meimei.yoouu.cn/)  
  **账号**: `admin`  
  **密码**: `admin123`

- **Swagger 文档**: [https://meimei-doc.yoouu.cn/swagger-ui](https://meimei-doc.yoouu.cn/swagger-ui)

- **内置导航项目效果**: [https://demo-navify.yoouu.cn/](https://demo-navify.yoouu.cn/)  
  **项目地址**: [https://github.com/SunSeekerX/navify_nuxtjs](https://github.com/SunSeekerX/navify_nuxtjs)

---

## 交流群

| **交流群类型** | **群号/账号**     | **加入方式**                                                 | **二维码**                                                   |
| -------------- | ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| QQ 交流群      | 807126708         | [点击链接加入群聊【槑槑后台管理系统交流群】](https://qm.qq.com/q/mAVhtnp4Oe) | <img src="./qrcode_1731082953335.jpg" alt="QQ群二维码" style="zoom:25%;" /> |
| 微信交流群     | 微信账号 `finwiz` | 添加微信账号 `finwiz`，由管理员邀请进群                      | <img src="./finwiz.jpg" alt="finwiz" style="zoom:25%;" />    |

---

## 开发部署

### 开发

依赖 Docker 开发环境，使用 Docker 启动 MySQL 和 Redis（也可使用已有的数据库和 Redis）。

```bash
# 停止开发环境
docker-compose down
# -v 参数会同时删除 volumes，这样就会删除数据库中的所有数据。
docker-compose down -v
# 启动开发环境
docker-compose up -d
# 访问 http://localhost:8080/，找到 meimei 数据库导入 meimei_server 里的 init.sql 文件
```

#### 进入 `meimei_server`

```bash
# 安装依赖
yarn
# 启动
yarn dev
```

#### 进入 `meimei_ui_vue3`

```bash
# 安装依赖
yarn
# 启动
yarn dev
```

访问 `localhost` 查看效果。

------

### 部署

确保 `.env.production` 存在并且配置正确，启动方式与开发环境类似。

#### Nginx 配置

**后台管理面板 API 反向代理**（假设 server 端口为 `13000`）：

```nginx
location /prod-api/ {
    proxy_pass http://localhost:13000/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

**后台管理面板伪静态规则**：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

------

## 技术要求

- [Vue](https://cn.vuejs.org/)
- [Element-UI](https://element.eleme.cn/#/zh-CN)
- [TypeScript](https://www.tslang.cn/index.html)
- [NestJS](https://docs.nestjs.cn/8/)
- [TypeORM](https://typeorm.biunav.com/)
- MySQL
- Redis

------

## 技术选型

### 前端技术

- **Vue**: `@2.6.12`
- **Element-UI**: `@2.15.6`
- **Axios**: `@0.24.0`
- **Vuex**: `@3.6.0`
- **Vue Router**: `@3.4.9`
- **Sass Loader**: `@10.1.1`

### 后端技术

- **NestJS**: `@8.0`
- **MySQL2**: `@2.3.3`
- **Swagger-UI-Express**: `@4.2.0`
- **TypeORM**: `@0.2.41`
- **ioredis**: `@4.28.2`

------

## 内置功能

- **用户管理**：用户是系统操作者，主要完成系统用户配置。
- **部门管理**：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。
- **岗位管理**：配置用户所属职务。
- **菜单管理**：配置系统菜单、操作权限、按钮权限标识。
- **角色管理**：角色菜单权限分配，按机构划分数据范围权限。
- **字典管理**：维护系统中常用的固定数据。
- **参数管理**：动态配置常用参数。
- **通知公告**：系统通知公告信息发布维护。
- **操作日志**：记录系统正常操作日志和异常日志。
- **登录日志**：记录系统登录日志，包括登录异常。
- **在线用户**：监控系统中活跃用户状态。
- **定时任务**：支持在线任务调度，包含执行结果日志。
- **系统接口**：根据业务代码自动生成 API 文档。
- **服务监控**：监控系统 CPU、内存、磁盘、堆栈等信息。
- **在线构建器**：拖动表单元素生成 Vue 代码。

------

## 目录结构

```
meimei
├── public                        # 静态文件
│   └── upload                    # 上传文件夹
├── src
│   ├── common
│   │   ├── class                 # 公共返回值包装类
│   │   ├── constants             # 系统常量
│   │   ├── decorators            # 装饰器
│   │   ├── dto                   # 数据模型
│   │   ├── entities              # 公共实体模型
│   │   ├── enums                 # 枚举
│   │   ├── exceptions            # 全局错误拦截器
│   │   ├── filters               # 全局错误过滤器
│   │   ├── guards                # 全局守卫
│   │   ├── interceptors          # 拦截器
│   │   ├── interface             # 公共接口
│   │   └── pipes                 # 公共管道
│   ├── config
│   │   ├── config.development.ts # 开发环境配置文件
│   │   ├── config.production.ts  # 正式环境配置文件
│   │   ├── configuration.ts
│   │   └── defineConfig.ts
│   ├── modules                   # 业务模块
│   │   ├── common                # 导入导出和上传模块
│   │   ├── login                 # 登录模块
│   │   ├── monitor               # 系统监控
│   │   └── system                # 系统管理
│   ├── shared                    # 公共模块
│   │   ├── shared.module.ts
│   │   └── shared.service.ts     # 公共方法
│   ├── app.module.ts
│   ├── main.ts
│   └── setup-swagger.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .eslintrc.js
├── .prettierrc
├── mei-mei.sql                   # 初始化 SQL 文件
├── nest-cli.json
├── package.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

**版权声明**: 本项目遵循开源协议，使用请注明来源。