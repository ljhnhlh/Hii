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



# end

[TOC]

