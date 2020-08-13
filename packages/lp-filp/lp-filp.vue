<template>
    <div class="card">
        <div class="front slid" :class="[fontBg? fontBg: '', {'is-center': center}]">

            <slot name="front">正面内容</slot>

        </div>

        <div class="back slid"  :class="[backBg? backBg: '', {'is-center': center}]">

            <slot name="back">背面内容</slot>

        </div>
    </div>
</template>

<script>
    export default {
        name: "lp-filp",
        props: {
            //卡片背面背景颜色
            fontBg: {
                type: String,
                default: 'pink'
            },
            //卡片正面背景颜色
            backBg: {
                type: String,
                default: 'pink'
            },
            center: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style scoped>
    /*基础动画样式*/
    .card{
        width: 150px;
        height: 150px;
        position: relative;
        display: inline-block;
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
    }
    .slid{
        height: 100%;
        width: 100%;
        perspective: 800px;
        position: absolute;
        backface-visibility: hidden;
        transition: all 1s ease;
        transform-style: preserve-3d;
        border-radius: 5px;
        box-sizing: border-box;
    }
    .slid.is-center{
        display: flex;
        justify-content: center;
        align-items: center;
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
    .blue{
        background-image: linear-gradient(to left bottom, #41d8dd, #5583ee);
    }
</style>