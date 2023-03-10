// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorList:[],	//随机颜色列表
    isLoading:false //节流阀
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    this.getColors()
  },
  getColors(){	//获取随机颜色的方法
    wx.showLoading({title:'数据加载中....'})	//1.展示loading效果
    this.setData({  //刚开始调用方法开启节流阀
      isLoading:true
    })
    wx.request({	//发起请求，获取随机颜色值的数组
        url:'https://www.escook.cn/api/color',
        method:'GET',
        success:({data:res}) => {
            this.setData({
                colorList:[...this.data.colorList,...res.data]
            })
        },
        complete:() => {
          wx.hideLoading()	//2.隐藏loading效果
          this.setData({  //调用方法结束时关闭节流阀
            isLoading:false
          })
        }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:function(){
    if(!this.data.isLoading){//节流阀为true时阻止请求，为false时发起请求
      //调用获取随机颜色的方法
      this.getColors()
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})