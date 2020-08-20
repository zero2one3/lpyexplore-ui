<template>
    <div class="loading_container"
         :class="[
             {'is-bubble': type === 'bubble'},
             {'is-line': type === 'line'}
         ]"
         @click="loadingClick">

        <div class="content">

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
              small: false
          }
        },
        methods: {
            loadingClick(e) {
                console.log(e)
                e.preventDefault()
            }
        },
        beforeCreate() {
            this.$EventBus.isLoading = this
        },


    }
</script>

<style scoped>
    .loading_container{
        position: fixed;
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
    .circle{
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .circle i{
        font-size: 27px;
        color: #0baa0b;
    }
    .txt{
        text-align: center;
        padding-top: 10px;
        color: #0baa0b;
        font-size: 15px;
    }
</style>