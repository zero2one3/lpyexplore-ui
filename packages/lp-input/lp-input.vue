<template>
    <div class="lp-input">
        <input :type="showPassword? (passwordVisible? 'text': 'password'): type"
               :class="[
                           'lp-input-inner',
                           size,
                           {'hover': !isFocus && !disabled},
                           {'input-focus': isFocus},
                           {'disabled': disabled},
                       ]"
               :placeholder="placeholder"
               @focus="inputFocus"
               @blur="inputBlur"
               @input="handleInput"
               @change="handleChange"
               :name="name"
               :disabled="disabled"
               :value="value">

        <i class="fa fa-times clear"
           :class="[{'clear-hover': !disabled}, {'disabled': disabled}]"
           v-if="clearable && value"
           @click="clearValue"/>


        <i class="fa fa-eye-slash showPassword"
           :class="[{'show-hover': !disabled}, {'disabled': disabled}]"
           v-else-if="showPassword && value"
           @click="showPass"/>

    </div>
</template>

<script>
    import debounce from "../tools/optimize/debounce";
    export default {
        name: "lp-input",
        props: {
            placeholder: {
                type: String,
                default: ''
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
            },
            size: {
                type: String,
                default: 'middle'
            }
        },
        data() {
            return {
                isFocus: this.focus,
                isShow: false,
                passwordVisible: false,
                input: function(e) {
                    this.$emit('input', e.target.value)
                }
            }
        },
        methods: {
            inputFocus() {
                this.isFocus = true
                this.$emit('focus')
            },
            inputBlur() {
                this.isFocus = false
                this.$emit('blur')
            },
            handleInput(e) {
                debounce(this.input(e))()
            },
            handleChange() {
                this.$emit('change')
            },
            clearValue() {
                if(this.disabled) return;
                this.$emit('input', '')
            },
            showPass(e) {
                if(this.disabled) return;
                if(this.isShow) {
                    e.target.className = this.$updateClass(e.target.className, 'fa-eye', 'fa-eye-slash')
                    this.isShow = false
                }
                else {
                    e.target.className = this.$updateClass(e.target.className, 'fa-eye-slash', 'fa-eye')
                    this.isShow = true
                }
                this.passwordVisible = !this.passwordVisible

            }
        }
    }
</script>

<style scoped>
    .lp-input{
        position: relative;
    }
    input.small{
        height: 30px;
    }
    input.middle{
        height: 40px;
    }
    input.big{
        height: 50px;
    }
    .lp-input-inner{
        outline: none;
        width: 100%;
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
        border: 1px solid #0e95de;
        cursor: auto;
        box-shadow: 0 0 6px #53aee3;
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