<template>
    <span class="radio-group"
          :class="[
                      {'selected': selected},
                      {'disabled': disabled},
                      {'border': type === 'border'},
                      {'rectangle': type === 'rectangle'},
                  ]"
          @click="radioClick">

        <i class="fa fa-circle-thin circle" v-show="!selected"></i>
        <i class="fa fa-dot-circle-o circle-selected" v-show="selected"></i>

        <input type="radio"
               :id="id"
               :name="name"
               :value="val"
               v-model="valueChange">

        <label>
            <slot>默认选项</slot>
        </label>

    </span>
</template>

<script>
    export default {
        name: "lp-radio",
        data() {
            return {
                selected: this.val == this.value
            }
        },
        props: {
            //父组件v-model给的value值
            value: {
                default: ''
            },
            //外部传进来的value值
            val: {
                type: [String, Number],
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            id: {
                type: [String, Number],
                default: ''
            },
            type: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            radioClick() {
                if(this.disabled) return;
                this.selected = !this.selected
                if(this.selected) {
                    this.valueChange = this.val
                }
                else {
                    this.valueChange = ''
                }
            }
        },
        computed: {
            valueChange: {
                get() {
                    return this.value
                },
                set(v) {
                    this.$emit('input', v)
                }
            }
        },
        updated() {
            this.selected = this.val == this.value
        }

    }
</script>

<style scoped>
    .radio-group{
        display: inline-block;
        border-radius: 5px;
    }
    .radio-group, label{
        cursor: pointer;
    }
    /*   disabled样式     */
    .radio-group.disabled, .radio-group.disabled label{
        cursor: not-allowed;
    }
    .radio-group.disabled{
        opacity: .6;
        filter: alpha(opacity=60);
    }
    /*      border样式      */
    span.border {
        padding: 10px 20px 10px 15px;
        border: 1px solid #c9c8c8;
    }
    span.selected.border{
        border: 1px solid #3da3dc;
    }
    /*      rectangle样式      */
    span.rectangle{

    }
    span.selected label{
        color: #3da3dc;
    }
    input{
        display: none;
    }
    .circle{
        color: #c9c6c6;
    }
    .circle:hover{
        color: #3da3dc;
    }
    .circle-selected{
        color: #3da3dc;
    }
    label{
        font-size: 15px;
        display: inline-block;
        margin-left: 10px;
        color: #606266;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }
</style>