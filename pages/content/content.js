// pages/content/content.js
const utils = require('../../utils/utils.js')

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
      },
      fail: err => {
        // Fetch from api if cannot get content from cache
        wx.request({
          url: 'https://test-miniprogram.com/api/news/detail',
          data: {
            id: id
          },
          success: res => {
            let result = res.data.result
            result.date = utils.getDate(result.date)
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
  },
  // End of getNewsContent

// Handle tap image event
  onTapImage(event) {
    let id = event.currentTarget.dataset.contentId
    let url = this.data.newsContent[id].src
    // Preview tapped image
    wx.previewImage({
      urls: [url],
    })
  }
})