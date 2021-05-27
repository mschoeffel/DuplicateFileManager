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
        win: {
          icon: "build/icons/icon.png",
        },
      },
      mainProcessTypeChecking: true, // Manually enable type checking during webpack bundling for background file.
    },
  },

  transpileDependencies: ['vuetify'],
};
