<template>
    <div class="loading_container"
         :style="{
            'position': fullScreen? 'fixed': 'absolute'
         }"
         :class="[
             {'is-bubble': type === 'bubble'},
             {'is-line': type === 'line'}
         ]">

        <div class="content" :class="{'small': small}">

            <div class="circle">
                <i class="fa fa-spin"
                   :class="[
                     {'is-bubble': type === 'bubble'},
                     {'is-line': type === 'line'},
                     {'fa-spinner': type === 'bubble'},
                     {'fa-circle-o-notch': type === 'line'}
                   ]"/>
            </div>

            <div class="txt" v-if="content != ''">{{ content }}</div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "lp-loading",
        data() {
          return {
              content: '',
              type: 'bubble',
              fullScreen: true,
              small: false
          }
        },
        beforeCreate() {
            this.$EventBus.$emit('loadingClose', this)
        },


    }
</script>

<style scoped>
    .loading_container{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        z-index: 998;
    }
    .loading_container.is-bubble{
        background: rgba(255, 255, 255, .9);
    }
    .loading_container.is-line{
        background: rgba(0, 0, 0, .65);
    }
    .content{
        width: 100%;
        display: inline-block;
    }
    .content.small .circle i{
        font-size: 13px;
    }
    .content.small .txt{
        padding-top: 3px;
        font-size: 12px;
    }
    .circle{
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .circle i{
        font-size: 22px;
        color: #0baa0b;
    }
    .txt{
        text-align: center;
        padding-top: 10px;
        color: #0baa0b;
        font-size: 15px;
    }
</style>