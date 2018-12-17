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
    }
  }
})
