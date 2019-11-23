const PAGENUM = 15
Component({
  properties: {
    searchWord: String,
    startNum:String,
    endNum:String,
    isRandom :Number,
    title:String
  },
  data:{
    qaList:{},
    total:0
  },
  ready:function(){
    //console.log(this.properties.searchWord+"===>")
    //this.getNewList()
  }, 
  observers: {
    'isRandom': function (isRandom) {
      this.getNewList()
    }
  },
  methods: {
    getNewList: function () {
      //console.log("刷新列表")
      const searchWord = this.properties.searchWord
      var isRandom = this.properties.isRandom * PAGENUM
      const db = wx.cloud.database()
      const _ = db.command
      console.log("isRandom====" + isRandom)
      const whs = {
        _openid: this.data.openid
      }
      if (searchWord!=""){
        whs=_.or([
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
      }
      db.collection('ttl_qa').where(whs).count().then(res => {
        console.log(res.total +"==total")
        var total=res.total
        if (isRandom < total) {
          // 查询当前用户所有的 ttl_qa
          db.collection('ttl_qa').where(whs).skip(isRandom).limit(PAGENUM).get({
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
        }
      })
      
    },
  }
})