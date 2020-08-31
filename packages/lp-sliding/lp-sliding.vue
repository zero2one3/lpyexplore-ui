<template>
    <div class="lp_sliding_container">

        <div class="lp_sliding_bg" :style="bg_width">
            <span v-show="value && iconChange">
                <slot name="bg_content">
                    验证成功
                </slot>
            </span>
        </div>

        <div class="lp_sliding_front">
            <span>
                <slot name="front_content">
                     向右滑动滑块完成验证
                </slot>
            </span>
        </div>

        <div class="lp_sliding_block"
             @mousedown="dragStart"
             :style="[move_left, (isSliding || value || isFull)? block_bg_style: '']">
            <span v-show="!value && !isFull">
                <i class="fa fa-long-arrow-right"/>
            </span>
            <i v-show="animation && isFull && !iconChange" class="fa fa-circle-o-notch fa-spin fullIcon"/>
            <i v-show="value && iconChange" class="fa fa-check"/>
        </div>

    </div>
</template>

<script>
    export default {
        name: "lp-sliding",
        props: {
            animation: {
                type: Boolean,
                default: false
            },
            value: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                move_left: {left: 0},       //滑块的位置
                bg_width: {width: 0},       //提示框的长度
                box_width: null,            //滑动条的宽度（不包括border）
                sliding_width: null,        //滑块儿的宽度（包括border）
                startX: null,               //滑动时，鼠标所在的位置
                slidingX: 0,                //当前滑块左边相对滑动条的左边的距离
                isSliding: false,           //判断当前是否在滑动
                isFull: false,              //判断进度条是否为100%
                block_bg_style: {           //点击时滑块的样式
                    background: 'rgb(25,145,250)',
                    color: 'white',
                    border: '1px solid rgb(25,145,250)'
                },
                iconChange: !this.animation
            }
        },
        methods: {
            // 拖拽开始
            dragStart(e) {
                if(!this.value && !this.isFull) {
                    this.startX = e.screenX
                    this.isSliding = true
                }
            },
            // 验证成功
            LoadingSuccess() {
                this.iconChange = true
                this.$emit('input', true)
            },
            // 验证失败
            LoadingErr() {
                let sliding = this.$el.getElementsByClassName('lp_sliding_block')[0]
                let bg = this.$el.getElementsByClassName('lp_sliding_bg')[0]
                this.isFull = false
                this.iconChange = false
                this.$emit('input', false)
                sliding.style.transition = 'all 500ms ease'
                bg.style.transition = 'all 500ms ease'
                this.bg_width.width = 0
                this.move_left.left = 0
                this.slidingX = 0
                setTimeout(function () {
                    sliding.style.transition = ''
                    bg.style.transition = ''
                }, 500)
            }
        },
        mounted() {
            let container = this.$el
            let sliding = this.$el.getElementsByClassName('lp_sliding_block')[0]
            let bg = this.$el.getElementsByClassName('lp_sliding_bg')[0]
            //获取元素尺寸
            this.box_width = container.clientWidth
            this.sliding_width = sliding.offsetWidth
            //设置元素初始尺寸
            let bg_width_init = this.sliding_width + 'px'
            this.bg_width.width = bg_width_init

            //处理鼠标移入滑块的事件
            sliding.onmouseenter = function() {
                if(!this.style.transition){
                    this.style.transition = 'background 200ms ease, color 200ms ease'
                }
            }

            //处理滑块的滑动事件
            window.onmousemove =  (e) => {
                if(this.isSliding === true) {
                    let moveX = e.screenX
                    let now_left = this.slidingX + moveX - this.startX
                    if(now_left <= 0) {
                        this.move_left.left = 0
                        this.slidingX = 0
                        this.startX = 0.5 * this.sliding_width
                        this.bg_width.width = bg_width_init
                    }
                    else if(now_left <= this.box_width - this.sliding_width) {
                        this.move_left.left = now_left + 'px'
                        this.slidingX = now_left
                        this.startX = moveX
                        this.bg_width.width = now_left + this.sliding_width + 'px'
                    }
                    else {
                        let differ = this.box_width - this.sliding_width
                        this.move_left.left = differ + 'px'
                        this.slidingX = differ
                        this.startX = differ + 0.5 * this.sliding_width
                        this.bg_width.width = this.box_width + 'px'
                        this.isSliding = false
                        this.isFull = true
                                            
                        if(this.animation) { 
                            this.$emit('loading', {
                                success: this.LoadingSuccess,
                                err: this.LoadingErr
                            })
                        } else {
                            this.$emit('input', true)
                        }
                        
                    }
                }
            }
            //松开滑块儿处理事件
            window.onmouseup = () => {
                if(this.isSliding === true) {
                    if(this.value === false) {
                        sliding.style.transition = 'all 500ms ease'
                        bg.style.transition = 'all 500ms ease'
                        this.bg_width.width = 0
                        this.move_left.left = 0
                        this.slidingX = 0
                        setTimeout(function () {
                            sliding.style.transition = ''
                            bg.style.transition = ''
                        }, 500)
                    }
                }
                this.isSliding = false
            }
        }
    }
</script>

<style scoped>
    .lp_sliding_container{
        height: 40px;
        position: relative;
        width: 400px;
        color: #606266;
    }
    .lp_sliding_block{
        position: absolute;
        height: 100%;
        width: 11%;
        z-index: 10;
        cursor: pointer;
        background: white;
        color: #45494c;
        border: 1px solid #e4e7eb;
        box-shadow: 1px 1px 3px rgba(177, 169, 169, 0.3), -1px -1px 3px rgba(177, 169, 169, 0.3);
    }
    .lp_sliding_block:hover{
        background: rgb(25,145,250);
        color: white;
        border: 1px solid rgb(25,145,250);
        box-shadow: 1px 1px 1px rgba(25,145,250,.3), -1px -1px 1px rgba(25,145,250,.3);
    }
    .lp_sliding_bg, .lp_sliding_front{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .lp_sliding_bg{
        z-index: 9;
        background: rgb(209, 233, 254);
        left: 0;
        border: 1px solid rgb(25,145,250);
    }
    .lp_sliding_front{
        z-index: 8;
        background: #ebebeb;
        right: 0;
        left: 0;
        border: 1px solid #e4e7eb;
    }
    .lp_sliding_front, .lp_sliding_bg, .lp_sliding_block{
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: 2px;
        box-sizing: border-box;
    }
</style>