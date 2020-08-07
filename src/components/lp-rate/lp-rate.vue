<template>
    <div class="rate_box">
        <div class="content">

            <div class="stars"
                 @mouseover="mouseover"
                 @mouseout="mouseout"
                 @click="starClick">

                <span v-for="(item, index) in 5"
                      :key="index"
                      :class="[
                          'star' + index,
                          {'active': index - 1 &lt; currentStar},
                          {'star': !disabled}
                       ]">

                    {{ index - 1 &lt; currentStar ? '&#9733;': '&#9734;' }}
                </span>
            </div>

            <div class="txt">

                <span v-if="textType == 'number'">
                    {{ currentStar != -1? number[currentStar]: '暂未评论' }}
                </span>

                <span v-if="textType == 'grade'">
                    {{ currentStar != -1? grade[currentStar]: '暂未评论' }}
                </span>

            </div>

        </div>


    </div>
</template>

<script>
    export default {
        name: "lp-rate",
        props: {
            rate: {
                type: Number,
                default: 0
            },
            textType: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentStar: this.rate - 1,
                number: ['1.0', '2.0', '3.0', '4.0', '5.0'],
                grade: ['较差', '一般', '中等', '较好', '非常好']
            }
        },
        methods: {
            mouseover(event) {
                let element = event.toElement
                if(element.nodeName != 'SPAN') return;
                this.currentStar = Number(element.className.match(/star(\d)/)[1])
            },
            mouseout() {
                this.currentStar = this.rate - 1
            },
            starClick(event) {
                let element = event.toElement
                if(element.nodeName != 'SPAN') return;
                this.currentStar = Number(element.className.match(/star(\d)/)[1])
                this.$emit('rateChange', this.temporary)
            }
        },
        updated() {
            if(this.disabled) {
                this.$destroy(true)
            }
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
        cursor: default;
        padding-left: 2px;
        padding-right: 3px;
        user-select: none;
    }
    .stars span.star:hover{
        cursor: pointer;
        transform: scale(1.2, 1.2);
        font-weight: 600;
    }
    span.active{
        color: #e5bb48;
    }
    .txt{
        font-size: 15px;
        margin-left: 10px;
        width: 70px;
    }
    .txt span{
        color: #524d4d;
    }
</style>