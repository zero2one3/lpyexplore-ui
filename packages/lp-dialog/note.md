# lp-dialog 组件  √


属性参数     | 可选值
-------- | ----- 
title | 标题信息
content  | 内容信息
center | 文字是否居中，true(默认)/false

this.$confirm({
    title: '提示',
    content: '确定关闭吗',
    center: false
})
.then(() => {
    //点确定后的处理函数
})
.catch(() => {
    //点关闭后的处理函数
})
.finally(() => {
    //点确定或者关闭都会触发的处理函数
})