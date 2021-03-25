// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {},
    "postcss-nested": {},
    "postcss-advanced-variables": {
        variables: {
            brand: '#fff',
            brandLight: 'rgba(244, 0, 0, 0.3)',
            darkHome: '#101314',
            light: '#FFFAF2',
            dark: '#49515E',
            scene: '#49505e',
            buttons: '#6EB6E7',
            error: '#CE0E0E',
            comment: '#ccc',
            sceneHeight: '75vh',
            mediaWideScreen: '1600px',
            mediaSmallScreen: '1400px',
            mediaLaptop: '1300px',
            mediaIpad: '1200px',
            bootstrapMob: '992px',
            mediaMini: '768px',
            mediaTiny: '600px',
            serviceWhite: '#ffffff',
            serviceBlue: '#7DB5E2',
            serviceDarkBlue: '#4A515D',
            serviceOrange: '#F57D30',
            serviceRed: '#D16460',
            serviceSuperRed: '#E53A2E',
            serviceYellow: '#FFFBF6',
            serviceBlack: '#000000',
            serviceDeepBlue: '#3E93CC',
            imageSand: '#FADEB3',
            imageDarkSand: '#F1C486',
            imageOrange: '#F1AD7F',
            imageBrown: '#AA806A',
            imageLightPink: '#F4D1CD',
            imageDirtyPink: '#E9C2BE',
            imageCherry: '#EB7474',
            imageLightBlue: '#7DB5E2',
            imageDeepBlue: '#5292C7',
            imageLightViolet: '#7E8CAC',
            imageMiddleViolet: '#596175',
            imageDarkViolet: '#4A515D'
        },
    },
    "postcss-media-minmax": {},
  }
}