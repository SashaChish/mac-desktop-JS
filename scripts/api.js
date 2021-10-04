const createEl = name => document.createElement(name)
const getEl = selector => document.querySelector(selector)

const styledEl = (styles, nodeList) => {
  for (let key in styles) {
    Array.from(nodeList).forEach(node => (node.style[key] = styles[key]))
  }
}

const removeChild = node => {
  while (node.firstChild) node.removeChild(node.firstChild)
}

const addClass = (nodes = [], ...classes) => {
  ;(Array.isArray(nodes) ? nodes : [nodes]).forEach(node =>
    node.classList.add(...classes)
  )
}

class API {
  constructor({ key, imagesName = [] }) {
    this.key = key
    this.imagesName = imagesName
    this.images = []
    this.filterImages = null
    this.show = false
  }

  async getImage() {
    const responce = await fetch(
      `https://pixabay.com/api/?key=${this.key}&image_type=photo`
    )
    const data = await responce.json()

    this.images = data.hits.map(({ id, largeImageURL: url, tags }) => ({
      id,
      url,
      tags,
    }))
  }

  insertImgToWindow() {
    const content = getEl('.content')
    const { children: images } = content

    if (images.length) removeChild(content)
    ;(this.filterImages || this.images).forEach(img => {
      const div = createEl('div')
      const span = createEl('span')

      div.style.background = `url(${img.url}) center center/cover`
      addClass(div, 'content__img')
      addClass(span, 'img__border')

      content.appendChild(div).appendChild(span)
    })

    switch (images.length) {
      case 1:
        styledEl(
          {
            flexBasis: '50%',
            height: '50%',
          },
          images
        )
        break
      case 2:
        styledEl(
          {
            flexBasis: '55%',
            height: '40%',
          },
          images
        )
        break
    }
  }

  insertImgToFooter() {
    const footerWrap = getEl('.footer__wrap')
    const { imagesName } = this

    imagesName.forEach((name, index) => {
      const div = createEl('div')
      const classes = name === 'settings' ? ['footer__img', 'settings'] : ['footer__img']

      if (imagesName.length - 1 === index) {
        const separator = createEl('div')

        addClass(separator, 'footer__img-separator')
        footerWrap.appendChild(separator)
      }

      div.style.background = `url('images/${name}.png') center center / cover no-repeat`
      addClass(div, ...classes)
      footerWrap.appendChild(div)
    })
  }

  searchImg() {
    const input = getEl('.input')

    input.addEventListener('keyup', e => {
      this.filterImages = this.images.filter(img => img.tags.includes(e.target.value))
      this.insertImgToWindow()
      this.addListenerImg()
    })
  }

  addListenerImg() {
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

  addListenerAppWindow() {
    const settings = getEl('.footer__img.settings')
    const appWindow = getEl('.window')

    const show = () => {
      appWindow.classList.remove('hide')
      appWindow.classList.add('show')
      this.show = false
    }

    const hide = () => {
      appWindow.classList.remove('show')
      appWindow.classList.add('hide')
      this.show = true
    }

    settings.addEventListener('click', () => (this.show ? show() : hide()))
  }
}
