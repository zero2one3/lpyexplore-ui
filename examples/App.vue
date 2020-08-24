<template>
  <div id="app">
    <!--      lp-button组件        -->
    <div id="lp-button">
      <div>
        <lp-button style="margin-left: 20px" plain>default</lp-button>
        <lp-button type="success" style="margin-left: 20px" plain>success</lp-button>
        <lp-button type="primary" style="margin-left: 20px" plain>primary</lp-button>
        <lp-button type="danger" style="margin-left: 20px" plain>danger</lp-button>
        <lp-button type="warning" style="margin-left: 20px" plain>warning</lp-button>
      </div>
      <div style="margin-top: 20px">
        <lp-button style="margin-left: 20px" round>default</lp-button>
        <lp-button type="success" style="margin-left: 20px" round>success</lp-button>
        <lp-button type="primary" style="margin-left: 20px" round>primary</lp-button>
        <lp-button type="danger" style="margin-left: 20px" round>danger</lp-button>
        <lp-button type="warning" style="margin-left: 20px" round>warning</lp-button>
      </div>
      <div style="margin-top: 20px">

        <lp-button style="margin-left: 20px" circle>
          <i class="fa fa-address-book"></i>
        </lp-button>

        <lp-button type="success" style="margin-left: 20px" circle>
          <i class="fa fa-check"></i>
        </lp-button>

        <lp-button type="primary" style="margin-left: 20px" circle>
          <i class="fa fa-envelope-open-o"></i>
        </lp-button>

        <lp-button type="danger" style="margin-left: 20px" circle>
          <i class="fa fa-skyatlas"></i>
        </lp-button>

        <lp-button type="warning" style="margin-left: 20px" circle>
          <i class="fa  fa-bell-slash-o"></i>
        </lp-button>

      </div>
      <div style="margin-top: 20px">
        <lp-button style="margin-left: 20px" disabled>default</lp-button>
        <lp-button type="success" style="margin-left: 20px" disabled>success</lp-button>
        <lp-button type="primary" style="margin-left: 20px" disabled>primary</lp-button>
        <lp-button type="danger" style="margin-left: 20px" disabled>danger</lp-button>
        <lp-button type="warning" style="margin-left: 20px" disabled>warning</lp-button>
      </div>
    </div>

    <!--      lp-filp组件        -->
    <div id="lp-filp" style="margin-top: 20px">
      <lp-filp frontBg="lavender">

        <span slot="front">我是正面的内容</span>
        <span slot="back">我是背面的内容</span>

      </lp-filp>

      <lp-filp style="margin-left: 20px" frontBg="pink" backBg="green">

      </lp-filp>

      <lp-filp style="margin-left: 20px" frontBg="green" backBg="blue">

      </lp-filp>

      <lp-filp style="margin-left: 20px" frontBg="blue" backBg="lavender"></lp-filp>

    </div>


    <!--      lp-sliding组件        -->
    <div id="lp-sliding" style="margin-top: 20px">
      <lp-sliding style="margin-bottom: 10px"
                  @isFull="isFull"
                  animation>

      </lp-sliding>
      <lp-button @click="btn" type="primary">提交验证</lp-button>
    </div>


    <!--      lp-accordion组件        -->
    <div id="lp-accordion" style="margin-top: 20px">
      <lp-accordion :content="list"
                    titleHeight="50px"
                    :hasIcon="true"
                    :round="true"
      >

      </lp-accordion>
    </div>


    <!--      lp-alert组件        -->
    <div id="lp-alert" style="margin-top: 20px">
      <lp-button @click="alertShowSuccess" type="success" style="margin-left: 20px">出现弹框</lp-button>
      <lp-button @click="alertShow" style="margin-left: 20px">出现弹框</lp-button>
      <lp-button @click="alertShowWarning" type="warning" style="margin-left: 20px">出现弹框</lp-button>
      <lp-button @click="alertShowDanger" type="danger" style="margin-left: 20px">出现弹框</lp-button>
    </div>

    <!--      lp-switch组件        -->
    <div id="lp-switch" style="margin-top: 20px">
      <lp-switch class="switch" @change="tryChange" loading/>
      <lp-switch></lp-switch>
    </div>

    <!--      lp-dialog组件        -->
    <div id="lp-confirm" style="margin-top: 20px">
      <lp-button @click="confirmShow" class="confirm">出现对话弹框</lp-button>
    </div>

    <!--      lp-rate组件        -->
    <div id="lp-rate" style="margin-top: 20px">
      <lp-rate textType="grade"
               :value="3"
               :disabled="isDisabled"
               @change="change"/>
      <lp-rate textType="number" v-model="tryValue"/>

      <lp-rate :textType="['a','b','c','d','e']" :color="['red', 'pink', 'blue']" :value="3"/>
      <lp-rate icon="face" :color="['red', 'pink', 'blue']" v-model="tryValue"/>
    </div>


    <!--      lp-loading组件        -->
    <div id="lp-loading" style="margin-top: 20px">

      <lp-button @click="loadingClick"
                 class="loading"
                 type="warning"
                 :disabled="loadingDisabled">按钮加载
      </lp-button>

      <lp-button style="margin-left: 20px"
                 type="danger"
                 @click="fullScreenLoading">全屏加载
      </lp-button>


    </div>


    <!--      lp-tabs组件        -->
    <div id="lp-tabs" style="margin-top: 20px">
      <lp-tabs v-model="tryTabs">
        <div slot="content0" class="contents">首页内容</div>
        <div slot="content1" class="contents">文章信息内容</div>
        <div slot="content2" class="contents">用户评论内容</div>
        <div slot="content3" class="contents">联系我们内容</div>
        <div slot="content4" class="contents">官方合作微信群内容</div>
      </lp-tabs>
    </div>


    <!--      lp-input组件        -->
    <div id="lp-input" style="margin-top: 20px">
      <lp-input v-model="lpy" clearable/>
    </div>


    <!--      lp-radio组件        -->
    <div id="lp-radio" style="margin-top: 20px">
      <div>
        <lp-radio v-model="picked" val="0" style="margin-left: 10px" type="border">男</lp-radio>
        <lp-radio v-model="picked" val="1" style="margin-left: 10px" type="border">女</lp-radio>
        <lp-radio v-model="picked" val="3" style="margin-left: 10px" type="border">未知</lp-radio>
        <div>pick的值为：{{ picked }}</div>
      </div>

      <div style="margin-top: 20px;">
        <lp-radio v-model="which" val="0" style="margin-left: 10px">男</lp-radio>
        <lp-radio v-model="which" val="1" style="margin-left: 10px">女</lp-radio>
        <lp-radio v-model="which" val="3" style="margin-left: 10px">未知</lp-radio>
        <div>which：{{ which }}</div>
      </div>

      <div style="margin-top: 20px;">
        <lp-radio val="0" style="margin-left: 10px" disabled type="border">男</lp-radio>
        <lp-radio val="1" style="margin-left: 10px" disabled type="border">女</lp-radio>
        <lp-radio val="3" style="margin-left: 10px" disabled type="border">未知</lp-radio>
      </div>

    </div>

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
                  {title: '请输入标题信息5', content_list: ['默认内容4', '默认内容4', '默认内容4', '默认内容4', '默认内容4']},
                  {title: '请输入标题信息43'},
                ],
                isDisabled: false,
                loadingDisabled: false,
                picked: '1',
                which: '',
                lpy: '哈哈',
                tryValue: -1,
                tryTabs: 0


            }
        },
        methods: {
            tryChange(value, obj) {
              this.$confirm()
              .then(() => {
                obj.success()
              })
              .catch(() => {
                obj.err()
              })

            },
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
                type: 'info'
              })
            },
            alertShowSuccess() {
                this.$alert({
                  type: 'success',
                  content: '这是一条成功信息'
                })
            },
            alertShowWarning() {
              this.$alert({
                type: 'warning',
                content: '这是一条警告信息'
              })
            },
            alertShowDanger() {
              this.$alert({
                type: 'err',
                content: '这是一条错误信息'
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
              this.$loading({
                type: 'line',
              })
            },
          fullScreenLoading() {
              this.$loading({
                content: '加载中',
                type: 'line',
              })
          },




        }
    }
</script>
<style>
  .lp-button .bt{
    margin-left: 20px;
  }
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
  #lp-confirm .confirm{
    width: 120px;
  }
</style>
