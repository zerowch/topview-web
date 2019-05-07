/*
三个参数
file：一个是文件(类型是图片格式)，
w：一个是文件压缩的后宽度，宽度越小，字节越小
photoCompress()
  */
function photoCompress (file, w) {
  let ready = new FileReader()
  /* 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容. */
  ready.readAsDataURL(file)
  return new Promise(resolve => {
    ready.onload = function () {
      let re = this.result
      canvasSquareDataURL(re, w).then(res => {
        resolve(res)
      })
    }
  })
}

function canvasSquareDataURL (path, setWidth) {
  let quality = 0.7 // 默认图片质量为0.7
  let img = new Image()
  img.src = path
  return new Promise(resolve => {
    img.onload = function () {
      let that = this
      // 默认按比例压缩
      let w = that.width
      let h = that.height
      let scale = w / h
      w = setWidth || w
      h = w / scale
      // 生成canvas
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')

      // 创建属性节点
      let anw = document.createAttribute('width')
      let anh = document.createAttribute('height')
      anw.nodeValue = setWidth
      anh.nodeValue = setWidth
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)

      let xp = 0
      let yp = 0
      if (w > h) {
        let nw = setWidth * scale
        let nh = nw / scale
        xp = (nw - setWidth) / 2
        ctx.drawImage(that, -xp, 0, nw, nh)
      } else {
        yp = (h - w) / 2
        ctx.drawImage(that, 0, -yp, w, h)
      }

      // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL('image/jpeg', quality)
      // 回调函数返回base64的值
      resolve(base64)
    }
  })
}
/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 * 用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob (urlData) {
  let arr = urlData.split(',')
  let mime = arr[0].match(/:(.*?)/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export default {
  photoCompress, convertBase64UrlToBlob, canvasSquareDataURL
}
