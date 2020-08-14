<template>
    <div class="dialog_box">

        <div class="box">

            <div class="title">
                <div class="title-box">
                    <span class="txt">{{ title }}</span>
                    <span class="close" @click="closeDialog(false)">&#10005;</span>
                </div>
            </div>

            <div class="content">

                <div class="content-box" :class="[{'center': center}]">
                    <slot>
                        <span>{{ content }}</span>
                    </slot>
                </div>

            </div>

            <div class="btn">
                <div class="btn-box">

                    <lp-button class="btn-close"
                               @click.native="closeDialog(false)">取消</lp-button>

                    <lp-button type="primary"
                               class="btn-sure"
                               @click.native="closeDialog(true)">确定
                    </lp-button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "lp-dialog",
        data() {
            return {
                title: '提示信息',
                content: '这是提示内容',
                center: true,
            }
        },
        methods: {
            closeDialog(isSure) {
                this.$EventBus.$emit('confirmClick', isSure)
                this.$destroy(true)
                this.$el.parentNode.removeChild(this.$el)
            },

        }

    }
</script>

<style scoped>
    .dialog_box{
        background: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
    }
    .box{
        border-radius: 5px;
        background: white;
        width: 400px;
        height: 250px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -100%);
    }
    .title{
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title-box{
        height: 50px;
        width: 360px;
        display: flex;
        align-items: center;
        position: relative;
        border-bottom: 1px solid #eee;
    }
    .title-box .txt{
        left: 0;
        position: absolute;
        font-size: 18px;
    }
    .title-box .close{
        right: 0;
        position: absolute;
        cursor: pointer;
        color: #b1afaf;
    }
    .title-box .close:hover{
        color: #6495ED;
    }
    .content{
        height: 110px;
    }
    .content-box{
        width: 360px;
        height: 110px;
        margin: 0 auto;
    }
    .content-box span{
        display: inline-block;
        font-size: 15px;
        color: #656060;
    }
    .content .center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btn{
        height: 70px;
    }
    .btn-box{
        width: 360px;
        height: 70px;
        margin: 0 auto;
    }
    .btn-close, .btn-sure{
        float: right;
        margin-left: 15px;
    }
</style>