/*
 *
 * This file defines custom routes that override nuxt's ones.
 * You should better use built-in nuxt routing mechanism
 */

module.exports = [
  {
    name: 'ru-index',
    path: '/ru/',
    component: 'pages/_lang/index.vue',
  },
  {
    name: 'index-paginated',
    path: '/page/:page(\\d+)/',
    component: 'pages/index.vue',
  },
];
