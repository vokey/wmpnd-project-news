// pages/content/content.js
Page({

  /**
   * Page initial data
   */
  data: {
    id: "",
    newsContent: {},
    title: "",
    source: "",
    date: "",
    readCount: 0,
    firstImage: "",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id,
      })
    }
    this.getNewsContent(this.data.id)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  
  getNewsContent(id) {
    // Try to get news detail from cache
    wx.getStorage({
      key: id,
      success: res => {
        let result = res.data
        this.setData({
          newsContent: result.content,
          title: result.title,
          date: result.date,
          source: result.source,
          firstImage: result.firstImage,
          readCount: result.readCount,
        })
        // Debug
        console.log("Cached:")
        console.log(result)
      },
      fail: err => {
        // Fetch from api if cannot get content from cache
        wx.request({
          url: 'https://test-miniprogram.com/api/news/detail',
          data: {
            id: id
          },
          success: res => {
            // Debug
            console.log("Fetch from web:")
            console.log(res.data.result)
            let result = res.data.result
            let date = result.date.split("T")
            result.date = date[0]
            this.setData({
              newsContent: result.content,
              title: result.title,
              date: result.date,
              source: result.source,
              firstImage: result.firstImage,
              readCount: result.readCount,
            })
            // Cache the news detail
            wx.setStorage({
              key: id,
              data: result,
            })
          }
        })
      }
    })
  }
})