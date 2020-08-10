<template>
    <span class="radio-group">
        <radio_round :val="value"
                     :name="name"
                     :id="id">
            <slot></slot>
        </radio_round>
    </span>
</template>

<script>
    export default {
        name: "lp-radio",
        components: {
            radio_round: () => import('./childComponent/radio-round'),
            // radio_button: () => import('')
        },
        props: {
            value: {
                default: ''
            },
            type: {
                type: String,
                default: 'round'
            },
            name: {
                type: String,
                default: ''
            },
            id: {
                type: [String, Number],
                default: function () {
                    return Math.random()
                }
            }
        },

    }
</script>

<style scoped>
    .radio-group{
        display: inline-block;
    }
</style>