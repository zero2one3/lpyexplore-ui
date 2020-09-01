<template>
    <div class="lp_sliding_container">

        <div class="lp_sliding_bg" 
             :class="[{'type-click-bg': type === 'click'}]"
             :style="{'width': type === 'sliding'? `${offsetLeft + 1}px`: '100%'}">
            <span v-show="value" class="lp_sliding_front_txt">
                <i class="icon fa fa-check" v-if="type === 'click'"/>
                验证成功
            </span>
        </div>

        <div class="lp_sliding_front" 
             :class="[{'type-click-front': type === 'click'}]"
             @click="cClick"
             v-show="(type === 'click' && !value) || type === 'sliding'">
            <span>
                <span v-if="type === 'sliding'">向右滑动滑块完成验证</span>
                <span v-else-if="type === 'click'">
                    <i class="fa fa-dot-circle-o icon"/>点击完成验证
                </span>
            </span>
        </div>

        <div class="lp_sliding_block"
             :class="[{'is-sliding': isSliding || isFull}]"
             :style="{'left': `${offsetLeft}px`}"
             @mousedown="blockClick" 
             v-if="type == 'sliding'">

            <i class="fa fa-long-arrow-right" v-show="(!animation && !value) || (animation && !isFull) || (animation && isFull && isSliding)"/>
            <i v-show="animation && isFull && !value && !isSliding" class="fa fa-circle-o-notch fa-spin"/>
            <i v-show="value" class="fa fa-check"/>
        </div>

    </div>
</template>

<script>
    export default {
        name: "lp-verification",
        props: {
            animation: {
                type: Boolean,
                default: false
            },
            value: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'sliding'
            }
        },
        data() {
            return {
                offsetLeft: 0,              // 滑块离左侧距离
                isSliding: false,           // 是否正在滑动
                startX: 0,                  // 鼠标移动的起始点
                isFull: false,              // 是否已滑动到最右侧
            }
        },
        methods: {
            init() {
                let block = this.$el.querySelector('.lp_sliding_block')
                let container = this.$el
                let bg = this.$el.querySelector('.lp_sliding_bg')
                let widthAble = container.clientWidth - block.clientWidth

                // 鼠标移动事件
                window.onmousemove = (e) => {
                    if(!this.isSliding) return;           
                    let moveX = e.screenX - this.startX  

                    if(moveX <= 0) {
                        this.offsetLeft = 0
                        this.isFull = false
                    } else if(moveX >= widthAble) {
                        this.offsetLeft = widthAble
                        this.isFull = true  
                    } else {
                        this.offsetLeft = moveX
                        this.isFull = false
                    }                                
                }

                // 鼠标松开事件
                window.onmouseup = () => {
                    this.isClick = false
                    this.isSliding = false
                    if(this.isFull && this.animation) {
                        this.$emit('loading', {
                            success: this.loadingSuccess,
                            err: this.loadingErr
                        })
                    } else if(this.isFull && !this.animation) {
                        this.$emit('input', true)
                    } else {
                        block.style.transition = 'all 500ms ease'
                        bg.style.transition = 'all 500ms ease'
                        this.offsetLeft = 0
                        let timer = setTimeout(() => {
                            block.style.transition = ''
                            bg.style.transition = ''
                            clearTimeout(timer)
                        }, 500)
                    }
                }
            },
            blockClick(e) {
                if(!this.isFull) {
                    this.startX = e.screenX
                    this.isSliding = true
                }
            },
            loadingSuccess() {
                this.$emit('input', true)
            },
            loadingErr() {
                this.isFull = false
                let block = this.$el.querySelector('.lp_sliding_block')
                let bg = this.$el.querySelector('.lp_sliding_bg')
                block.style.transition = 'all 500ms ease'
                bg.style.transition = 'all 500ms ease'
                this.offsetLeft = 0
                let timer = setTimeout(() => {
                    block.style.transition = ''
                    bg.style.transition = ''
                    clearTimeout(timer)
                }, 500)
            },
            cClick() {
                this.$emit('input', true)
            }
        },
        mounted() {
            if(this.type === 'sliding') {
                this.init()
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
        width: 11%;  /* 最好跟高度一样 */
        z-index: 10;
        cursor: pointer;
        background: white;
        color: #45494c;
        border: 1px solid #e4e7eb;
        box-shadow: 1px 1px 3px rgba(177, 169, 169, 0.3), -1px -1px 3px rgba(177, 169, 169, 0.3);
    }
    .lp_sliding_block:hover, .lp_sliding_block.is-sliding{
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
        color: rgb(25,145,250);
    }
    .lp_sliding_bg.type-click-bg{
        z-index: 7;
        background: rgb(210, 244, 239);
        left: 0;
        border: 1px solid rgb(82, 204, 186);
    }
    .type-click-bg .lp_sliding_front_txt{
        color: rgb(71, 179, 162);
    }
    .lp_sliding_front{
        z-index: 8;
        background: rgb(247, 249, 250);
        right: 0;
        left: 0;
        border: 1px solid #dadde0;
    }
    .lp_sliding_front.type-click-front:hover{
        color: rgb(71, 155, 63);
        cursor: pointer;
        transition: color .15s;
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
    .icon{
        margin-right: 10px;
    }
</style>