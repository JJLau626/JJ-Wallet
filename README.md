# JJ-Wallet

这是一个 web3 钱包

> 该项目仅作为练习 web3 相关知识的项目。

# 关于规范

1. CSS 类名采用 BEM 的方式


# 遇到过的问题

1. unplugin-vue-components 引入 vant 组件没有类型提示的原因
https://github.com/antfu/unplugin-vue-components#typescript

2. Bcryptjs 在 vite 开发环境下会报警告，因为 genSalt 方法需要用到 crypto 对象（该对象虽然已经被适配，但是 vite 会报出相关警告），caniuse 上相关 API 的适配情况良好，没有问题。如果还是不放心可以尝试用 NanoID 去取代 salt 。

相关引用：
> https://security.stackexchange.com/questions/93395/how-to-do-client-side-hashing-of-password-using-bcrypt

3. 前端项目如何引入合约项目的 ABI ？
将合约项目的仓库安装在本地
通过 npm link 引入软链接（pnpm 的引入方式略有不同）
然后就可以把合约库当成 node_modules 在本地引用了。

> 参考自：https://pnpm.io/zh/cli/link

4. 是否都将 vant 组件的样式都转成 rem ？

5. 关于 PullRefresh 组件与滚动内容冲突的问题。

先了解 PullRefresh 的触发条件

> https://vant-ui.github.io/vant/#/zh-CN/pull-refresh#pullrefresh-de-chu-fa-tiao-jian-shi

建议内容高度的样式赋值到 PullRefresh 组件上即可。