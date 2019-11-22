const PAGENUM = 10
Component({
  properties: {
    searchWord: String,
    startNum:String,
    endNum:String,
    isRandom :Object,
    title:String
  },
  data:{
    qaList:{}
  },
  ready:function(){
    console.log(this.properties.searchWord+"===>")
    this.getNewList()
  },
  methods: {
    getNewList: function () {
      console.log("刷新列表")
      const searchWord = this.properties.searchWord
      const db = wx.cloud.database()
      const _ = db.command
      // 查询当前用户所有的 ttl_qa
      db.collection('ttl_qa').where(
        _.or([
          {
            q: db.RegExp({
              regexp: searchWord,
              option: 'i'
            })
          },
          {
            a: db.RegExp({
              regexp: searchWord,
              option: 'i'
            })
          }]).and({
            _openid: this.data.openid
          })
      ).get({
        success: res => {
          this.setData({
            qaList: res.data
          })
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    },
  }
})