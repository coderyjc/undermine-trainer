# undermine-trainer

CORS 请求不是 HTTP => 换用火狐浏览器，Chrome不支持



## 简介

a process to gengerte save and edit save and trainer

最近挺喜欢这个游戏的，于是打算利用自己的专业知识做一个这个游戏的存档修改程序 + 辅助。

整个项目分为两部分：

- 存档生成器 - Web本地端，纯前端
- 游戏修改器 - 图形界面（Cheat-Engine自动生成）

## 相关配置

| 类型                      | 配置      |
| ------------------------- | --------- |
| 《UnderMine》游戏主体     | v1.1.1.21 |
| Windows 10                | 19042     |
| Annaconda环境             | Python3.8 |
| 前端框架 LayUI            | v2.6.8    |
| jQuery                    | v3.6.0    |
| Cheat-Engine              | v7.2      |
| 开发工具 HBuilder X       | v3.1.22   |
| 开发工具 Pycharm Ultimate | 2021.1    |

## 存档生成器-Web

### 数据准备 - Python爬虫

数据网站 https://undermine.fandom.com/wiki/

翻译接口 https://api.fanyi.baidu.com/api/trans/vip/translate

1. 爬取内容：图片、名称、Id、作用信息
   1. 名称和作用信息都是英文，为了便于浏览，将作用信息翻译后写入文件。
2. 将索引转化为 json 文件，和图片一并保存

图片使用Chrome 插件进行爬取

索引使用python 爬虫爬取

### 存档类的配置

#### 固定信息

- 金币
- 紫晶



#### 副本信息配置（也是web页面的模块）

- 圣物 + 祝福



- 药水



- 伙伴



- 诅咒+巫术配置



## 游戏修改器









