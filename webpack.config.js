const Encore = require('@symfony/webpack-encore');

Encore
  .setOutputPath('build/')
  .setPublicPath('/wiki-2020/build')
  .setManifestKeyPrefix('build')
  .addEntry('app', './site/app.js')
  .enableSingleRuntimeChunk()
  .enableSourceMaps(!Encore.isProduction())
  .enableSassLoader()
  .autoProvidejQuery()
;

if (Encore.isProduction()) {
  Encore
    .cleanupOutputBeforeBuild()
    .enableVersioning()
  ;
}

module.exports = Encore.getWebpackConfig();
