# lp-loading组件  √

属性参数     | 可选值
-------- | ----- 
content | ''(默认)
type | bubble(默认)/line
location / 全屏(默认)

let ret = this.$loading({
    content: '正在努力加载'
})

ret.close()

非全屏加载时，location对应的元素需要设置position: relative
this.$loading返回一个对象，对象里有一个close方法，可关闭加载动画