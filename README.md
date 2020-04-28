## 汇集测试模块使用

为了测试如何使用某个模块，故开了个项目，专门做测试，采用 TS+ ts-node的运行方式

### 配置

```bash
# Locally in your project.
npm install -D typescript
npm install -D ts-node

# Or globally with TypeScript.
npm install -g typescript
npm install -g ts-node
```

### 测试

如测试normalizr;

```bash
$ npm i
$ cd normalizr/
$ ts-node index.ts
```