<template>
  <div id="app">
    <lp_button type="danger" size="middle"
                @click.native="btnClick"
               :disabled="disabled">
        提交
    </lp_button>

    <lp_filp width="150px"
             height="150px"
             fontBg="lavender">

      <span slot="front">嘻嘻，正面</span>
      <span slot="back">哈哈，背面</span>

    </lp_filp>

    <lp_sliding style="margin-bottom: 10px"
                @isFull="isFull"
                width="400px"
                height="40px"
                fontSize="16px"></lp_sliding>
    <button @click="btn">点击我</button>

    <lp_accordion style="margin-bottom: 10px"
                  :content="list"
                  width="300px"
                  titleHeight="50px"
                  hasIcon="1"
                  round="1" titleBg="lightgreen">

    </lp_accordion>

  </div>
</template>

<script>
    export default {
        data() {
            return {
                disabled: false,
                isCode: false,
                list: [
                  {
                    title: '请输入标题信息333333333333333333333333333333',
                    content_list: ['默认内容9999999999999999999999999999999999999', '默认内容9', '默认内容9'],
                    links:['http://www.baidu.com','http://www.baidu.com','http://www.baidu.com']
                  },
                  {title: '请输入标题信息4', content_list: ['默认内容8', '默认内容8', '默认内容8']},
                  {title: '请输入标题信息5', content_list: ['默认内容4', '默认内容4', '默认内容4', '默认内容4', '默认内容4']}
                ]
            }
        },
        methods: {
            btnClick() {
                this.disabled = !this.disabled
            },
            isFull(data) {
              if(data) {
                this.isCode = true
              }
              else {
                this.isCode = false
              }
            },
            btn() {
              if(this.isCode) {
                alert('通过')
              }
              else {
                alert('未通过')
              }
            }

        }
    }
</script>
<style>
  #app{
    height: 300px;
  }

</style>
