<template>
    <div class="alert_container"
         :class="{
            'show': isShow,
            'hide': !isShow,
            'enter': isEnter,
            'leave': isLeave,
            'success': type == 'success',
            'info': type == 'info',
            'err': type == 'err',
            'warning': type == 'warning'
         }" >

        <div class="content">

            <div class="icon"
                 :class="{
                    'icon_success': type == 'success',
                    'icon_info': type == 'info',
                    'icon_err': type == 'err',
                    'icon_warning': type == 'warning'
                 }">

            </div>

            <div class="txt"
                 :class="{
                    'txt_success': type == 'success',
                    'txt_info': type == 'info',
                    'txt_err': type == 'err',
                    'txt_warning': type == 'warning'
                 }">

                {{content}}
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "lp-alert",
        data() {
            return {
                type: 'info',              //提示框主题
                lastTime: 2500,            //持续时间
                content: '这是一条提示消息',  //提示框文字内容
                isShow: false,
                isLeave: false,
                isEnter: false,
            }
        },
        mounted() {

            setTimeout(() => {
                this.isShow = true
                this.isEnter = true
            }, 200)

            setTimeout(() => {
                this.isEnter = false
                this.isShow = false
                this.isLeave = true
            }, this.lastTime)

        },
        updated() {
            setTimeout(() => {
                if(this.isLeave) {
                    this.$destroy(true)
                    this.$el.parentNode.removeChild(this.$el)
                }
            },1000)

        }
    }
</script>

<style scoped>
    .alert_container{
        width: 350px;
        height: 50px;
        border-radius: 8px;
        position: fixed;
        left: 50%;
        top: 0;
        transition: all 500ms ease;
        opacity: 0;
        filter:alpha(opacity=0);
        z-index: 1000;
        transform: translate(-50%, 0);
    }
    .enter{
        transform: translate(-50%, 35%);
    }
    .show{
        opacity: 1;
        filter:alpha(opacity=100);
    }
    .leave{
        top: 0;
    }
    .hide{
        opacity: 0;
        filter:alpha(opacity=0);
    }
    .content{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .icon, .txt{
        float: left;
    }
    .icon{
        height: 20px;
        width: 20px;
        margin-left: 10px;
    }
    .icon_info{
        background: url("assets/info.png") no-repeat;
        background-size: 100% 100%;
    }
    .icon_success{
        background: url("assets/success.png") no-repeat;
        background-size: 100% 100%;
    }
    .icon_warning{
        background: url("assets/warning.png") no-repeat;
        background-size: 100% 100%;
    }
    .icon_err{
        background: url("assets/err.png") no-repeat;
        background-size: 100% 100%;
    }
    .txt{
        margin-left: 5px;
    }
    .txt_info{
        color: #666;
    }
    .txt_success{
        color: #3BC965;
    }
    .txt_warning{
        color: #f6d24e;
    }
    .txt_err{
        color: #FF3333;
    }
    .info{
        background-color: #eee;
    }
    .success{
        background-color: #e7f6e3;
    }
    .err{
        background-color: #fcdbdb;
    }
    .warning{
        background-color: #fdf7ce;
    }
</style>
