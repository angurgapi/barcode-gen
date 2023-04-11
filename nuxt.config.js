export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'barrcode',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss', '@/assets/scss/normalize.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/global-components'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build', '@nuxtjs/svg-sprite'
  ],

  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      // target: 'https://products.aspose.app/barcode/embed',
      target: 'https://api.products.aspose.app/barcode/generate',
      pathRewrite: { '^/api/': '' }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  svgSprite: {
    input: '~/assets/icons'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  }
}
