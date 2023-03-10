// components/rgb-change/rgb-change.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  //纯数据字段
  options: {
    //指定所有 _开头的数据字段为纯数据字段
    pureDataPattern: /^_/
  },
  /**
   * 组件的初始数据
   */
  data: {
    //将rgb改造为以 _ 开头的纯数据字段
    _rgb: { //rgb的颜色值对象
      r: 0,
      g: 0,
      b: 0
    },
    fullColor: '0,0,0' //根据rgb对象的三个属性，动态计算fullColor的值
  },

  // 数据监听器
  observers: {
    //使用通配符**监听对象上所有属性的变化
    '_rgb.**': function (obj) {
      this.setData({
        fullColor: `${obj.r},${obj.g},${obj.b}`
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeR() { //修改rgb对象上r属性的值
      this.setData({
        '_rgb.r': this.data._rgb.r + 5 > 255 ? 255 : this.data._rgb.r + 5
      })
    },
    changeG() { //修改rgb对象上g属性的值
      this.setData({
        '_rgb.g': this.data._rgb.g + 5 > 255 ? 255 : this.data._rgb.g + 5
      })
    },
    changeB() { //修改rgb对象上b属性的值
      this.setData({
        '_rgb.b': this.data._rgb.b + 5 > 255 ? 255 : this.data._rgb.b + 5
      })
    }
  }
})