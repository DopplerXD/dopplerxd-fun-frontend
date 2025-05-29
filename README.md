# dopplerxd-fun-front

本仓库为 dopplerxd.fun 的前端仓库，基于 Vue3 + ElementPlus。

现有以下项目：
- guess-and-guess: 猜 CS 选手小游戏
- fuck-ziben: 做局模拟器

## guess-frontend

### 项目介绍

猜 CS 选手小游戏，灵感来自 [blast.tv](https://blast.tv/counter-strikle)。

技术栈：Vue3、Element-Plus

游戏流程：

1. 玩家选择开始对局
2. 系统随机生成本局答案
3. 玩家输入一个选手 id 进行猜测
4. 判断是否命中答案，如果是则游戏结束
5. 未命中答案，判断猜测次数是否达到上限，如果是则游戏结束
6. 未达到上限，返回该选手与答案对应的提示，如年龄接近、在同一国家等
7. 回到第 3 步继续猜测，知道猜对或达到猜测上限

![img](assets\guess-流程图.jpeg)