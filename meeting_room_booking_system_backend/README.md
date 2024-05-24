不生成测试代码

```
 "generateOptions": {
    "spec": false
  },
```

asssets 是指定 build 时复制的文件，watchAssets 是在 assets 变动之后自动重新复制。

```
  "watchAssets": true,
  "assets": ["**/*.env"]
```

分用户管理模块、会议室管理模块、预订管理模块、统计管理模块

角色有两个：普通用户、管理员，各自拥有的权限按照用例图来。使用 RBAC 来控制接口访问权限。

- 功能罗列
  - 注册功能，邮箱注册
  - 登录和权限，自定义装饰器
  - 拦截器
