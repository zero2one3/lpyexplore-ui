<template>

    <button class="btn"
            :class="[size, type, {isRound:round},disabled? 'disabled':'']"
            @mousedown="btnDown"
            @mouseup="btnUp"
    >
        <slot>lpUi按钮</slot>
    </button>

</template>

<script>
    export default {
        name: "lp-button",
        props: {
            size: {
                type: String,
                default: 'middle'
            },
            type: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            },
            round: {
                type: Boolean,
                default: false
            },

        },
        data() {
            return {
                type_list: ['primary', 'success', 'danger', 'warning'],
                obj_list: ['primary-click', 'success-click', 'danger-click', 'warning-click'],
                current_type: ''
            }
        },
        methods: {
            //鼠标按下
            btnDown() {
                let btn = document.getElementsByClassName('btn')[0]
                let btn_class = btn.className
                let class_name = btn_class.split(' ')
                class_name.forEach(value => {
                    let index = this.type_list.indexOf(value)
                    if (index !== -1) {
                        btn.className = btn_class + ' ' + this.obj_list[index]
                        this.current_type = value
                    }

                })
                if (this.current_type === '') {
                    btn.className = btn_class + ' default-click'
                }

            },
            //鼠标松开
            btnUp() {
                let btn = document.getElementsByClassName('btn')[0]
                let btn_class = btn.className
                if (this.current_type !== '') {
                    let index = this.type_list.indexOf(this.current_type)
                    btn.className = btn_class.replace(new RegExp("(\\s|^)" + this.obj_list[index] + "(\\s|$)"), '')
                } else {
                    btn.className = btn_class.replace(new RegExp("(\\s|^)" + 'default-click' + "(\\s|$)"), '')
                }
            },
            //判断按钮是否禁用
            isDisabled() {
                let btn = document.querySelector('.btn')
                if(this.disabled) {
                    btn.disabled = 'disabled'
                }
                else {
                    btn.removeAttribute('disabled')
                }
            }
        },
        mounted() {
            this.isDisabled()

        },
        updated() {
            this.isDisabled()
        }


    }
</script>

<style scoped>
    button{
        border: 1px solid #e1e1e1;
        background: white;
        border-radius: 5px;
        padding: 0 10px;
        outline: none;
        cursor: pointer;
    }
    button.disabled{
        cursor: not-allowed;
        opacity: .6;
        filter:alpha(opacity=60)
    }
    button.isRound{
        border-radius: 50px;
    }
    button.middle{
        height: 40px;
        width: 100px;
    }
    button.big{
        height: 50px;
        width: 120px;
        font-size: 18px;
    }
    button.small{
        height: 30px;
        width: 80px;
        font-size: 14px;
        line-height: 30px;
    }
    button:hover{
        background: #eee;
        color: 	#00BFFF;
    }
    button.default-click{
        border: 1px solid #00BFFF;
    }
    button.primary{
        background: #00BFFF;
        color: white;
    }
    button.primary:hover{
        background: #6495ED;

    }
    button.primary-click{
        background: #4169E1 !important;
    }
    button.success{
        background: #32CD32;
        color: white;
    }
    button.success:hover{
        background: #00BB00;

    }
    button.success-click{
        background: #32CD32 !important;
    }
    button.danger{
        background: #FF3333;
        color: white;
    }
    button.danger:hover{
        background: #EE0000;
    }
    button.danger-click{
        background: #FF3333 !important;
    }
    button.warning{
        background: #FFD700;
        color: white;
    }
    button.warning:hover{
        background: #EEEE00;
    }
    button.warning-click{
        background: #ffd700 !important;
    }
</style>