module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        publish: ['github'],
      },
      mainProcessTypeChecking: true, // Manually enable type checking during webpack bundling for background file.
    },
  },

  transpileDependencies: ['vuetify'],
};
