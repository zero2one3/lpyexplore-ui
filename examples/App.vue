<template>
  <div id="app">
    <!--      lp-button组件                 -->
    <div id="lp-button-small">
      <lp-button size="small">default</lp-button>
      <lp-button type="success" size="small">success</lp-button>
      <lp-button type="primary" size="small">primary</lp-button>
      <lp-button type="danger" size="small">danger</lp-button>
      <lp-button type="warning" size="small">warning</lp-button>
    </div>
    <div id="lp-button-middle">
      <lp-button>default</lp-button>
      <lp-button type="success"
                 @click="btnClick"
                 :disabled="false">
        success
      </lp-button>
      <lp-button type="primary">primary</lp-button>
      <lp-button type="danger">danger</lp-button>
      <lp-button type="warning">warning</lp-button>
    </div>
    <div id="lp-button-big">
      <lp-button size="big" :round="true">default</lp-button>
      <lp-button type="success" size="big" :round="true">success</lp-button>
      <lp-button type="primary" size="big" :round="true">primary</lp-button>
      <lp-button type="danger" size="big" :round="true">danger</lp-button>
      <lp-button type="warning" size="big" :round="true">warning</lp-button>
    </div>

    <div id="lp-filp" style="margin-top: 20px">
      <lp-filp width="150px"
               height="150px"
               fontBg="lavender">

        <span slot="front">嘻嘻，正面</span>
        <span slot="back">哈哈，背面</span>

      </lp-filp>
    </div>

    <div id="lp-sliding" style="margin-top: 20px">
      <lp-sliding style="margin-bottom: 10px"
                  @isFull="isFull"
                  width="400px"
                  height="40px"
                  fontSize="16px">

      </lp-sliding>
      <button @click="btn">提交验证</button>
    </div>



    <lp-accordion style="margin-bottom: 10px"
                  :content="list"
                  width="300px"
                  titleHeight="50px"
                  :hasIcon="true"
                  :round="true"
                  >

    </lp-accordion>

    <button @click="alertShow">出现弹框</button>

    <lp-switch style="margin-top: 30px"
               :disabled="false"
               :open="false"
               :delay="true">

    </lp-switch>

    <button @click="confirmShow">出现确认弹框</button>

    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>

    <lp-rate textType="grade"
             :rate="3"
             :disabled="isDisabled"
             @rateChange="change">

    </lp-rate>

    <button @click="loadingClick" class="loading">正在加载</button>

    <lp-tabs :disabled="[0,4]">
      <div slot="content0" class="contents">首页内容</div>
      <div slot="content1" class="contents">文章信息内容</div>
      <div slot="content2" class="contents">用户评论内容</div>
      <div slot="content3" class="contents">联系我们内容</div>
      <div slot="content4" class="contents">官方合作微信群内容</div>
    </lp-tabs>


    <lp-input :disabled="false"
              v-model="lpy"
              :clearable="true"
              size="big">

    </lp-input>

    <lp-input v-model="lpy"
              type="password"
              :showPassword="true">

    </lp-input>

    <lp-radio v-model="picked" val="0" style="margin-left: 10px" type="border">男</lp-radio>
    <lp-radio v-model="picked" val="1" style="margin-left: 10px">女</lp-radio>
    <lp-radio v-model="picked" val="3" style="margin-left: 10px" :disabled="true">未知</lp-radio>
    <div>pick的值为：{{ picked }}</div>
    <button @click="toggle">转换</button>


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
                ],
                isDisabled: false,
                picked: '1',
                lpy: '哈哈'

            }
        },
        methods: {
            btnClick() {
                this.disabled = true
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
                alert('验证通过')
              }
              else {
                alert('验证未通过')
              }
            },
            alertShow() {
                this.$alert({
                  type: 'success',
                  content: '恭喜你，注册成功'
                })
            },
            confirmShow() {
                this.$confirm()
                .then(() => {
                  console.log('成功')
                })
                .catch(() => {
                  console.log('失败')
                })
            },
            change() {
              this.isDisabled = true
              this.$alert({
                type: 'success',
                content: '评论成功',
              })
            },
            loadingClick() {

              let ret = this.$loading({
                content: '',
                fullScreen: false,
                location: this.$el.querySelector('.loading')
              })

              this.$confirm({
                content: '确定关闭加载动画吗？',
                title: '提示'
              })
              .then(() => {
                ret.close()
              })

            },
          toggle() {
              if(this.picked == '0') {
                this.picked = '1'
              }
              else {
                this.picked = '0'

              }
          }


        }
    }
</script>
<style>

  .loading{
    position: relative;
    width: 100px;
    height: 40px;
  }
  .contents{
    height: 500px;
  }
  .lp-input{
    width: 300px;
  }

</style>
