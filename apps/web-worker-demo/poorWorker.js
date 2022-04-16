// importScripts('./hello2.js', 'http://xxx/a.js'); // 此处可以指出多脚本， 加载的脚本不支持跨域!!

// self 代表子线程自身，即子线程的全局对象。
// self可以换成this或不写，也可以实现执行。此处用self用于区分子线程worker

// 监听主线程传过来的信息
self.onmessage = e => {
    console.log(e)
    console.log('我是子线程， 我在工作， 我是worker， 我收到主线程传来的信息：', e.data)
    // do something
  }
  
  // setTimeout非必须，此处模拟，worker干了个耗时的活，2s后告诉主线程（老板）活已经干完ok了。
  setTimeout(() => {
    // 发送信息给主线程
    self.postMessage('我是子线程， 我在工作， 我是worker， 工作已经完成 ok')
    closeSon()
  }, 2000)
  
  // 关闭worker线程
  function closeSon () {
    return self.close()
  }
  