## 版本问题
当前项目包含1.0文件（我刚开始学习 nestjs 时无聊写的项目），后端使用的是TypeOrm，前端用的的vue2.0，同时也使用了swagger，功能和这个基本一样 (都具备数据权限，但是因为数据库工具的不同，实现方式不同) 。 本文介绍的内容都是针这两天刚写的版本（后端使用 Prisma,前端使用 vue3+vite ）。如果有需要查看和学习TypeOrm版本的，可以直接切换Tags到1.0。 后续如果我有时间，我也只会维护 Prisma + vue3 的这个版本。因为这个写起来更简单湿滑，一看就懂。同时在这个版本中，我去掉了swagger的支持， 我觉得用它太麻烦了，丢失了js的灵活性。我习惯的开发流程是:   apiFox定义字段和接口 ----> prisma定义模型 ----> 推送数据库  ----> 业务程序实现。   apiFox真是一个特别好用的东西，当然 nestjs 也给了我们前端无限可能，prisma 更是把数据库交互变成了一看就会的东西。希望这两个简单的后台系统项目可以给你们在学习nestjs以及后端思维上有点帮助。。。。   最后：如果觉得还可以，麻烦点个star。你的鼓励是我能抽出时间维护它最后的动力了。



## 项目简介
槑槑是一款后台管理系统，它前端基于 [vue3](https://v3.cn.vuejs.org/) 和 [element-ui](https://element-plus.org/zh-CN/) ，后端基于 node 的后端框架 [nestjs](https://docs.nestjs.com/) ，数据库采用 mysql ，缓存采用 redis。


## 在线体验
  - [演示地址](http://203.25.211.232:888/meimei/#/login)
  - [文档地址](https://87789771.github.io/#/)
  - [码源地址](https://github.com/87789771/meimei-nestjs-admin)


## 技术要求
  - [Vue3](https://v3.cn.vuejs.org/)
  - [Element-ui](https://element-plus.org/zh-CN/)
  - [TypeScript](https://www.tslang.cn/index.html)
  - [Nestjs](https://docs.nestjs.com/)
  - [Prisma](https://www.prisma.io/)
  - Mysql
  - Redis
  
## 技术选型
  1. **前端技术**
   - vue @3.4.21
   - element-plus @2.6.1
   - axios @0.27.2
   - pinia @2.0.22
   - vue-router @4.2.5
   - sass @1.56.1
  
  2. **后端技术**
   - nest @10.3.2
   - prisma @5.12.1
   - ioredis @5.4.1
    
## 内置功能
- 用户管理：用户是系统操作者，该功能主要完成系统用户配置。
- 部门管理：配置系统组织机构（公司、部门、小组），树结构展现支持数据权限。
- 岗位管理：配置系统用户所属担任职务。
- 菜单管理：配置系统菜单，操作权限，按钮权限标识等。
- 角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。
- 字典管理：对系统中经常使用的一些较为固定的数据进行维护。
- 参数管理：对系统动态配置常用参数。
- 通知公告：系统通知公告信息发布维护。
- 操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。
- 登录日志：系统登录日志记录查询包含登录异常。
- 在线用户：当前系统中活跃用户状态监控。
- 定时任务：在线（添加、修改、删除)任务调度包含执行结果日志。
- 系统接口：根据业务代码自动生成相关的api接口文档。
- 服务监控：监视当前系统CPU、内存、磁盘、堆栈等相关信息。
- 缓存监控：对系统的缓存信息查询，命令统计等。
- 缓存列表：查看redis的缓存情况
- 在线构建器：拖动表单元素生成相应的Vue代码。


## 目录结构

```
    meimei
    ├── prisma                          #数据库模型和迁移模块
    ├── static                          #静态文件
    │   └── upload                      #上传文件夹
    ├── src
    │   ├── common                      
    │   │   ├── class                   #公共返回值包装类
    │   │   ├── contants                #系统常量
    │   │   ├── decorators              #装饰器
    │   │   ├── dto                     #数据模型
    │   │   ├── entities                #公共实体模型
    │   │   ├── enums                   #枚举
    │   │   ├── exceptions              #全局错误拦截器
    │   │   ├── filters                 #全局错误过滤器
    │   │   ├── guards                  #全局守卫
    │   │   ├── interceptors            #装饰器
    │   │   ├── interface               #公共接口
    │   │   └── pipes                   #公共管道
    │   │   └── type                    #公共类型
    │   ├── config
    │   │   ├── config.dev              #开发环境配置文件
    │   │   ├── config.pro              #正式环境配置文件
    │   │   ├── index      
    │   ├── modules                     #业务模块文件夹
    │   │   ├── common                  #导入导出和上传模块
    │   │   ├── login                   #登录模块
    │   │   ├── monitor                 #系统监控
    │   │   └── system                  #系统管理
    │   ├── shared                      
    │   │   ├── prisma                  #数据库连接定义
    │   │   ├── shared.module.ts        #公共模块
    │   │   └── shared.service.ts       #公共方法
    │   ├── app.module.ts
    │   ├── main.ts
    ├── test
    │   ├── app.e2e-spec.ts
    │   └── jest-e2e.json
    ├── .eslintrc.js
    ├── .prettierrc
    ├── meimei-prisma.sql                     #初始化sql语句
    ├── nest-cli.json
    ├── package.json
    ├── tsconfig.build.json
    ├── tsconfig.json
    └── yarn.lock
```

## 系统截图
 ![](http://203.25.211.232:888/meimei-prod/github/1.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/2.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/3.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/4.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/5.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/6.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/7.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/8.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/9.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/10.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/11.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/12.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/13.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/14.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/15.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/16.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/17.jpg)
 ![](http://203.25.211.232:888/meimei-prod/github/18.jpg)