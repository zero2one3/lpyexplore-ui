<template>
    <div class="card" :style="{'width': width, 'height': height}">
        <div class="front slid" :class="[fontBg? fontBg: '']">
            <slot name="front">正面内容</slot>
        </div>

        <div class="back slid"  :class="[backBg? backBg: '']">
            <slot name="back">背面内容</slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "lp_filp",
        props: {
            //卡片宽度
            width: {
                type: String,
                default: '150px'
            },
            //卡片高度
            height: {
                type: String,
                default: '150px'
            },
            //字体大小
            fontSize: {
                type: String,
                default: '18px'
            },
            //卡片背面背景颜色
            fontBg: {
                type: String,
                default: 'pink'
            },
            //卡片正面背景颜色
            backBg: {
                type: String,
                default: 'pink'
            }
        },
        data() {
            return {

            }
        },
    }
</script>

<style scoped>
    /*基础动画样式*/
    .card{
        width: 100px;
        height: 100px;
        position: relative;
        display: inline-block;
    }
    .slid{
        height: 100%;
        width: 100%;
        perspective: 800px;
        position: absolute;
        backface-visibility: hidden;
        transition: all 1s ease;
        transform-style: preserve-3d;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        box-sizing: border-box;
    }
    .front{
        transform: rotateY(0deg);
    }
    .back{
        transform: rotateY(-180deg);
    }
    .card:hover .front{
        transform: rotateY(180deg);
    }
    .card:hover .back{
        transform: rotateY(0deg);
    }
    /*背景样式*/
    .green{
        background-image: linear-gradient(to right bottom, #c4e759, #6de195);
    }
    .lavender{
        background-image: linear-gradient(to right bottom, #deb0df, #ae6bfe);
    }
    .pink{
        background-image: linear-gradient(to left bottom, #fdeb82, #f78fad);
    }
</style>