<template>
    <div class="rate_box">
        <div class="content">

            <div class="stars">

                <i v-for="(item, index) in iconNumber"
                      :key="index"
                      class="fa"
                      @mouseover="mouseover"
                      @mouseout="mouseout"
                      @click="starClick"
                      :class="[
                          'icon' + index,
                          {'icon': !disabled},
                          {'fa-star': icon === 'star' && index &lt;= currentStar},
                          {'fa-star-o': icon === 'star' && index &gt; currentStar},
                          {'fa-frown-o': icon === 'face' && index &lt;= currentStar && realFaceIcon === 0},
                          {'fa-meh-o': icon === 'face' && (index &gt; currentStar || (index &lt;= currentStar && realFaceIcon === 1))},
                          {'fa-smile-o': icon === 'face' && index &lt;= currentStar && realFaceIcon === 2}
                       ]"
                      :style="{'color': index &lt;= currentStar? typeof color === 'string'? color: color[realColor]: '#bfb5b5'}"/>
            </div>


            <div class="txt">
                <span v-if="typeof textType === 'string' && textType === 'number'">
                    {{ currentStar != -1? number[currentStar]: '暂未评论' }}
                </span>
                <span v-else-if="typeof textType === 'string' && textType === 'grade'">
                    {{ currentStar != -1? grade[currentStar]: '暂未评论' }}
                </span>
                <span v-else-if="textType">
                    {{ currentStar != -1? textType[currentStar]: '暂未评论' }}
                </span>
            </div>

        </div>


    </div>
</template>

<script>
    export default {
        name: "lp-rate",
        props: {
            value: {
                type: Number,
                default: -1
            },
            textType: {
                type: [String, Array],
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            iconNumber: {
                type: Number,
                default: 5
            },
            icon: {
                type: String,
                default: 'star'
            },
            color: {
                type: [Array, String],
                default: '#e5bb48'
            }
        },
        data() {
            return {
                currentStar: this.value,
                arr: {
                    number: ['1分', '2分', '3分', '4分', '5分'],
                    grade: ['较差', '一般', '中等', '较好', '非常好']
                },
            }
        },
        methods: {
            mouseover(event) {
                let element = event.toElement
                if(element.nodeName != 'I') return;
                this.currentStar = Number(element.className.match(/icon(\d)/)[1])
            },
            mouseout() {
                this.currentStar = this.value
            },
            starClick(event) {
                let element = event.toElement
                if(element.nodeName != 'I') return;
                this.currentStar = Number(element.className.match(/icon(\d)/)[1])
                this.$emit('input', this.currentStar)
                this.$emit('change', this.currentStar)
            },
            judgeColor() {
                let percent = this.currentStar / (this.iconNumber - 1)
                return Math.round(percent * (this.color.length - 1))
            },
            judgeFaceIcon() {
                let percent = this.currentStar / (this.iconNumber - 1)
                return Math.round(percent * 2)
            },
            onlyRead() {
                if(this.disabled) {
                    this.$destroy(true)
                }
            }
        },
        computed: {
          realColor() {
              return this.judgeColor()
          },
          realFaceIcon() {
              return this.judgeFaceIcon()
          },
          number: {
              get() {
                  return this.arr.number
              }
          },
          grade: {
              get() {
                  let grade = this.arr.grade
                  let ret;
                  switch (this.iconNumber) {
                      case 2:
                          ret = [grade[0], grade[grade.length - 1]]
                          break;
                      case 3:
                          ret = [grade[0], grade[Math.ceil(grade.length/2)], grade[grade.length - 1]]
                          break;
                      case 4:
                          ret = [grade[0], grade[1], grade[Math.ceil(grade.length/2)], grade[grade.length - 1]]
                          break;
                      case 5:
                          ret = grade
                          break;
                  }
                  return ret
              }
          }
        },
        mounted() {
            this.onlyRead()
        },
        updated() {
            this.onlyRead()
        }
    }
</script>

<style scoped>
    .rate_box{
        height: 60px;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .content{
        display: inline-block;
        height: 30px;
    }
    .stars, .txt{
        height: 30px;
        line-height: 30px;
        float: left;
    }
    .stars{
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        color: #bfb5b5;
    }
    .stars i{
        display: inline-block;
        cursor: default;
        padding-left: 3px;
        padding-right: 4px;
        user-select: none;
        transition: color .3s ease;
        font-weight: 500;
    }
    .fa-frown-o, .fa-meh-o, .fa-smile-o{
        font-size: 24px;
    }
    .stars i.icon:hover{
        cursor: pointer;
        transform: scale(1.13, 1.13);
    }
    .txt{
        font-size: 15px;
        margin-left: 10px;
        width: 70px;
    }
    .txt span{
        color: #524d4d;
    }
</style>