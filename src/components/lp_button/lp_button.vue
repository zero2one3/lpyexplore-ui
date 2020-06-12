<template>

    <button class="btn"
            @mousedown="btnDown"
            @mouseup="btnUp">
        lpUi按钮
    </button>

</template>

<script>
    export default {
        name: "lp_button",
        data() {
            return {
                type_list: ['primary', 'success', 'danger', 'warning'],
                obj_list: ['primary-click', 'success-click', 'danger-click', 'warning-click'],
                current_type: ''
            }
        },
        methods: {
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
            btnUp() {
                let btn = document.getElementsByClassName('btn')[0]
                let btn_class = btn.className
                if (this.current_type !== '') {
                    let index = this.type_list.indexOf(this.current_type)
                    btn.className = btn_class.replace(new RegExp("(\\s|^)" + this.obj_list[index] + "(\\s|$)"), '')
                } else {
                    btn.className = btn_class.replace(new RegExp("(\\s|^)" + 'default-click' + "(\\s|$)"), '')
                }
            }
        },


    }
</script>

<style scoped>
    button{
        height: 40px;
        width: 100px;
        border: 1px solid #e1e1e1;
        background: white;
        border-radius: 5px;
        padding: 10px 0;
        outline: none;
        cursor: pointer;
    }
    button:hover{
        background: #FFF5EE;
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