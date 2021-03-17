const Cookies = require("universal-cookie/lib");

module.exports = {
    i18n: {
        locales: ['en', 'pt', 'es'],
        defaultLocale: typeof (new Cookies()).get('lang') === 'undefined' ? 'en' : (new Cookies()).get('lang')
    },
}