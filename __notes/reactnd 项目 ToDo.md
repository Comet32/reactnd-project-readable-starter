[TOC]

## 新建帖子的 UI 组件 ✅

需要创建的组件，整体上是一个表单，因此根据需要提交的信息根据其 api 而定，如下：

- id - 是一个 UUID，使用随机数可以生成一个 24 位 16 进制数
- timestamp - 直接使用 Data.now() 生成
- title - 这是由用户输入的**表单输入框**
- body - 这是由用户输入的**表单输入框**
- author - 也就是作者，依然是**表单输入框**
- catagory - 所属的类别，是一个选择框，当然选择的方式可以是下拉或者其他。



## 删除帖子 ✅

## 更改得分 ✅





## 等项目基本实现后可以扩展的功能

- 限制输入框的输入字数并提醒还能输入多少字符。
- 点击删除提交等可以有一个提示是否确定，当提交成功时出现提交成功的提示，当提交失败时显示提交失败的提示。✅

- 评论的排序功能。✅
  - 先将排序功能抽象为单独的组件。✅



