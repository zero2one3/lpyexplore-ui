<template>
    <div class="alert_container"
         :class="[
            {'show': isShow},
            {'hide': !isShow},
            {'enter': isEnter},
            {'leave': isLeave},
            type,
            `location-${location}`
         ]" 
         :style="{
             'top': location === 'top'? `${distance}px`: '',
             'bottom': location === 'bottom'? `${distance}px`: '',
         }">
        <div class="content">

            <i class="icon fa"
               :class="[`lp-alert-${type}`]"/>

            <div class="txt"
                 :class="[`txt_${type}`]">
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
                type: 'info',                // 提示框主题
                lastTime: 2500,              // 持续时间
                content: '这是一条提示消息',  // 提示框文字内容
                location: 'top',             // 出现位置
                isShow: false,
                isLeave: false,
                isEnter: false,
                distance: 0,
                id: null
                
            }
        },
        methods: {
            init() {
                this.id = Math.random()
                if(this.$EventBus._alert === undefined) {
                    this.$EventBus._alert = []
                }
                this.$EventBus._alert.push(this.id)
                this.distance = this.$EventBus._alert.indexOf(this.id) * 70
            },
            check() {
                this.distance = this.$EventBus._alert.indexOf(this.id) * 70
            }
        },
        mounted() {
            this.init()
            setInterval(() => {
                this.check()
            }, 50);
            let icon = this.$el.querySelector('.icon')
            let name = ''
            switch (this.type) {
                case "info":
                    name = 'fa-info-circle'
                    break;
                case "success":
                    name = 'fa-check-circle'
                    break;
                case "err":
                    name = 'fa-times-circle'
                    break;
                case "warning":
                    name = 'fa-exclamation-triangle'
                    break;
            }
            icon.className = this.$addClass(icon.className, name)

            setTimeout(() => {
                this.isShow = true
                this.isEnter = true
            }, 200)

            setTimeout(() => {
                this.isEnter = false
                this.isShow = false
                this.isLeave = true
                this.$EventBus._alert.shift()
            }, this.lastTime)

        },
        updated() {
            setTimeout(() => {
                if(this.isLeave) {
                    this.$destroy(true)
                    if(this.$el.parentNode !== null) {
                        this.$el.parentNode.removeChild(this.$el)
                    }
                }
            }, 500)
        }
    }
</script>

<style scoped>
    .alert_container{
        width: 400px;
        height: 50px;
        border-radius: 8px;
        position: fixed;
        transition: all 500ms ease;
        opacity: 0;
        filter:alpha(opacity=0);
        z-index: 1000;
    }
    .alert_container.location-top, .alert_container.location-bottom{
        left : 50%;
        transform: translate(-50%, 0);
    }
    .alert_container.location-top.enter{
        transform: translate(-50%, 20px);
    }
    .alert_container.location-bottom.enter{
        transform: translate(-50%, -20px);
    }
    .show{
        opacity: 1;
        filter:alpha(opacity=100);
    }
    .alert_container.location-top.leave{
        top: 0;
    }
    .alert_container.location-bottom.leave{
        bottom: 0;
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
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .txt{
        margin-left: 10px;
        font-size: 15px;
    }
    .txt_info, .lp-alert-info{
        color: #909399;
    }
    .txt_success, .lp-alert-success{
        color: #3BC965;
    }
    .txt_warning, .lp-alert-warning{
        color: #eea832;
    }
    .txt_err, .lp-alert-err{
        color: #de3c3c;
    }
    .info{
        background-color: #eBEEF5;
        border: 1px solid #e5e8ee;
    }
    .success{
        background-color: #e7f6e3;
        border: 1px solid #e3f1df
    }
    .err{
        background-color: #f6ecec;
        border: 1px solid #f5e3e3;
    }
    .warning{
        background-color: #f8f2ec;
        border: 1px solid #f3e5da;
    }
</style>
