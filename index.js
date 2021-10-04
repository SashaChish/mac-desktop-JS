'use strict'

init()

async function init() {
  const api = new API({ key, imagesName })

  await api.getImage()
  api.searchImg()
  api.insertImgToWindow()
  api.insertImgToFooter()
  api.addListenerImg()
  api.addListenerAppWindow()
}
