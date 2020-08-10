# lp-loading组件  √

属性参数     | 可选值
-------- | ----- 
fullScreen | true(默认)/false
content | ''(默认)
location | null

let ret = this.$loading({
    fullScreen: 'false',
    content: '正在努力加载',
    location: this.$el.querySelector('.loading')
})

ret.close()

非全屏加载时，location对应的元素需要设置position: relative
this.$loading返回一个对象，对象里有一个close方法，可关闭加载动画