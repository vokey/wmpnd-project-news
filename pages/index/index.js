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
  },

  onTapCategory(event) {
    // Debug
    console.log(event.target.id)
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
    wx.getStorage({
      key: newsType,
      success: res => {
        console.log('This is cached data.')
        console.log(res.data)
      },
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
            wx.setStorage({
              key: newsType,
              data: res.data.result
            })
          }
        })
      }
    })
  }
})
