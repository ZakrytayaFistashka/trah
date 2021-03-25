/* eslint-disable global-require */
const customRoutes = require('./routes.config.js');

const testSite = 'https://develop.hi.academy/';

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'hi.academy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'yandex-verification', content: 'e319d57b96694e45' },
      { hid: 'description', name: 'description', content: 'hi.academy' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'apple-touch-icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
      { rel: 'icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'mask-icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700"' },
    ],
  },
  generate: {
    dir: 'output',
    routes: ['/', '/ru'],
  },
  modules: [
    '@nuxtjs/axios',
  ],
  plugins: [
    {
      src: '~/plugins/retina',
      ssr: false,
    },
    { src: '~/plugins/vue-tags-input', 
      ssr: false
    },
    '~/plugins/vue-i18n-path',
    '~/plugins/vue-mixpanel',
    '~/plugins/vue-validate',
    '~/plugins/vue-moment',
    '~/plugins/vue-cookie',
    '~/plugins/vue-i18n',
    '~/plugins/vue-ab',
  ],
  css: [
    '~/assets/bootstrap.min.css',
    '~/assets/main.css',
  ],
  axios: {
    baseURL: testSite,
    proxy: true,
  },
  proxy: {
    '/api/': {
      target: testSite
    },
    '/static/': {
      target: testSite
    },
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: 'transparent' },
  /*
  ** Router options
  */
  router: {
    middleware: 'i18n',
    extendRoutes(routes, resolve) {
      const customRouteNames = customRoutes.map(route => route.name);

      routes = routes.filter(route => !customRouteNames.includes(route.name)); // remove custom routes from nuxt-generated routing

      customRoutes.forEach(route => routes.push(Object.assign(route, {
        component: resolve(__dirname, route.component),
      })));

      return routes;
    },
    scrollBehavior(to, from, savedPosition) {
      return {x: 0, y: 0}
    },
  },

  /*
  ** Build configuration
  */
  build: {
    publicPath: '/_nuxt/',
    cssSourceMap: false,
    extractCSS: false,

    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
