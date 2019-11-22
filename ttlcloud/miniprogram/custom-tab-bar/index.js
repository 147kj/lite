Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/images/icon/house.png",
        "selectedIconPath": "/images/icon/home-s.png"
      },
      {
        "pagePath": "/pages/im/room/room",
        "text": "聊天室",
        "iconPath": "/images/icon/tickets.png",
        "selectedIconPath": "/images/icon/order-s.png"
      },
      {
        "pagePath": "/pages/user/user",
        "text": "我的",
        "iconPath": "/images/icon/user.png",
        "selectedIconPath": "/images/icon/solid-s.png"
      }
    ]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
    }
  }
})