<template>
    <div class="lp-accordion-container">
        <div class="lp-accordion-item" 
             :class="[
                    `lp-accordion-item${index}`, 
                    {'lp-accordion-item-active': (accordion && index == value) || (!accordion && value.indexOf(index) !== -1)}
                ]"
             v-for="(v, index) in number" 
             :key="index">

             <div class="lp-accordion-item-title" 
                  :class="[`lp-accordion-item-title${index}`]" 
                  @click="titleClick(index)">
                 <slot :name="`title${index}`" class="hahaha">{{ `默认标题${index}` }}</slot>
                 <i class="fa fa-angle-right lp-accordion-item-icon"/>
             </div>

             <div class="lp-accordion-item-content" 
                  :class="[`lp-accordion-item-content${index}`]">
                <div class="lp-accordion-item-inner-content">
                    <slot :name="`content${index}`">{{ `默认内容${index}` }}</slot>
                </div>    
             </div>   

        </div>
    </div>
</template>

<script>
    export default {
        name: "lp-accordion",
        props: {
            number: {
                type: Number,
                default: 5
            },
            accordion: {
                type: Boolean,
                default: true
            },
            value: {
                type: [Array, Number],
                default: -1
            }
        },
        methods: {
            titleClick(index) {
                if(this.accordion && this.value === index) {
                    this.$emit('input', -1)
                } else if(this.accordion && this.value !== index) {
                    this.$emit('input', index)
                } else if(!this.accordion && this.value.indexOf(index) !== -1) {
                    let i = this.value.indexOf(index)
                    this.value.splice(i, 1)
                    this.$emit('input', this.value)
                } else if(!this.accordion && this.value.indexOf(index) === -1) {
                    let new_value = this.value
                    new_value.push(index)
                    this.$emit('input', new_value)
                }
            }
        } 
    }
</script>

<style scoped>
    .lp-accordion-item{
        border-bottom: 1px solid #eee;
    }
    .lp-accordion-item0{
        border-top: 1px solid #eee;
    }
    .lp-accordion-item-title{
        padding: 15px 0;
        position: relative;
        color: #606266;
        cursor: pointer;
    }
    .lp-accordion-item-title:hover{
        color: rgb(111, 138, 226);
    }
    .lp-accordion-item-active .lp-accordion-item-title{
        color: rgb(111, 138, 226);
    }
    .lp-accordion-item-icon{
        position: absolute;
        right: 10px;
        transition: all .3s ease;
    }
    .lp-accordion-item-active .lp-accordion-item-icon{
        transform: rotate(90deg);
        color: rgb(111, 138, 226);
    }
    .lp-accordion-item-content{
        max-height: 0;
        overflow: hidden;
        transition: max-height .3s ease;
    }
    .lp-accordion-item-inner-content{
        padding: 5px 0 20px;
    }
    .lp-accordion-item-active .lp-accordion-item-content{
        max-height: 46.8px;
    }
</style>