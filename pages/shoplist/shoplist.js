// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:{},     //获取导航参数
    shopList:[],  //列表项数据
    page:1,       //默认显示页面数
    pageSize:10,  //默认显示页面大小
    total:0,       //商品总数
    isloading:false //节流阀
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query:options
    }),
    this.getShopList()
  },
  //获取商品数据函数
  getShopList(cb){
    this.setData({
      isloading:true
    })
    //展示loading效果 使用微信内置的方法
    wx.showLoading({
      title: '数据加载中......',
    })
    wx.request({
      // 用模板字符串来动态请求地址
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method:'GET',
      // 请求传入的参数：页面数和页面大小
      data:{
        _page:this.data.page,
        _limit:this.data.pageSize
      },
      success:(res) => {
        console.log(res)
        this.setData({
          // 设置data中的列表数据项为用来的数组+请求得到的数组（用展开运算符合并实现）
          shopList:[...this.data.shopList,...res.data],
          // 设置商品数为请求得到的数据总数，该数据包含在请求头里，包含-所以要用引号获取，且为字符串所以要-0转换为数字
          total:res.header['X-Total-Count'] - 0
        })
      },
      complete:()=>{
        //隐藏loading效果
        wx.hideLoading()
        this.setData({ isloading:false})
        // wx.stopPullDownRefresh()
        // 逻辑短路，如果没有回调函数传入就不执行，有回调函数就执行回调函数
        cb && cb()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.title,
    })
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
    //需要垂直关键的数据
    this.setData({
      page:1,
      shopList:[],
      total:0
    })
    //重新发起数据请求
    this.getShopList(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.page * this.data.pageSize >= this.data.total){
      //调用微信内置的api，提示信息，证明没有下一页的数据了
      return wx.showToast({
        title: '数据加载完毕！',
        icon:'none'   //不展示图标
      })
    }
    // 判断节流阀值
    if(this.data.isloading) return
    this.setData({
      page:this.data.page + 1
    })

    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})