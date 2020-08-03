<template>
    <div class="switch_box"
         :class="{'disabled': disabled == true || disabled == 'true'}"
         @click="switchClick"
         :style="{'background': isOpen? bg: 'rgba(193,193,193,1)'}">
        <div class="block"
             :class="[
                 {'on_left': position == 'left' && isOpen == false},
                 {'on_center': position == 'center'},
                 {'on_center_left': position == 'center' && left2right == true},
                 {'on_center_right': position == 'center' && left2right == false},
                 {'on_right': position == 'right' || isOpen == true}
             ]">
        </div>
    </div>
</template>

<script>
    export default {
        name: "lp-switch",
        data() {
            return {
                isOpen: this.open,
                position: 'left',
                left2right: !this.open,
            }
        },
        props: {
            open: {
                type: Boolean,
                default: false
            },
            bg: {
                type: String,
                default: '#ea3e3e'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            switchClick() {
                if(this.disabled == true) return;
                if(this.isOpen) {
                    this.left2right = false
                    this.position = 'center'
                    setTimeout(() => {
                        this.position = 'left'
                        this.isOpen = false
                    }, 100)
                }
                else {
                    this.left2right = true
                    this.position = 'center'
                    setTimeout(() => {
                        this.position = 'right'
                        this.isOpen = true
                    },100)
                }


            }
        }
    }
</script>

<style scoped>
    .switch_box{
        width: 64px;
        height: 30px;
        border-radius: 20px;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        transition: color 2s ease;
    }
    .disabled{
        cursor: not-allowed;
        opacity: .6;
        filter:alpha(opacity=60)
    }
    .block{
        height: 26px;
        width: 30px;
        background: #f5f1f1;
        transition: all 800ms ease;
        position: absolute;
    }
    .on_left{
        border-radius: 100%;
        left: 2px;
    }
    .on_center{
        width: 40px;
        transition: all 100ms ease;
        border-radius: 20px;
    }
    .on_center_left{
        left: 12px;
    }
    .on_center_right{
        right: 12px;
    }
    .on_right{
        border-radius: 100%;
        right: 2px;
    }
</style>