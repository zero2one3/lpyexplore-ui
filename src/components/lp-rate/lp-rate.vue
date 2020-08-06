<template>
    <div class="rate_box">
        <div class="content">

            <div class="stars"
                 @mouseover="mouseover"
                 @mouseout="mouseout"
                 @click="starClick">

                <span v-for="(item, index) in number"
                      :key="index"
                      :class="['star' + index, {'active': index - 1 &lt; currentStar}]">
                    {{ index - 1 &lt; currentStar ? '&#9733;': '&#9734;' }}
                </span>
            </div>

            <div class="txt">满意</div>

        </div>


    </div>
</template>

<script>
    export default {
        name: "lp-rate",
        props: {
            number: {
                type: Number,
                default: 5
            },

        },
        data() {
            return {
                currentStar: -1
            }
        },
        methods: {
            mouseover(event) {
                let element = event.toElement
                if(element.nodeName != 'SPAN') return;
                this.currentStar = Number(element.className.match(/star(\d)/)[1])
            },
            mouseout() {

            },
            starClick() {

            }
        },
        mounted() {



        }
    }
</script>

<style scoped>

    .rate_box{
        height: 60px;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .content{
        display: inline-block;
        height: 30px;
    }
    .stars, .txt{
        height: 30px;
        line-height: 30px;
        float: left;
    }
    .stars{
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        color: #bfb5b5;
    }
    .stars span{
        cursor: pointer;
        margin-left: 5px;
    }
    .stars span:hover{
        transform: scaleX(1.1);
    }
    span.active{
        color: #e5bb48;
    }
    .txt{
        font-size: 15px;
        color: #524d4d;
        margin-left: 5px;
    }

</style>