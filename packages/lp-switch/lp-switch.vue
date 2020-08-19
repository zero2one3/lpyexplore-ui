<template>
    <div class="switch_box"
         :class="{'disabled': disabled}"
         @click="switchClick"
         :style="{'background': position === 'right'? open_color: close_color}">

        <div class="inner-box">

            <div class="block"
                 :style="{'left': position === 'left'? '2px': left}">

                <i class="fa fa-spinner fa-spin" v-show="loading && isLoading && position === 'right'"/>

            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "lp-switch",
        data() {
            return {
                position: this.open? 'right': 'left',
                left: null,
                isLoading: false,
                obj: {
                    success: () => {
                        this.isLoading = false
                    },
                    err: () => {
                        this.position = 'left'
                        this.isLoading = false
                    }
                }
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
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            switchClick() {
                if(this.disabled || (this.loading && this.isLoading)) return;
                if(this.position === 'left') {
                    if(this.loading) {
                        this.isLoading = true
                        this.position = 'right'
                        this.$emit('change', 'loading', this.obj)
                        return;
                    }
                    this.position = 'right'
                    this.$emit('change', 'open')
                } else {
                    this.position = 'left'
                    if(this.loading) {
                        this.isLoading = false
                    }
                    this.$emit('change', 'close')
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
        display: inline-block;
    }
    .inner-box{
        width: 100%;
        height: 100%;
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
        display: flex;
        justify-content: center;
        align-items: center;
    }
    i{
        color: #bbcbc3;
    }
</style>