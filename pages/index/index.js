//index.js
const utils = require('../../utils/utils.js')

Page({
  data: {
    categories: {
      "gn": "国内",
      "gj": "国际",
      "cj": "财经",
      "yl": "娱乐",
      "js": "军事",
      "ty": "体育",
      "other": "其他"
    },
    selected: 'gn',
    newsList: {},
  },

  onLoad() {
    this.getNewsList()
  },

  // Handle pulldown refresh event
  onPullDownRefresh() {
    this.fetchNews(() => {
      wx.stopPullDownRefresh()
    })
  },

  onTapCategory(event) {
    // Try to get element's id, which refer to news categories.
    let newSelection = event.target.id
    if (newSelection !== this.data.selected) {
      this.setData({
        selected: newSelection
      })
      this.getNewsList()
    }
  },

  getNewsList() {
    let newsType = this.data.selected
    // Try to use local cache.
    wx.getStorage({
      key: newsType,
      success: res => {
        // Set newsList
        this.setData({
          newsList: res.data,
        })
      },
      // If cannot get value from cache, try to fetch news list from api.
      fail: error => {
        this.fetchNews()
      },
    })
    // End of wx.getStorage
  },

  // Fetch news from api
  fetchNews(callback) {
    let newsType = this.data.selected 
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType
      },
      success: res => {
        let result = res.data.result
        for (let i = 0; i < result.length; i++) {
          result[i].date = utils.getDate(result[i].date)
        }
        let newsList = {
          headline: result.slice(0, 1),
          news: result.slice(1)
        }
        // Set newsList
        this.setData({
          newsList: newsList,
        })
        // Store the newest news list after fetching.
        wx.setStorage({
          key: newsType,
          data: newsList
        })
      },
      complete: () => {
        typeof callback === 'function' && callback()
      }
    })
  },

  onTapNews(event) {
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/content/content?id=' + id,
    })
  }
})
