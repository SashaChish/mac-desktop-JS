'use strict'

init()

async function init() {
  const api = new API({ key, imagesName })

  await api.insertImgToWindow()
  api.insertImageToFooter()
  api.addListenerImg()
  api.addlistenerContent()
}
