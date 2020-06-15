<template>
    <div class="ac_container">
        <div v-for="(item, index) in title_list" :key="index">
            <div class="ac_title">
                <div>{{item.title}}</div>
            </div>
            <ul class="ac_plate">
                <li v-for="(each_li, i) in item.content_list" :key="i">
                    {{each_li}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "lp_accordion",
        props: {
            title_list: {
                type: Array,
                default: function () {
                    return [
                        {title: '请输入标题信息1', content_list: ['默认内容1', '默认内容2', '默认内容3']},
                        {title: '请输入标题信息2', content_list: ['默认内容1', '默认内容2', '默认内容3']}
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    .ac_container{
        display: inline-block;
        width: 300px;
    }
    .ac_title{
        background: #ebebeb;
    }
    .ac_title div{
        padding: 10px 26px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ac_plate{
        display: inline-block;
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
    }
    li{
        height: 30px;
        width: 100%;
        background: red;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>