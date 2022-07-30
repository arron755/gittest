// pages/showlist/showlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlist:[],
    query:{},
    page:1,
    total:0,
    pagesize:10,
    isloading:false
  },
  getshowlist(cb){
    this.setData({
      isloading: true
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.escook.cn/cetegories/${this.data.query.id}/shops',
      method: 'GET',
      data:{
        _page:this.data.page,
        _limit:this.data.pagesize
      },
      success:(res)=>{
        this.setData({
          showlist: [...this.data.showlist,...res.data],  /* 数组拼接 */
          total: res.header['X-Total-Count'] - 0 /* 有-号不能直接写，是字符串要转成数字 */
        })
      },
      complete:()=>{
        wx.hideLoading({})
        this.setData({
          isloading:false
        }),
        cb && cb()   /*如果存在cb就调用cb这个函数*/
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query: this.options
    })
    this.getshowlist()
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.name,
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
    this.setData({
      Page : 1,
      showlist:[],
      total:0
    })
    this.getshowlist(()=>{
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.page * this.data.pagesize >= this.data.total) return  /*当达到上限的时候不发起请求了*/
    if(this.data.isloading) return  /*设置节流*/
    this.setData({
      page: this.data.page + 1
    })
    this.getshowlist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})