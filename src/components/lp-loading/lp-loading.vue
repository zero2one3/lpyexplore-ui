<template>
    <div class="loading_container" :style="{'position': fullScreen? 'fixed': 'absolute'}">

        <div class="content">

            <div class="circle">
                <svg t="1596793383301"
                     class="icon"
                     viewBox="0 0 1024 1024"
                     version="1.1"
                     mlns="http://www.w3.org/2000/svg"
                     p-id="1478"
                     width="100%"
                     height="100%">
                    <path d="M827.211075 221.676536m-54.351151 0a54.351151 54.351151 0 1 0 108.702302 0 54.351151 54.351151 0 1 0-108.702302 0Z" p-id="1479" fill="#8a8a8a"></path><path d="M940.905298 515.399947m-67.086951 0a67.086952 67.086952 0 1 0 134.173903 0 67.086952 67.086952 0 1 0-134.173903 0Z" p-id="1480" fill="#8a8a8a"></path><path d="M829.755035 810.595334m-78.974766 0a78.974766 78.974766 0 1 0 157.949532 0 78.974766 78.974766 0 1 0-157.949532 0Z" p-id="1481" fill="#8a8a8a"></path><path d="M534.831643 928.64149m-91.48657 0a91.486571 91.486571 0 1 0 182.973141 0 91.486571 91.486571 0 1 0-182.973141 0Z" p-id="1482" fill="#8a8a8a"></path><path d="M243.780191 805.955407m-101.902408 0a101.902408 101.902408 0 1 0 203.804816 0 101.902408 101.902408 0 1 0-203.804816 0Z" p-id="1483" fill="#8a8a8a"></path><path d="M536.623615 107.870315m-107.854315 0a107.854315 107.854315 0 1 0 215.70863 0 107.854315 107.854315 0 1 0-215.70863 0Z" p-id="1484" fill="#8a8a8a"></path><path d="M243.780191 224.220497m-107.854315 0a107.854315 107.854315 0 1 0 215.70863 0 107.854315 107.854315 0 1 0-215.70863 0Z" p-id="1485" fill="#8a8a8a"></path><path d="M129.429978 512.008m-102.766395 0a102.766394 102.766394 0 1 0 205.532789 0 102.766394 102.766394 0 1 0-205.532789 0Z" p-id="1486" fill="#8a8a8a">
                    </path>
                </svg>
            </div>
            <div class="txt"></div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "lp-loading",
        data() {
          return {
              fullScreen: false
          }
        },
        mounted() {

            this.$EventBus.$emit('loadingClose', this)
            let loading_icon = this.$el.querySelector('.icon')
            let deg = 0
            setInterval(() => {
                deg ++
                loading_icon.style.transform = `rotate(${deg}deg)`
            }, 5)
        },
        updated() {

        }
    }
</script>

<style scoped>
    .loading_container{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        background: rgba(238, 238, 238, .7);
        z-index: 998;
    }
    .content{
        width: 100%;
        display: inline-block;
        /*background: red;*/
    }
    .circle{
        height: 42px;
        width: 42px;
        margin: 0 auto;
    }

</style>