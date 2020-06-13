<template>
    <div class="lp_sliding_container">

        <div class="lp_sliding_bg"></div>

        <div class="lp_sliding_front" :style="front_width"></div>

        <div class="lp_sliding_block"
             @mousedown="dragStart"
             :style="move_left">
        </div>

    </div>
</template>

<script>
    export default {
        name: "lp_sliding",
        data() {
            return {
                move_left: {left: 0},       //滑块的位置
                box_width: null,            //滑动条的宽度（不包括border）
                sliding_width: null,        //滑块儿的宽度（包括border）
                startX: null,               //滑动时，鼠标所在的位置
                slidingX: 0,                //当前滑块左边相对滑动条的左边的距离
                isSliding: false,           //当前是否在滑动
                front_width: {width: 0}     //提示框的长度
            }
        },
        methods: {
            dragStart(e) {
                this.startX = e.screenX
                this.isSliding = true
            }
        },
        mounted() {
            let container = document.getElementsByClassName('lp_sliding_container')[0]
            let sliding = document.getElementsByClassName('lp_sliding_block')[0]
            let front = document.getElementsByClassName('lp_sliding_front')[0]
            //获取元素尺寸
            this.box_width = container.clientWidth
            this.sliding_width = sliding.offsetWidth
            //front提示框的长度
            let front_init_width = this.box_width - this.sliding_width +'px'
            this.front_width.width = front_init_width
            //处理滑块的滑动事件
            window.onmousemove =  (e) => {
                if(this.isSliding === true) {
                    let moveX = e.screenX
                    let now_left = this.slidingX + moveX - this.startX
                    if(now_left <= 0) {
                        this.move_left.left = 0
                        this.slidingX = 0
                        this.startX = 0.5 * this.sliding_width
                        this.front_width.width = front_init_width
                    }
                    else if(now_left <= this.box_width - this.sliding_width) {
                        this.move_left.left = now_left + 'px'
                        this.slidingX = now_left
                        this.startX = moveX
                        this.front_width.width = this.box_width - this.slidingX + 'px'
                    }
                    else {
                        let differ = this.box_width - this.sliding_width
                        this.move_left.left = differ + 'px'
                        this.slidingX = differ
                        this.startX = differ + 0.5 * this.sliding_width
                        this.front_width.width = this.sliding_width
                    }
                }
            }
            //松开滑块儿处理事件
            window.onmouseup = () => {
                if(this.isSliding === true) {
                    this.isSliding = false
                    sliding.style.transition = 'all 500ms ease'
                    front.style.transition = 'all 500ms ease'
                    this.front_width = front_init_width
                    this.move_left.left = 0
                    this.slidingX = 0
                    setTimeout(function () {
                        sliding.style.transition = ''
                        front.style.transition = ''
                    }, 500)

                }
            }
        }
    }
</script>

<style scoped>
    .lp_sliding_container{
        height: 50px;
        position: relative;
        width: 600px;
    }
    .lp_sliding_block{
        position: absolute;
        background: blue;
        height: 100%;
        width: 50px;
        z-index: 10;
    }
    .lp_sliding_bg, .lp_sliding_front{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .lp_sliding_bg{
        z-index: 8;
        background: green;
    }
    .lp_sliding_front{
        z-index: 9;
        background: #e1e1e1;
        right: 0;
    }
</style>