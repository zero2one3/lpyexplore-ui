<template>
    <div class="switch_box"
         :class="{'disabled': disabled}"
         @click="switchClick"
         :style="{'background': position === 'right'? open_color: close_color}">

        <div class="block"
             :style="{'left': position === 'left'? '2px': left}">
        </div>

    </div>
</template>

<script>
    export default {
        name: "lp-switch",
        data() {
            return {
                position: this.open? 'right': 'left',
                left: null
            }
        },
        props: {
            open: {
                type: Boolean,
                default: false
            },
            open_color: {
                type: String,
                default: '#ea3e3e'
            },
            close_color: {
                type: String,
                default: 'rgba(193,193,193,1)'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            switchClick() {
                if(this.disabled == true) return;
                if(this.position === 'left') {
                    this.position = 'right'
                    this.$emit('change', true)
                } else {
                    this.position = 'left'
                    this.$emit('change', false)
                }
            }
        },
        mounted() {
            //计算滑块大小
            let height = this.$el.clientHeight
            let width = this.$el.clientWidth
            let block = this.$el.querySelector('.block')
            block.style.height = height - 4 + 'px'
            block.style.width = height - 4 + 'px'
            this.left = width - height + 4 - 2 + 'px'
        }
    }
</script>

<style scoped>
    .switch_box{
        width: 65px;
        height: 30px;
        border-radius: 50px;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
    }
    .disabled{
        cursor: not-allowed;
        opacity: .6;
        filter:alpha(opacity=60)
    }
    .block{
        height: 26px;
        width: 26px;
        border-radius: 50%;
        background: #f5f1f1;
        transition: all 200ms linear;
        position: absolute;
    }
</style>