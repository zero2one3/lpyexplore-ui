<template>
    <div class="ac_container"
         :class="[{'ac_container_round': round}]">
        <div v-for="(item, index) in content"
             :key="index"
             class="each_box">

            <div class="ac_title" :style="{'height': titleHeight, 'lineHeight': titleHeight, 'background': titleBg}">
                <div :style="{'fontSize': TfontSize}" class="title">{{item.title}}</div>
                <div class="icon-box">
                    <i class="icon fa fa-angle-right" v-if="hasIcon"
                       :style="{'transform': current_title == index? 'rotate(90deg)': ''}"/>
                </div>
            </div>

            <ul class="ac_plate"
                :class="[{'is-show': current_title === index}]"
                :style="{'fontSize': CfontSize}">
                <li v-for="(each_li, i) in item.content_list"
                    :key="i"
                    :style="{'marginTop':i==0?'':'-1px', 'height': liHeight, 'lineHeight': liHeight}"
                    :class="[{'bottom_round': round && index == content.length - 1 && i == item.content_list.length - 1}]">
                    <a>{{each_li}}</a>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    export default {
        name: "lp-accordion",
        data() {
            return {
                current_title: 0
            }
        },
        props: {
            content: {
                type: Array,
                default: function () {
                    return [
                        {
                            title: '请输入标题信息1',
                            content_list: ['默认内容1', '默认内容2', '默认内容3'],
                            links:['http://www.baidu.com','http://www.baidu.com','http://www.baidu.com']
                        },
                        {title: '请输入标题信息2', content_list: ['默认内容4', '默认内容5', '默认内容6']}
                    ]
                }
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
            },
            hasIcon: {
                type: Boolean,
                default: false
            },
            round: {
                type: Boolean,
                default: false
            },
            titleBg: {
                type: String,
                default: '#ebebeb'
            }
        },
        mounted() {
            //绑定标题的点击事件
            let ac_title = document.querySelectorAll('.ac_title')
            for(let i=0; i< ac_title.length; i++) {
                ac_title[i].onclick = () => {
                    this.current_title = i
                }
            }

            //给a标签附上链接
            let ac_plate = document.querySelectorAll('.ac_plate')
            for(var i=0; i < ac_plate.length; i++) {
                let li_list = ac_plate[i].querySelectorAll('li')
                for(var n=0; n < li_list.length; n++) {
                    if(this.content[i].links && this.content[i].links.length > n) {
                        li_list[n].children[0].href = this.content[i].links[n]
                    }
                    else {
                        li_list[n].children[0].href = '#'
                    }

                }
            }
        },
    }
</script>

<style scoped>
    .ac_container{
        line-height:0;
        width: 300px;
    }
    .ac_container_round{
        border-radius: 10px;
        overflow: hidden;
    }
    .bottom_round{
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .ac_container, .each_box{
        display: inline-block;
        width: 300px;
    }
    .ac_title{
        cursor: pointer;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #dcd0d0;
        box-sizing: border-box;
    }
    .ac_title .title{
        text-indent: 25px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 90%;
        float: left;
    }
    .icon-box{
        width: 10%;
        height: 100%;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ac_title .icon{
        transition: all 500ms ease;
    }
    .ac_plate{
        list-style: none;
        margin: 0;
        padding: 0;
        display: block;
        overflow: hidden;
        width: 100%;
        max-height: 0;
        transition: max-height .2s;
    }
    .ac_plate li{
        height: 50px;
        line-height: 50px;
        text-indent: 25px;
        border: 1px solid #ebebeb;
        box-sizing: border-box;
        cursor: pointer;
    }
    .ac_plate li:hover a{
        color: #6495ED;
    }
    .ac_plate li a{
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-decoration: none;
        color: #666;
    }
    .is-show{
        max-height: 100em;
        transition: max-height 1s;
    }

</style>