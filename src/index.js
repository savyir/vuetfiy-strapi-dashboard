const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const getFiles = path => {
  const files = []
  for (const file of fs.readdirSync(path)) {
    const fullPath = path + '/' + file
    if (fs.lstatSync(fullPath).isDirectory())
      getFiles(fullPath).forEach(x => files.push(file + '/' + x))
    else files.push(file)
  }
  return files
}

export default async function VuetifyStrapiDashboardModule(moduleOptions) {

  try {
    let listOfFiles = getFiles(path.resolve(__dirname, './components'));

    const options = {
      rtl: false,
      ...moduleOptions
    }

    this.addPlugin({
      fileName: 'options.js',
      src: path.resolve(__dirname, 'options.js'),
      options
    })

    for (const componentName of listOfFiles) {
      let pName = 'components/' + componentName;
      this.addTemplate({
        fileName: pName,
        src: path.resolve(__dirname, pName),
        options
      })
      // console.log({pName})
    }

    this.addModule({
      src: "nuxt-sweetalert2"
    });

    this.addModule({
      src: "nuxt-i18n",
      options: {
        vueI18nLoader: true,
        locales: [
          {code: 'en', iso: 'en-US', dir: 'ltr'},
          {code: 'fa', iso: 'fa-IR', dir: 'rtl'}
        ],
        defaultLocale: _.get(moduleOptions, 'lang', 'en'),
      }
    });

    this.addModule({
      src: "@nuxtjs/auth"
    });


    this.addTemplate({
      fileName: 'components/index.js',
      src: path.resolve(__dirname, 'components/index.js'),
      options
    })

    this.addTemplate({
      fileName: 'assets/helper.js',
      src: path.resolve(__dirname, 'assets/helper.js'),
      options
    })

    this.addTemplate({
      fileName: 'store/common.js',
      src: path.resolve(__dirname, 'store/common.js'),
      options
    })

    this.addTemplate({
      fileName: 'store/navigation.js',
      src: path.resolve(__dirname, 'store/navigation.js'),
      options
    })

    this.addTemplate({
      fileName: 'store/commonSelect.js',
      src: path.resolve(__dirname, 'store/commonSelect.js'),
      options
    })

    this.addPlugin({
      fileName: 'plugin.js',
      src: path.resolve(__dirname, 'plugin.js'),
      options
    })

    this.addLayout({
      name: "vsd",
      src: path.resolve(__dirname, 'layout/vsd.vue'),
    })

    this.addLayout({
      name: "vsdAuth",
      src: path.resolve(__dirname, 'layout/vsdAuth.vue'),
    })

  } catch (e) {
    console.error({e})
  }
}

module.exports.meta = require('../package.json')
