<template>
    <div class="card">
        <div class="front slid" :class="[frontBg? frontBg: '', {'is-center': center}]">

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
            frontBg: {
                type: String,
                default: ''
            },
            //卡片正面背景颜色
            backBg: {
                type: String,
                default: ''
            },
            center: {
                type: Boolean,
                default: false
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
        background: white;
        border: 1px solid #e2e2e2;
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
        border: 1px solid #c4e759;
    }
    .lavender{
        background-image: linear-gradient(to right bottom, #deb0df, #ae6bfe);
        border: 1px solid #deb0df;
    }
    .pink{
        background-image: linear-gradient(to left bottom, #fdeb82, #f78fad);
        border: 1px solid #fdeb82;
    }
    .blue{
        background-image: linear-gradient(to left bottom, #41d8dd, #5583ee);
        border: 1px solid #41d8dd;
    }
</style>