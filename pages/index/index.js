//index.js
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

  onTapCategory(event) {
    // Debug
    console.log(event.target.id)
    // Try to get element's id, which refer to news categories.
    let newSelection = event.target.id
    if (newSelection !== this.data.selected) {
      // Debug
      console.log('New choice')
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
        console.log('This is cached data.')
        console.log(res.data)
        // Set newsList
        this.setData({
          newsList: res.data,
        })
      },
      // If cannot get value from cache, try to fetch news list from api.
      fail: error => {
        console.log(error)
        wx.request({
          url: 'https://test-miniprogram.com/api/news/list',
          data: {
            type: newsType
          },
          success: res => {
            // Debug
            console.log(res.data.result)
            let result = res.data.result
            for (let i = 0; i < result.length; i++) {
              let date = result[i].date.split("T")
              result[i].date = date[0]
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
        })
      },
    })
    // End of wx.getStorage
  }
  // End of getNewList
})
