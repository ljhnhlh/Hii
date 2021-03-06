[TOC]



# 如何调用page，app外的js函数

 调用外部对象、数组，可以输出相应的数值

如：

```js
//page 外
var temp = {
    'msg': 'adasdf',
    'tt': 'afda'
}
var xxx = ['x', 's', 'a', 'w', 'v'];
```

```js
//page 内
select_nav(e) {
        var x = [1, 2, 3, 4];
        console.log(123);
        console.log(x[3]);
        console.log(xxx[4]);
        console.log(temp.msg, " ", temp.tt)；
        this.setData({
            currentIndex: e.target.dataset.index
        })

    }
```

输出的结果是正确的

但若把select_nav 放到page外，触发事件，则会警告，且无现象

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019020322533044.png)

解决：page 内可以调用page外的函数，但wxml绑定的函数只能在page中定义，然后可以调用外部函数

```js
//page 外
function ttemp() {
    var x = [1, 2, 3, 4];
    console.log(123);
    console.log(x[3]);
    console.log(xxx[4]);

    console.log(temp.msg, " ", temp.tt);
}

//page 内
select_nav(e) {
    ttemp();
    this.setData({
    currentIndex: e.target.dataset.index
    })
    },
```

结果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190203225815237.png)



# 如何在data里面定义数组

定义后直接赋值就好：如下的jt

```
var temp = [{ 'a': 1 }, { 'a': 1 }, { 'a': 1 }, { 'a': 1 }];
var tt = 0;
Page({

    data: {
        currentIndex: 0,
        tabname: [{ 'message': '求助' }, { 'message': '快递/外卖' }, { 'message': '企业' }],
        jt: temp
    }
}）
```

不过要修改数组的值，不能使用

```
this.setDate({
    jt:temp.push({'a':22})
}
)
```

因为push函数返回的不是修改后的temp，而是修改的下标，log（jt）会报错，not defined有点玄学

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019020400411627.png)

目前的解决方案是：把修改放在setData的外面，在setData内直接赋值，不过这样相当于将另一个数组赋值给jt，效率很低，要找找新方法（即使是传引用，要全部更新wx：for的元素消耗也很大）

```
  temp.push({ 'a': tt++ });
        this.setData({
            currentIndex: e.target.dataset.index,
            jt: temp
                // [{ 'a': 'dafda' }, { 'a': 'asdfs' }, { 'a': 2 }, { 'a': 3 }]
        })
```



# wx:for 绑定的数组发生变化

wx:for 绑定的数组发生变化时，其生成的元素也会动态地变化，如：



```
//page 外
var temp = [{ 'a': 1 }, { 'a': 1 }, { 'a': 1 }, { 'a': 1 }];
var tt = 0;
```

```js
 //page 内
 data: {
        currentIndex: 0,
        tabname: [{ 'message': '求助' }, { 'message': '快递/外卖' }, { 'message': '企业' }],
        jt: temp //jt
    },
    
    
//事件函数
select_nav(e) {
    console.log(temp);
    temp.push({ 'a': tt++ });
    this.setData({
        currentIndex: e.target.dataset.index,
        jt: temp
    },
```

每次点击“求助”，jt的值发生改变，其所有发生改变的view也会改变

> 注：本例只是写了push，即只能看出添加元素，view也会相应的添加，但测试的时候，添加，删除，改变数值也会发生相应的改变，这里就不赘述了

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190204003109726.png)





# 如何在page的函数里面使用page中data对象的值

问题起源：在page的data中定义了jt后，要调用的时候总是报错



```js
    data: {
        currentIndex: 0,
        tabname: [{ 'message': '求助' }, { 'message': '快递/外卖' }, { 'message': '企业' }],
        jt: temp
    },
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/20190206111120925.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)

显示jt没有定义

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190206111343640.png)

解决：

使用`this.data.jt` 来获得jt的值

为什么data的同级函数不能获得data内的数据？

首先我们来看看page的结构: 

从下面可以看出，page是一个函数，传入的参数是一个对象：`Page({...})`

其内部的运行机制，目前理解，是wxml的bindtap的函数会查找page内的对象，然后运行内部定义的函数，所以与wxml直接相关的函数是写在page内的，而不是写在page外的，这就能解释为什么bindtap调用page外面的函数是undefined

```
Page({
    data: {
        currentIndex: 0,
        tabname: [{ 'message': '求助' }, { 'message': '快递/外卖' }, { 'message': '企业' }],
        jt: temp
    },
    onLoad: function(options) {

    },
    select_nav(e) {
    },
    onReady: function() {

    },

    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    }
});
```

接着将为什么page内的函数无法直接调用data内的数据，知道page是一个函数，其内部的函数是一个对象就很好办了，即对象内的参数不是全局变量，是局部变量，另一个对象当然不能直接调用其它对象的值！为了调用data内的变量，此处使用了`this`全局变量，this.data.xxx即可使用该数据，如果想调用其它同级函数，使用this.xxx即可

如：上面`select_nav` 想调用`onLoad`方法,使用this.onLoad()即可

```js
    
 onLoad: function(options) {
      console.log(123);
    },
    
