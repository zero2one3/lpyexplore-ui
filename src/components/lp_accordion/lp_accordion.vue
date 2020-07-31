<template>
    <div class="ac_container" :style="{'width': width}">
        <div v-for="(item, index) in title_list"
             :key="index" class="each_box"
             :style="{'width': width}">

            <div class="ac_title" :style="{'fontSize': TfontSize}">
                <div>{{item.title}}</div>
            </div>

            <ul class="ac_plate"
                :style="{'display': current_title == index?'inline-block':'none', 'fontSize': CfontSize}">
                <li v-for="(each_li, i) in item.content_list"
                    :key="i"
                    :style="{'marginTop':i==0?'':'-1px'}">
                    <div>{{each_li}}</div>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    export default {
        name: "lp_accordion",
        data() {
            return {
                current_title: 0
            }
        },
        props: {
            title_list: {
                type: Array,
                default: function () {
                    return [
                        {title: '请输入标题信息1', content_list: ['默认内容1', '默认内容2', '默认内容3']},
                        {title: '请输入标题信息2', content_list: ['默认内容4', '默认内容5', '默认内容6']}
                    ]
                }
            },
            width: {
                type: String,
                default: '300px'
            },
            titleHeight: {
                type: String,
                default: '50px'
            },
            liHeight: {
                type: String,
                default: '50px'
            },
            TfontSize: {
                type: String,
                default: '16px'
            },
            CfontSize: {
                type: String,
                default: '16px'
            }
        },
        mounted() {
            let ac_title = document.getElementsByClassName('ac_title')
            for(let i=0; i< ac_title.length; i++) {
                ac_title[i].onclick = () => {
                    this.current_title = i
                }
            }
        },
    }
</script>

<style scoped>
    .ac_container{
        line-height:0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow: hidden;
    }
    .ac_container, .each_box{
        display: inline-block;
        width: 300px;
    }
    .ac_title{
        background: #ebebeb;
        cursor: pointer;
        height: 50px;
        text-indent: 25px;
        line-height: 50px;
    }
    .ac_title div{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .ac_plate{
        list-style: none;
        margin: 0;
        padding: 0;
        display: inline-block;
        width: 100%;
    }
    .ac_plate li{
        height: 50px;
        line-height: 50px;
        text-indent: 25px;
        border: 1px solid #ebebeb;
        box-sizing: border-box;
        cursor: pointer;

    }
    .ac_plate li:hover{
        color: #6495ED;
    }
    .ac_plate li div{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>