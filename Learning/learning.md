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





# end

