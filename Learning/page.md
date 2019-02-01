## 创建页面

在app.json的“pages”中添加路径，

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190201161452917.png)

按`ctrl s`保存后开发者工具会自动添加相应的文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019020116165094.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)

生成的文件内有一些初始代码

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190201161726964.png)



页面跳转：

使用`wx.navigateTo` ，填入url即可实现跳转：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190201162415567.png)

## 模板

只能使用 data 传入的数据以及模板定义文件中定义的 `<wxs />` 模块，即无法使用js