select_nav(e) {
        console.log(temp);
        temp.push({ 'a': tt++ });
        this.setData({
            currentIndex: e.target.dataset.index,
            jt: temp
        });
        this.onLoad();
    },
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019020611333147.png)



# 如何实现下拉刷新，使收到的数据更新在原始数据的前面，而不是像wx:for一样更新在后部

微信应该会有这个功能?找找



# 小程序模板循环获取不到数据

在template上使用wx:for=“{{ite}}”,data="{{ite}}",其中ite是data中的对象数组，运行后获取不到里面的数据

解决：

方法一：使用view标签包含template，在view标签上使用wx:for，data为循环的item

```html
<import src="/template/msg.wxml" ></import>
<view wx:for="{{ite}}" wx:key="{{wxkey}}">
<template is="msg"  data="{{item}}" ></template>
</view>
```

方法二：template传入对象数组， 在template里面使用wx:for来遍历传入的数据，wx:for使用的数据要在data中，如：wx:for="{{ite.xxxx}}"，wx:for="{{ite}}"

```html
<!-- wxml -->
<import src="/template/msg.wxml" ></import>
<template is="msg"  data="{{ite}}" ></template>

<!-- template -->
<template name="msg">
    <view wx:for="{{ite}}" wx:key="i" class="msg">
        <!-- 内容 -->
    </view>
</template>
```

模板拥有自己的作用域，只能使用 data 传入的数据以及模板定义文件中定义的 `<wxs />` 模块。

# 模板只能使用模板定义文件中定义的 `<wxs />` 模块 吗？

微信教程中讲到：模板拥有自己的作用域，只能使用 data 传入的数据以及模板定义文件中定义的 `<wxs />` 模块。

意思是引用模板的页面，在其js定义一个事件处理函数，模板无法调用，但经过测试，是可以调用的

如：

在模板中bindtap=“lookForUserInfo",在引用文件的js中定义该函数也可以实现点击事件

不过比较好的方法是，在模板的<wxs />中定义，因为模板一般要重复使用该函数

# wxs 注意事项

`wxs` 模块均为单例，`wxs` 模块在第一次被引用时，会自动初始化为单例对象。**多个页面，多个地方，多次引用**，使用的都是**同一个** `wxs` 模块对象 。

也就是说，若每个页面需要一个实例，则不应该使用wxs模块，而应该独立写一个js函数，因为wxs的值会在某个地方改变，而你可能无法及时发现，若无赋值操作，可考虑使用wxs

思考：

因为是单例模式，若有回调函数，使用的时候会不会导致错乱？



# 如何使一个元素既有id，又能标识类型

问题：因为不同类型的元素，其id有可能是相同的，所以想通过一个点击事件得到其类型和id，那如何获取其类型？

将从服务端请求到的类型和id拼接成一个字符串再赋值给元素的id，作为唯一标识，请求时先将其拆分，再进行请求



# ccs 动画

[动画](http://www.w3school.com.cn/css3/css3_animation.asp)



# js 数组，对象数组的用法



js 

```js
var temp = [];
temp['ads'] = new Array();
temp['ads'].push('da');
temp['ads'].push('ddd');
temp['ads'].push([{ 'a': 'a', 'b': 'b' }, { 'c': 'c', 'd': 'd' }])
temp['ads']['ads'] = 'aaaaaaaaaa';
console.log(temp)


temp['ads'].push('as');
console.log(temp)
temp['ads']['bbs'] = 'asdfaskldjf';
console.log(temp)
temp['ads'].push('asdfjksd');
console.log(temp);


```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190209151906385.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)

补充：通过数字下标直接赋值与使用push直接赋值，其二者均为下标引用

如：temp['ads'] [5] = 'sdafsad',属于下标引用，存储于数组的第一部分



# 如何在内联样式里面写@keyframes这类的css

> 若写不了，可以限制弹幕的长度





# 使用nginx配置本地网络测试环境

测试了一下，发现，在勾选了"不校验域名合法性。。。"后，带有端口号的url也可以进行请求

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019021200382432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)

所以没必要使用nginx。。。，但还是用了，详情请看：

[手把手教你搭建Windows环境微信小程序的本地测试服务器](https://blog.csdn.net/myth13141314/article/details/81303034)





# 小程序工具内勾选了"不校验域名合法性。。。"还报错

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190211235127963.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM2MzAzODYy,size_16,color_FFFFFF,t_70)

上图中，显示invalid url

解决：

在将url填写完整

即：“http://www.test.com/login”

对比web和小程序请求：

web请求直接添加路由即可，不需要写完整的协议类型和域名，如HTTP，www.test.com等，前者是因为浏览器使用HTTP请求，如果是socket，在使用socket的时候浏览器也自动添加了协议类型，后者是也是由浏览器自动添加，而小程序请求需要手动填写完整的url



# express 的app.use()作用和用法





