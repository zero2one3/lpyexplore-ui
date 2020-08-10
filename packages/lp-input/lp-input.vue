<template>
    <div class="lp-input">
        <input :type="type"
               :class="['lp-input-inner',
                           {'hover': !isFocus && !disabled},
                           {'input-focus': isFocus},
                           {'disabled': disabled},
                       ]"
               :placeholder="placeholder"
               @focus="inputFocus"
               @blur="inputBlur"
               @input="handleInput"
               :name="name"
               :disabled="disabled">

        <i class="fa fa-times clear"
           :class="[{'clear-hover': !disabled}, {'disabled': disabled}]"
           :style="{'display': clearable? 'block': 'none'}"
           @click="clearValue">

        </i>

        <i class="fa fa-eye-slash showPassword"
           :class="[{'show-hover': !disabled}, {'disabled': disabled}]"
           @click="showPass">

        </i>
    </div>
</template>

<script>
    export default {
        name: "lp-input",
        props: {
            placeholder: {
                type: String,
                default: '请输入内容'
            },
            focus: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'text'
            },
            name: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
            },
            clearable: {
                type: Boolean,
                default: false
            },
            showPassword: {
                type: Boolean,
                default: false
            }


        },
        data() {
            return {
                isFocus: this.focus,
                isShow: false
            }
        },
        methods: {
            inputFocus() {
                this.isFocus = true
            },
            inputBlur() {
                this.isFocus = false
            },
            handleInput(e) {
                this.$emit('input', e.target.value)
            },
            clearValue() {
                if(this.disabled) return;
                this.$el.querySelector('.lp-input-inner').value = ''
            },
            showPass(e) {
                if(this.disabled) return;
                if(this.isShow) {
                    e.target.className = this.$addClass(this.$removeClass(e.target.className, 'fa-eye'), 'fa-eye-slash')
                    this.isShow = false
                }
                else {
                    e.target.className = this.$addClass(this.$removeClass(e.target.className, 'fa-eye-slash'), 'fa-eye')
                    this.isShow = true
                }

            }
        }
    }
</script>

<style scoped>
    .lp-input{
        position: relative;
    }
    .lp-input-inner{
        outline: none;
        width: 100%;
        height: 40px;
        padding: 0 25px 0 15px;
        font-size: 14px;
        border-radius: 5px;
        border: 1px solid #d4d3d3;
        color: #606266;
    }
    .hover:hover{
        border: 1px solid #b3b1b1;
        cursor: pointer;
    }
    .input-focus{
        border: 1px solid #0b8cd2;
        cursor: auto;
    }
    input.disabled{
        cursor: not-allowed;
        opacity: .7;
        filter: alpha(opacity=70);
    }
    .clear{
        color: #d7d5d5;
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translate(150%, -50%);
        cursor: pointer;
    }
    i.clear-hover:hover{
        color: #c4c1c1;
    }
    i.disabled{
        cursor: not-allowed;
    }
    .showPassword{
        color: #d7d5d5;
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translate(120%, -50%);
        cursor: pointer;
    }
    i.show-hover:hover{
        color: #b3b0b0;
    }
</style>