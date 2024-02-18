const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'es',
        locales: ['es', 'en', 'et'],
        localePath: path.resolve('./public/locales'),
    },
    react: {
        useSuspense: false,
    },
};