# 写微信小程序登陆模块时遇到invalid code问题

说明：开发使用的是测试appid，个人有申请过一个appid，所以后端使用申请的appid

问题：前端使用wx.login得到code，后端从微信服务器获取openid，但返回的结果是"invalid code"

解决：前端获取的code是微信服务器给测试的appid分配的，而后端使用的是申请的appid，后端带着appid和code去申请openid时，微信服务器会找不到对应的code，所以返回 invalid code

解决方法：使用申请到的appid创建项目即可

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190212211555113.png)

总结：以上说明，小程序分发的code是与appid绑定的，仅当前申请code的appid才可使用

代码:

```js
//前端 js

wx.login({
    success: function(res) {
        if (res.code) {
            console.log(res.code)
            wx.request({
                url: 'http://localhost:3000/login',
                data: {
                    code: res.code
                },
                success: function(res) {
                    console.log(res.data);
                },

                fail: function() {
                    console.log('login fail')
                    wx.redirectTo({
                        url: 'pages/login/login',
                    })
                }
            })
        }
    }
})
```

后端js：

```js
//后端js：
//此处使用的request 是使用了 npm 的 request packet
app.get('/login', function(req, res) {

    console.log(req.query.code);
    var code = req.query.code;
    var url = 'https://api.weixin.qq.com/sns/jscode2session?' +
        'appid=' + 'wx08dea5e778f278de&' +
        'secret=' + '77fc034ff68fe7799e4e8723466a50d7&' +
        'js_code=' + code +
        '&grant_type=' + 'authorization_code';
    console.log(url);

    request({
            url: url
        },
        function(err, response, body) {
            if (!err) {
                // console.log(body);
                console.log(body);
                res.end(body)
            } else {
                console.log(err);

            }
        })


})
```



# 数据库 表的大小与查询时间的关系



# 使用redis作为内存的缓存

http://www.runoob.com/redis/redis-install.html



# wx.request设置header，使用node 获取header：

wx.request直接添加header：{‘xxx’:'xxx'}即可设置header的值

```
wx.request({
              url: 'https://URL',
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
               header: {'sessionId':'sessionId'}, // 设置请求的 header
              success: function(res){
                // success
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            })
```

node 后台使用`req.header('键值')`获取header内的某个值



# 弹出式选择，写申请时选择个人能力标签

https://blog.csdn.net/yingtian648/article/details/80004334





# 连接池

暂时理解：有一个线程池，每次要进行数据库操作时，都向这个线程池要一个线程进行查询，查询完毕后就把这个线程还回去

用法：





# redis 的学习

基本用法：

```js
var redis = require('redis')
client = redis.createClient();

client.on('error', function(err) {
    console.log('error ' + err);

});
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], function(err) {
    client.end(true)
});
```

在开始需要使用 `client.on('error',fun...)` 来处理连接的错误，

`client.end(true)` 用于关闭连接，若不关闭，则服务器会一直运行，不过end需要放在回调函数中，否则会出现如下情况：因为有些语句没执行完成就关闭了连接

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190215215255554.png)



[redis，包含了expire，数组，要看](https://github.com/NodeRedis/node_redis )

[同上](https://www.cnblogs.com/little-ab/articles/6914339.html)

# 小程序页面跳转

小程序，非tabar页面不能使用`wx.redirectTo` 跳转到tabar页面，而应该使用`wx.switchTab`

# 模块的使用

```js
//测试modual是跟其它代码一样顺序执行还是函数调用一样异步执行
function log1() {
    var i = 0;
    while (i < 100000) {
        i++
    }
    console.log(1);
}
function log3() {
    var i = 0;
    while (i < 100000) {
        i++
    }
    console.log(3);
}
module.exports = {
    log1: log1,
    log3: log3
}
```

引用：require要写成路径的形式，不能只写成文件名，因为若无文件名，运行时，程序会查找全局模块和基本模块而不会查找自定义模块，因此会报错

```js
var modu = require('./modualTest.js')

modu.log1();
modu.log3()
console.log(2);
```

运行结果如下: 可知自定义模块在代码中是顺序执行的，而不是异步调用(根据平时使用的mysql等模块也可知，若非使用回调函数，都是顺序执行的)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190219180523964.png)



# node.js 文档

http://nodejs.cn/api/

# 获取post 请求上传的图片

post 请求的图片服务端接收后存在内存中，使用formidable.pares可以达到其暂存路径：path，不过通过对file的属性设置也可以将数据写入特定位置，明天试试

https://segmentfault.com/a/1190000005706031



# node - github - 腾讯工程师

https://github.com/chyingp



# 不同page之间传递值

使用url来传值：

```js
wx.navigateTo({
  url: 'test?id=1'
})
```

在另一个页面的onload函数中获取值：

```js
onLoad:function(options){
//  var that=this
  id = options.id
//  that.setData({
//  imgUrl:options.imgUrl,
//  title:options.title,
//  videoSrc:options.videoSrc,
//  group_id:options["group_id"]
// })
}
```





# end



[TOC]

