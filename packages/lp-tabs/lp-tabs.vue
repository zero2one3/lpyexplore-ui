<template>
    <div class="tabs-container">

        <div class="tabs" @click="tabClick">
            <div class="bottom-box" :style="{'width': width, 'left': left}"></div>
            <div v-for="(item, index) in tabs"
                 :key="index"
                 :class="['each-tab', 'hover', `tab${index}`, {'active-tab': active_tab == index}]">
                {{ item }}
            </div>

        </div>

        <div class="content">

            <div v-for="(item, index) in tabs.length"
                 :key="index"
                 v-show="index === active_tab"
                 :class="['each-contents']">
                <slot :name="`content${index}`"></slot>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "lp-tabs",
        props: {
            disabled: {
                type: Array,
                default: function () {
                    return [1,3]
                }
            }
        },
        data() {
            return {
                tabs: ['首页', '文章信息', '用户评论', '联系我们', '官方合作微信群'],
                active_tab: null,
                width: null,
                left: null,
            }
        },
        methods: {
            tabClick(e) {

                if(e.target.className.match(/disabled/)) return;
                this.active_tab = Number(e.target.className.match(/tab(\d)/)[1])
                this.width = e.target.clientWidth + 'px'
                this.left = e.target.offsetLeft + 'px'
            }
        },
        mounted() {
            let active_tab = 0
            for(let i in this.disabled) {
                if(this.disabled[i] == active_tab) {
                    active_tab ++
                    continue;
                }
                break;

            }
            this.active_tab = active_tab

            this.width = this.$el.querySelector(`.tab${this.active_tab}`).clientWidth + 'px'
            this.left = this.$el.querySelector(`.tab${this.active_tab}`).offsetLeft + 'px'

            let tabs = this.$el.querySelectorAll('.each-tab')

            for(let i in this.disabled) {
                tabs[this.disabled[i]].className = tabs[this.disabled[i]].className.substring(0, tabs[this.disabled[i]].className.match(/hover/).index) + tabs[this.disabled[i]].className.substring(tabs[this.disabled[i]].className.match(/hover/).index + 6, tabs[this.disabled[i]].className.length) + ' disabled'
            }

        }

    }
</script>

<style scoped>
    .tabs-container{
        width: 100%;
        display: inline-block;
    }
    .tabs{
        display: flex;
        align-items: flex-end;
        padding-top: 20px;
        border-bottom: 2px solid #e1e1e1;
        position: relative;
    }
    .each-tab{
        float: left;
        padding: 10px;
        cursor: pointer;
        margin-left: 10px;
        z-index: 10;
        font-size: 16px;
        color: #606266;
    }
    .tab0{
        margin-left: 0;
    }
    .hover:hover{
        color: #0c94de;
    }
    .active-tab{
        color: #0c94de;
    }
    .disabled{
        cursor: not-allowed;
        opacity: .3;
        filter:alpha(opacity=30)
    }
    .bottom-box{
        position: absolute;
        bottom: 0;
        height: 100%;
        width: 30px;
        border-bottom: 2px solid #0c94de;
        transition: all 400ms ease;
        z-index: 9;
    }
    .content{
        padding-top: 20px;
    }
</style>