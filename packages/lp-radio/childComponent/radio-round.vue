<template>
    <span class="radio-round" @click="radioClick">

        <input type="radio"
               :id="id"
               :class="[`radio`]"
               :value="val"
               @click="radioClick">

        <label :for="id"
               :class="[`txt`]">
            <slot>选项1</slot>
        </label>

    </span>
</template>

<script>
    export default {
        name: "radio-round",
        props: {
            id: {
                type: [String, Number]
            },
            name: {
                type: String,
            },
            val: {

            }
        },
        data() {
            return {

            }
        },
        methods: {
            radioClick(e) {
                let _this = this.$el.querySelector('.radio')

                if(e.target.localName == 'input') {
                    _this.checked = !_this.checked
                }

                if(_this.checked) return;

                let radios = this.$el.parentNode.parentNode.querySelectorAll('.radio')

                for(let i=0; i < radios.length; i++) {
                    if(radios[i] !== _this) {
                        radios[i].checked = false
                    }
                }
                _this.checked = true

            }
        },

    }
</script>

<style scoped>
    .radio-round{
        display: flex;
        align-items: center;
        margin-left: 20px;
        padding: 10px 20px 10px 10px;
        border: 1px solid #3a3aa7;
        border-radius: 5px;
        cursor: pointer;
    }
    .radio, .txt{
        cursor: pointer;
    }
    .radio{
        display: inline-block;
    }
    .txt{
        display: inline-block;
        padding-left: 10px;
    }
</style>