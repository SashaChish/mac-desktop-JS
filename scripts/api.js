const createEl = name => document.createElement(name)
const getEl = selector => document.querySelector(selector)

class API {
  constructor({ key, imagesName = [] }) {
    this.key = key
    this.images = imagesName
  }

  async getImage() {
    const responce = await fetch(
      `https://pixabay.com/api/?key=${this.key}&image_type=photo`
    )
    const data = await responce.json()

    return data.hits
  }

  async insertImgToWindow() {
    const images = await this.getImage()
    const bodyContent = getEl('.content')

    images.forEach(img => {
      const div = createEl('div')
      const span = createEl('span')

      div.style.background = `url(${img.largeImageURL}) center center/cover`
      div.classList.add('content__img')
      span.classList.add('img__border')
      bodyContent.appendChild(div).appendChild(span)
    })
  }

  insertImageToFooter() {
    const footerWrap = getEl('.footer__wrap')
    const { images } = this

    images.forEach((name, index) => {
      const div = createEl('div')
      const settingsClass =
        name === 'settings' ? ['footer__img', 'settings'] : ['footer__img']

      if (images.length - 1 === index) {
        const seperator = createEl('div')

        seperator.classList.add('footer__img-seperator')
        footerWrap.appendChild(seperator)
      }

      div.style.background = `url('images/${name}.png') center center / cover no-repeat`
      div.classList.add(...settingsClass)
      footerWrap.appendChild(div)
    })
  }

  async addListenerImg() {
    const contentItems = [...getEl('.content').children]
    const app = getEl('.app')

    const changeBackground = div => {
      div.addEventListener('click', function () {
        const { background } = this.style
        const url = background.slice(
          background.indexOf('("') + 2,
          background.indexOf('")')
        )

        app.style.background = `url(${url}) center center / cover no-repeat`
      })
    }

    contentItems.forEach(changeBackground)
  }

  addlistenerContent() {
    const settings = getEl('.footer__img.settings')
    const window = getEl('.window')
    this.show = false

    const show = () => {
      window.classList.remove('hide')
      window.classList.add('show')
      this.show = false
    }

    const hide = () => {
      window.classList.remove('show')
      window.classList.add('hide')
      this.show = true
    }

    settings.addEventListener('click', () => (this.show ? show() : hide()))
  }
}
