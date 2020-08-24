<template>
    <div class="lp-tabs-container" :class="[type]">

        <div class="lp-tabs-titles-container" 
             @click="titleClick">
            <div class="title-slot-container"
                 :class="[`lp-tabs-title${index}`, {'active-title': value == index}, {'is-disabled': disabled.indexOf(index) !== -1}]"
                 v-for="(item, index) in titles" 
                 :key="index" 
                 v-html="item"/>
            <div class="title-border" 
                 :class="[{'first-title-border': value == 0}]"
                 :style="{'left': `${left}px`, 'width': type === 'default'? `${width}px`: value == 0? `${width - 1}px`: `${width - 2}px`}"/>
        </div>


        <div class="lp-tabs-contents-each-content" 
             :class="[{'active-content': value == i}]"
             v-for="(v, i) in titles" 
             :key="i">
            
            <slot :name="`content${i}`">请输入内容</slot>
            
        </div>

    </div>
</template>

<script>
    export default {
        name: "lp-tabs",
        props: {
            type: {
                type: String,
                default: 'default'
            },
            value: {
                type: [Number, String],
                default: 0
            },
            titles: {
                type: Array,
                default: function() {
                    return ['首页', '推荐', '购物车', '联系我们', '合作与联系']
                }
            },
            disabled: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        data () {
            return {
                left: null,
                width: null
            }
        },
        methods: {
            // 计算default样式下 border的位置与宽度
            calculate(i) {
                // 判断是否所有tab都被禁用
                if(this.disabled.length === this.titles.length) {
                    this.$el.querySelector('.title-border').style.display = 'none'
                    return;
                }
                let index = i
                let status = false
                while(!status) {
                    if(this.disabled.indexOf(index) === -1) {
                        status = true
                    }
                    else {
                        index ++
                        if(index > this.titles.length - 1) {
                            index = 0
                        }
                    }
                }
                let el = this.$el.querySelector(`.lp-tabs-title${index}`)
                this.left = el.offsetLeft
                this.width = el.clientWidth
                this.$emit('input', index)
            },
            titleClick(e) {
                let n = Number(e.target.className.match(/lp-tabs-title(\d)/)[1])
                if(this.disabled.indexOf(n) === -1) {
                    this.calculate(n)
                    this.$emit('click', n, this.value)
                    this.$emit('input', n)
                }
            }
        },
        mounted () {
            this.calculate(this.value) 
        }
    }
</script>

<style scoped>
    .lp-tabs-container{
        display: inline-block;
        width: 100%;
        padding-bottom: 15px;
    }
    .lp-tabs-container.card{
        border: 1px solid #e1e1e1;
        box-shadow: 0 0 5px 3px rgba(225, 225, 225, .3);
    }
    .lp-tabs-titles-container{
        display: inline-block;
        width: 100%; 
        position: relative;
    }
    .lp-tabs-container.default .lp-tabs-titles-container{
        border-bottom: 2px solid #e1e1e1; 
    }
    .lp-tabs-container.card .lp-tabs-titles-container{
        background: #f8f5f5;
        border-bottom: 1px solid #e1e1e1;
    }
    .title-slot-container{
        float: left;
        padding: 15px 20px;
        display: flex;
        justify-content: center;
        align-items: center;  
        cursor: pointer;
        color: #606266;
        transition: all .3s ease;
    }
    .title-slot-container:hover{
        color: #0c94de;
    }
    .active-title{
        color: #0c94de;
    }
    .lp-tabs-container.card .title-slot-container.active-title{
        background: white;
    }
    .lp-tabs-container.default .title-border{   
        position: absolute;
        border-bottom: 2px solid #0c94de;
        transition: all 300ms linear;
        width: 30px;
        bottom: -2px;
    }
    .lp-tabs-container.card .title-border{
        position: absolute;
        border-bottom: 1px solid white;
        border-left: 1px solid #e1e1e1;
        border-right: 1px solid #e1e1e1;
        height: 100%;
    }
    .lp-tabs-container.card .first-title-border{
        border-left: 0;
    }
    .lp-tabs-contents-each-content{
        display: none;
        padding-left: 15px;
        word-wrap: break-word;
        word-break: break-all;
    }
    .lp-tabs-contents-each-content.active-content{
        display: block;
        margin-top: 15px;
    }
    .is-disabled{
        cursor: not-allowed;
        opacity: .3;
        filter:alpha(opacity=30)
    }
</style>